import React, {Component} from 'react';
import { DatePickerAndroid, } from 'react-native';

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


export class Filter extends Component {
  
  constructor(props) {
    super(props)
    this.state = {expanded:false};
  }

  pickDate = async (date, callback) => {
    console.log("Date Pick");

    try {
      let d
      if (date){
        d = new Date(date);
      }else{
        d = new Date();
      }
      d.setTime(d.getTime()+d.getTimezoneOffset()*60000);
      //console.log(d);
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        //date: new Date(2020, 4, 25)
        date: d
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        //console.log(year, month, day);
        let newD = new Date(year, month, day);
        let newDS = newD.toISOString().slice(0,10);
        callback(newDS);
        //this.setState({entry:{...this.state.entry,date:newDS}});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }

  }

  render(){
    return(
      <View>
        <Card  transparent style={{backgroundColor: "#fff", marginBottom:0, marginTop:20}} >
          <CardItem button style={{ backgroundColor: "transparent" }}
            onPress={() => {
              console.log("Expand");
              this.setState({expanded: !this.state.expanded})
            }}
          >
            <Left>
              <Text>Filter</Text>
            </Left>
            <Right>
                <Icon name="arrow-dropdown"/>
            </Right>
          </CardItem>
          {this.state.expanded &&
          <View>
            <CardItem style={{ backgroundColor: "transparent" }} button onPress={() => {this.pickDate(this.props.minDate, this.props.changeMinFn)}}>
              <Left>
                <Text>From:</Text>
              </Left>
              <Right>
                <Text style={{fontWeight:"500"}}>
                  {this.props.minDate ? moment(this.props.minDate).format("MMM Do YYYY") : 'any'}
                </Text>
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: "transparent" }} button onPress={() => {this.pickDate(this.props.maxDate, this.props.changeMaxFn)}}>
              <Left>
                <Text>To:</Text>
              </Left>
              <Right>
                <Text style={{fontWeight:"500"}}>
                  {this.props.maxDate ? moment(this.props.maxDate).format("MMM Do YYYY") : 'any'}
                </Text>
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: "transparent" }} button onPress={this.props.resetFn}>
              <Left />
              <Right>
                <Text style={{fontWeight:"500"}}>Reset</Text>
              </Right>
            </CardItem>
          </View>
          }
        </Card>
      </View>
    );
  }
}