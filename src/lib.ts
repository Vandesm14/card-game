export type Tagged<T extends string, V> = V & { _tag: T };

export type Player = Tagged<"player", { deck: Deck; lanes: Lane[] }>;

export type Deck = Tagged<"deck", (Unit | Power)[]>;
export type Lane = Tagged<"lane", Unit | Power>;

export type Unit = Tagged<
  "unit",
  {
    health: Health;
    attack: Attack;
    special?: Special;
  }
>;
export type Power = Tagged<
  "power",
  { duration: number } & ({ attack: Attack } | { special: Special })
>;

export type Health = Tagged<"health", { max: number; current: number }>;
export type Attack = Tagged<"attack", { max: number; min: number }>;
export type Special = Tagged<
  "special",
  {
    cost: number;
    special: (players: Player[]) => Player[];
  }
>;

function createPlayer() {}

// type Unit = Tagged<"unit", {}>;

console.log(createUnit("", 0, 0, 0, ""));

function createUnit(
  name: string,
  attack: number,
  hp: number,
  mana: number,
  imageURL: string
): any {
  return {
    _tag: "unit",
    // name,
    // attack,
    // hp,
    // mana,
    // imageURL,
  };
}

////////////////////////////////////////////////////////////////////////////////

// export type Health = { _tag: "health"; max: number; current: number };
// export type Mana = { _tag: "mana"; max: number; current: number };

// export type Attack = { _tag: "attack"; min: number; max: number; crit: number };
// export type Heal = { _tag: "heal"; min: number; max: number; crit: number };

// /** Creates a `Health` component. */
// export function createHealth(max: number, current: number): Health {
//   return { _tag: "health", max, current };
// }

// /** Creates a `Mana` component. */
// export function createMana(max: number, current: number): Mana {
//   return { _tag: "mana", max, current };
// }

// /** Creates an `Attack` component. */
// export function createAttack(min: number, max: number, crit: number): Attack {
//   return { _tag: "attack", min, max, crit };
// }

// /** Creates a `Heal` component. */
// export function createHeal(min: number, max: number, crit: number): Heal {
//   return { _tag: "heal", min, max, crit };
// }

// /** Returns a normal action based on an `Attack` or `Heal`. */
// export function normal(action: Attack | Heal): number {
//   return Math.round(Math.max(action.min, Math.random() * action.max));
// }

// /** Returns a crit action based on an `Attack` or `Heal`. */
// export function crit(action: Attack | Heal): number {
//   const min = action.max * 1.5 - action.crit;
//   const max = action.max * 2.5 - action.crit;
//   return Math.round(Math.max(min, Math.random() * max));
// }

// /** Returns a mana store based on an `Attack` or `Heal`. */
// export function fatigue(action: Attack | Heal): number {
//   return Math.max(1, Math.round(action.max * 0.25));
// }

// /** Returns an overflow based on a `Health` or `Mana`. */
// export function overflow(store: Health | Mana): number {
//   return Math.max(0, store.current - store.max);
// }

// /** Returns a new `Health` based on an `Attack` or `Heal`. */
// export function action(oldHealth: Health, action: Attack | Heal): Health {
//   const health: Health = structuredClone(oldHealth);
//   let deltaHealth = 0;

//   // miss chance
//   if (Math.random() > action.crit / 2) {
//     // crit chance
//     if (Math.random() < action.crit) {
//       deltaHealth = crit(action);
//     } else {
//       deltaHealth = normal(action);
//     }
//   }

//   if (action._tag === "attack") {
//     health.current = Math.max(0, health.current - deltaHealth);
//   } else if (action._tag === "heal") {
//     health.current = Math.min(health.max, health.current + deltaHealth);
//   }

//   return health;
// }

// export type Unit = {
//   _tag: "unit";
//   name: string;
//   health: Health;
//   mana: Mana;
//   attack?: Attack;
//   heal?: Heal;
// };

// /** Creates a `Unit` component. */
// export function createUnit(
//   name: string,
//   health: Health,
//   mana: Mana,
//   actions: {
//     attack?: Attack;
//     heal?: Heal;
//   }
// ): Unit {
//   return { _tag: "unit", name, mana, health, ...actions };
// }

// export type Deck = {
//   _tag: "deck";
//   units: Unit[];
// };

// /** Creates a `Deck` component. */
// export function createDeck(units: Unit[]): Deck {
//   return { _tag: "deck", units };
// }

// export type Lane = {
//   _tag: "lane";
//   unit: Unit;
// };

// /** Creates a `Lane` component. */
// export function createLane(unit: Unit): Lane {
//   return { _tag: "lane", unit };
// }

// export type Player = {
//   _tag: "player";
//   name: string;
//   deck: Deck;
//   health: Health;
// };

// export function createPlayer(name: string, deck: Deck, health: Health): Player {
//   return { _tag: "player", name, deck, health };
// }
