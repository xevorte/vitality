import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParams} from 'models/NavigationModel';
import {
  LoginScreen,
  RegisterScreen,
} from 'services/bundle_splitter/AuthRegistration';
import MainLayout from 'layouts/MainLayout';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigation = () => {
  return (
    <MainLayout>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          freezeOnBlur: true,
          headerShown: false,
        }}>
        <Stack.Screen component={LoginScreen} name="LoginScreen" />
        <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
      </Stack.Navigator>
    </MainLayout>
  );
};

export default AuthNavigation;