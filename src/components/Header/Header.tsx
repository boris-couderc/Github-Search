import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.title}>Github Search</span>
    </header>
  )
}