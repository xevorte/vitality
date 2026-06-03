import {register} from 'react-native-bundle-splitter';

import {NAVIGATION_NAME} from 'navigation/NavigationName';

export const LoginScreen = register({
  name: NAVIGATION_NAME.AUTH.loginScreen,
  loader: () => require('screens/auth/LoginScreen'),
});

export const RegisterScreen = register({
  name: NAVIGATION_NAME.AUTH.registerScreen,
  loader: () => require('screens/auth/RegisterScreens'),
});
