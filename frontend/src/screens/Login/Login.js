import React, {Component} from 'react';
import {
  Title,
  Input,
  Text,
  Button,
  Container,
  Content,
  Header,
  CardItem,
  Card,
  Left,
  Right,
  Form
} from 'native-base';

import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation'

import { logIn, fakeLogin, myprofile } from "../../actions/authActions";
//import {  } from 'react-native';


class LoginScreen extends Component<{}> {

  username = "";
  password = "";

  onEditUsername(text){
    console.log(text);
    this.setState({username:text});
  }

  onEditPassword(text){
    this.password = text;
  }

  onLogin = () => {
    console.log("LOGIN PRESSED");
    console.log(this.state.username, this.state.password);
    //this.props.dispatch(logIn(this.state.username, this.state.password));
    logIn(this.props.dispatch, this.props.navigation, this.state.username, this.state.password);
    //this.store
  }

  constructor(props) {
    console.log("Constructing LoginScreen");
    super(props);
    this.state = {username: "", password: "", errorMsg: ""};
    this.checkLogin(props);
  }

  checkLogin(props){
    if (props.loggedIn){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'})
        ]
      })
      props.navigation.dispatch(resetAction)
      //myprofile(this.props.dispatch);
    }
  }

  componentWillMount(){
    console.log("componentWillMount LoginScreen");
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps LoginScreen");
    //this.checkLogin(nextProps);
  }

  render() {
    console.log(this.props);
    
    //let profile = this.props.user;
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Input
                placeholder="Username"
                onChangeText={(text) =>{
                  this.setState({username:text});
                }}
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                onSubmitEditing={() => {}}
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Password" 
                onChangeText={(text) =>{
                  this.setState({password:text});
                }}
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="go"
                onSubmitEditing={this.onLogin}
              />
            </CardItem>
            <CardItem>
              <Text style={{color:"red"}}>{this.props.ui.error}</Text>
            </CardItem>
            <CardItem>
              <Left />
              <Right>
              <Button
                onPress={this.onLogin}
                disabled={this.props.ui.loading}
              >
                <Text>Login</Text>
              </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Left />
              <Right>
              <Button transparent
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              >
                <Text>Not a member?</Text>
              </Button>
              </Right>
            </CardItem>
          </Card>
          {false &&
          <View>
          <Text>{this.props.user ? this.props.user.username : "No User"}</Text>
          <Text>{this.state.username}</Text>
          <Text>{this.state.password}</Text>
          </View>
          }
        </Content>
      </Container>
    );
  }
};

function mapStateToProps(state) {
  //return state.auth;
  return {
    ui: state.ui.loginScreen,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(LoginScreen);
//export default LoginScreen;
//export default LoginScreen;
/*
export default LoginScreen = connect(
  (storage)=>{
    return storage;
  }
)(Login);
*/