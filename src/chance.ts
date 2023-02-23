export const range = (start: number, end: number) =>
  Math.floor(Math.random() * (end - start + 1)) + start;

export const chance = (percent: number) => range(1, 100) <= percent * 100;
