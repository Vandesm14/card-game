import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardHand } from './components/CardHand';
import { flex } from './compose/styles';
import { useEnqueue } from './enqueue/hooks';
import { EnqueueProvider } from './enqueue/context';
import { canAttack, useGame } from './game';
import { byId, byOwner, isAlive } from './cards';
import { chance } from './chance';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// acts like a map, but awaits each item
const mapAsync = async <T, U>(
  arr: T[],
  fn: (item: T, index: number, arr: T[]) => Promise<U>
): Promise<U[]> => {
  const results: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(await fn(arr[i], i, arr));
  }
  return results;
};

function Main() {
  const { emit } = useEnqueue();

  const game = useGame();

  const attack = async () => {
    const { cards, turn, defender } = game;
    if (!turn || !defender) return;

    const defenderCard = cards.find(byId(defender));
    const attackerCards = cards.filter(byOwner(turn));
    if (!defenderCard || attackerCards.length === 0) return;

    const newDefenderCard = { ...defenderCard };
    for (const card of attackerCards) {
      game.setAttacker(card.id);

      const newCard = { ...card };

      // If we did hit the enemy, take down their health
      // else, they hit us and we take down our health
      const didHitEnemy = chance(4 / 5);

      if (didHitEnemy) {
        newDefenderCard.health -= card.attack;
        const isDead = !isAlive(newDefenderCard);

        emit({
          resource: 'card',
          id: defenderCard.id,
          text: isDead ? `Kill` : `- ${card.attack}`,
        });
      } else {
        newCard.health -= defenderCard.attack;
        const isDead = !isAlive(newCard);

        emit({
          resource: 'card',
          id: card.id,
          text: isDead ? `Kill` : `- ${defenderCard.attack}`,
        });
      }

      game.updateCard(newCard);
      game.updateCard(newDefenderCard);

      await sleep(1500);

      if (!isAlive(newDefenderCard)) {
        game.removeCard(defenderCard.id);
      } else if (!isAlive(newCard)) {
        game.removeCard(newCard.id);
      }
    }

    // If the next turn is the enemy, wait a second before doing their turn
    if (game.turn === 'player' && canAttack(game))
      setTimeout(() => doAITurn(), 1000);

    game.flipTurn();
    game.clearBattle();
  };

  const doAITurn = () => {
    const playerCards = game.cards.filter(byOwner('player'));
    const defender =
      playerCards[Math.floor(Math.random() * playerCards.length)];

    game.setDefender(defender.id);
  };

  const isAttacking = !!game.attacker;

  React.useEffect(() => {
    if (canAttack(game)) {
      attack();
    }
  }, [game.defender, game.turn]);

  return (
    <main
      style={{
        ...flex.col,
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <CardHand
        highlight={game.turn === 'enemy' && !isAttacking}
        title="Enemy"
        cards={game.cards
          .filter(byOwner('enemy'))
          .filter((card) => card.id !== game.defender)}
      />
      {game.defender ? (
        <CardHand
          highlight={!!game.defender}
          title="Arena"
          cards={game.cards.filter((card) => card.id === game.defender)}
        />
      ) : null}
      <CardHand
        highlight={game.turn === 'player' && !isAttacking}
        title="Player"
        cards={game.cards.filter(byOwner('player'))}
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
