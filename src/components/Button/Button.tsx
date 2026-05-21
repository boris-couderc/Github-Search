import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import type { IconName } from "@/icons/types";
import { Icon } from "@/icons/Icon";
import { cx } from "@/utils/cx";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: IconName;
  href?: never;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: IconName;
  href: string;
};

type Props = ButtonProps | AnchorProps;

export function Button({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: Props) {
  const classes = cx(styles.btn, styles[variant], className);
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as AnchorProps;
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {content}
    </button>
  );
}
