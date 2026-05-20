import { useGithubSearch } from "@/features/search/hooks/useGithubSearch";
import { useSearch } from "@/features/search/hooks/useSearch";
import { UserList } from "@/features/search/components/UserList/UserList";
import { SearchStatus } from "@/features/search/components/SearchStatus/SearchStatus";
import { Icon } from "@/icons/Icon";
import styles from "./SearchView.module.css";

export function SearchView() {
  useGithubSearch();
  const { status, results, query } = useSearch();

  if (status === "loading" || (status === "idle" && query !== "")) {
    return (
      <div className={styles.searchView}>
        <div className={styles.loader}>
          <Icon
            name="icon-loader"
            className={styles.loaderIcon}
            role="status"
            aria-label="Loading"
            aria-hidden={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.searchView}>
      {status === "success" ? (
        <UserList results={results} />
      ) : (
        <SearchStatus status={status} />
      )}
    </div>
  );
}
