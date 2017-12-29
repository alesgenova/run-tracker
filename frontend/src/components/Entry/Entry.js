import React, {Component} from 'react';
import {
  Text,
  ListItem,
  View,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';

import moment from 'moment';

export class Entry extends Component {
  
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  pk2username(pk){
    for (let user of this.props.users){
      if (pk == user.pk){
        return user.username;
      }
    }
    return pk.toString();
  }

  render(){
    //console.log("Entry Props");
    //console.log(this.props);
    return (
      <View >
          <Card  transparent style={{marginTop:0, marginBottom:0}}>
            <CardItem button
              onPress={() => {
                console.log("Expand");
                this.setState({expanded: !this.state.expanded})
              }}
            >
              <Left>
                <Text style={{fontWeight:"400"}}>{moment(this.props.entry.date).format("MMM D")}</Text>
              </Left>
              <Right>
                <Text>
                  {this.props.user.is_superuser ? this.pk2username(this.props.entry.user) : this.props.entry.distance.toFixed(2)+' km'}
                </Text>
              </Right>

            </CardItem>
            {this.state.expanded &&
            <View>
              {this.props.user.is_superuser &&
              <CardItem >
              <Left>
                <Text>
                  Distance:
                </Text>
              </Left>
              <Right>
                <Text>
                  {this.props.entry.distance.toFixed(2)} km
                </Text>
              </Right>
              </CardItem>
              }
              <CardItem>
                <Left>
                  <Text>
                    Duration: 
                  </Text>
                </Left>
                <Right>
                  <Text>
                    {(this.props.entry.time/60).toFixed(0)} min
                  </Text>
                </Right>
              
              </CardItem>
              <CardItem>
                <Left>
                  <Text>
                    Speed:
                  </Text>
                </Left>
                <Right>
                  <Text>
                    {(3600*this.props.entry.distance/this.props.entry.time).toFixed(1)} km/h
                  </Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                      transparent
                      onPress={ () => {
                        this.setState({expanded: false});
                        this.props.deleteFn(this.props.entry.pk)
                      } }
                    >
                      <Text>Delete</Text>
                  </Button>
                </Left>
                <Right>
                  <Button 
                    transparent
                    onPress={ () => { 
                      this.setState({expanded: false});
                      this.props.editFn(this.props.entry.pk);
                    } }
                  >
                    <Text>Edit</Text>
                  </Button>
                </Right>
              </CardItem>
            </View>
            }

          </Card>
        </View>
    )
  }
}