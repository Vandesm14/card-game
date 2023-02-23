import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { Card, filterByOwner, Goblin, GoblinArcher, Hero } from './ecs/cards';

function Main() {
  const [cards, setCards] = React.useState<Card[]>([
    Hero(),
    Goblin(),
    GoblinArcher(),
  ]);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <CardHand cards={cards} owner="enemy" title="Enemy" />
      <CardHand cards={cards} owner="player" />
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);
