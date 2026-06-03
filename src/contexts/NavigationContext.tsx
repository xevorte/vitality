import { createContext, useContext } from 'react';
import { useNavigationState } from '@react-navigation/native';

const NavigationContext = createContext({ currentScreen: '' });

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const currentScreen = useNavigationState(state => {
    return state?.routes[state.index]?.name || '';
  });

  return (
    <NavigationContext.Provider value={{ currentScreen }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useCurrentScreen = () => useContext(NavigationContext);