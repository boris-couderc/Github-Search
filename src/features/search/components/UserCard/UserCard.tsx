import type { GitHubUser } from "@/features/search/types";
import { Button } from "@/components/Button/Button";
import styles from "./UserCard.module.css";

type Props = {
  user: GitHubUser;
};

export function UserCard({ user }: Props) {
  return (
    <div className={styles.card}>
      <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <div className={styles.text}>
        <div className={styles.login}>{user.login}</div>
        <div className={styles.id}>#{user.id}</div>
      </div>
      <Button
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        variant="outline"
      >
        View profile
      </Button>
    </div>
  );
}
