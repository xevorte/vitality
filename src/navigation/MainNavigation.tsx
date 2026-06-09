import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParams } from 'models/NavigationModel';
import { HomeScreen } from 'services/bundle_splitter/MainRegistration';
import MainLayout from 'layouts/MainLayout';
import ProfileChangePasswordScreen from 'screens/main/ProfileChangePasswordScreen';
import ProfileChangeAboutScreen from 'screens/main/ProfileChangeAboutScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import StatisticScreen from 'screens/main/StatisticScreen';
import JournalDetailScreen from 'screens/main/JournalDetailScreen';
import JournalScreen from 'screens/main/JournalScreen';
import ScanDetailScreen from 'screens/main/ScanDetailScreen';
import ScanScreen from 'screens/main/ScanScreen';
import GoalDetailScreen from 'screens/main/GoalDetailScreen';

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
        <Stack.Screen component={GoalDetailScreen} name="GoalDetailScreen" />
        <Stack.Screen component={ScanScreen} name="ScanScreen" />
        <Stack.Screen component={ScanDetailScreen} name="ScanDetailScreen" />
        <Stack.Screen component={JournalScreen} name="JournalScreen" />
        <Stack.Screen component={JournalDetailScreen} name="JournalDetailScreen" />
        <Stack.Screen component={StatisticScreen} name="StatisticScreen" />
        <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
        <Stack.Screen component={ProfileChangeAboutScreen} name="ProfileChangeAboutScreen" />
        <Stack.Screen component={ProfileChangePasswordScreen} name="ProfileChangePasswordScreen" />
      </Stack.Navigator>
    </MainLayout>
  );
};

export default MainNavigation;

