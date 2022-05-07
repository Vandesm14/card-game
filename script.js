// const a = new RTCPeerConnection({
//   iceServers: ["http://stun.services.mozilla.com"],
// });

/** Creates a `Health` component. */
export function createHealth(max, current) {
  return { _tag: "health", max, current };
}

/** Creates an `Attack` component. */
export function createAttack(max, min, crit) {
  return { _tag: "attack", max, min, crit };
}

/** Creates a `Heal` component. */
export function createHeal(max, min, crit) {
  return { _tag: "heal", max, min, crit };
}

/** Returns a crit action based on an `Attack` or `Heal`. */
export function crit(action) {
  const min = action.max * 1.5 - action.crit;
  const max = action.max * 2.5 - action.crit;
  return Math.round(Math.max(min, Math.random() * max));
}

/** Returns a normal action based on an `Attack` or `Heal`. */
export function normal(action) {
  return Math.round(Math.max(action.min, Math.random() * action.max));
}

/** Returns the new `Health` based on an `Attack` or `Heal`. */
export function action(action, oldHealth) {
  const health = structuredClone(oldHealth);
  let change = 0;

  // miss chance
  if (Math.random() > action.crit / 2) {
    // crit chance
    if (Math.random() < action.crit) {
      change = crit(action);
    } else {
      change = normal(action);
    }
  }

  if (action._tag === "attack") {
    const tmp = Math.max(0, health.current - change);
    health.current = tmp;
    change -= tmp;

  } else if (action._tag === "heal") {
    const tmp = Math.min(health.max, health.current + change);
    health.current = tmp;
    change -= tmp;
  }

  return { health, extra: change };
}

/** Creates a `Unit` component. */
export function createUnit(name, health, attack, heal) {
  return { _tag: "unit", name, health, attack, heal };
}

/** Creates a `Deck` component. */
export function createDeck(units) {
  return { _tag: "deck", units };
}

/** Creates a `Lane` component. */
export function createLane(unit) {
  return { _tag: "lane", unit };
}

export const DEFAULT_UNITS = [
  createUnit("Soldier", createHealth(8, 8), createAttack(1, 2, 0.01)),
];