import { createReadStream } from "node:fs";
import { posix } from "node:path";
import { createGunzip } from "node:zlib";

const TAR_BLOCK_SIZE = 512;
const MAX_METADATA_PAYLOAD_BYTES = 16 * 1024 * 1024;
const textDecoder = new TextDecoder("utf-8", { fatal: true });

class StreamReader {
  constructor(stream) {
    this.iterator = stream[Symbol.asyncIterator]();
    this.buffer = Buffer.alloc(0);
    this.offset = 0;
    this.done = false;
  }

  async readExact(size, { collect = true } = {}) {
    if (!Number.isSafeInteger(size) || size < 0) {
      throw new Error("OFFLINE_REBUILD_INVALID_ARCHIVE_READ_SIZE");
    }
    const chunks = collect ? [] : null;
    let remaining = size;
    while (remaining > 0) {
      if (this.offset >= this.buffer.length) {
        const next = await this.iterator.next();
        if (next.done) {
          this.done = true;
          throw new Error("OFFLINE_REBUILD_TRUNCATED_TAR_ARCHIVE");
        }
        this.buffer = Buffer.from(next.value);
        this.offset = 0;
      }
      const available = this.buffer.length - this.offset;
      const consumed = Math.min(available, remaining);
      if (collect) {
        chunks.push(
          this.buffer.subarray(this.offset, this.offset + consumed)
        );
      }
      this.offset += consumed;
      remaining -= consumed;
    }
    return collect ? Buffer.concat(chunks, size) : null;
  }
}

function decodeTarString(buffer, label) {
  const nul = buffer.indexOf(0);
  const bytes = nul === -1 ? buffer : buffer.subarray(0, nul);
  try {
    return textDecoder.decode(bytes);
  } catch {
    throw new Error(
      `OFFLINE_REBUILD_INVALID_TAR_UTF8: ${label}`
    );
  }
}

function parseTarNumber(buffer, label) {
  if ((buffer[0] & 0x80) !== 0) {
    throw new Error(
      `OFFLINE_REBUILD_UNSUPPORTED_TAR_BASE256_NUMBER: ${label}`
    );
  }
  const value = decodeTarString(buffer, label)
    .trim()
    .replace(/\s+$/u, "");
  if (!value) {
    return 0;
  }
  if (!/^[0-7]+$/.test(value)) {
    throw new Error(
      `OFFLINE_REBUILD_INVALID_TAR_NUMBER: ${label}`
    );
  }
  const parsed = Number.parseInt(value, 8);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new Error(
      `OFFLINE_REBUILD_UNSAFE_TAR_NUMBER: ${label}`
    );
  }
  return parsed;
}

function verifyTarHeaderChecksum(header) {
  const expected = parseTarNumber(
    header.subarray(148, 156),
    "header checksum"
  );
  let actual = 0;
  for (let index = 0; index < header.length; index += 1) {
    actual +=
      index >= 148 && index < 156 ? 0x20 : header[index];
  }
  if (actual !== expected) {
    throw new Error(
      `OFFLINE_REBUILD_TAR_HEADER_CHECKSUM_MISMATCH: expected ${expected}, received ${actual}`
    );
  }
}

function parsePaxPayload(payload) {
  const values = {};
  let offset = 0;
  while (offset < payload.length) {
    const space = payload.indexOf(0x20, offset);
    if (space === -1) {
      throw new Error("OFFLINE_REBUILD_INVALID_PAX_RECORD");
    }
    const lengthText = payload
      .subarray(offset, space)
      .toString("ascii");
    if (!/^[1-9][0-9]*$/.test(lengthText)) {
      throw new Error("OFFLINE_REBUILD_INVALID_PAX_LENGTH");
    }
    const length = Number.parseInt(lengthText, 10);
    if (
      !Number.isSafeInteger(length) ||
      length <= space - offset + 2 ||
      offset + length > payload.length
    ) {
      throw new Error("OFFLINE_REBUILD_INVALID_PAX_LENGTH");
    }
    const record = payload.subarray(space + 1, offset + length - 1);
    const equals = record.indexOf(0x3d);
    if (equals <= 0) {
      throw new Error("OFFLINE_REBUILD_INVALID_PAX_RECORD");
    }
    const key = decodeTarString(
      record.subarray(0, equals),
      "PAX key"
    );
    const value = decodeTarString(
      record.subarray(equals + 1),
      `PAX ${key}`
    );
    values[key] = value;
    offset += length;
  }
  return values;
}

