import React, {Component} from 'react';
import {
  Title,
  Input,
  Text,
  Button,
  Container,
  Content,
  Header,
  Card,
  CardItem,
  Left,
  Right,
  Form
} from 'native-base';

import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation'

import { register } from "../../actions/authActions";
//import {  } from 'react-native';


class RegisterScreen extends Component<{}> {

  onRegister = () => {
    console.log("REGISTER PRESSED");
    console.log(this.state.username, this.state.password);
    //this.props.dispatch(logIn(this.state.username, this.state.password));
    register(this.props.dispatch, this.props.navigation, this.state.username, this.state.password1, this.state.password2);
    //this.store
  }

  constructor(props) {
    console.log("Constructing LoginScreen");
    super(props);
    this.state = {username: "", password1: "", password2: "", errorMsg: ""};
    //this.checkLogin(props);
  }

  checkLogin(props){
    if (props.loggedIn){

      const backAction = NavigationActions.back({})
      //props.navigation.dispatch(backAction)
    }
  }

  componentWillMount(){
    console.log("componentWillMount RegisterScreen");
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps RegisterScreen");
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
                  console.log(text);
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
                  console.log(text);
                  this.setState({password1:text});
                }}
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Confirm Password" 
                onChangeText={(text) =>{
                  console.log(text);
                  this.setState({password2:text});
                }}
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="go"
                onSubmitEditing={this.onRegister}
              />
            </CardItem>
            <CardItem>
              <Text style={{color:"red"}}>{this.props.ui.error}</Text>
            </CardItem>
            <CardItem>
              <Left />
              <Right>
                <Button
                  onPress={this.onRegister}
                  disabled={this.props.ui.loading}
                >
                  <Text>Register</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          {false &&
          <View>
          <Text>{this.state.username}</Text>
          <Text>{this.state.password1}</Text>
          <Text>{this.state.password2}</Text>
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
    ui: state.ui.registerScreen,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(RegisterScreen);
//export default LoginScreen;
//export default LoginScreen;
/*
export default LoginScreen = connect(
  (storage)=>{
    return storage;
  }
)(Login);
*/