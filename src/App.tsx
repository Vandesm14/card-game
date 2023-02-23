import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { Card, filterByOwner, Goblin, GoblinArcher, Hero } from './cards';
import { flex } from './styles';
import { ActionMenu } from './components/ActionMenu';

function Main() {
  const [selectedEnemyCard, setSelectedEnemyCard] = React.useState<Card | null>(
    null
  );
  const [selectedPlayerCard, setSelectedPlayerCard] =
    React.useState<Card | null>(null);
  const [cards, setCards] = React.useState<Card[]>([
    Hero(),
    Goblin(),
    Goblin(),
    GoblinArcher(),
  ]);

  const handleSelectionEnemyChange = (card: Card | null) => {
    setSelectedEnemyCard(card);
  };

  const handleSelectionPlayerChange = (card: Card | null) => {
    setSelectedPlayerCard(card);
  };

  const actions =
    selectedEnemyCard && selectedPlayerCard ? ['attack', 'cancel'] : [];

  const clearSelection = () => {
    setSelectedEnemyCard(null);
    setSelectedPlayerCard(null);
  };

  const handleActionSelect = (action: string) => {
    if (action === 'cancel') clearSelection();
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
      <div
        style={{
          ...flex.row,
          justifyContent: 'space-between',
        }}
      >
        <CardHand
          cards={cards}
          owner="player"
          onSelectionChange={handleSelectionPlayerChange}
          selectedCard={selectedPlayerCard}
        />
        <ActionMenu actions={actions} onActionClick={handleActionSelect} />
      </div>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<Main />);
