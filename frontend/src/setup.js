import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
//import { AsyncStorage } from "react-native";
import {
  ActivityIndicator,
  View
} from 'react-native';

import Home from './pages/Home';
import EntriesList from './pages/EntriesList';
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
        this.setState({loggedIn: auth.loggedIn});
        this.setState({isReady: true});
        setTimeout(()=>{
          this.setState({loggedIn: true});
        },3000);
      }
    );
  }

  render() {
    if (!this.state.isReady){
      console.log("Storage not ready");
      return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      );
    }
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
  }
}