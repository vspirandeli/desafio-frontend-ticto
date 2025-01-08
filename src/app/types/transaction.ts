export type Transaction = {
  id: string;
  name: string;
  price: number;
  type: TransactionType;
  category: string;
  date: Date;
}

export type TransactionType = 'inbound' | 'outbound';