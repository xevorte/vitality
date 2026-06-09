import { createContext, useContext, useMemo } from 'react';

type NavigationContextValue = {
  currentScreen: string;
};

const NavigationContext = createContext<NavigationContextValue>({ currentScreen: '' });

export function NavigationProvider({
  children,
  currentScreen,
}: {
  children: React.ReactNode;
  currentScreen: string;
}) {
  const value = useMemo(() => ({ currentScreen }), [currentScreen]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useCurrentScreen = () => useContext(NavigationContext);