# Homepage Design System Contract

The current RetroFi homepage is the design system source of truth.

This document reverse engineers the homepage visual language from the public homepage modules and `apps/web/src/styles.css`. Treat these values and behaviors as constraints, not suggestions. Do not restyle, normalize, or "improve" them when building adjacent public surfaces unless the user explicitly asks to change the homepage system itself.

## Scope

Canonical source files:

- `apps/web/src/pages/home/HomePage.tsx`
  - Composes the public homepage sections in order.
- `apps/web/src/pages/home/homeSections.ts`
  - Homepage section IDs and home-anchor scroll fallbacks.
- `apps/web/src/pages/home/sections/hero/PlanetScanHero.tsx`
- `apps/web/src/pages/home/sections/insights/HomeInfographicSection.tsx`
- `apps/web/src/pages/home/sections/journey/HomeJourneySections.tsx`
- `apps/web/src/pages/home/sections/pricing/CustomerPricingSection.tsx`
- `apps/web/src/components/public/PublicShell.tsx`
  - `PublicNav` and the shared public header/footer shell when rendered with `pageClassName="home-page"`.
- `apps/web/src/components/ScrollFrameScanner.tsx`
- `apps/web/src/pages/home/home.css`
- `apps/web/src/pages/home/sections/hero/hero.css`
- `apps/web/src/pages/home/sections/insights/insights.css`
- `apps/web/src/pages/home/sections/journey/journey.css`
- `apps/web/src/pages/home/sections/pricing/pricing.css`
- `apps/web/src/styles.css`
  - Public site root variables near `/* Retrofi public site */`
  - `.public-page.home-page ...`
  - `.planet-scan-section.scroll-frame-scanner ...`
  - `.home-infographics-section ...`

The homepage system is a bright, editorial, premium sustainability interface: pale sky/green hero imagery, dark pine text, serif display typography, restrained glass navigation, dense white infographic cards, and precise green action states.

## Token Layers

Use a three-layer token model when extending this system:

1. Primitive tokens: exact homepage values.
2. Semantic tokens: purpose aliases that map to primitives.
3. Component tokens: button, nav, card, hero, scanner, and chart usage.

Never introduce a new color, radius, shadow, gradient, type scale, or motion curve for public homepage-adjacent UI until it has been checked against this contract.

## Primitive Colors

Core public values:

| Token | Value | Source / Use |
| --- | --- | --- |
| `--retrofi-bg` | `#eef4ee` | Public page background |
| `--retrofi-surface` | `#ffffff` | Surfaces/cards |
| `--retrofi-text` | `#102018` | Default public text |
| `--retrofi-muted` | `#5e6b63` | Muted text |
| `--retrofi-green` | `#0e4637` | General primary green |
| `--retrofi-green-dark` | `#082f26` | General dark green |
| `--retrofi-border` | `#dce5dd` | General border |
| `--retrofi-pale` | `#e7f2ec` | Pale green hover/pills |

Homepage-specific values:

| Value | Use |
| --- | --- |
| `#062419` | Primary homepage nav/body dark text |
| `#062619` | Homepage CTA and dark CTA band |
| `#082619` | Homepage brand/headline dark text |
| `#0a3b28` | Homepage hero accent |
| `#0b3a27` | Homepage CTA hover |
| `#0b6c3c` | Eyebrow green |
| `#08763f` | Chart/metric/icon green |
| `#17452f` | Proof point text |
| `#071e16` | Infographic section text |
| `#07101d` | Metric/card text |
| `#cfe9f6` | Homepage scanner canvas fallback |
| `#edf6ea` | Infographic section lower background |
| `#eff8ef` | Icon/pill background |
| `#f3f8f1` | Inverted CTA button background |
| `#f6fbf3` | Infographic section mid background |
| `#f3fbf6` | Light nav/logo text in non-home public nav |
| `#f4f7f2` | Dark scanner text fallback |
| `#8edd62` | Legacy scanner bright accent |
| `#86c968` | Legacy scanner CTA green |
| `#9bdb7d` | Legacy scanner CTA hover |

Alpha colors are part of the system. Preserve them where used:

- Nav glass: `rgba(240, 248, 243, 0.46)`, mobile `rgba(237, 248, 242, 0.58)`.
- Nav border: `rgba(6, 38, 25, 0.09)` to `rgba(6, 38, 25, 0.1)`.
- Hero text secondary: `rgba(6, 36, 25, 0.76)` and support copy `rgba(6, 36, 25, 0.62)`.
- Emphasis glass: `rgba(241, 249, 243, 0.66)`.
- Card borders: `rgba(8, 38, 25, 0.1)` and nested card borders `rgba(8, 38, 25, 0.12)`.
- Card hover border: `rgba(8, 118, 63, 0.2)`.
- White surface overlays: `rgba(255, 255, 255, 0.72)`, `0.76`, `0.82`.

