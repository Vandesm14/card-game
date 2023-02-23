import { Card } from '../ecs/cards';

export interface CardHandProps {
  cards: Card[];
}

export const CardHand = ({ cards }: CardHandProps) => {
  console.log('cards', cards);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {cards.map((card, i) => (
        <div key={i}>{card.name}</div>
      ))}
    </div>
  );
};
