import React, {Component} from 'react';
import {
  Title,
  Input,
  Text,
  Button,
  Container,
  Content,
  Header,
  Item,
  Form
} from 'native-base';

import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation'

import { fakeLogout } from "../../actions/authActions";
import { fetchUsers } from "../../actions/usersActions";


class UsersScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Users',
  }

  constructor(props) {
    console.log("Constructing UsersScreen");
    super(props);
    if (props.loggedIn){
      fetchUsers(this.props.dispatch);
    }
  }

  render() {
    console.log("Rendering Users");
    console.log(this.props);
    return (
      <Container>
        <Content>
          <Text>Users List</Text>
        </Content>
      </Container>
    );
  }
};


function mapStateToProps(state) {
  //return state.auth;
  return {
    ui: state.ui.usersScreen,
    users: state.users,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(UsersScreen);