export class Card {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description?: string;
  public readonly image?: string;

  public attack!: number;
  public health!: number;
  public maxHealth!: number;

  public owner!: string;

  constructor(self: Card) {
    Object.assign(this, self);
  }
}

export const isAlive = (card: Card) => card.health > 0;
export const byOwner = (owner: string) => (card: Card) => card.owner === owner;
export const byId = (id: string) => (card: Card) => card.id === id;

type WithOwner = Partial<Card> & Pick<Card, 'owner'>;

export const uuid = () => Math.random().toString(36).substring(2, 15);
const Soldier = (init: WithOwner) =>
  new Card({
    id: uuid(),
    name: 'Soldier',
    attack: 2,
    health: 2,
    maxHealth: 2,
    ...init,
  });

const Archer = (init: WithOwner) =>
  new Card({
    id: uuid(),
    name: 'Archer',
    attack: 4,
    health: 1,
    maxHealth: 1,
    ...init,
  });

const Brute = (init: WithOwner) =>
  new Card({
    id: uuid(),
    name: 'Brute',
    attack: 1,
    health: 5,
    maxHealth: 5,
    ...init,
  });

const Wizard = (init: WithOwner) =>
  new Card({
    id: uuid(),
    name: 'Wizard',
    attack: 5,
    health: 1,
    maxHealth: 1,
    ...init,
  });

export const Kinds = {
  Soldier,
  Archer,
  Brute,
  Wizard,
};
