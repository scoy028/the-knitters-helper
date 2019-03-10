import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CameraNavigator from './CameraNavigator';
import ProjectNavigator from './ProjectNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Auth: LoginScreen,
  Main: MainTabNavigator,
  Camera: CameraNavigator,
  Project: ProjectNavigator,
}, {
  initialRouteName: 'AuthLoading'
}
));
