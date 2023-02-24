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
        ...(highlight ? { backgroundColor: '#fff4' } : {}),
        ...style,
      }}
    >
      <h2>{title}</h2>
      <div
        style={{
          ...flex.row,
          ...flex.center,
        }}
      >
        {cards.map((card, i) => (
          <CardFace
            key={i}
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
