import React from 'react';
import { EnqueueContext } from './context';
import { QueueItem } from './types';

export type Emitter = (data: any, expires?: number) => void;
export const useEnqueue = () => {
  const { queue, setQueue } = React.useContext(EnqueueContext);

  const emit: Emitter = (data, expires) => {
    setQueue([...queue, { id: Math.random().toString(), data, expires }]);
  };

  return { queue, setQueue, emit };
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
