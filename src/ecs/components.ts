// export class Card {
//   public readonly id!: string;
//   public readonly name!: string;
//   public readonly description!: string;
//   public readonly image!: string;

//   public readonly attack!: number;
//   public readonly health!: number;

//   public owner!: string;

//   constructor(self: Card) {
//     Object.assign(this, self);
//   }
// }

export class Info {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly image?: string;

  constructor(self: Info) {
    Object.assign(this, self);
  }
}

export class Attack {
  public readonly attack!: number;
  public readonly min?: number;
  public readonly max?: number;

  constructor(self: Attack) {
    Object.assign(this, self);
  }
}

export class Health {
  public readonly health!: number;
  public readonly min?: number;
  public readonly max?: number;

  constructor(self: Health) {
    Object.assign(this, self);
  }
}

export class Owner {
  public owner!: string;

  constructor(self: Owner) {
    Object.assign(this, self);
  }
}

export interface Card {
  info: Info;
  attack?: Attack;
  health?: Health;
  owner?: Owner;
}
