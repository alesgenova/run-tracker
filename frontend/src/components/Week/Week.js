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


export class Week extends Component {
  
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  render(){
    //console.log("Week Props");
    //console.log(this.props);
    return (
        <View >
          <Card  transparent style={{backgroundColor: "#eee", marginBottom:0, marginTop:20}} >
            <CardItem button style={{ backgroundColor: "transparent" }}
              onPress={() => {
                console.log("Expand");
                this.setState({expanded: !this.state.expanded})
              }}
            >
              <Left>
                <Text style={{fontWeight:"500"}}>{moment(this.props.week.start).format("MMM Do")} to {moment(this.props.week.start).add(moment.duration(6, 'd')).format("MMM Do")}</Text>
              </Left>
              <Right>
                  <Icon name="arrow-dropdown"/>
              </Right>
            </CardItem>
          {this.state.expanded &&
          <View>
            <CardItem style={{ backgroundColor: "transparent" }}>
            <Left>
              <Text>
                Total distance:
              </Text>
            </Left>
            <Right>
              <Text>
                {this.props.week.distance.toFixed(2)} km
              </Text>
            </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: "transparent" }}>
              <Left>
                <Text>
                  Total duration: 
                </Text>
              </Left>
              <Right>
                <Text>
                  {(this.props.week.time/60).toFixed(0)} min
                </Text>
              </Right>
            
            </CardItem>
            <CardItem style={{ backgroundColor: "transparent" }}>
              <Left>
                <Text>
                  Average speed:
                </Text>
              </Left>
              <Right>
                <Text>
                  {(3600*this.props.week.distance/this.props.week.time).toFixed(1)} km/h
                </Text>
              </Right>
            </CardItem>
          </View>
          }
          </Card>
        </View>
    )
  }
}