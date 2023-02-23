import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { Card, Goblin, GoblinArcher, Hero } from './cards';
import { flex } from './compose/styles';
import { ActionMenu } from './components/ActionMenu';
import { range } from 'brain.js/dist/src/utilities/range';
import { chance } from './chance';

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

  const attack = () => {
    if (!selectedEnemyCard || !selectedPlayerCard) return;

    const enemyCard = selectedEnemyCard;
    const playerCard = selectedPlayerCard;

    const enemyHitChance = chance(1 / 3);
    const playerHitChance = chance(1 / 3);

    const newEnemyCard = {
      ...enemyCard,
      health: enemyCard.health - (playerHitChance ? playerCard.attack : 0),
    };

    const newPlayerCard = {
      ...playerCard,
      health: playerCard.health - (enemyHitChance ? enemyCard.attack : 0),
    };

    const newCards = cards.map((card) => {
      if (card.id === enemyCard.id) return newEnemyCard;
      if (card.id === playerCard.id) return newPlayerCard;
      return card;
    });

    setCards(newCards);
  };

  const handleActionSelect = (action: string) => {
    if (action === 'cancel') clearSelection();
    if (action === 'attack') attack();
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
          ...flex.center,
        }}
      >
        <CardHand
          cards={cards}
          owner="player"
          title="Player"
          onSelectionChange={handleSelectionPlayerChange}
          selectedCard={selectedPlayerCard}
          style={{
            width: '100%',
          }}
        />
        <ActionMenu
          actions={actions}
          onActionClick={handleActionSelect}
          style={{
            marginRight: '10px',
            position: 'absolute',
            right: '10px',
          }}
        />
      </div>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<Main />);
