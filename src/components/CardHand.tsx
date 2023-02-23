import { Card } from '../ecs/components';

export interface CardHandProps {
  cards: Card[];
}

export const CardHand = ({ cards }: CardHandProps) => {
  console.log({ cards });

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
        <div key={i}>{card.info.name}</div>
      ))}
    </div>
  );
};
