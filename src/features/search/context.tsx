import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import type { Action, SearchState } from "./types";

type SearchContextValue = {
  state: SearchState;
  dispatch: React.Dispatch<Action>;
};

const SearchContext = createContext<SearchContextValue | null>(null);

type Props = { children: React.ReactNode };

export function SearchProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearchContext(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx)
    throw new Error("useSearchContext must be used inside SearchProvider");
  return ctx;
}
