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
  Form,
  List
} from 'native-base';

import { FlatList } from 'react-native';

import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation'

import { fakeLogout } from "../../actions/authActions";
import { fetchUsers } from "../../actions/usersActions";

import { UserCard } from '../../components/UserCard/UserCard';


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

  onEditUser = (user) => {
    console.log("Edit User ", user);
    this.props.navigation.navigate("EditUser", {user:user})
  }

  render() {
    console.log("Rendering Users");
    console.log(this.props);
    return (
      <Container>
        <Content padder>
          {this.props.users  &&
            <FlatList
              data={this.props.users}
              renderItem={({item}) => <UserCard profile={item} logoutFn={null} editFn={this.onEditUser}/>}
              keyExtractor={(item) => item.pk}
            />
          }

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