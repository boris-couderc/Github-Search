import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "ghost" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  return (
    <button className={cx(styles.btn, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
