/* eslint-disable @next/next/no-img-element */
import { formatMoney } from "@/app/utils/format/money";

import { formatDate } from "@/app/utils/format/date";

import styles from "./table.module.scss";

import { Transaction } from "@/app/types/transaction";

type Props = {
  transactions: Transaction[];
  handleRemoveTransaction: (transactionId: string) => void;
};

export function Table({ transactions, handleRemoveTransaction }: Props) {
  function handleRemove(transactionId: string) {
    const response = confirm(
      "Você tem certeza que deseja apagar essa transação?",
    );
    
    if (response) {
      handleRemoveTransaction(transactionId);
    }
  }

  return (
    <section className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.descriptionColumn}>
              Descrição
            </th>

            <th scope="col" className={styles.valueColumn}>
              Valor
            </th>

            <th scope="col" className={styles.categoryColumn}>
              Categoria
            </th>

            <th scope="col" className={styles.dateColumn}>
              Data
            </th>

            <th scope="col" className={styles.actionColumn} />
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>

              <td
                className={
                  transaction.type === "inbound"
                    ? styles.inbound
                    : styles.outbound
                }
              >
                {formatMoney(transaction.price)}
              </td>

              <td className={styles.categoryColumn}>{transaction.category}</td>

              <td className={styles.dateColumn}>
                {formatDate(transaction.date)}
              </td>

              <td>
                <img
                  onClick={() => handleRemove(transaction.id)}
                  className={styles.actionIcon}
                  src="/assets/trash-icon.svg"
                  alt="Apagar (Ícon de uma lixeira)"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}