import { Entity, Query } from 'tick-knock';
import { Card } from './components';

export const ownCardsQuery = new Query((entity) => entity.has(Card));

export const Hero = new Entity().add(
  new Card({
    id: 'hero',
    name: 'Hero',
    description: 'The hero of the game',
    image: 'hero.png',
    attack: 1,
    health: 5,
    owner: 'us',
  })
);

export const Goblin = new Entity().add(
  new Card({
    id: 'goblin',
    name: 'Goblin',
    description: 'A goblin',
    image: 'goblin.png',
    attack: 2,
    health: 2,
    owner: 'enemy',
  })
);

export const GoblinArcher = new Entity().add(
  new Card({
    id: 'goblin-archer',
    name: 'Goblin Archer',
    description: 'A goblin archer',
    image: 'goblin-archer.png',
    attack: 3,
    health: 1,
    owner: 'enemy',
  })
);
