/* eslint-disable @next/next/no-img-element */
import styles from "./header.module.scss";

type Props = {
  onModalOpen: () => void;
};

export function Header({ onModalOpen }: Props) {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <img
          className={styles.image}
          src="/assets/header-logo.svg"
          alt="logo ticto"
        />

        <button className={styles.newTrasactionButton} onClick={onModalOpen}>
          Nova transação
        </button>
      </nav>
    </header>
  );
}
