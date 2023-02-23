import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { Card, filterByOwner, Goblin, GoblinArcher, Hero } from './cards';
import { flex } from './styles';

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
        ...flex.col,
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
      <div>
        <CardHand
          cards={cards}
          owner="player"
          onSelectionChange={handleSelectionPlayerChange}
          selectedCard={selectedPlayerCard}
        />
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);
