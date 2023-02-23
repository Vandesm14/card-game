import { Card, filterByOwner } from '../cards';
import { flex } from '../styles';
import { CardFace } from './Card';

export interface CardHandProps {
  cards: Card[];
  owner: Card['owner'];
  title?: string;
  onSelectionChange?: (card: Card | null) => void;
  selectedCard?: Card | null;
}

export const CardHand = ({
  cards,
  owner,
  title,
  onSelectionChange,
  selectedCard,
}: CardHandProps) => {
  const filtered = cards.filter(filterByOwner(owner));

  const cardSelectedStyle = {
    borderColor: 'yellow',
  };

  const handleCardClick = (card: Card) => onSelectionChange?.(card);

  return (
    <div
      style={{
        ...flex.col,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <h2>{title}</h2>
      <div
        style={{
          ...flex.row,
          ...flex.center,
        }}
      >
        {filtered.map((card, i) => (
          <CardFace
            key={i}
            card={card}
            onClick={handleCardClick}
            style={{
              margin: '10px',
              ...(selectedCard === card ? cardSelectedStyle : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
};
