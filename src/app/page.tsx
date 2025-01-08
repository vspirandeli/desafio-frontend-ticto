"use client";

import { useState } from "react";
import { Modal } from "./components/modal";

import { Header } from "./components/header";
import { TransactionCards } from "./components/transactionCards";
import { Table } from "./components/table";

import styles from "./home.module.scss";

import { Transaction } from "./types/transaction";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleRemoveTransaction(transactionId: string) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId,
    );

    setTransactions(updatedTransactions);
  }

  function handleAddTransaction(transaction: Transaction) {
    setTransactions([...transactions, transaction]);
  }

  function onModalClose() {
    setIsModalOpen(false);
  }

  function onModalOpen() {
    setIsModalOpen(true);
  }

  return (
    <main>
      <Header onModalOpen={onModalOpen} />

      <TransactionCards transactions={transactions} />

      {transactions.length > 0 ? (
        <Table
          transactions={transactions}
          handleRemoveTransaction={handleRemoveTransaction}
        />
      ) : (
        <div className={styles.transactionContainer}>
          <h3>Você ainda não possui transações cadastradas.</h3>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        handleAddTransaction={handleAddTransaction}
      />
    </main>
  );
}