## Gradients

Canonical gradients:

```css
--retrofi-gradient: linear-gradient(135deg, #eef1ff 0%, #ddebe4 45%, #c2d8d2 100%);
```

Homepage scanner overlay:

```css
linear-gradient(90deg, rgba(238, 248, 241, 0.82) 0%, rgba(238, 248, 241, 0.58) 24%, rgba(238, 248, 241, 0.16) 48%, transparent 70%),
linear-gradient(180deg, rgba(244, 250, 247, 0.54) 0%, rgba(244, 250, 247, 0.16) 26%, transparent 58%)
```

Mobile scanner overlay:

```css
linear-gradient(180deg, rgba(238, 248, 241, 0.74) 0%, rgba(238, 248, 241, 0.34) 36%, transparent 66%),
linear-gradient(90deg, rgba(238, 248, 241, 0.56), transparent 78%)
```

Infographic section background:

```css
radial-gradient(circle at 8% 16%, rgba(158, 202, 137, 0.22), transparent 27%),
radial-gradient(circle at 88% 8%, rgba(191, 224, 164, 0.2), transparent 25%),
linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.72) 7%, #ffffff 16%, #f6fbf3 42%, #edf6ea 100%)
```

Infographic card:

```css
linear-gradient(145deg, #ffffff, #fbfefb),
radial-gradient(circle at 92% 4%, rgba(35, 142, 82, 0.06), transparent 34%)
```

Chart bars:

```css
linear-gradient(180deg, #68c88c 0%, #08763f 100%)
```

Do not replace these with generic brand gradients.

## Typography

Global public base:

- Font stack: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Letter spacing is normally `0`, except intentional display tightening and uppercase labels.

Homepage display stack:

```css
"Cormorant Garamond", "EB Garamond", "Iowan Old Style", Georgia, serif
```

Use this serif stack for homepage brand text, hero headline, scanner next headline, infographic section headline, and CTA display line.

Key type styles:

| Element | Size | Weight | Letter spacing | Line height |
| --- | --- | --- | --- | --- |
| Home brand | `clamp(34px, 3vw, 46px)` | `650` | `-0.035em` | inherited |
| Home mobile brand | `27px` | `650` | `-0.035em` | inherited |
| Hero title | `clamp(72px, 7vw, 122px)` | `520` | `-0.055em` | `0.88` |
| Hero mobile title | `clamp(58px, 16vw, 82px)` | `520` | `-0.055em` | `0.88` |
| Hero next headline | `clamp(56px, 5.5vw, 98px)` | `520` | `-0.055em` | `0.9` |
| Infographic H2 | `clamp(42px, 4.4vw, 74px)` | `560` | `-0.052em` | `1` |
| CTA display line | `clamp(28px, 2.6vw, 42px)` | `560` | `-0.035em` | `1` |
| Hero subhead | `clamp(20px, 1.55vw, 25px)` | default | `0` | `1.38` |
| Proof labels | `13px` | `680` | `0` | pill |
| Card section numbers | `clamp(38px, 3.5vw, 56px)` | `850` | `-0.06em` | `0.9` |
| Card headings | `clamp(18px, 1.32vw, 23px)` | `760` | `0.035em` | default |
| Large savings metric | `clamp(48px, 5vw, 78px)` | `620` | `-0.065em` | `0.9` |

Do not use viewport-width-only font sizing. Keep the existing clamp patterns and line-height constraints.

## Spacing And Layout

Base layout constraints:

- Public header height: `72px`.
- Home header inset: `left/right: clamp(20px, 3.2vw, 56px)`, `top: 18px`.
- Mobile home header inset: `left/right: 16px`, `top: 12px`.
- Home nav gap: `clamp(34px, 4.5vw, 72px)`.
- Home nav actions gap: `28px`.
- Scanner section height: `375svh`; mobile `330svh`; reduced motion `100svh`.
- Scanner sticky min-height: `680px`; mobile `600px`.
- Hero copy position: `left: clamp(48px, 5.2vw, 92px)`, `top: clamp(166px, 22vh, 238px)`, `width: clamp(560px, 43vw, 760px)`.
- Hero tablet copy: `left: 5vw`, `top: clamp(138px, 18vh, 190px)`, `width: min(660px, calc(100vw - 10vw))`.
- Hero mobile copy: `left/right: 24px`, `top: 126px`, `width: auto`; very small `top: 118px`.
- Infographic section overlaps hero with `margin-top: -18svh`; mobile `-12svh`.
- Infographic section padding: `clamp(24px, 4svh, 56px) clamp(20px, 5vw, 72px) clamp(88px, 11vw, 150px)`.
- Infographic mobile padding: `140px 18px 82px`.
- Infographic max width: `1480px`.
- Infographic grid gap: `clamp(20px, 2.4vw, 34px)`.
- Secondary infographic stage margin: `clamp(28px, 4vw, 54px)`.
- Card padding: `clamp(20px, 2vw, 30px)`; mobile `22px`.
- Card gap: `clamp(14px, 1.6vw, 20px)`.
- CTA band gap: `32px`, padding `clamp(24px, 3vw, 40px)`.

