import React, {Component} from 'react';

import {
  Input,
  Text,
  Button,
  Container,
  Content,
  Header,
  Item,
  Form,
  List,
  Icon,
  View,
  Card,
  CardItem,
  Left,
  Right,
  Label,
  Body
} from 'native-base';

import { connect } from "react-redux";

import { updateUser } from "../../actions/usersActions";


class EditUserScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Edit User',
  }

  // Source: https://weeknumber.net/how-to/javascript
  

  constructor(props) {
    super(props);
    this.state = {user: this.props.navigation.state.params.user};
    //console.log(this.state);
  }



  onSave = () =>{
    console.log("On Save Pressed");
    updateUser(this.state.user, this.props.dispatch, this.props.navigation);    
  }

  render() {
    
    return (
      <Container>
        <Content padder>
        {this.state.user &&
          <Card>
            <CardItem>
              <Left>
                <Text>Username:</Text>
              </Left>
              <Right>
                <Text>{this.state.user.username}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>First name:</Text>
              </Left>
              <Right>
                <Input 
                  defaultValue={this.state.user.first_name}
                  onChangeText={(text) =>{
                    this.setState({user:{...this.state.user,first_name:text}});
                  }
                }/>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Last name:</Text>
              </Left>
              <Right>
                <Input 
                  defaultValue={this.state.user.last_name}
                  onChangeText={(text) =>{
                    this.setState({user:{...this.state.user,last_name:text}});
                  }
                }/>
              </Right>
            </CardItem>
            { this.props.profile.is_superuser &&
            <View>
              <CardItem>
                <Left>
                  <Text>Mderator:</Text>
                </Left>
              </CardItem>
            </View>
            }
            <CardItem>
              <Left />
              <Right>
                <Button
                  onPress={this.onSave}
                >
                  <Text>Save</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        }
          <Text>{JSON.stringify(this.state.user)}</Text>
        </Content>
      </Container>

    );
  }
};


function mapStateToProps(state) {
  //return state.auth;
  return {
    ui: state.ui.editUserScreen,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(EditUserScreen);