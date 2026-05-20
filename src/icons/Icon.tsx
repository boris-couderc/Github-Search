import type { IconName } from "@/icons/types";
import { cx } from "@/utils/cx";
import styles from "./Icon.module.css";

type Props = {
  name: IconName;
  className?: string;
  title?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  role?: string;
};

export function Icon({
  name,
  className,
  title,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  role,
}: Props) {
  return (
    <svg
      className={cx(styles.icon, className)}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={role ?? (title ? "img" : undefined)}
    >
      {title && <title>{title}</title>}
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
