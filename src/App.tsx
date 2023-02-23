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

  return <CardHand cards={cards.filter(filterByOwner('us'))} />;
}

createRoot(document.getElementById('root')!).render(<Main />);
