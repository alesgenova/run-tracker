import React from "react";

import { Platform } from "react-native";

import { StackNavigator } from 'react-navigation';

import LoginScreen from "../screens/Login/Login";
import HomeScreen from "../screens/Home/Home";
import RegisterScreen from "../screens/Register/Register";

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
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerTitle: 'Register',
      },
    }
  },
  {
    initialRouteName: "Login",
    //headerMode: "none"
  }
);

export default RootNavigator;