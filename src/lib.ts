export type Health = { _tag: "health"; max: number; current: number };
export type Stamina = { _tag: "stamina"; max: number; current: number };

export type Attack = { _tag: "attack"; min: number; max: number; crit: number };
export type Heal = { _tag: "heal"; min: number; max: number; crit: number };

/** Creates a `Health` component. */
export function createHealth(max: number, current: number): Health {
  return { _tag: "health", max, current };
}

/** Creates a `Stamina` component. */
export function createStamina(max: number, current: number): Stamina {
  return { _tag: "stamina", max, current };
}

/** Creates an `Attack` component. */
export function createAttack(min: number, max: number, crit: number): Attack {
  return { _tag: "attack", min, max, crit };
}

/** Creates a `Heal` component. */
export function createHeal(min: number, max: number, crit: number): Heal {
  return { _tag: "heal", min, max, crit };
}

/** Returns a normal action based on an `Attack` or `Heal`. */
export function normal(action: Attack | Heal): number {
  return Math.round(Math.max(action.min, Math.random() * action.max));
}

/** Returns a crit action based on an `Attack` or `Heal`. */
export function crit(action: Attack | Heal): number {
  const min = action.max * 1.5 - action.crit;
  const max = action.max * 2.5 - action.crit;
  return Math.round(Math.max(min, Math.random() * max));
}

/** Returns a stamina store based on an `Attack` or `Heal`. */
export function fatigue(action: Attack | Heal): number {
  return Math.max(1, Math.round(action.max * 0.25));
}

/** Returns an overflow based on a `Health` or `Stamina`. */
export function overflow(store: Health | Stamina): number {
  return Math.max(0, store.current - store.max);
}

/** Returns a new `Health` and `Stamina` based on an `Attack` or `Heal`. */
export function action(
  oldHealth: Health,
  oldStamina: Stamina,
  action: Attack | Heal
): { health: Health; stamina: Stamina } {
  // @ts-expect-error: structuredClone should work
  const health: Health = structuredClone(oldHealth);
  // @ts-expect-error: structuredClone should work
  const stamina: Stamina = structuredClone(oldStamina);

  stamina.current -= Math.max(0, fatigue(action));
  let deltaHealth = 0;

  // miss chance
  if (Math.random() > action.crit / 2) {
    // crit chance
    if (Math.random() < action.crit) {
      deltaHealth = crit(action);
    } else {
      deltaHealth = normal(action);
    }
  }

  if (action._tag === "attack") {
    health.current = Math.max(0, health.current - deltaHealth);
  } else if (action._tag === "heal") {
    health.current = Math.min(health.max, health.current + deltaHealth);
  }

  return { health, stamina };
}

type Unit = {
  _tag: "unit";
  name: string;
  health: Health;
  attack: Attack;
  // heal: Heal;
};

/** Creates a `Unit` component. */
export function createUnit(
  name: string,
  health: Health,
  attack: Attack
  // heal: Heal
): Unit {
  // return { _tag: 'unit', name, health, attack, heal };
  return { _tag: "unit", name, health, attack };
}

type Deck = {
  _tag: "deck";
  units: Unit[];
};

/** Creates a `Deck` component. */
export function createDeck(units: Unit[]): Deck {
  return { _tag: "deck", units };
}

type Lane = {
  _tag: "lane";
  unit: Unit;
};

/** Creates a `Lane` component. */
export function createLane(unit: Unit): Lane {
  return { _tag: "lane", unit };
}

export const DEFAULT_UNITS = [
  createUnit("Soldier", createHealth(8, 8), createAttack(1, 2, 0.01)),
];

type Player = {
  _tag: "player";
  name: string;
  deck: Deck;
  health: Health;
};

export function createPlayer(name: string, deck: Deck, health: Health): Player {
  return { _tag: "player", name, deck, health };
}
