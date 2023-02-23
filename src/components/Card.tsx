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
  const [marker, setMarker] = React.useState<string | null>();
  const item = eatItem((item) => item.data.id === card.id);

  const borderStyle = item ? '2px solid red' : '2px solid black';

  const isHit = item?.data.type === 'hit';
  const isKill = item?.data.type === 'kill';

  React.useEffect(() => {
    if (item && !marker) {
      setMarker(item.data.text);
      setTimeout(() => setMarker(null), 1000);
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
      <Marker text={marker ?? ''} color="red" show={Boolean(marker)} />
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
