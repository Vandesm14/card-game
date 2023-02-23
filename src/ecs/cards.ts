export class Card {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly image!: string;

  public readonly attack!: number;
  public readonly health!: number;

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
    health: 5,
    owner: 'us',
  });

export const Goblin = () =>
  new Card({
    id: uuid(),
    name: 'Goblin',
    description: 'A goblin',
    image: 'goblin.png',
    attack: 2,
    health: 2,
    owner: 'enemy',
  });

export const GoblinArcher = () =>
  new Card({
    id: uuid(),
    name: 'Goblin Archer',
    description: 'A goblin archer',
    image: 'goblin-archer.png',
    attack: 3,
    health: 1,
    owner: 'enemy',
  });
