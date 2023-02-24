import { create } from 'zustand';
import { byId, byOwner, Card, Kinds } from './cards';

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
}

const pickRandomCards = (count: number, owner: Owner): Card[] => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    const kind = Object.values(Kinds)[Math.floor(Math.random() * 4)];
    cards.push(kind({ owner }));
  }
  return cards;
};

export const useGame = create<Game>((set, get) => ({
  cards: [...pickRandomCards(4, 'player'), ...pickRandomCards(4, 'enemy')],
  turn: 'player',
  attacker: 'player',
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
}));

export const canAttack = (game: Game): boolean => {
  return !!game.turn;
};
