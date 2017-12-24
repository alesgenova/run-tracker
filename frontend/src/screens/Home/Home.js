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


class HomeScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Home',
  }

  onLogout = () => {
    console.log("LOGOUT PRESSED");
    fakeLogout(this.props.dispatch);
    //this.store
  }

  componentWillMount(){
    console.log("Home WillMount");
    const { navigate } = this.props.navigation;
    if (!this.props.loggedIn){
      navigate("Login");
      return null;
    }
  }

  checkLogin(props){
    if (!props.loggedIn){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
      props.navigation.dispatch(resetAction)
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps HomeScreen");
    this.checkLogin(nextProps);
  }

  constructor(props) {
    console.log("Constructing HomeScreen");
    super(props);
    this.checkLogin(props);
  }

  render() {
    console.log("Rendering Home");
    console.log(this.props);
    return (
      <Container>
        <Content>
          <Text>Logged in as: {this.props.profile ? this.props.profile.username : ""}</Text>
          <Button
            onPress={this.onLogout}
          >
        <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
};


function mapStateToProps(state) {
  //return state.auth;
  return {
    ui: state.ui.homeScreen,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(HomeScreen);