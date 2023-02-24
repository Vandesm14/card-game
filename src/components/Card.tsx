import React from 'react';
import { Card } from '../cards';
import { P } from '../compose/P';
import { flex, StyledComponentProps } from '../compose/styles';
import { eatItem, useEnqueue } from '../enqueue/hooks';
import { Marker } from './Marker';
import { useGame } from '../game';
import { shallow } from 'zustand/shallow';
import { ActionMenu } from './ActionMenu';
import { match } from '../match';
import {
  ProgressBar,
  Card as BCard,
  Intent,
  Elevation,
} from '@blueprintjs/core';

interface CardFaceProps extends StyledComponentProps {
  card: Card;
}

export const CardFace = ({ card, style }: CardFaceProps) => {
  const { emit } = useEnqueue();
  const { isDefender, isAttacker, isOurTurn, isAttacking, attack } = useGame(
    (state) => ({
      isDefender: state.defender === card.id,
      isAttacker: state.attacker === card.id,
      isOurTurn: card.owner === 'enemy' && state.turn === 'player',
      setDefender: state.setDefender,
      attack: state.attack,
      isAttacking: !!state.attacker,
    }),
    shallow
  );

  const [marker, setMarker] = React.useState<string | null>();
  const item = eatItem((item) => item.data.id === card.id);

  const battleStyle = match<any, React.CSSProperties>(true, [
    {
      check: isDefender || isAttacker,
      use: { opacity: 1 },
    },
    {
      check: isAttacking,
      use: { opacity: 0.5, filter: `blur(2px)` },
    },
  ]);

  const ownerStyle: React.CSSProperties =
    card.owner === 'player'
      ? {
          color: 'blue',
        }
      : {
          color: 'red',
        };

  const healthStyle: Intent =
    match<any, Intent>(true, [
      {
        check: card.health <= 0,
        use: 'danger',
      },
      {
        check: card.health / card.maxHealth < 0.5,
        use: 'warning',
      },
    ]) ?? 'success';

  React.useEffect(() => {
    if (item && !marker) {
      setMarker(item.data.text);
      setTimeout(() => setMarker(null), 1000);
    }
  }, [item]);

  const actions = isOurTurn && !isAttacking ? ['attack'] : [];
  const handleActionClick = (action: string) => {
    if (action === 'attack') {
      attack(card.id, emit);
    }
  };

  return (
    <BCard
      style={{
        ...flex.col,
        width: '150px',
        height: '200px',
        padding: '10px',
        position: 'relative',
        ...battleStyle,
        ...(style ?? {}),
      }}
      elevation={Elevation.TWO}
    >
      <h2 style={{ margin: 0 }} title={card.description}>
        {card.name}
      </h2>
      <P>
        <b>HP:</b> {card.health}
      </P>
      <ProgressBar
        animate={false}
        stripes={false}
        value={card.health / card.maxHealth}
        intent={healthStyle}
      />
      <P>
        <b>ATK:</b> {card.attack}
      </P>
      <ActionMenu
        actions={actions}
        onActionClick={handleActionClick}
        style={{ bottom: '10px', position: 'absolute', width: '100%', left: 0 }}
      />
      <Marker text={marker ?? ''} color="red" show={Boolean(marker)} />
    </BCard>
  );
};
