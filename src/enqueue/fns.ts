import { QueueItem } from './types';

export const clearExpired = (queue: QueueItem[]) => {
  return queue.filter((item) => item.expires > Date.now());
};
