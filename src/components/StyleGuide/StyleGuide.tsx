import { Button } from "@/components/Button/Button";
import { Icon } from "@/icons/Icon";
import styles from "./StyleGuide.module.css";

export function StyleGuide() {
  return (
    <div className={styles.guide}>
      <section className={styles.section}>
        <p className={styles.label}>Colors</p>
        <div className={styles.row}>
          {[
            { bg: "var(--color-primary)", name: "primary" },
            { bg: "var(--color-text)", name: "text" },
            { bg: "var(--color-text-muted)", name: "muted" },
            { bg: "var(--color-bg-subtle)", name: "subtle" },
            { bg: "var(--color-border)", name: "border" },
          ].map(({ bg, name }) => (
            <div
              key={name}
              className={styles.swatch}
              style={{ background: bg }}
            >
              <span className={styles.swatchLabel}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Typography</p>
        <p className={styles.h1}>Heading 1 — ExtraBold 800</p>
        <p className={styles.h2}>Heading 2 — SemiBold 600</p>
        <p className={styles.body}>Body — Medium 500 — The quick brown fox</p>
        <p className={styles.muted}>Muted — Medium 500 — Secondary text</p>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Buttons</p>
        <div className={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Input</p>
        <input
          className={styles.input}
          type="text"
          placeholder="Search GitHub users..."
        />
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Checkbox</p>
        <label className={styles.checkboxRow}>
          <input className={styles.checkbox} type="checkbox" defaultChecked />
          Selected
        </label>
        <label className={styles.checkboxRow}>
          <input className={styles.checkbox} type="checkbox" />
          Unselected
        </label>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Icons</p>
        <div className={styles.row}>
          {(
            [
              { name: "icon-duplicate", label: "duplicate" },
              { name: "icon-delete", label: "delete" },
              { name: "icon-check-box-checked", label: "checked" },
              { name: "icon-check-box-unchecked", label: "unchecked" },
              { name: "icon-check-box-indeterminate", label: "indeterminate" },
              { name: "icon-add", label: "select-all" },
              { name: "icon-loader", label: "loader" },
            ] as const
          ).map(({ name, label }) => (
            <div key={name} className={styles.iconItem}>
              <Icon name={name} />
              <span className={styles.swatchLabel}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.label}>Avatar</p>
        <div className={styles.row}>
          <img
            className={styles.avatar}
            src="https://avatars.githubusercontent.com/u/1?v=4"
            alt="avatar example"
          />
          <div className={styles.avatarPlaceholder}>avatar</div>
        </div>
      </section>
    </div>
  );
}
