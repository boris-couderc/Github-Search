import type { IconName } from "@/icons/types";
import { Icon } from "@/icons/Icon";
import styles from "./Checkbox.module.css";

export type CheckboxState = "unchecked" | "checked" | "indeterminate";

type Props = {
  checked: CheckboxState;
  onChange: () => void;
  "aria-label": string;
};

const iconMap: Record<CheckboxState, IconName> = {
  unchecked: "icon-check-box-unchecked",
  checked: "icon-check-box-checked",
  indeterminate: "icon-check-box-indeterminate",
};

export function Checkbox({
  checked,
  onChange,
  "aria-label": ariaLabel,
}: Props) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked === "checked"}
        ref={(el) => {
          if (el) el.indeterminate = checked === "indeterminate";
        }}
        onChange={onChange}
        aria-label={ariaLabel}
        className={styles.input}
      />
      <Icon name={iconMap[checked]} aria-hidden />
    </label>
  );
}
