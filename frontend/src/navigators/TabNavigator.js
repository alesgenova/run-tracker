import React from "react";

import { Platform } from "react-native";

import { TabNavigator } from 'react-navigation';

import EntriesScreen from "../screens/ListEntries/ListEntries";
import UsersScreen from "../screens/ListUsers/ListUsers";

export const HomeNavigator = TabNavigator(
  {
    Entries: {
      screen: EntriesScreen,
    },
    Users: {
      screen: UsersScreen,
    }
  },
  {
    initialRouteName: "Entries",
    //headerMode: "none"
  }
);

export default HomeNavigator;