import React from 'react';
import { Card } from '../cards';
import { P } from '../compose/P';
import { flex, StyledComponentProps } from '../compose/styles';
import { eatItem } from '../enqueue/hooks';
import { Marker } from './Marker';

interface CardFaceProps extends StyledComponentProps {
  card: Card;
  onClick?: (card: Card) => void;
}

export const CardFace = ({ card, style, onClick }: CardFaceProps) => {
  const [showMarker, setShowMarker] = React.useState(false);

  const { id } = card;

  const item = eatItem(
    (item) => item.data.type === 'hit' && item.data.id === id
  );

  const borderStyle = item ? '2px solid red' : '2px solid black';

  React.useEffect(() => {
    if (item && !showMarker) {
      setShowMarker(true);
      setTimeout(() => setShowMarker(false), 1000);
    }
  }, [item]);

  return (
    <div
      style={{
        ...flex.col,
        width: '150px',
        height: '200px',
        border: borderStyle,
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'white',
        color: 'black',
        ...(style ?? {}),
      }}
      onClick={() => onClick?.(card)}
    >
      <Marker text="Hit!" color="red" show={showMarker} />
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
