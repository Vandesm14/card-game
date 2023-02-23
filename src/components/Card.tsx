import { Card } from '../cards';
import { flex } from '../styles';

interface CardFaceProps {
  card: Card;
  style?: React.CSSProperties;
  onClick?: (card: Card) => void;
}

export const CardFace = ({ card, style, onClick }: CardFaceProps) => {
  return (
    <div
      style={{
        ...flex.col,
        ...flex.center,
        justifyContent: 'flex-start',
        width: '150px',
        height: '200px',
        border: '2px solid black',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'white',
        color: 'black',
        ...(style ?? {}),
      }}
      onClick={() => onClick?.(card)}
    >
      <b>{card.name}</b>
      <p>{card.description}</p>
    </div>
  );
};
