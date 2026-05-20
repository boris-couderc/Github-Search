import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: never;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  href: string;
};

type Props = ButtonProps | AnchorProps;

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  const classes = cx(styles.btn, styles[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as AnchorProps;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}
