import React from 'react';
import { EnqueueContext } from './context';
import { QueueItem } from './types';

export const useEnqueue = () => {
  const { queue, setQueue } = React.useContext(EnqueueContext);

  const emit = (item: Omit<QueueItem, 'id'>) => {
    setQueue([...queue, { ...item, id: Math.random().toString() }]);
  };

  return { queue, setQueue, emit };
};

export const eatItems = (filter: (item: QueueItem) => boolean) => {
  const { queue, setQueue } = useEnqueue();
  const [items, setItems] = React.useState<QueueItem[]>([]);

  React.useEffect(() => {
    const next = queue.filter(filter);

    console.log('updating queue', { queue, next });

    setItems(next);
    setQueue(queue.filter((item) => !next.includes(item)));
  }, [queue]);

  return items;
};

export const eatItem = (
  filter: (item: QueueItem) => boolean
): QueueItem | null => {
  const { queue, setQueue } = useEnqueue();
  const [item, setItem] = React.useState<QueueItem | null>(null);

  React.useEffect(() => {
    const next = queue.find(filter) ?? null;
    setItem(next);
  }, [queue]);

  React.useEffect(() => {
    setQueue(
      queue.find((el) => el.id === item?.id)
        ? queue.filter((el) => el.id !== item?.id)
        : queue
    );
  }, [item]);

  return item;
};
