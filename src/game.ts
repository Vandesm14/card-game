import { create } from 'zustand';
import { byId, byOwner, Card, isAlive, Kinds } from './cards';
import { chance } from './chance';
import { Emitter } from './enqueue/hooks';

export type Owner = 'player' | 'enemy';

export interface Game {
  cards: Card[];
  turn: Owner;
  attacker: Card['id'] | undefined;
  defender: Card['id'] | undefined;

  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  removeCard: (cardId: Card['id']) => void;
  updateCard: (card: Card) => void;
  getCard: (cardId: Card['id']) => Card | undefined;
  getCardsByOwner: (owner: Owner) => Card[];

  setTurn: (turn: Owner) => void;
  flipTurn: () => void;

  setAttacker: (attacker: Card['id']) => void;
  setDefender: (defender: Card['id']) => void;
  clearBattle: () => void;

  attack: (defender: Card['id'], emit: Emitter) => void;
  doAITurn: (emit: Emitter) => void;
}

const pickRandomCards = (count: number, owner: Owner): Card[] => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    const kind = Object.values(Kinds)[Math.floor(Math.random() * 4)];
    cards.push(kind({ owner }));
  }
  return cards;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const useGame = create<Game>((set, get) => ({
  cards: [...pickRandomCards(4, 'player'), ...pickRandomCards(4, 'enemy')],
  turn: 'player',
  attacker: undefined,
  defender: undefined,

  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  removeCard: (cardId) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== cardId),
    })),
  updateCard: (card) =>
    set((state) => ({
      cards: state.cards.map((c) => (c.id === card.id ? card : c)),
    })),
  getCard: (cardId) => get().cards.find(byId(cardId)),
  getCardsByOwner: (owner) => get().cards.filter(byOwner(owner)),

  setTurn: (turn) => set({ turn }),
  flipTurn: () =>
    set((state) => ({ turn: state.turn === 'player' ? 'enemy' : 'player' })),

  setAttacker: (attacker) => set({ attacker }),
  setDefender: (defender) => set({ defender }),
  clearBattle: () => set({ attacker: undefined, defender: undefined }),

  attack: async (defender, emit) => {
    const { cards, turn, setDefender } = get();
    setDefender(defender);

    if (!turn || !defender) return;

    const defenderCard = cards.find(byId(defender));
    const attackerCards = cards.filter(byOwner(turn));
    if (!defenderCard || attackerCards.length === 0) return;

    const newDefenderCard = { ...defenderCard };
    for (const card of attackerCards) {
      get().setAttacker(card.id);

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

      get().updateCard(newCard);
      get().updateCard(newDefenderCard);

      await sleep(1500);

      if (!isAlive(newDefenderCard)) {
        get().removeCard(defenderCard.id);

        // If the enemy is dead, we win!
        break;
      }
      if (!isAlive(newCard)) {
        get().removeCard(newCard.id);
      }
    }

    // If the next turn is the enemy, wait a second before doing their turn
    if (
      get().turn === 'player' &&
      get().getCardsByOwner('player').length > 0 &&
      get().getCardsByOwner('enemy').length > 0
    )
      setTimeout(() => get().doAITurn(emit), 1000);

    get().flipTurn();
    get().clearBattle();
  },

  doAITurn: (emit) => {
    const playerCards = get().getCardsByOwner('player');
    const defender =
      playerCards[Math.floor(Math.random() * playerCards.length)];

    get().attack(defender.id, emit);
  },
}));

export const canAttack = (game: Game): boolean => {
  return !!game.turn;
};
