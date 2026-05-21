import { useSearch } from "@/features/search/hooks/useSearch";
import { useSelection } from "@/features/search/hooks/useSelection";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import styles from "./ActionBar.module.css";

export function ActionBar() {
  const { results } = useSearch();
  const {
    selectedIds,
    selectAll,
    deselectAll,
    duplicateSelected,
    deleteSelected,
  } = useSelection();

  const allSelected =
    results.length > 0 && selectedIds.length === results.length;
  const hasSelection = selectedIds.length > 0;
  const CheckboxState = allSelected
    ? "checked"
    : hasSelection
      ? "indeterminate"
      : "unchecked";

  return (
    <div className={styles.actionBar}>
      <label className={styles.selectAll}>
        <Checkbox
          checked={CheckboxState}
          onChange={allSelected ? deselectAll : selectAll}
          aria-label="Select all"
        />
        {hasSelection ? `${selectedIds.length} selected` : "Select all"}
      </label>
      <div className={styles.actions}>
        <Button
          variant="ghost"
          icon="icon-duplicate"
          onClick={duplicateSelected}
          disabled={!hasSelection}
        >
          Duplicate
        </Button>
        <Button
          variant="outline"
          icon="icon-delete"
          onClick={deleteSelected}
          disabled={!hasSelection}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
