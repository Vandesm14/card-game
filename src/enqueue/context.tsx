import React from 'react';
import { QueueItem } from './types';

export interface EnqueueValue {
  queue: QueueItem[];
  setQueue: React.Dispatch<React.SetStateAction<QueueItem[]>>;
}

export const EnqueueContext = React.createContext<EnqueueValue>({
  queue: [],
  // Dummy function to avoid having to check if setQueue is defined
  setQueue: () => false,
});

export const EnqueueProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queue, setQueue] = React.useState<QueueItem[]>([]);

  // // Filter expired items every second
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setQueue((queue) => queue.filter(isNotExpired));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <EnqueueContext.Provider value={{ queue, setQueue }}>
      {children}
    </EnqueueContext.Provider>
  );
};
