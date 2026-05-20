# UI Components

This document covers the files added in the ui-components change: UserCard, UserList, SearchStatus, and the updated SearchView.

## New files

```
src/
  features/
    search/
      components/
        UserCard/
        UserCard.tsx             ← avatar, login, id, "View profile" button
          UserCard.module.css
          UserCard.test.tsx
        UserList/
          UserList.tsx           ← grid of UserCards
          UserList.module.css
          UserList.test.tsx
        SearchStatus/
          SearchStatus.tsx       ← feedback messages (idle, empty, error, rate-limited)
          SearchStatus.module.css
          SearchStatus.test.tsx
        SearchView/
          SearchView.tsx         ← updated: branches on status
          SearchView.module.css  ← new
```

## Key decisions

**`SearchView` owns all status branching**

`SearchView` is the only place that reads `status` and decides what to render. Children receive only what they need — `UserList` gets `results`, `SearchStatus` gets `status`. No child component reads the context directly.

**Loader in `SearchView`, not in `UserList`**

The loader is rendered by `SearchView` when `status === "loading"`. `UserList` is display-only: it receives results and renders them, nothing else.

**`SearchStatus` covers four states with one component**

`idle`, `empty`, `error`, and `rate-limited` share the same structure: a title and a description. A single component with a `status` prop avoids four near-identical components.

