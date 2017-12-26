import React, {Component} from 'react';

import {
  Text,
  View,
  Card,
  H2,
  Button,
  Icon,
  Switch,
  List,
  ListItem,
  Left,
  Body,
  Right,
  CardItem,
} from 'native-base';

import moment from 'moment';


export class UserCard extends Component {
  
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <View>
        <Card>
          <CardItem>
            <Left>
              <Icon active name='person' />
              <Body>
                <Text>{this.props.profile.username}</Text>
              </Body>
            </Left>
            <Right>
              <Text note>{this.props.profile.is_superuser ? 'admin' : this.props.profile.is_staff ? 'moderator' : 'user'}</Text>
            </Right>
          </CardItem>
          {(this.props.profile.first_name.length > 0 || this.props.profile.last_name.length > 0) &&
          <CardItem>
            <Text>{this.props.profile.first_name} {this.props.profile.last_name}</Text>
          </CardItem>
          }
          <CardItem>
          {this.props.logout &&
            <Left>
              <Button
                  transparent
                  onPress={this.props.logout}
                >
                  <Text>Logout</Text>
              </Button>
            </Left>
          }
          {!this.props.logout &&
            <Left>
            </Left>
          }
            <Right>
              <Button 
                transparent
                onPress={this.props.editUser}
              >
                <Text>Edit Profile</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
}