import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AccountScreen from '../screens/AccountScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import LoginScreen from '../screens/LoginScreen';
import AboutScreen from '../screens/AboutScreen';
import ProjectScreen from '../screens/ProjectScreen';

const LogOutStack = createStackNavigator({
  Login: LoginScreen,
});

LogOutStack.navigationOptions = {
  tabBarLabel: 'Log Out',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
      onPress={async() => {await AsyncStorage.clear()}}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'My Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-person'
          : 'md-person'
      }
    />
  ),
};

const ProjectsStack = createStackNavigator({
  Projects: ProjectsScreen,
  Project: ProjectScreen,
});

ProjectsStack.navigationOptions = {
  tabBarLabel: 'Projects',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-apps' : 'md-apps'}
    />
  ),
};

const AboutStack = createStackNavigator({
  About: AboutScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle-outline'}
    />
  ),
};

export default createBottomTabNavigator({
  AccountStack,
  AboutStack,
  ProjectsStack,
  LogOutStack,
});
