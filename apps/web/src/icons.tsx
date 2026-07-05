export const LockIcon = () => (
  <svg aria-hidden="true" className="lock-icon" fill="none" viewBox="0 0 24 24">
    <path
      d="M7 10V8a5 5 0 0 1 10 0v2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <rect
      height="10"
      rx="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      width="14"
      x="5"
      y="10"
    />
  </svg>
);

export const EyeIcon = () => (
  <svg aria-hidden="true" className="eye-icon" fill="none" viewBox="0 0 24 24">
    <path
      d="M2.8 12s3.4-6 9.2-6 9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

function OutlineIcon({
  children
}: {
  children: ReactNode;
}) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

export const HomeOutlineIcon = () => (
  <OutlineIcon>
    <path d="M4 10.5 12 4l8 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M6.5 9.5V20h11V9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M10 20v-5h4v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const BuildingOutlineIcon = () => (
  <OutlineIcon>
    <path d="M6 20V5.5h12V20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M9 8.5h.01M12 8.5h.01M15 8.5h.01M9 12h.01M12 12h.01M15 12h.01M9 15.5h.01M15 15.5h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M10.5 20v-3h3v3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const StoreOutlineIcon = () => (
  <OutlineIcon>
    <path d="M4 9.5h16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M5.5 9.5 7 5h10l1.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M6.5 9.5V20M17.5 9.5V20M9.5 20v-5h5v5M4 20h16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const HandHeartOutlineIcon = () => (
  <OutlineIcon>
    <path d="M12 7.8c0-1.7 1.3-2.8 2.8-2.8 1 0 1.9.5 2.4 1.4A2.9 2.9 0 0 1 20 9c0 3-3.4 5.2-8 8.5C7.4 14.2 4 12 4 9c0-1 .4-2 1.2-2.6A2.8 2.8 0 0 1 7.6 5C9 5 10.3 6.1 10.3 7.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M4 19.5c1.8 0 3.4-.3 4.8-.9l3.6-1.6c1-.4 2-.1 2.6.6l.6.7c.7.8 1.9 1 2.8.4l1.6-1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="m3.5 15.5 3.8-1.2c1.3-.4 2.7.2 3.2 1.5l.1.4h3.2c.9 0 1.6.7 1.6 1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const LandmarkOutlineIcon = () => (
  <OutlineIcon>
    <path d="M3.5 20h17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M5.5 20v-8M9.5 20v-8M14.5 20v-8M18.5 20v-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M3 10.5h18L12 5l-9 5.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const GraduationCapOutlineIcon = () => (
  <OutlineIcon>
    <path d="m3 10 9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M7 12.5v4c1.8 1.1 3.4 1.7 5 1.7s3.2-.6 5-1.7v-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M21 10v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const LeafOutlineIcon = () => (
  <OutlineIcon>
    <path d="M12 20V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M12 13c-4.6 0-7-2.9-7-7 4.6 0 7 2.9 7 7ZM12 16c0-4.4 2.4-7 7-7 0 4.4-2.4 7-7 7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const FactoryOutlineIcon = () => (
  <OutlineIcon>
    <path d="M4 20V9.5h4v3l4-3v3.5l4-3V20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M4 20h16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M8 16h.01M12 16h.01M16 16h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </OutlineIcon>
);

export const MoreHorizontalOutlineIcon = () => (
  <OutlineIcon>
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </OutlineIcon>
);

export const CheckIcon = () => (
  <OutlineIcon>
    <path d="m6 12.5 4 4 8-9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
  </OutlineIcon>
);
import type { ReactNode } from "react";
