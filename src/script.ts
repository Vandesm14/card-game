// import cards from "./cards";

import { Engine, Entity } from "tick-knock";

export const UNIT = "unit";
export const POWER = "power";

export class Health {
  constructor(public max: number, public current: number) {}
}
export class Attack {
  constructor(public max: number, public min: number) {}
}

const engine = new Engine();
const entity = (new Entity())
  .add(UNIT)
  .add(new Health(8, 8))
  .add(new Attack(1, 3));

engine.addEntity(entity);
