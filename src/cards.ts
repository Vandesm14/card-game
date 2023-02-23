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

export const filterByOwner = (owner: string) => (card: Card) =>
  card.owner === owner;

export const uuid = () => Math.random().toString(36).substring(2, 15);
export const Hero = () =>
  new Card({
    id: uuid(),
    name: 'Hero',
    description: 'A hero',
    image: 'hero.png',
    attack: 2,
    defense: 3,
    health: 5,
    owner: 'player',
  });

export const HeroArcher = () =>
  new Card({
    id: uuid(),
    name: 'Hero Archer',
    description: 'A hero archer',
    image: 'hero-archer.png',
    attack: 4,
    defense: 1,
    health: 4,
    owner: 'player',
  });

export const Goblin = () =>
  new Card({
    id: uuid(),
    name: 'Goblin',
    description: 'A goblin',
    image: 'goblin.png',
    attack: 2,
    defense: 3,
    health: 5,
    owner: 'enemy',
  });

export const GoblinArcher = () =>
  new Card({
    id: uuid(),
    name: 'Goblin Archer',
    description: 'A goblin archer',
    image: 'goblin-archer.png',
    attack: 4,
    defense: 1,
    health: 4,
    owner: 'enemy',
  });
