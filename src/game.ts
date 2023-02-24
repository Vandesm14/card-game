import { create } from 'zustand';
import { Card, Goblin, GoblinArcher, Hero, HeroArcher } from './cards';

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

  setTurn: (turn: Owner) => void;
  flipTurn: () => void;

  setAttacker: (attacker: Card['id']) => void;
  setDefender: (defender: Card['id']) => void;
  clearBattle: () => void;
}

export const useGame = create<Game>((set) => ({
  cards: [Hero(), HeroArcher(), Goblin(), Goblin(), GoblinArcher()],
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
