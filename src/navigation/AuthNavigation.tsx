import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParams} from 'models/NavigationModel';
import {
  WelcomeScreen,
  LoginScreen,
  RegisterStep1Screen,
  RegisterStep2Screen,
  RegisterStep3Screen,
  RegisterStep4Screen,
  RegisterStep5Screen,
  RegisterStep6Screen,
  RegisterSuccessScreen,
  CustomTargetScreen,
} from 'services/bundle_splitter/AuthRegistration';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          freezeOnBlur: true,
          headerShown: false,
        }}>
        <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
        <Stack.Screen component={LoginScreen} name="LoginScreen" />
        <Stack.Screen component={RegisterStep1Screen} name="RegisterStep1Screen" />
        <Stack.Screen component={RegisterStep2Screen} name="RegisterStep2Screen" />
        <Stack.Screen component={RegisterStep3Screen} name="RegisterStep3Screen" />
        <Stack.Screen component={RegisterStep4Screen} name="RegisterStep4Screen" />
        <Stack.Screen component={RegisterStep5Screen} name="RegisterStep5Screen" />
        <Stack.Screen component={RegisterStep6Screen} name="RegisterStep6Screen" />
        <Stack.Screen component={RegisterSuccessScreen} name="RegisterSuccessScreen" />
        <Stack.Screen component={CustomTargetScreen} name="CustomTargetScreen" />
      </Stack.Navigator>
  );
};

export default AuthNavigation;