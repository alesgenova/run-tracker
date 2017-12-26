import React from "react";

import { Platform } from "react-native";

import { StackNavigator } from 'react-navigation';

import {
  Header,
} from 'native-base';

import LoginScreen from "../screens/Login/Login";
//import HomeScreen from "../screens/Home/Home";
import RegisterScreen from "../screens/Register/Register";
import EditEntryScreen from "../screens/EditEntry/EditEntry";
import { HomeNavigator } from "./TabNavigator";

import { connect } from "react-redux";

export const RootNavigator = StackNavigator(
  {
    Home: {
      screen: HomeNavigator,
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
    },
    EditEntry: {
      screen: EditEntryScreen,
      navigationOptions: {
        headerTitle: 'EditEntry',
      },
    },
    EditUser: {
      screen: EditEntryScreen,
      navigationOptions: {
        headerTitle: 'EditUser',
      },
    },
  },
  {
    initialRouteName: "Login",
    //headerMode: "none",
    navigationOptions: {
      headerTitleStyle: {
        /* this will style the header, but does NOT change the text */
        color: "white"
      },
      headerStyle: {
          /* this will style the header, but does NOT change the text */
          backgroundColor: "#3F51B5"
      },
      headerTintColor: "white",
    },
  }
);

export default RootNavigator;