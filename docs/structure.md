# Project Structure

I chose a feature-oriented structure to keep all related logic co-located and make the project easy to scale: adding a new feature means adding a new folder, without touching existing ones. In a real world project with a single feature this size, a flat structure would be sufficient.

## Overview

```
src/
  App.tsx
  main.tsx
  index.css
  components/
  icons/
    Icon.tsx
    icons.svg
  styles/
    _base.css
    _variables.css
    _breakpoints.css
  features/
    search/
      api.ts
      types.ts
      reducer.ts
      context.tsx
      hooks/
      components/
  test/
    setup.ts
```

## Key decisions

**Folder-per-component**

Each component has its own folder containing the `.tsx` and `.module.css`. Keeps styles scoped and co-located with their component.

## Possible future evolutions

```
features/
  search/       ← current
  auth/         ← login, session, token management
  profile/      ← user profile page, settings
  favorites/    ← save and manage favorite users
  history/      ← recent searches, persistence
```
