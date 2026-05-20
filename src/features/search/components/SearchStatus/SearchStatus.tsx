import type { Status } from "@/features/search/types";
import styles from "./SearchStatus.module.css";

type StatusMessage = { title: string; description: string };

const messages: Record<
  Exclude<Status, "success" | "loading">,
  StatusMessage
> = {
  idle: {
    title: "Search GitHub users",
    description: "Type a username to get started",
  },
  empty: {
    title: "No users found",
    description: "Try a different search term",
  },
  error: {
    title: "Something went wrong",
    description: "An error occurred. Please try again.",
  },
  "rate-limited": {
    title: "Rate limit reached",
    description: "Too many requests. Please wait before searching again.",
  },
};

type Props = {
  status: Exclude<Status, "success" | "loading">;
};

export function SearchStatus({ status }: Props) {
  const { title, description } = messages[status];
  return (
    <div className={styles.searchStatus} role="status">
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
