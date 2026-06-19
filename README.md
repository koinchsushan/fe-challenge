# Biglight Frontend Developer Challenge

Multi-brand UI component library built with **Preact + Tailwind CSS + Storybook**,
driven by a design token pipeline on **Style Dictionary v5**. Implements five
components — Button, Input, Dropdown, Card, and Login Drawer — each supporting
two distinct brand themes from a single, unmodified token source file.

**Live Storybook:** [deployed on Netlify](https://biglightfrontendchallenge.netlify.app/) — use the paintbrush icon in the
toolbar to switch between Brand A and Brand B.

See [`APPROACH.md`](./APPROACH.md) for the design token strategy, theme
switching mechanism, and component decisions in detail.

---

## Quick start

```bash
npm install
npm run storybook
```

Storybook opens at **http://localhost:6006**.

---

## Available scripts

| Script | What it does |
|---|---|
| `npm run storybook` | Starts Storybook on port 6006. Rebuilds tokens first. |
| `npm run tokens` | Regenerates `tokens/output/*.css` from `figma-tokens.json` |
| `npm run build-storybook` | Builds a static Storybook for deployment |
| `npm run dev` | Starts the Vite dev server (the app shell, not Storybook) |
| `npm run build` | Production build of the Vite app. Rebuilds tokens first. |

`npm run tokens` runs automatically before `storybook` and `build` via npm's
`pre*` lifecycle hooks, so the generated CSS is always in sync with the
token source.

---

## Token pipeline

```bash
npm run tokens
```

The `figma-tokens.json` file is used **as-is and is never modified**. The
build script (`tokens/build.mjs`) uses **Style Dictionary v5** to:

1. Merge the relevant token sets per brand (`Primitives → Alias → Mapped →
   Responsive/Desktop`) so cross-layer `{references}` resolve natively
2. Filter to the ~50 tokens the five components actually use
3. Transform names to clean CSS custom properties and add `px` units
4. Output one `[data-theme]`-scoped CSS file per brand

```
tokens/figma-tokens.json
        │
        ▼  node tokens/build.mjs  (Style Dictionary v5)
        │
tokens/output/brand-a.css   [data-theme="brand-a"] { --surface-action-primary: #1fceb5; ... }
tokens/output/brand-b.css   [data-theme="brand-b"] { --surface-action-primary: #901438; ... }
```

Full pipeline details, including the custom transforms registered with Style
Dictionary, are documented in [`APPROACH.md`](./APPROACH.md).

---

## Theme switching

**In Storybook:** use the **Theme** toolbar (paintbrush icon) to toggle
between Brand A and Brand B — all components update simultaneously.

**In code:** set `data-theme="brand-a"` or `data-theme="brand-b"` on any
ancestor element. All token CSS variables are scoped to these selectors, so
no component re-renders or JS class logic is needed.

```jsx
<div data-theme="brand-b">
  <Button variant="primary">Brand B button</Button>
</div>
```

---

## Components

| Component | Variants / Sizes | Notes |
|---|---|---|
| **Button** | Primary, Secondary, Tertiary × md, sm | Default, hover, disabled states |
| **Input** | — | Floating label; default, focus, filled, disabled, error, success states |
| **Dropdown** | — | Same field shell as Input; list floats over content, full keyboard nav |
| **Card** | lg, sm | Composes Button internally |
| **Login Drawer** | desktop (480×949), mobile (375×812) | Composes Dropdown, Input, Button, and Card |

Each component has a `*.stories.jsx` file in Storybook. Button, Input,
Dropdown, and Card include an **"All States"** or **"All Variants"** story that
mirrors the original Figma layout for easy visual comparison. Login Drawer
uses separate interactive and open-state stories for desktop and mobile.

### Notes

- Dropdown supports keyboard interaction for opening, closing, and basic
  arrow-key movement, but it is not a fully polished combobox implementation.
- The login drawer uses fixed desktop and mobile dimensions to match the
  challenge specs rather than a fully fluid responsive layout.

---

## Project structure

```
tokens/
  figma-tokens.json      ← source of truth, unmodified
  build.mjs               ← Style Dictionary v5 build script
  output/
    brand-a.css           ← generated, do not edit
    brand-b.css           ← generated, do not edit
    tokens.css             ← combined import

src/
  styles/global.css        ← Tailwind directives, font imports, token imports
  components/
    Button/
      Button.jsx
      Button.stories.jsx
      index.js
    Input/
    Dropdown/
    Card/
    LoginDrawer/

.storybook/
  main.js                  ← Storybook config
  preview.jsx               ← Theme decorator + toolbar

APPROACH.md                 ← token strategy & component decisions
README.md                    ← this file
```

---

## A note on design fidelity

Components were built using the provided `figma-tokens.json` as the primary
reference, with the Figma file used for structural and layout guidance.
Working within Figma's free tier meant some fine-grained values (precise
spacing, exact measurements) weren't directly inspectable — these were
derived from the token scale (`Responsive/Desktop`) where possible, or
interpreted visually otherwise. See [`APPROACH.md`](./APPROACH.md) for more
on how the token-first architecture makes closing any remaining visual gaps
a token update rather than a component rewrite.

---

## Approximate time spent

- Token pipeline design & Style Dictionary build: ~1.5h
- Component implementation (5 components): ~3h
- Storybook stories, accessibility, and polish: ~1h
- Documentation: ~0.5h

---

## AI usage

Claude (Anthropic) was used selectively, mainly as an analysis and
scaffolding aid rather than as the primary author of the implementation:

- **Token analysis** — parsing the `figma-tokens.json` structure, identifying
  the 3-layer architecture (Primitives → Alias → Mapped), and mapping which
  tokens each component variant/state needed before any code was written
- **Project scaffolding** — initial Vite + Preact + Tailwind + Storybook +
  Style Dictionary setup, so time could go into component work rather than
  boilerplate
- **Coding assistant** — used iteratively while implementing components, for
  first-draft markup/logic that was then reviewed, tested in Storybook against
  the Figma reference, and corrected by hand (e.g. disabled-state border
  logic, icon sizing per button size, dropdown list positioning)
- **Documentation drafting** — first drafts of this README and `APPROACH.md`,
  edited to match the actual implementation
