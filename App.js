import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/HomeScreen'
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/SignUpScreen';


const AppStack = createStackNavigator({ Home: HomeScreen });

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignUpScreen});

export default createAppContainer(

  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);