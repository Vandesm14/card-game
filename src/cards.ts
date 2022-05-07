import {
  type Unit,
  createUnit,
  createAttack,
  createHealth,
  createHeal,
  createMana,
} from "./lib";

export const UNITS: Unit[] = [
  createUnit("Solider", createHealth(8, 8), createMana(1, 0), {
    attack: createAttack(1, 4, 0.05),
    heal: createHeal(1, 1, 0.1),
  }),
  createUnit("Medic", createHealth(8, 8), createMana(1, 0), {
    attack: createAttack(1, 1, 0.1),
    heal: createHeal(1, 4, 0.05),
  }),
];
