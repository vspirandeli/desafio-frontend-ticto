import { Card } from "./card";

import styles from "./transactionCard.module.scss";

import { Transaction } from "@/app/types/transaction";

type Props = {
  transactions: Transaction[];
};

export function TransactionCards({ transactions }: Props) {
  const inbopundValue = transactions.reduce((acc, transaction) => {
    if (transaction.type === "inbound") {
      return acc + transaction.price;
    }

    return acc;
  }, 0);

  const outboundValue = transactions.reduce((acc, transaction) => {
    if (transaction.type === "outbound") {
      return acc + transaction.price;
    }

    return acc;
  }, 0);

  const totalValue = inbopundValue - outboundValue;

  return (
    <dl className={styles.cardList}>
      <Card type="inbound" value={inbopundValue} />
      <Card type="outbound" value={outboundValue} />
      <Card type="total" value={totalValue} />
    </dl>
  );
}
