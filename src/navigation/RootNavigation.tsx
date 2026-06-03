import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import NavigationServices from 'services/NavigationServices';
import {useAuthStore} from 'stores/auth/AuthStore';

import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const RootNavigation = () => {
  const {isLogin} = useAuthStore();

  return (
    <NavigationContainer ref={r => NavigationServices.setInstance(r)}>
      {isLogin ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;