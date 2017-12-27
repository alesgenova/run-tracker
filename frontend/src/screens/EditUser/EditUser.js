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
  Body,
  Radio
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
    let user = this.props.navigation.state.params.user;
    let disablePerms = (!this.props.profile.is_superuser && user.is_superuser);
    let selectedPerms = 'U';
    if (user.is_superuser){
      selectedPerms = 'A';
    }else if (user.is_staff){
      selectedPerms = 'M';
    }
    this.state = {user: user, disablePerms: disablePerms, selectedPerms:selectedPerms};

    //console.log(this.state);
  }

  onChangePerms(perm){
    let is_staff = false;
    let is_superuser = false;
    if (perm == 'A'){
      is_staff = true;
      is_superuser = true;
    }else if (perm == 'M'){
      is_staff = true;
      is_superuser = false;
    }
    this.setState({user:{...this.state.user,is_staff:is_staff,is_superuser:is_superuser}});
    this.setState({selectedPerms:perm});
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
            { (this.props.profile.is_staff || this.props.profile.is_superuser) &&
            <View>
            <CardItem>
              <Left>
                <Text>User:</Text>
              </Left>
              <Right>
                <Radio disabled={this.state.disablePerms} selected={this.state.selectedPerms=='U'} 
                  onPress={()=>{
                    this.onChangePerms('U');
                  }}
                />
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Mderator:</Text>
              </Left>
              <Right>
                <Radio disabled={this.state.disablePerms} selected={this.state.selectedPerms=='M'} 
                  onPress={()=>{
                    this.onChangePerms('M');
                  }}
                />
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Admin:</Text>
              </Left>
              <Right>
                <Radio disabled={this.state.disablePerms||!this.props.profile.is_superuser} selected={this.state.selectedPerms=='A'}
                  onPress={()=>{
                    this.onChangePerms('A');
                  }}
                />
              </Right>
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
        {false &&
        <View>
          <Text>{JSON.stringify(this.state.user)}</Text>
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
    ui: state.ui.editUserScreen,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(EditUserScreen);