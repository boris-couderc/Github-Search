import { SearchInput } from "@/features/search/components/SearchInput/SearchInput";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <SearchInput value="" onChange={() => {}} loading={true} />
    </div>
  );
}
