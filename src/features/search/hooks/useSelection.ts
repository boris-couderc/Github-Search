import { useSearchContext } from "@/features/search/context";

export function useSelection() {
  const { state, dispatch } = useSearchContext();

  return {
    selectedIds: state.selectedIds,
    toggleSelect: (id: number) =>
      dispatch({ type: "TOGGLE_SELECT", payload: id }),
    selectAll: () => dispatch({ type: "SELECT_ALL" }),
    deselectAll: () => dispatch({ type: "DESELECT_ALL" }),
    duplicateSelected: () => dispatch({ type: "DUPLICATE_SELECTED" }),
    deleteSelected: () => dispatch({ type: "DELETE_SELECTED" }),
  };
}
