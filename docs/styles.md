# Styles

This project uses a minimal styling foundation based on: CSS Modules for component-scoped styles, CSS custom properties for design tokens, typography scale, responsive breakpoints, and the SVG icon system.

## Tooling: LightningCSS

LightningCSS replaces PostCSS as the CSS processor (built into Vite). Faster, zero config, and supports `@custom-media` via the `drafts.customMedia` flag. No plugin ecosystem needed for this project.

## Global styles (`src/styles/`)

Four files imported in order in `index.css`:

| File | Role |
|---|---|
| `_fonts.css` | `@font-face` for Roboto variable font (woff2, `font-weight: 100 900`) |
| `_variables.css` | All CSS custom properties (colors, spacing, typography, radius) |
| `_breakpoints.css` | `@custom-media` breakpoints system |
| `_base.css` | Reset and base element styles |

Nothing else belongs here. Typography scales and component styles live in their own CSS Modules.

## Design tokens (`_variables.css`)

All values are defined once as CSS custom properties on `:root` and consumed everywhere via `var(--*)`.

**Colors**: a minimal semantic palette: `--color-primary`, `--color-text`, `--color-text-muted`, `--color-bg`, `--color-bg-subtle`, `--color-border`.

**Button states**: explicit variables per state and variant (`--btn-primary-bg`, `--btn-primary-bg-hover`, `--btn-primary-bg-active` ...) instead of opacity hacks. Each state is intentional and readable.

**Spacing**: 4px scale (`--space-1` = 4px ... `--space-16` = 64px). Skips odd values that never appear in practice.

**Border radius**: three steps: `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (12px).

**Typography**: `--font-sans` with Roboto as first choice, `system-ui` as fallback. Three weights: medium (500), semibold (600), extrabold (800).

## Breakpoints (`_breakpoints.css`)

Mobile-first `@custom-media` queries. Usage in CSS Modules:

```css
@media (--from-md) {
  .container { grid-template-columns: repeat(2, 1fr); }
}
```

Five breakpoints: `--from-sm` (480px), `--from-md` (768px), `--from-lg` (1024px), `--from-xl` (1280px), `--from-huge` (1600px).

## Component styles: CSS Modules

Each component has a co-located `.module.css` file. Styles are scoped by the build, no class name collisions, no global pollution.

## cx() utility

`src/utils/cx.ts` is a minimal helper for composing CSS Module class names. It filters out falsy values and joins the rest with a space.

```ts
cx(styles.btn, styles[variant], className)
```

A lightweight alternative to `clsx`, with no external dependency. Replaces the common `.filter(Boolean).join(' ')` pattern.

## StyleGuide component

`src/components/StyleGuide/StyleGuide.tsx` is a development-only component that renders all the base design elements: color palette, typography scale, buttons, input, checkbox, icons, and avatar. It serves as a visual reference to validate tokens and components before building features.
