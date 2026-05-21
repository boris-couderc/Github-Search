import type { GitHubUser } from "@/features/search/types";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import styles from "./UserCard.module.css";

type Props = {
  user: GitHubUser;
  editMode?: boolean;
  selected?: boolean;
  onToggle?: () => void;
};

export function UserCard({
  user,
  editMode = false,
  selected = false,
  onToggle,
}: Props) {
  return (
    <div className={styles.card}>
      {editMode && (
        <div className={styles.checkbox}>
          <Checkbox
            checked={selected ? "checked" : "unchecked"}
            onChange={onToggle ?? (() => {})}
            aria-label={`Select ${user.login}`}
          />
        </div>
      )}
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
