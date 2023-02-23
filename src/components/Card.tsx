import { Card } from '../cards';

interface CardFaceProps {
  card: Card;
  style?: React.CSSProperties;
  onClick?: (card: Card) => void;
}

export const CardFace = ({ card, style, onClick }: CardFaceProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
