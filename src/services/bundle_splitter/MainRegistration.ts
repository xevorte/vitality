import {register} from 'react-native-bundle-splitter';

import {NAVIGATION_NAME} from 'navigation/NavigationName';

export const HomeScreen = register({
  name: NAVIGATION_NAME.MAIN.homeScreen,
  loader: () => require('screens/main/HomeScreen'),
});
