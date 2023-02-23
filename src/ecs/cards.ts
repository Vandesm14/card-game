import { Entity, Query } from 'tick-knock';
import { Info, Attack, Health, Owner } from './components';

export const ownCardsQuery = new Query(
  (entity) => entity.has(Owner) && entity.get(Owner)!.owner === 'us'
);

export const Hero = new Entity()
  .add(
    new Info({
      id: 'hero',
      name: 'Hero',
      description: 'The hero of the game',
      image: 'hero.png',
    })
  )
  .add(
    new Attack({
      attack: 1,
    })
  )
  .add(
    new Health({
      health: 5,
    })
  )
  .add(
    new Owner({
      owner: 'us',
    })
  );

export const Goblin = new Entity()
  .add(
    new Info({
      id: 'goblin',
      name: 'Goblin',
      description: 'A goblin',
      image: 'goblin.png',
    })
  )
  .add(
    new Attack({
      attack: 2,
    })
  )
  .add(
    new Health({
      health: 2,
    })
  )
  .add(
    new Owner({
      owner: 'enemy',
    })
  );

export const GoblinArcher = new Entity()
  .add(
    new Info({
      id: 'goblin-archer',
      name: 'Goblin Archer',
      description: 'A goblin archer',
      image: 'goblin-archer.png',
    })
  )
  .add(
    new Attack({
      attack: 3,
    })
  )
  .add(
    new Health({
      health: 1,
    })
  )
  .add(
    new Owner({
      owner: 'enemy',
    })
  );
