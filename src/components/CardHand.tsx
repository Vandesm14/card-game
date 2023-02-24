import { Card } from '../cards';
import { flex, StyledComponentProps } from '../compose/styles';
import { CardFace } from './Card';

export interface CardHandProps extends StyledComponentProps {
  cards: Card[];
  title?: string;
  highlight?: boolean;
}

export const CardHand = ({ cards, title, highlight, style }: CardHandProps) => {
  return (
    <div
      style={{
        ...flex.col,
        justifyContent: 'flex-start',
        alignItems: 'center',
        ...style,
      }}
    >
      <h2
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '10px 0',
          margin: 0,
          ...(highlight ? { backgroundColor: '#fff2' } : {}),
        }}
      >
        {title}
      </h2>
      <div
        style={{
          ...flex.row,
          ...flex.center,
        }}
      >
        {cards.map((card) => (
          <CardFace
            key={card.id}
            card={card}
            style={{
              margin: '10px',
            }}
          />
        ))}
      </div>
    </div>
  );
};
