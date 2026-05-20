export type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

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
  results: GitHubUser[];
  error: string | null;
};

export type Action =
  | { type: "SET_QUERY"; payload: string }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: GitHubUser[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "FETCH_RATE_LIMITED" };
