export class Card {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly image!: string;

  public attack!: number;
  public defense!: number;
  public health!: number;

  public owner!: string;

  constructor(self: Card) {
    Object.assign(this, self);
  }
}

export const isOwner = (owner: string) => (card: Card) => card.owner === owner;
export const isAlive = (card: Card) => card.health > 0;
export const byId = (id: string) => (card: Card) => card.id === id;

export const uuid = () => Math.random().toString(36).substring(2, 15);
export const Hero = (init?: Partial<Card>) =>
  new Card({
    id: uuid(),
    name: 'Hero',
    description: 'A hero',
    image: 'hero.png',
    attack: 2,
    defense: 3,
    health: 5,
    owner: 'player',
    ...init,
  });

export const HeroArcher = (init?: Partial<Card>) =>
  new Card({
    id: uuid(),
    name: 'Hero Archer',
    description: 'A hero archer',
    image: 'hero-archer.png',
    attack: 4,
    defense: 1,
    health: 4,
    owner: 'player',
    ...init,
  });

export const Goblin = (init?: Partial<Card>) =>
  new Card({
    id: uuid(),
    name: 'Goblin',
    description: 'A goblin',
    image: 'goblin.png',
    attack: 2,
    defense: 3,
    health: 5,
    owner: 'enemy',
    ...init,
  });

export const GoblinArcher = (init?: Partial<Card>) =>
  new Card({
    id: uuid(),
    name: 'Goblin Archer',
    description: 'A goblin archer',
    image: 'goblin-archer.png',
    attack: 4,
    defense: 1,
    health: 4,
    owner: 'enemy',
    ...init,
  });
