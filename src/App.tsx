import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { Card, filterByOwner, Goblin, GoblinArcher, Hero } from './cards';

function Main() {
  const [selectedEnemyCard, setSelectedEnemyCard] = React.useState<Card | null>(
    null
  );
  const [selectedPlayerCard, setSelectedPlayerCard] =
    React.useState<Card | null>(null);
  const [cards, setCards] = React.useState<Card[]>([
    Hero(),
    Goblin(),
    GoblinArcher(),
  ]);

  const handleSelectionEnemyChange = (card: Card | null) => {
    setSelectedEnemyCard(card);
  };

  const handleSelectionPlayerChange = (card: Card | null) => {
    setSelectedPlayerCard(card);
  };

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <CardHand
        cards={cards}
        owner="enemy"
        title="Enemy"
        onSelectionChange={handleSelectionEnemyChange}
        selectedCard={selectedEnemyCard}
      />
      <CardHand
        cards={cards}
        owner="player"
        onSelectionChange={handleSelectionPlayerChange}
        selectedCard={selectedPlayerCard}
      />
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);
