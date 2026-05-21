export type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type ResultItem = GitHubUser & { _key: number };

export type Status =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "rate-limited"
  | "empty";

export type SearchState = {
  query: string;
  status: Status;
  results: ResultItem[];
  error: string | null;
  editMode: boolean;
  selectedIds: number[];
  originalResults: ResultItem[] | null;
};

export type Action =
  | { type: "SET_QUERY"; payload: string }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: GitHubUser[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "FETCH_RATE_LIMITED" }
  | { type: "TOGGLE_EDIT_MODE" }
  | { type: "TOGGLE_SELECT"; payload: number }
  | { type: "SELECT_ALL" }
  | { type: "DESELECT_ALL" }
  | { type: "DUPLICATE_SELECTED" }
  | { type: "DELETE_SELECTED" };
