import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParams} from 'models/NavigationModel';
import {HomeScreen} from 'services/bundle_splitter/MainRegistration';
import MainLayout from 'layouts/MainLayout';

const Stack = createNativeStackNavigator<MainStackParams>();

const MainNavigation = () => {
  return (
    <MainLayout>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
          freezeOnBlur: true,
        }}>
        <Stack.Screen component={HomeScreen} name="HomeScreen" />
      </Stack.Navigator>
    </MainLayout>
  );
};

export default MainNavigation;

