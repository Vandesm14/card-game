import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { Card } from './ecs/components';
import {
  Goblin,
  GoblinArcher,
  Hero,
  ownCardsQuery,
  useEngine,
  useQuery,
} from './ecs/cards';

function App() {
  const engine = useEngine();

  React.useEffect(() => {
    engine.addEntity(Hero);
    engine.addEntity(Hero);
    engine.addEntity(Hero);
    engine.addEntity(Goblin);
    engine.addEntity(Goblin);
    engine.addEntity(GoblinArcher);
  }, []);

  const query = useQuery(engine, ownCardsQuery);

  return (
    // <CardHand
    //   cards={
    //     query
    //       .filter(
    //         (entity) => entity.get(Card)?.owner === 'us' && entity.has(Card)
    //       )
    //       .map((entity) => entity.get(Card)) as Card[]
    //   }
    // />
  );
}

createRoot(document.getElementById('root')!).render(<App />);
