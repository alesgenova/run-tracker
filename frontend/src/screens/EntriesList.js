/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux'


class EntriesList extends Component<{}> {
  render() {
    console.log("Rendering Home");
    console.log(this.props);
    return (
      <View>
        <Text>
          Welcome to React Entries!
        </Text>
        <Text>
          To get started, edit App.js
        </Text>
      </View>
    );
  }
}


export default connect(
  (storage)=>{
    return {
      entries: storage.entries,
      users: storage.users
    };
  }
)(EntriesList);