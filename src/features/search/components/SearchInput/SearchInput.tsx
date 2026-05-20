import { Icon } from "@/icons/Icon";
import styles from "./SearchInput.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
};

export function SearchInput({ value, onChange, loading }: Props) {
  return (
    <div className={styles.wrapper}>
      <Icon name="icon-search" className={styles.iconSearch} />
      <input
        type="search"
        role="searchbox"
        aria-label="Search GitHub users"
        placeholder="Search GitHub users..."
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {loading && (
        <Icon
          name="icon-loader"
          className={styles.iconLoader}
          role="status"
          aria-label="Loading"
          aria-hidden={false}
        />
      )}
    </div>
  );
}
