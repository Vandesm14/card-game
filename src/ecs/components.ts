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