function assertSafeArchivePath(value, label) {
  if (
    typeof value !== "string" ||
    !value ||
    value.startsWith("/") ||
    /^[A-Za-z]:[\\/]/.test(value) ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/u.test(value)
  ) {
    throw new Error(
      `OFFLINE_REBUILD_UNSAFE_ARCHIVE_PATH: ${label}`
    );
  }
  const segments = value.split("/");
  if (
    segments.includes("..") ||
    posix.normalize(value).startsWith("../")
  ) {
    throw new Error(
      `OFFLINE_REBUILD_ARCHIVE_PATH_ESCAPE: ${label}`
    );
  }
  return value;
}

function assertSafeLinkTarget(entryPath, linkTarget, type) {
  assertSafeArchivePath(linkTarget, `${entryPath} link target`);
  const stack =
    type === "symlink"
      ? posix.dirname(entryPath).split("/").filter(Boolean)
      : [];
  for (const segment of linkTarget.split("/")) {
    if (!segment || segment === ".") {
      continue;
    }
    if (segment === "..") {
      if (stack.length === 0) {
        throw new Error(
          `OFFLINE_REBUILD_ARCHIVE_LINK_ESCAPE: ${entryPath}`
        );
      }
      stack.pop();
    } else {
      stack.push(segment);
    }
  }
}

function entryType(typeFlag) {
  if (typeFlag === "\0" || typeFlag === "0") return "file";
  if (typeFlag === "5") return "directory";
  if (typeFlag === "2") return "symlink";
  if (typeFlag === "1") return "hardlink";
  if (typeFlag === "x") return "pax";
  if (typeFlag === "g") return "global-pax";
  if (typeFlag === "L") return "gnu-long-name";
  if (typeFlag === "K") return "gnu-long-link";
  return null;
}

function stripMetadataTerminator(payload) {
  let end = payload.length;
  while (
    end > 0 &&
    (payload[end - 1] === 0 || payload[end - 1] === 0x0a)
  ) {
    end -= 1;
  }
  return decodeTarString(
    payload.subarray(0, end),
    "GNU tar metadata"
  );
}

