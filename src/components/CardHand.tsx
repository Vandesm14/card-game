import { Card, isOwner } from '../cards';
import { flex, StyledComponentProps } from '../compose/styles';
import { CardFace } from './Card';

export interface CardHandProps extends StyledComponentProps {
  cards: Card[];
  owner: Card['owner'];
  title?: string;
  onSelectionChange?: (card: Card | null) => void;
  selectedCardId?: Card['id'] | null;
  turn?: 'player' | 'enemy';
}

export const CardHand = ({
  cards,
  owner,
  title,
  onSelectionChange,
  selectedCardId,
  style,
  turn,
}: CardHandProps) => {
  const filtered = cards.filter(isOwner(owner));

  const cardSelectedStyle = {
    border: '2px solid yellow',
  };

  const handleCardClick = (card: Card) => onSelectionChange?.(card);

  return (
    <div
      style={{
        ...flex.col,
        justifyContent: 'flex-start',
        alignItems: 'center',
        ...(turn === owner ? { backgroundColor: '#fff4' } : {}),
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
        {filtered.map((card, i) => (
          <CardFace
            key={i}
            card={card}
            onClick={handleCardClick}
            style={{
              margin: '10px',
              ...(selectedCardId === card.id ? cardSelectedStyle : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
};
