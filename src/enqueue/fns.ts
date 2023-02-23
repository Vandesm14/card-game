import { QueueItem } from './types';

export const isNotExpired = (item: QueueItem) =>
  item.expires ? item.expires > Date.now() : true;
