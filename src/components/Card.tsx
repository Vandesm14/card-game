import { Card } from '../ecs/cards';

interface CardFaceProps {
  card: Card;
  style?: React.CSSProperties;
}

export const CardFace = ({ card, style }: CardFaceProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '150px',
        height: '200px',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'white',
        color: 'black',
        ...(style ?? {}),
      }}
    >
      <b>{card.name}</b>
      <p>{card.description}</p>
    </div>
  );
};
