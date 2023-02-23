import React from 'react';
import { Card, filterByOwner } from '../ecs/cards';
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
