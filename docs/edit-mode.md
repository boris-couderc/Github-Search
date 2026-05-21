# Edit Mode

This document covers the files added in the edit-mode change: selection state, ActionBar, Checkbox, and the toggle in Header.

## New files

```
src/
  components/
    Checkbox/
      Checkbox.tsx             ← custom checkbox using the icon system (3 states)
      Checkbox.module.css
  features/
    search/
      hooks/
        useSelection.ts        ← public hook for selection actions
      components/
        ActionBar/
          ActionBar.tsx        ← select-all, duplicate, delete
          ActionBar.module.css
          ActionBar.test.tsx
```

## Modified files

```
types.ts       ← SearchState: editMode, selectedIds, originalResults, ResultItem
reducer.ts     ← TOGGLE_EDIT_MODE, TOGGLE_SELECT, SELECT_ALL, DESELECT_ALL,
                  DUPLICATE_SELECTED, DELETE_SELECTED
useSearch.ts   ← exposes editMode, toggleEditMode
SearchBar.tsx  ← mounts ActionBar when editMode is on (sticky zone)
Header.tsx     ← toggle button with icon-create / icon-clear
UserList.tsx   ← passes editMode, selected, onToggle to each UserCard
UserCard.tsx   ← renders Checkbox in absolute position when editMode is on
```

## Key decisions

**`originalResults` snapshot for reversible edit mode**

When entering edit mode, `TOGGLE_EDIT_MODE` saves a snapshot of `results` in `originalResults`. When exiting, it restores it. This means all edits (duplications, deletions) are cancelled on exit without tracking individual operations. There is no `deletedIds` — the entire list is restored from the snapshot.

**`ResultItem._key` to identify instances, not users**

After implementing duplicate, `DELETE_SELECTED` was filtering by `user.id`, which deleted both the original and the copy since they share the same GitHub id. Fix: each item in `results` is wrapped as `ResultItem = GitHubUser & { _key: number }`, where `_key` is assigned by a module-level counter at fetch time and on each duplication. `selectedIds` tracks `_key` values, not GitHub IDs.

**Selection cleared after duplicate**

After `DUPLICATE_SELECTED`, `selectedIds` is reset to `[]`. The copies appear at the bottom of the list without being pre-selected, so the user can see what was added and make a new selection. It also prevents accidental repeated duplications: clicking duplicate twice in a row no longer has any effect after the first click.

**`Checkbox` component with 3 states**

The select-all checkbox in `ActionBar` needs three states: `unchecked`, `checked`, and `indeterminate` (partial selection). A custom `Checkbox` component maps these to `icon-check-box-unchecked`, `icon-check-box-checked`, and `icon-check-box-indeterminate`. The native `<input type="checkbox">` is kept hidden for accessibility; `indeterminate` is set via a `ref`. The same component is used on `UserCard` (only `unchecked` / `checked`).

**`ActionBar` lives in `SearchBar`, not `SearchView`**

`SearchBar` is the sticky zone at the top of the page. Placing `ActionBar` there keeps the action buttons visible while scrolling through a long list.