export async function validateTarArchive(
  path,
  {
    compression = "none",
    requiredMembers = []
  } = {}
) {
  const raw = createReadStream(path);
  const stream =
    compression === "gzip"
      ? raw.pipe(createGunzip())
      : compression === "none"
        ? raw
        : (() => {
            throw new Error(
              `OFFLINE_REBUILD_UNSUPPORTED_ARCHIVE_COMPRESSION: ${compression}`
            );
          })();
  const reader = new StreamReader(stream);
  const entries = [];
  const entryPaths = new Set();
  const typeCounts = {};
  let globalPax = {};
  let nextPax = {};
  let nextLongName = null;
  let nextLongLink = null;
  let zeroBlocks = 0;

  while (!reader.done) {
    let header;
    try {
      header = await reader.readExact(TAR_BLOCK_SIZE);
    } catch (error) {
      if (
        error.message === "OFFLINE_REBUILD_TRUNCATED_TAR_ARCHIVE" &&
        zeroBlocks >= 2
      ) {
        break;
      }
      throw error;
    }
    if (header.every((byte) => byte === 0)) {
      zeroBlocks += 1;
      if (zeroBlocks >= 2) {
        break;
      }
      continue;
    }
    zeroBlocks = 0;
    verifyTarHeaderChecksum(header);
    const prefix = decodeTarString(
      header.subarray(345, 500),
      "header prefix"
    );
    const headerName = decodeTarString(
      header.subarray(0, 100),
      "header name"
    );
    const headerPath = prefix
      ? `${prefix}/${headerName}`
      : headerName;
    const typeFlag = String.fromCharCode(header[156] || 0);
    const type = entryType(typeFlag);
    if (!type) {
      throw new Error(
        `OFFLINE_REBUILD_UNSAFE_TAR_ENTRY_TYPE: ${typeFlag.charCodeAt(0)}`
      );
    }
    const headerSize = parseTarNumber(
      header.subarray(124, 136),
      `${headerPath} size`
    );
    const effectivePax = {
      ...globalPax,
      ...nextPax
    };
    const size =
      effectivePax.size === undefined
        ? headerSize
        : Number.parseInt(effectivePax.size, 10);
    if (!Number.isSafeInteger(size) || size < 0) {
      throw new Error(
        `OFFLINE_REBUILD_INVALID_PAX_SIZE: ${headerPath}`
      );
    }
    const paddedSize =
      Math.ceil(size / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
    const needsPayload =
      type === "pax" ||
      type === "global-pax" ||
      type === "gnu-long-name" ||
      type === "gnu-long-link";
    if (needsPayload && size > MAX_METADATA_PAYLOAD_BYTES) {
      throw new Error(
        `OFFLINE_REBUILD_OVERSIZED_TAR_METADATA: ${headerPath}`
      );
    }
    const payload = await reader.readExact(paddedSize, {
      collect: needsPayload
    });
    const metadataPayload = payload?.subarray(0, size) ?? null;

    if (type === "global-pax") {
      globalPax = {
        ...globalPax,
        ...parsePaxPayload(metadataPayload)
      };
      continue;
    }
    if (type === "pax") {
      nextPax = parsePaxPayload(metadataPayload);
      continue;
    }
    if (type === "gnu-long-name") {
      nextLongName = stripMetadataTerminator(metadataPayload);
      continue;
    }
    if (type === "gnu-long-link") {
      nextLongLink = stripMetadataTerminator(metadataPayload);
      continue;
    }

    const pathValue =
      effectivePax.path ?? nextLongName ?? headerPath;
    const linkTarget =
      effectivePax.linkpath ??
      nextLongLink ??
      decodeTarString(
        header.subarray(157, 257),
        `${pathValue} link target`
      );
    assertSafeArchivePath(pathValue, pathValue);
    if (type === "symlink" || type === "hardlink") {
      assertSafeLinkTarget(pathValue, linkTarget, type);
    }
    if (entryPaths.has(pathValue)) {
      throw new Error(
        `OFFLINE_REBUILD_DUPLICATE_ARCHIVE_MEMBER: ${pathValue}`
      );
    }
    entryPaths.add(pathValue);
    entries.push({
      path: pathValue,
      type,
      size
    });
    typeCounts[type] = (typeCounts[type] ?? 0) + 1;
    nextPax = {};
    nextLongName = null;
    nextLongLink = null;
  }

  if (entries.length === 0) {
    throw new Error("OFFLINE_REBUILD_EMPTY_TAR_ARCHIVE");
  }
  for (const required of requiredMembers) {
    assertSafeArchivePath(required, `required member ${required}`);
    const found = required.endsWith("/")
      ? [...entryPaths].some(
          (entryPath) =>
            entryPath === required.slice(0, -1) ||
            entryPath.startsWith(required)
        )
      : entryPaths.has(required);
    if (!found) {
      throw new Error(
        `OFFLINE_REBUILD_REQUIRED_ARCHIVE_MEMBER_MISSING: ${required}`
      );
    }
  }
  return {
    status: "VERIFIED_SAFE_ARCHIVE_MEMBERS",
    entryCount: entries.length,
    typeCounts,
    requiredMembers: [...requiredMembers]
  };
}
