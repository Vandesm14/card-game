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
  const [turn, setTurn] = React.useState<'player' | 'enemy'>('player');

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

  const attack = (withTurn = turn) => {
    if (!hasSelectedFromBoth) return;

    const enemyCard = cards.find(byId(selectedEnemyId));
    const playerCard = cards.find(byId(selectedPlayerId));
    if (!enemyCard || !playerCard) return;

    const newEnemyCard = {
      ...enemyCard,
    };

    const newPlayerCard = {
      ...playerCard,
    };

    const hitChance = chance(1 / 3);

    if (withTurn === 'player') {
      if (hitChance) {
        emit({
          data: {
            resource: 'card',
            text: 'hit',
            id: enemyCard.id,
          },
        });
        newEnemyCard.health -= playerCard.attack;
      } else {
        emit({
          data: {
            resource: 'card',
            text: 'miss',
            id: enemyCard.id,
          },
        });
      }

      if (!isAlive(newEnemyCard)) setSelectedEnemyId(null);
    } else if (withTurn === 'enemy') {
      if (hitChance) {
        emit({
          data: {
            resource: 'card',
            text: 'hit',
            id: playerCard.id,
          },
        });
        newPlayerCard.health -= enemyCard.attack;
      } else {
        emit({
          data: {
            resource: 'card',
            text: 'miss',
            id: playerCard.id,
          },
        });
      }

      if (!isAlive(newPlayerCard)) setSelectedPlayerId(null);
    }

    const newCards = cards.map((card) => {
      if (card.id === enemyCard.id) return newEnemyCard;
      if (card.id === playerCard.id) return newPlayerCard;
      return card;
    });

    setCards(newCards);

    const newTurn = withTurn === 'player' ? 'enemy' : 'player';

    // Wait a second and remove dead cards (so we can show the kill marker)
    setTimeout(() => {
      setCards((oldCards) => oldCards.filter(isAlive));
      setTurn(newTurn);

      // If it's the enemy's turn, attack
      if (newTurn === 'enemy') {
        attack(newTurn);
      }
    }, 1 * 1000);
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
        turn={turn}
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
          turn={turn}
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
