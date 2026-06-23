# RetroFi Style Guide

This guide records the product-level visual decisions for RetroFi. It should explain what the site should feel like and how future UI work should fit in; it should not contain implementation CSS.

## Product Feel

RetroFi should feel like a practical, trustworthy sustainability finance tool for business owners and internal reviewers. The interface should be polished but quiet: clear hierarchy, calm spacing, and dense information where users need to compare records or make decisions.

Avoid marketing-heavy decoration on workflow screens. Dashboards, forms, sign-in, and admin tools should prioritize clarity, scanability, and repeated use.

## Brand Signals

- Use the RetroFi name consistently, with a simple dark green rounded-square `R` mark as the primary logo signal.
- The main action language is report-oriented: prefer `Create My Report` for the public CTA.
- Avoid mixing older project names into user-facing text. Internal docs may still reference Green Business Solution where it describes repo, AWS, or legacy project context.

## Color Direction

- The dominant brand color is deep green.
- Page backgrounds should be warm off-white or very light neutral green, not pure white everywhere.
- Use soft green-tinted depth sparingly on public pages.
- Admin and dashboard surfaces should be quieter than landing sections; keep them readable before making them decorative.
- Avoid one-note palettes where every element is only a variation of the same green. Use neutral grays, white surfaces, and occasional blue links for contrast.

## Typography

- Large public headings can be bold and compact, but form labels, dashboard text, and table content should stay practical and easy to scan.
- Do not use viewport-scaling type that makes text unpredictable. Use responsive bounds instead.
- Letter spacing should generally stay normal. Do not rely on tight negative tracking.

## Layout

- Public pages can use full-width bands with constrained inner content.
- Cards should be reserved for actual contained tools, repeated items, modals, or framed auth panels.
- Do not put cards inside cards.
- Login and form panels should be centered, not oversized, with enough breathing room below the card.
- Fixed-format controls such as nav buttons, auth buttons, filters, and review rows should have stable dimensions so hover/loading states do not shift layout.

## Navigation

- Public nav should show `How It Works`, `Pricing`, and `About`.
- Keep database/admin entry points protected behind auth rather than prominent public nav.
- The primary nav CTA should read `Create My Report`.
- On sign-in pages, keep the footer hidden so the auth task is visually clean.

## Forms And Auth

- Google sign-in is a secondary auth path visually, but it should have the same width and visual weight as the email/password controls.
- The password form and Google sign-in should feel like one coherent auth surface, not two unrelated components.
- Error messages should say what the user can do next. For Google setup errors, include the current origin and mention Authorized JavaScript origins.

## Admin And Data Views

- Admin screens should be optimized for review work: filters, counts, clear statuses, and readable detail panels.
- Large data tables may use bounded previews in sign-in/dashboard payloads. If a table is truncated, the UI must say how many records were loaded and how many exist.
- Keep raw JSON visible where it helps debugging, but do not make raw JSON the only useful admin view.

## Accessibility

- Visible text and accessible button text should match.
- Interactive controls should use real buttons or links, not CSS-generated text pretending to be content.
- Error states, loading states, and disabled states should be visible and understandable without relying on color alone.

## Implementation Discipline

- Prefer small shared modules for config, routes, API helpers, auth helpers, and reusable icons.
- Keep page-specific UI close to the page until duplication or complexity justifies extraction.
- Comments should explain business rules or integration assumptions, not restate obvious code.
