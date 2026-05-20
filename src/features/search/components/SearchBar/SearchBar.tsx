import { useSearch } from "@/features/search/hooks/useSearch";
import { SearchInput } from "@/features/search/components/SearchInput/SearchInput";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  const { query, setQuery, status } = useSearch();
  return (
    <div className={styles.searchBar}>
      <SearchInput
        value={query}
        onChange={setQuery}
        loading={status === "loading"}
      />
    </div>
  );
}
