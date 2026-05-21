# GitHub User Search

A React app to search GitHub users by username, browse results, and manage a list with an edit mode (select, duplicate, delete).

**Live:** [github-search-eight-dusky.vercel.app](https://github-search-eight-dusky.vercel.app)

## Stack

- React 19, TypeScript, Vite
- CSS Modules with LightningCSS (no utility framework)
- Vitest + Testing Library
- No external state or data-fetching libraries

## Getting started

```bash
pnpm install
pnpm dev
```

```bash
pnpm test   # unit tests
pnpm build  # production build
```

## Structure

```
src/
  components/       shared UI (Button, Checkbox, Header, StyleGuide)
  features/search/  all search logic
    api.ts          GitHub API call
    reducer.ts      pure state machine
    context.tsx     SearchProvider
    hooks/          useSearch, useSelection, useGithubSearch
    components/     SearchInput, SearchBar, SearchView, SearchStatus, UserCard, UserList, ActionBar
  icons/            SVG sprite system
  styles/           design tokens, reset, typography
  utils/            shared utilities
  test/             test setup and helpers
docs/               architecture decisions and key implementation notes
```

## Documentation

I use Claude Code as a development assistant to speed up certain phases of development and explore different technical approaches, while remaining responsible for technical decisions and the final code quality. 
The main decisions are documented in [`/docs`](docs/):

- [`structure.md`](docs/structure.md) — project structure overview
- [`styles.md`](docs/styles.md) — design tokens and style conventions
- [`data-layer.md`](docs/data-layer.md) — state management, reducer, hooks
- [`ui-components.md`](docs/ui-components.md) — UserCard, UserList, SearchView
- [`edit-mode.md`](docs/edit-mode.md) — selection, duplicate, delete, key decisions
