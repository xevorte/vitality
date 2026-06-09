import 'react-native-gesture-handler';
import './src/styles/style.css';

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';

import './src/config/Reactotron';

AppRegistry.registerComponent(appName, () => App);
