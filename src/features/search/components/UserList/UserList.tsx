import type { ResultItem } from "@/features/search/types";
import { UserCard } from "@/features/search/components/UserCard/UserCard";
import { useSearch } from "@/features/search/hooks/useSearch";
import { useSelection } from "@/features/search/hooks/useSelection";
import styles from "./UserList.module.css";

type Props = {
  results: ResultItem[];
};

export function UserList({ results }: Props) {
  const { editMode } = useSearch();
  const { selectedIds, toggleSelect } = useSelection();

  return (
    <ul className={styles.userList}>
      {results.map((user) => (
        <li key={user._key}>
          <UserCard
            user={user}
            editMode={editMode}
            selected={selectedIds.includes(user._key)}
            onToggle={() => toggleSelect(user._key)}
          />
        </li>
      ))}
    </ul>
  );
}