Use these spacing values before inventing new ones. If a new component needs a size, choose from nearby homepage values: `4`, `8`, `10`, `12`, `13`, `14`, `16`, `18`, `20`, `22`, `24`, `28`, `30`, `32`, `34`, `38`, `40`, `46`, `52`, `56`, `58`, `62`, `72`.

## Radius

Canonical radii:

| Radius | Use |
| --- | --- |
| `4px 4px 0 0` | Bar chart columns |
| `8px` | Small chart tooltips/general old public buttons |
| `10px` | Brand symbol fallback and mobile CTA |
| `11px` | Metric chips |
| `12px` | Home header CTA, proof-card mobile, generic nav CTA |
| `13px` | Homepage hero CTA and infographic CTA button |
| `14px` | Emphasis glass, menu button |
| `16px` | Icon tiles, dropdown panels |
| `18px` | Nested ranked retrofit cards, mobile infographic cards |
| `20px` | Homepage navbar |
| `22px` | Infographic cards and final CTA band |
| `24px` | General public panels/page hero |
| `26px` | Dark glass nav fallback |
| `999px` | Pills and circular process numbers |

Do not round every control into capsules. The homepage uses squared premium CTAs (`12px` to `13px`) and rounded cards (`18px` to `22px`) deliberately.

## Shadows

Canonical shadows:

```css
/* Home navbar */
0 12px 30px rgba(6, 38, 25, 0.07),
inset 0 1px 0 rgba(255, 255, 255, 0.46)

/* Mobile navbar */
0 16px 34px rgba(6, 38, 25, 0.1)

/* Header CTA */
0 14px 28px rgba(6, 38, 25, 0.14)

/* Header CTA hover */
0 16px 34px rgba(6, 38, 25, 0.18)

/* Header CTA active */
0 8px 18px rgba(6, 38, 25, 0.14)

/* Hero emphasis glass */
0 14px 32px rgba(6, 38, 25, 0.09),
inset 0 1px 0 rgba(255, 255, 255, 0.54)

/* Infographic card */
0 18px 50px rgba(8, 38, 25, 0.075),
inset 0 1px 0 rgba(255, 255, 255, 0.82)

/* Infographic card hover */
0 24px 58px rgba(8, 38, 25, 0.1),
inset 0 1px 0 rgba(255, 255, 255, 0.9)

/* Dark CTA band */
0 24px 60px rgba(6, 38, 25, 0.18)
```

Shadows are soft, green-black, and low opacity. Avoid generic black card shadows.

## Glass Effects

Homepage glass is restrained and light:

```css
backdrop-filter: blur(14px) saturate(125%);
background: rgba(240, 248, 243, 0.46);
border: 1px solid rgba(6, 38, 25, 0.09);
```

Mobile glass increases slightly:

```css
backdrop-filter: blur(18px) saturate(140%);
background: rgba(237, 248, 242, 0.58);
```

Emphasis glass:

```css
backdrop-filter: blur(12px) saturate(120%);
background: rgba(241, 249, 243, 0.66);
border: 1px solid rgba(6, 38, 25, 0.13);
```

Do not use dark liquid-glass nav styling on the home page. That remains the non-home public nav fallback.

## Button Styles

Homepage primary CTA:

```css
background: #062619;
border: 1px solid #062619;
border-radius: 13px;
box-shadow: 0 14px 28px rgba(6, 38, 25, 0.14);
color: #ffffff;
font-size: 17px;
height: 62px;
min-width: 210px;
transition:
  background-color 180ms ease,
  border-color 180ms ease,
  box-shadow 180ms ease,
  transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
```

Homepage primary hover:

```css
background: #0b3a27;
border-color: #0b3a27;
box-shadow: 0 16px 34px rgba(6, 38, 25, 0.18);
transform: translateY(-2px);
```

Homepage primary active:

```css
box-shadow: 0 8px 18px rgba(6, 38, 25, 0.14);
transform: scale(0.97);
```

Home nav CTA:

- Same dark pine color family.
- `height: 52px`, `min-width: 174px`, `border-radius: 12px`.
- Hover moves `translateY(-1px)`, active scales `0.97`.

Mobile nav CTA:

