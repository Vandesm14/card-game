import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { flex } from './compose/styles';
import { EnqueueProvider } from './enqueue/context';
import { useGame } from './game';
import { byOwner } from './cards';
import { shallow } from 'zustand/shallow';
import { Dialog, DialogBody, DialogFooter, Button } from '@blueprintjs/core';

const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));

function Main() {
  const [showGameOver, setShowGameOver] = React.useState(false);
  const { turn, cards, defender, reset, checkWin, defendingOwner } = useGame(
    (state) => ({
      cards: state.cards,
      defender: state.defender,
      turn: state.turn,
      reset: state.reset,
      checkWin: state.checkWin,
      defendingOwner: state.defender
        ? state.getCard(state.defender)?.owner
        : undefined,
    }),
    shallow
  );

  React.useEffect(() => {
    if (checkWin() && !showGameOver) {
      setShowGameOver(true);
    }
  }, [checkWin, turn]);

  return (
    <main
      style={{
        ...flex.col,
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <Dialog
        title="Game Over"
        icon="info-sign"
        isOpen={showGameOver}
        onClose={() => setShowGameOver(false)}
      >
        <DialogBody>
          <h1>You {checkWin() === 'player' ? 'Win!' : 'Lose!'}</h1>
        </DialogBody>
        <DialogFooter
          actions={
            <Button
              intent="primary"
              text="Play Again"
              onClick={() => {
                reset();
                setShowGameOver(false);
              }}
            />
          }
        />
      </Dialog>
      <CardHand
        highlight={turn === 'enemy'}
        title="Enemy"
        cards={cards
          .filter(byOwner('enemy'))
          .filter((card) => card.id !== defender)}
      />
      {defendingOwner ? (
        <CardHand
          title={toTitleCase(defendingOwner)}
          cards={cards.filter((card) => card.id === defender)}
        />
      ) : null}
      <CardHand
        highlight={turn === 'player'}
        title="Player"
        cards={cards
          .filter(byOwner('player'))
          .filter((card) => card.id !== defender)}
        style={{
          width: '100%',
        }}
      />
    </main>
  );
}

function Root() {
  return (
    <EnqueueProvider>
      <Main />
    </EnqueueProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<Root />);
