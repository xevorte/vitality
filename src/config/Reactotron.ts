import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  let host = 'localhost';

  if (scriptURL) {
    host = scriptURL?.split('://')?.[1]?.split(':')?.[0];
  }

  // Let's clear Reactotron on every time we load the app
  Reactotron?.clear();

  // https://github.com/infinitered/reactotron for more options!
  Reactotron.configure({}).useReactNative().connect();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  // eslint-disable-next-line no-console
  console.tron = Reactotron;
} else {
  console.tron = {
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}
