import React from 'react';
import { Card, filterByOwner } from '../ecs/cards';
import { CardFace } from './Card';

export interface CardHandProps {
  cards: Card[];
  owner: Card['owner'];
}

export const CardHand = ({ cards, owner }: CardHandProps) => {
  const filtered = cards.filter(filterByOwner(owner));

  return (
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
          style={{
            margin: '10px',
          }}
        />
      ))}
    </div>
  );
};
