import 'react-native-gesture-handler';
import './src/styles/style.css';

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';

if (__DEV__) {
  import('./src/config/Reactotron');
} else {
  // Prevent crash in release mode
  console.tron = {
    log: () => {},
    warn: () => {},
    error: () => {},
    display: () => {},
  };
}

AppRegistry.registerComponent(appName, () => App);
