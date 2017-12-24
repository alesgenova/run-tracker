import React from "react";

import { Platform } from "react-native";

import { StackNavigator } from 'react-navigation';

import LoginScreen from "../screens/Login/Login";
import HomeScreen from "../screens/Home/Home";

import { connect } from "react-redux";

export const RootNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'RunTracker',
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitle: 'Login',
      },
    }
  },
  {
    initialRouteName: "Login",
    //headerMode: "none"
  }
);

export default RootNavigator;