# Approach

## Overview

This project implements a multi-brand UI component library using **Preact + Tailwind CSS + Storybook**, 
driven by a design token pipeline built on **Style Dictionary v5**. The five components — Button, 
Input, Dropdown, Card, and Login Drawer — support two distinct brand themes (Brand A and Brand B) 
with no brand-specific branching in component styling. Most visual differences between brands are 
handled at the token layer, with a few decorative SVG details and required-marker accents still using 
literal colors.

**Live Storybook:** [deployed on Netlify](https://biglightfrontendchallenge.netlify.app/) — both themes are switchable via the paintbrush toolbar.

### A note on design fidelity

The components were built using the provided `figma-tokens.json` as the primary design reference,
with the Figma file used for structural and layout guidance. Working within Figma's free tier 
means some fine-grained details — precise spacing values, exact typographic scales, and specific 
component measurements — weren't directly inspectable. Rather than guessing at values not 
available in the token file, all spacing and sizing decisions were derived directly from the 
token scale (`Responsive/Desktop`) where possible, and from careful visual interpretation of 
the design otherwise.

This constraint reinforced a valuable principle: **the token file is the contract, not the 
visual mock**. Every colour, radius, and font in the components traces back to a named token 
from the JSON — which means that when Figma Pro access is available and precise values are 
confirmed, updating the components is a one-command token rebuild rather than a manual sweep 
through component code. The architecture is deliberately built for that kind of iterative 
refinement.

---

## Design-to-code workflow

```
Figma design system
       │
       │  Token plugin exports JSON
       ▼
tokens/figma-tokens.json        ← source of truth, used as-is (unmodified)
       │
       │  node tokens/build.mjs
       ▼
Style Dictionary v5
  ① Merges Primitives + Alias/Brand + Mapped/Brand per brand
  ② Resolves all {cross-layer references} natively
  ③ Filters to the ~50 tokens components actually need
  ④ Transforms: kebab-case names, px units on numbers, hex colours
  ⑤ Formats: [data-theme] scoped CSS custom properties
       │
       ▼
tokens/output/brand-a.css       [data-theme="brand-a"] { --surface-action-primary: #1fceb5; ... }
tokens/output/brand-b.css       [data-theme="brand-b"] { --surface-action-primary: #901438; ... }
       │
       │  Imported in src/styles/global.css
       ▼
Tailwind CSS
  Maps CSS variables to utility classes
  e.g. bg-btn-primary → var(--surface-action-primary)
       │
       ▼
Components
  Use Tailwind utility classes for styling and token-driven values for brand-specific UI
```

If a designer changes the primary colour for Brand A:
1. They update `Colour.Brand.BrandA.Green.Default` in Figma
2. Re-export `figma-tokens.json` (replacing the existing file)
3. Run `npm run tokens` — one command
4. `--surface-action-primary` and every token that references it through the 3-layer 
   chain updates automatically. No component code changes required.

---

## Token management structure

The `figma-tokens.json` file has a strict 3-layer architecture:

```
Primitives/Default          ← raw values: hex colours, px numbers, font names
                              e.g. Colour.Brand.BrandA.Green.Default = #1fceb5

Alias colours/BrandA+B      ← semantic aliases that reference Primitives
                              e.g. Tertiary.Default = {Colour.Brand.BrandA.Green.Default}

Mapped/BrandA+B             ← component-intent tokens that reference Aliases
                              e.g. Surface.Colour.Action.Primary = {Tertiary.Default}
```

Components only ever reference the **Mapped layer**. This means:
- A colour change at Primitive propagates up through Alias to Mapped automatically
- Components never need to know which primitive value they're using
- Adding a Brand C requires only a new token set in the JSON — no component changes

### What Style Dictionary does

The key challenge is that `figma-tokens.json` splits tokens across named sets 
(`Primitives/Default`, `Alias colours/BrandA`, `Mapped/BrandA`, etc.) but 
Style Dictionary v5 expects a single token tree. The build script solves this 
by deep-merging the relevant sets per brand before passing them to Style Dictionary:

```js
// For Brand A, merge in order:
Primitives/Default        ← raw values available for reference resolution
Alias colours/BrandA      ← semantic layer resolves against Primitives
Mapped/BrandA             ← component layer resolves against Alias
Responsive/Desktop        ← typography and spacing (shared across brands)
```

Once merged, Style Dictionary resolves all `{Reference.Path}` chains natively 
across the full depth of the 3-layer architecture — no manual resolver needed.

### Token filter

Of the 200+ tokens in the JSON, only ~50 are needed by the five components. 
A `COMPONENT_TOKENS` whitelist in `build.mjs` is passed to Style Dictionary as 
a custom filter, so only relevant tokens appear in the output. This keeps the 
generated CSS lean and the mapping intentional and auditable.

### Custom transforms registered with Style Dictionary

| Transform | Type | What it does |
|---|---|---|
| `name/component-kebab` | name | Converts `['Surface','Colour','Action','Primary']` → `surface-action-primary`, stripping noisy grouping words like `Colour` and `Width` |
| `value/px-if-number` | value | Adds `px` unit to any token with `type: 'number'` (spacing, radius, border width) |
| `css/themed` | format | Outputs CSS scoped to `[data-theme="brand-x"]` instead of Style Dictionary's default `:root` |

---

## Theme switching mechanism

Both brand CSS files are loaded simultaneously. Theme switching is a single 
`data-theme` attribute change on any ancestor element — no JavaScript class 
toggling, no re-renders, no CSS-in-JS runtime cost:

```html
<!-- Brand A -->
<div data-theme="brand-a">
  <Button variant="primary">Join</Button>   ← teal, rounded, black text
</div>

<!-- Brand B -->
<div data-theme="brand-b">
  <Button variant="primary">Join</Button>   ← cherry red, square, white text
</div>
```

In Storybook, the theme toolbar (paintbrush icon) sets `data-theme` on the story 
wrapper, so all components update simultaneously with one click.

### Key brand differences surfaced by tokens

| Token | Brand A | Brand B |
|---|---|---|
| `--surface-action-primary` | `#1fceb5` (teal) | `#901438` (cherry) |
| `--surface-action-secondary` | `#000000` (black) | `#570d1c` (burgundy) |
| `--text-action-on-primary` | `#000000` (black) | `#ffffff` (white) |
| `--border-radius-md` | `8px` | `0px` |
| `--border-radius-round` | `120px` | `120px` |
| `--font-family-body` | Inter | Open Sans |
| `--font-family-heading` | Inter | mencken-std-head-narrow |

The `--text-action-on-primary` flip (black → white) is the most critical 
difference — it means text colour on the primary button cannot be hardcoded 
in the component and must always come from the token.

---

## Component decisions

### Button
Three variants (Primary, Secondary, Tertiary) × two sizes (md, sm) × three 
states (default, hover, disabled). Styling is token-driven through Tailwind 
utility classes. Disabled border logic is per-variant: Primary and Secondary 
have no border when disabled; Tertiary retains a faded border because it is an 
outline button — removing the border would make it invisible.

### Input
Floating label pattern: the label sits vertically centred in the field by 
default and transitions to sit on the top border when focused or filled. A small 
background chip behind the floated label visually cuts the border line. State 
is derived automatically from focus/value when no `state` prop is passed, so 
the component works as both controlled and uncontrolled.

### Dropdown
Same field shell and floating label as Input for visual consistency. The options 
list is positioned `absolute` with `z-50` so it floats over content below the 
trigger rather than pushing it down. Keyboard support is present for 
`Enter`/`Space`, `Escape`, and basic arrow-key navigation between options, but it 
is not a fully polished combobox implementation.

### Card
Composes Button internally. Two sizes (lg, sm) mapping to the desktop and mobile 
use cases in the Login Drawer. The card background (`--surface-brand-primary`) 
is the brand's primary colour — orange for Brand A, cherry for Brand B.

### Login Drawer
Composes all four other components. Two explicit size variants driven by a 
`SIZE_CONFIG` object:

| | Desktop | Mobile |
|---|---|---|
| Panel | 480×949px | 375×812px |
| Heading | `text-h4` (~40px) | `text-h6` (~24px) |
| Buttons | `size="md"` | `size="md"` |
| Card | `size="lg"` | `size="sm"` |

All size-driven differences are declared in one place (`SIZE_CONFIG`) — nothing 
scattered through JSX. Accessibility: focus trap, `Escape` to close, and 
`aria-modal`. The implementation does not currently lock page scroll while the 
drawer is open.

---

## Trade-offs and limitations

**What works well:**
- Zero brand conditionals in component code — brands are purely a CSS concern
- Style Dictionary's native reference resolution eliminates any manual token 
  mapping — the 3-layer chain resolves automatically once the sets are merged
- The `COMPONENT_TOKENS` whitelist makes the token-to-component relationship 
  explicit and auditable in one place
- Adding a Brand C requires only a new token set in the JSON and one new entry 
  in the `buildBrand()` call — no component changes

**Limitations:**
- A few decorative SVGs and required-marker asterisks still use literal colors,
  so the implementation is not 100% token-only.
- The login drawer and field shells use fixed pixel sizes for layout fidelity,
  so the layout is not fully fluid/responsive.
- The `Responsive/Mobile` token set is not used — only `Responsive/Desktop` 
  values apply. The Login Drawer's mobile size is driven by a `size` prop rather 
  than CSS media queries, which is correct for a component library but would need 
  a responsive wrapper in a real application.
- `mencken-std-head-narrow` (Brand B heading font) is a commercial typeface not 
  available on Google Fonts. It falls back to `sans-serif` in this implementation.
- The `COMPONENT_TOKENS` whitelist in `build.mjs` is manually maintained. A 
  more robust approach would scan component source files for CSS variable 
  references and auto-generate the whitelist, ensuring it stays in sync as 
  components evolve.
- Hover states use Tailwind's `hover:` prefix applied directly on the button 
  element, which means hover styles are compiled at build time. In a production 
  token system, hover colour tokens would ideally come from the token JSON too 
  (e.g. `Surface.Action.Hover-Primary`) — which they do here, but only because 
  we manually mapped them into Tailwind's config.

---

## What I'd do with more time

- **Figma Pro inspection** — with direct access to spacing, padding, and 
  typographic values for every component state, the remaining visual gaps could 
  be closed as token updates rather than code changes, which is exactly the 
  workflow this architecture is designed for
- **Visual regression testing** with Chromatic — capture snapshots of both themes 
  for all component states and run them on every PR
- **`tokens:watch` script** that rebuilds on `figma-tokens.json` changes, useful 
  during active design/dev collaboration
- **Responsive token layer** — use `Responsive/Mobile` tokens with `@media` 
  breakpoints instead of the `size` prop approach for the drawer
- **Component composition tests** — verify that Card inside LoginDrawer 
  correctly inherits the active theme's tokens end-to-end
