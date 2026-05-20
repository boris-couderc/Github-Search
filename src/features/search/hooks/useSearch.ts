import { useSearchContext } from "@/features/search/context";

export function useSearch() {
  const { state, dispatch } = useSearchContext();

  return {
    query: state.query,
    status: state.status,
    results: state.results,
    setQuery: (query: string) =>
      dispatch({ type: "SET_QUERY", payload: query }),
  };
}
