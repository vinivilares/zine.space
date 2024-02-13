import styles from "./Dialog.module.css"

export default function Dialog({ id, children }) {
  return (
    <dialog id={id} className={styles.dialog}>
      {children}
    </dialog>
  )
}
