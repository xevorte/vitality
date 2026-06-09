
import {NavigationContainer} from '@react-navigation/native';
import NavigationServices from 'services/NavigationServices';

import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import { useAuthStore } from 'stores/auth/AuthStore';

const RootNavigation = () => {
  const { isLogin } = useAuthStore();

  return (
    <NavigationContainer ref={r => NavigationServices.setInstance(r)}>
      {isLogin ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;