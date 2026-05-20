import type { GitHubUser } from "@/features/search/types";
import { UserCard } from "@/features/search/components/UserCard/UserCard";
import styles from "./UserList.module.css";

type Props = {
  results: GitHubUser[];
};

export function UserList({ results }: Props) {
  return (
    <ul className={styles.userList}>
      {results.map((user) => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}
