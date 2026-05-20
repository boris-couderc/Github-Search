# Data Layer

This document covers the files added in the data-layer change: types, reducer, API, context, hooks, and the first orchestrator component.

## With external libraries

On a project without the no-external-library constraint, I would have used:

- **Zustand** instead of `useReducer` + context: less boilerplate, no provider required.
- **React Query** (`useQuery`) instead of `useGithubSearch`: handles debounce, caching, loading/error states, and retries automatically. `api.ts` would remain unchanged as the fetcher.

The architecture (types, reducer logic, status model) would stay the same, only the plumbing would change.

## New files

```
src/
  features/
    search/
      types.ts               ← shared types for the whole feature
      reducer.ts             ← pure state machine
      api.ts                 ← GitHub API call
      context.tsx            ← SearchProvider + private useSearchContext
      hooks/
        useSearch.ts         ← public read/write gateway for components
        useGithubSearch.ts   ← side-effect only: debounce + fetch + dispatch
      components/
        SearchView/
          SearchView.tsx     ← orchestrator, mounts useGithubSearch
```

## Key decisions

**`types.ts` is the single source of truth**

All types used across the feature (`GitHubUser`, `Status`, `SearchState`, `Action`) live in one file. No type is defined inside a component or hook.

**Reducer with no side effects**

`reducer.ts` is a pure function. It can be tested without React, without mocking, and without a provider. All business logic lives here.

**`empty` is a distinct status**

`Status` is `'idle' | 'loading' | 'success' | 'error' | 'rate-limited' | 'empty'`. A fetch returning zero items transitions to `empty`, not `success`. Components never need to check `results.length`.

**`SET_QUERY` resets all state**

When the query changes, results and error are cleared immediately. No stale data is visible while a new request is in flight.

**Private context, public hooks**

`useSearchContext` is not exported outside `context.tsx`. Components access state only through `useSearch`. This decouples components from the context shape.

**`useGithubSearch` returns nothing**

It watches `query`, debounces 500ms, manages a single `AbortController`, and dispatches. Having no return value prevents callers from depending on its internals. It is mounted once in `SearchView`.


