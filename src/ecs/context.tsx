import React from 'react';
import { Engine } from 'tick-knock';

interface EngineContextValue {
  engine: Engine;
  setEngine: React.Dispatch<React.SetStateAction<Engine>>;
}

export const EngineContext = React.createContext<EngineContextValue>({
  engine: new Engine(),
  setEngine: () => {},
});

interface EngineProviderProps {
  children: React.ReactNode;
}

export const EngineProvider = ({ children }: EngineProviderProps) => {
  const [engine, setEngine] = React.useState(new Engine());

  return (
    <EngineContext.Provider value={{ engine, setEngine }}>
      {children}
    </EngineContext.Provider>
  );
};
