import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { flex } from './compose/styles';
import { EnqueueProvider } from './enqueue/context';
import { useGame } from './game';
import { byOwner } from './cards';
import { shallow } from 'zustand/shallow';

function Main() {
  const { turn, cards, defender } = useGame(
    (state) => ({
      cards: state.cards,
      defender: state.defender,
      turn: state.turn,
    }),
    shallow
  );

  return (
    <main
      style={{
        ...flex.col,
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <CardHand
        highlight={turn === 'enemy'}
        title="Enemy"
        cards={cards
          .filter(byOwner('enemy'))
          .filter((card) => card.id !== defender)}
      />
      {defender ? (
        <CardHand
          title="Arena"
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
