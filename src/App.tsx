import React from 'react';
import { setDefaultOptions } from 'date-fns';
import { StyleSheet } from 'react-native';
import { id } from 'date-fns/locale';

import RootNavigation from 'navigation/RootNavigation';

setDefaultOptions({ locale: id });

const App = () => {
  return <RootNavigation />;
};

export default App;

const styles = StyleSheet.create({});
