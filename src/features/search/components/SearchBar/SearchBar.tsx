import { useSearch } from "@/features/search/hooks/useSearch";
import { SearchInput } from "@/features/search/components/SearchInput/SearchInput";
import { ActionBar } from "@/features/search/components/ActionBar/ActionBar";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  const { query, setQuery, status, editMode } = useSearch();
  return (
    <div className={styles.searchBar}>
      <SearchInput
        value={query}
        onChange={setQuery}
        loading={status === "loading"}
      />
      {editMode && <ActionBar />}
    </div>
  );
}
