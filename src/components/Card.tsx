import React from 'react';
import { Card } from '../cards';
import { P } from '../compose/P';
import { flex, StyledComponentProps } from '../compose/styles';
import { eatItem } from '../enqueue/hooks';
import { Marker } from './Marker';
import { useGame } from '../game';
import { shallow } from 'zustand/shallow';
import { ActionMenu } from './ActionMenu';
import { match } from '../match';

interface CardFaceProps extends StyledComponentProps {
  card: Card;
  onClick?: (card: Card) => void;
}

export const CardFace = ({ card, style, onClick }: CardFaceProps) => {
  const { isDefender, isAttacker, isOurTurn, setDefender } = useGame(
    (state) => ({
      isDefender: state.defender === card.id,
      isAttacker: state.attacker === card.id,
      isOurTurn: card.owner === 'enemy' && state.turn === 'player',
      setDefender: state.setDefender,
    }),
    shallow
  );

  const [marker, setMarker] = React.useState<string | null>();
  const item = eatItem((item) => item.data.id === card.id);

  const battleStyle =
    match<any, React.CSSProperties>(true, [
      {
        check: () => isDefender,
        use: { backgroundColor: '#ffaaaa' },
      },
      {
        check: () => isAttacker,
        use: { backgroundColor: '#aaffaa' },
      },
    ]) ?? {};

  React.useEffect(() => {
    if (item && !marker) {
      setMarker(item.data.text);
      setTimeout(() => setMarker(null), 1000);
    }
  }, [item]);

  const actions = isOurTurn ? ['attack'] : [];
  const handleActionClick = (action: string) => {
    if (action === 'attack') {
      setDefender(card.id);
    }
  };

  return (
    <div
      style={{
        ...flex.col,
        width: '150px',
        height: '200px',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'white',
        color: 'black',
        ...battleStyle,
        ...(style ?? {}),
        position: 'relative',
      }}
      onClick={() => onClick?.(card)}
    >
      {card.owner === 'player' ? (
        <Marker text={marker ?? ''} color="red" show={Boolean(marker)} />
      ) : null}
      <h2 style={{ margin: 0 }} title={card.description}>
        {card.name}
      </h2>
      <P>
        <b>HP:</b> {card.health}
      </P>
      <P>
        <b>Atk:</b> {card.attack}
      </P>
      <ActionMenu
        actions={actions}
        onActionClick={handleActionClick}
        style={{ bottom: '10px', position: 'absolute', width: '100%', left: 0 }}
      />
      {card.owner === 'enemy' ? (
        <Marker text={marker ?? ''} color="red" show={Boolean(marker)} />
      ) : null}
    </div>
  );
};
