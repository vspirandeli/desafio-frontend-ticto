import { CardType } from '@/app/types/card';
import styles from './card.module.scss';
import { formatMoney } from '@/app/utils/format/money';

type Props = {
  type: CardType;
  value: number;
}

export function Card({ type, value }: Props) {

  
  return (
    <section className={`${styles.section} ${type === 'total' ? styles.total : ' '}`}>
      <header className={styles.sectionHeader}>
        {type === 'inbound' ? (
          <>
            <dt>Entradas</dt>

            <img src="/assets/inbound-icon.svg" alt="Entradas" />
          </>
        ) : null}
        
        {type === 'outbound' ? (
          <>
            <dt>Saídas</dt>

            <img src="/assets/outbound-icon.svg" alt="Saídas" />
          </>
        ) : null}
        
        {type === 'total' ? (
          <dt>Saldo Total</dt>
        ) : null}

      </header>

      <dd>{formatMoney(value)}</dd>
    </section>
  )
}