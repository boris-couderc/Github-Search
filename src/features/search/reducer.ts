import type { Action, SearchState } from "./types";

export const initialState: SearchState = {
  query: "",
  status: "idle",
  results: [],
  error: null,
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
    case "FETCH_SUCCESS":
      return {
        ...state,
        status: action.payload.length > 0 ? "success" : "empty",
        results: action.payload.length > 0 ? action.payload : [],
        error: null,
      };
    case "FETCH_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "FETCH_RATE_LIMITED":
      return { ...state, status: "rate-limited" };
  }
}
