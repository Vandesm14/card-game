import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import {
  Card,
  isAlive,
  Goblin,
  GoblinArcher,
  Hero,
  HeroArcher,
  byId,
} from './cards';
import { flex } from './compose/styles';
import { ActionMenu } from './components/ActionMenu';
import { chance } from './chance';
import { useEnqueue } from './enqueue/hooks';
import { EnqueueProvider } from './enqueue/context';

function Main() {
  const { emit } = useEnqueue();

  const [selectedPlayerId, setSelectedPlayerId] = React.useState<
    Card['id'] | null
  >(null);
  const [selectedEnemyId, setSelectedEnemyId] = React.useState<
    Card['id'] | null
  >(null);
  const [cards, setCards] = React.useState<Card[]>([
    Hero(),
    HeroArcher(),
    Goblin(),
    Goblin(),
    GoblinArcher(),
  ]);

  const handleSelectionEnemyChange = (card: Card | null) => {
    setSelectedEnemyId(card?.id ?? null);
  };

  const handleSelectionPlayerChange = (card: Card | null) => {
    setSelectedPlayerId(card?.id ?? null);
  };

  const hasSelectedFromBoth = selectedPlayerId && selectedEnemyId;

  const actions = hasSelectedFromBoth ? ['attack', 'cancel'] : [];

  const clearSelection = () => {
    setSelectedEnemyId(null);
    setSelectedPlayerId(null);
  };

  const attack = () => {
    if (!hasSelectedFromBoth) return;

    const enemyCard = cards.find(byId(selectedEnemyId));
    const playerCard = cards.find(byId(selectedPlayerId));
    if (!enemyCard || !playerCard) return;

    // Calculate the outcome of the attack
    const shouldHitEnemy = chance(1 / 3);
    const shouldHitPlayer = chance(1 / 3);

    const newEnemyCard = {
      ...enemyCard,
      health: enemyCard.health - (shouldHitEnemy ? playerCard.attack : 0),
    };

    const newPlayerCard = {
      ...playerCard,
      health: playerCard.health - (shouldHitPlayer ? enemyCard.attack : 0),
    };

    // Emit a marker event to show a hit or kill
    if (shouldHitEnemy)
      emit({
        data: {
          resource: 'card',
          text: isAlive(newEnemyCard) ? 'hit' : 'kill',
          id: enemyCard.id,
        },
      });
    if (shouldHitPlayer)
      emit({
        data: {
          resource: 'card',
          text: isAlive(newPlayerCard) ? 'hit' : 'kill',
          id: playerCard.id,
        },
      });

    // Deselect killed cards
    if (!isAlive(newEnemyCard)) setSelectedEnemyId(null);
    if (!isAlive(newPlayerCard)) setSelectedPlayerId(null);

    // Update the cards
    const newCards = cards.map((card) => {
      if (card.id === enemyCard.id) return newEnemyCard;
      if (card.id === playerCard.id) return newPlayerCard;
      return card;
    });

    setCards(newCards);

    // Wait a second and remove dead cards (so we can show the kill marker)
    setTimeout(
      () => setCards((oldCards) => oldCards.filter(isAlive)),
      1 * 1000
    );
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
        selectedCardId={selectedEnemyId}
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
          selectedCardId={selectedPlayerId}
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

function Root() {
  return (
    <EnqueueProvider>
      <Main />
    </EnqueueProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<Root />);
