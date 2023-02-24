import { Card, byOwner } from '../cards';
import { flex, StyledComponentProps } from '../compose/styles';
import { useGame } from '../game';
import { CardFace } from './Card';
import { shallow } from 'zustand/shallow';

export interface CardHandProps extends StyledComponentProps {
  owner: Card['owner'];
  title?: string;
}

export const CardHand = ({ owner, title, style }: CardHandProps) => {
  const { cards, turn } = useGame(
    (state) => ({
      cards: state.cards.filter(byOwner(owner)),
      turn: state.turn,
    }),
    shallow
  );

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