- `height: 40px`, `min-width: 112px`, `font-size: 13px`, `border-radius: 10px`.

Infographic inverted CTA:

```css
background: #f3f8f1;
border: 1px solid rgba(255, 255, 255, 0.7);
border-radius: 13px;
color: #062619;
height: 58px;
min-width: 210px;
```

CTA icon motion:

```css
transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1);
transform on hover: translate3d(2px, -2px, 0);
```

Focus ring:

```css
outline: 3px solid rgba(8, 118, 63, 0.34);
outline-offset: 4px;
```

## Cards And Data Visualization

Infographic card rules:

- White-to-near-white background with subtle green radial highlight.
- Border `1px solid rgba(8, 38, 25, 0.1)`.
- Radius `22px`, mobile `18px`.
- Top accent rule: `3px` height, horizontal green fade from `rgba(11, 108, 60, 0.38)` to transparent.
- Hover only on fine pointers; lift is visual through border/shadow, not large translation.

Nested ranked cards:

- Background `rgba(255, 255, 255, 0.76)`.
- Border `1px solid rgba(8, 38, 25, 0.12)`.
- Radius `18px`.
- Grid: icon plus body on desktop, single column on mobile.

Charts:

- Bars use the canonical vertical green gradient.
- First three bars intentionally reduce opacity: `0.42`, `0.58`, `0.76`.
- Bar hover: `filter: saturate(1.08) brightness(1.03)` and `transform: scaleY(1.025)`.
- Tooltip uses dark pine `#062619`, radius `8px`, white text.
- Line chart stroke and points use `#08763f`; grid uses `rgba(7, 16, 29, 0.12)`.

## Motion

Motion is precise, scroll-responsive, and reduced-motion aware.

Canonical curves and durations:

- Header show/hide: opacity `220ms ease`, transform `260ms cubic-bezier(0.22, 1, 0.36, 1)`.
- CTA state changes: background/border/shadow `180ms ease`, transform `160ms cubic-bezier(0.23, 1, 0.32, 1)`.
- Arrow icon: `180ms cubic-bezier(0.23, 1, 0.32, 1)`.
- Card hover: border `200ms ease`, shadow `220ms ease`, transform `220ms cubic-bezier(0.23, 1, 0.32, 1)`.
- Nested card hover: `180ms ease` and transform `180ms cubic-bezier(0.23, 1, 0.32, 1)`.
- Chart tooltip: opacity `160ms ease`, transform `180ms cubic-bezier(0.23, 1, 0.32, 1)`.
- Scroll scanner copy transition:
  - Primary copy fades/blurs/translates out from scroll progress `0.24` to `0.42`.
  - Next copy fades/blurs/translates in from `0.4` to `0.58`.
  - Blur maximum is `2px`.
  - Primary translate out is `-20px`; next translate in starts at `18px`.

View-timeline card entry:

```css
animation: home-infographic-rise both;
animation-range: entry 6% cover 28%;
animation-timeline: view();
```

Keyframe:

```css
from { opacity: 0; transform: translate3d(0, 24px, 0); }
to { opacity: 1; transform: translate3d(0, 0, 0); }
```

Reduced motion:

- Scanner height collapses to `100svh`.
- Scanner progress/cue hidden.
- Primary scanner message remains visible.
- Next scanner message is hidden.
- Infographic, ranked cards, chart bars, chart tooltip, and CTA arrow transitions/animations are disabled.

Any new motion must include a reduced-motion path.

## Responsive Rules

Breakpoints are part of the design system:

- `1180px`: scanner copy shifts to `5vw` and narrows.
- `1120px`: infographic stages collapse to one column.
- `860px`: nav glass becomes denser.
- `768px`: scanner height/copy/typography shift to mobile; scanner gradient becomes top-first.
- `760px`: infographic section becomes mobile layout.
- `520px`: home brand and mobile CTA compact.

Do not add nearby duplicate breakpoints without a clear reason.

## Immutable Rules For Future Work

- The homepage is canonical. New public UI should inherit from it, not compete with it.
- Keep the homepage bright, airy, pale green/sky, and editorial.
- Keep the dark pine CTA style for homepage actions.
- Keep display typography serif and delicate on the homepage.
- Keep Inter for supporting UI and dense data.
- Keep cards white, softly bordered, softly shadowed, and data-dense.
- Keep glass light on the homepage.
- Keep gradients subtle and source-derived.
- Keep hover/press motion small and tactile.
- Keep scroll motion smooth, frame-based where already implemented, and reduced-motion safe.
- Do not introduce unrelated purple, blue-slate, beige, orange/brown, or heavy dark SaaS palettes into homepage-adjacent UI.
- Do not replace the homepage system with generic utility classes unless they resolve to these same values.
