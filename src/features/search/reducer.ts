import type { Action, SearchState } from "./types";

let _keyCounter = 0;
const nextKey = () => _keyCounter++;

export const initialState: SearchState = {
  query: "",
  status: "idle",
  results: [],
  error: null,
  editMode: false,
  selectedIds: [],
  originalResults: null,
};

export function reducer(
  state: SearchState = initialState,
  action: Action,
): SearchState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...initialState, query: action.payload.trim() };
    case "FETCH_START":
      return { ...state, status: "loading" };
    case "FETCH_SUCCESS": {
      const items = action.payload.map((u) => ({ ...u, _key: nextKey() }));
      return {
        ...state,
        status: items.length > 0 ? "success" : "empty",
        results: items,
        error: null,
      };
    }
    case "FETCH_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "FETCH_RATE_LIMITED":
      return { ...state, status: "rate-limited" };
    case "TOGGLE_EDIT_MODE":
      if (!state.editMode) {
        return {
          ...state,
          editMode: true,
          originalResults: state.results,
          selectedIds: [],
        };
      }
      return {
        ...state,
        editMode: false,
        results: state.originalResults ?? state.results,
        originalResults: null,
        selectedIds: [],
      };
    case "TOGGLE_SELECT":
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter((id) => id !== action.payload)
          : [...state.selectedIds, action.payload],
      };
    case "SELECT_ALL":
      return { ...state, selectedIds: state.results.map((u) => u._key) };
    case "DESELECT_ALL":
      return { ...state, selectedIds: [] };
    case "DUPLICATE_SELECTED": {
      const toAdd = state.results
        .filter((u) => state.selectedIds.includes(u._key))
        .map((u) => ({ ...u, _key: nextKey() }));
      return {
        ...state,
        results: [...state.results, ...toAdd],
        selectedIds: [],
      };
    }
    case "DELETE_SELECTED":
      return {
        ...state,
        results: state.results.filter(
          (u) => !state.selectedIds.includes(u._key),
        ),
        selectedIds: [],
      };
  }
}
