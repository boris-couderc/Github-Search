import { useSearch } from "@/features/search/hooks/useSearch";
import { Button } from "@/components/Button/Button";
import styles from "./Header.module.css";

export function Header() {
  const { status, editMode, toggleEditMode } = useSearch();

  return (
    <header className={styles.header}>
      <span className={styles.title}>Github Search</span>
      {status === "success" && (
        <div className={styles.actions}>
          <Button
            variant="primary"
            icon={editMode ? "icon-clear" : "icon-create"}
            onClick={toggleEditMode}
          >
            Edit mode
          </Button>
        </div>
      )}
    </header>
  );
}
