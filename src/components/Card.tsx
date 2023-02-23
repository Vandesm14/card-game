import { Card } from '../cards';
import { P } from '../compose/P';
import { flex, StyledComponentProps } from '../compose/styles';

interface CardFaceProps extends StyledComponentProps {
  card: Card;
  onClick?: (card: Card) => void;
}

export const CardFace = ({ card, style, onClick }: CardFaceProps) => {
  return (
    <div
      style={{
        ...flex.col,
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
      <h2 style={{ margin: 0 }} title={card.description}>
        {card.name}
      </h2>
      <P>
        <b>HP:</b> {card.health}
      </P>
      <P>
        <b>Atk:</b> {card.attack}
      </P>
    </div>
  );
};
