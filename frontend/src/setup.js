import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";

import { StatusBar } from "react-native";
import {
  ActivityIndicator,
  Text,
  View
} from 'react-native';

import {
  Container,
  Header,
} from 'native-base';

import { RootNavigator } from './navigators/RootNavigator';
import { LoginScreen } from './screens/Login/Login';

import store from './stores/store';

export default class Root extends Component {

  state = {
    isReady: false,
    loggedIn: false
  };

  auth = null;

  componentDidMount() {
    persistStore(
      store,
      null,
      () => {
        let auth = store.getState().auth;
        console.log("AUTH");
        console.log(this.auth)
        StatusBar.setBackgroundColor("#303F9F");
        StatusBar.setTranslucent(false);
        this.setState({loggedIn: auth.loggedIn});
        this.setState({isReady: true});
      }
    );
  }

  render() {
    if (!this.state.isReady){
      //console.log("Storage not ready");
      return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      );
    }
    return (
      
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      
    );
    /*
    console.log("Storage is ready");
    if (!this.state.loggedIn){
      return (
        <Provider store={store}>
          <Home/>
        </Provider>
      );
    }else{
      return (
        <Provider store={store}>
          <EntriesList/>
        </Provider>
      );
    }
    */
  }
}