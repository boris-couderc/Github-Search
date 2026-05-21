import { useSearchContext } from "@/features/search/context";

export function useSearch() {
  const { state, dispatch } = useSearchContext();

  return {
    query: state.query,
    status: state.status,
    results: state.results,
    editMode: state.editMode,
    setQuery: (query: string) =>
      dispatch({ type: "SET_QUERY", payload: query }),
    toggleEditMode: () => dispatch({ type: "TOGGLE_EDIT_MODE" }),
  };
}
