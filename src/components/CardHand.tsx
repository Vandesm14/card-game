import React from 'react';
import { Card, filterByOwner } from '../ecs/cards';
import { CardFace } from './Card';

export interface CardHandProps {
  cards: Card[];
  owner: Card['owner'];
  title?: string;
}

export const CardHand = ({ cards, owner, title }: CardHandProps) => {
  const [selectedCard, setSelectedCard] = React.useState<Card | null>(null);

  const filtered = cards.filter(filterByOwner(owner));

  const cardSelectedStyle = {
    borderColor: 'yellow',
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard((prev) => (prev === card ? null : card));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <h2>{title}</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
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
