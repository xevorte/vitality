import {register} from 'react-native-bundle-splitter';

import {NAVIGATION_NAME} from 'navigation/NavigationName';

export const WelcomeScreen = register({
  name: NAVIGATION_NAME.AUTH.welcomeScreen,
  loader: () => require('screens/auth/WelcomeScreen'),
});

export const LoginScreen = register({
  name: NAVIGATION_NAME.AUTH.loginScreen,
  loader: () => require('screens/auth/LoginScreen'),
});

export const RegisterStep1Screen = register({
  name: NAVIGATION_NAME.AUTH.registerStep1Screen,
  loader: () => require('screens/auth/RegisterStep1Screen'),
});

export const RegisterStep2Screen = register({
  name: NAVIGATION_NAME.AUTH.registerStep2Screen,
  loader: () => require('screens/auth/RegisterStep2Screen'),
});

export const RegisterStep3Screen = register({
  name: NAVIGATION_NAME.AUTH.registerStep3Screen,
  loader: () => require('screens/auth/RegisterStep3Screen'),
});

export const RegisterStep4Screen = register({
  name: NAVIGATION_NAME.AUTH.registerStep4Screen,
  loader: () => require('screens/auth/RegisterStep4Screen'),
});

export const RegisterStep5Screen = register({
  name: NAVIGATION_NAME.AUTH.registerStep5Screen,
  loader: () => require('screens/auth/RegisterStep5Screen'),
});

export const RegisterStep6Screen = register({
  name: NAVIGATION_NAME.AUTH.registerStep6Screen,
  loader: () => require('screens/auth/RegisterStep6Screen'),
});

export const CustomTargetScreen = register({
  name: NAVIGATION_NAME.AUTH.customTargetScreen,
  loader: () => require('screens/auth/CustomTargetScreen'),
});
