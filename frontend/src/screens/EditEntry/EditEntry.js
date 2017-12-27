import React, {Component} from 'react';
import { DatePickerAndroid, Picker, } from 'react-native';
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
  Fab,
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
import { NavigationActions } from 'react-navigation'

import { fakeLogout } from "../../actions/authActions";
import { createEntry, updateEntry } from "../../actions/entriesActions";

import moment from 'moment';


class EditEntryScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Edit Entry',
  }

  // Source: https://weeknumber.net/how-to/javascript
  

  componentDidMount(){
  }

  constructor(props) {
    console.log("Constructing EditEntryScreen");
    super(props);
    console.log(props);
    let pk = this.props.navigation.state.params.pk ? this.props.navigation.state.params.pk : -1 ;
    let create = pk < 0;
    let entry;
    
    let d = new Date()
    d.setTime(d.getTime()-d.getTimezoneOffset()*60000);
    let dS = d.toISOString().slice(0,10);
    entry = {date: dS, time: 0, distance: 0, user: this.props.profile.pk};
    if (!create){
      for (let e of this.props.entries){
        if (e.pk == pk){
          entry = e;
        }
      }
    }
    this.state = {create: create, entry: entry};
    console.log(this.state);
  }

  pickDate = async () => {
    console.log("Date Pick");

    try {
      console.log(this.state.entry.date);
      let d = new Date(this.state.entry.date)
      d.setTime(d.getTime()+d.getTimezoneOffset()*60000);
      console.log(d);
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        //date: new Date(2020, 4, 25)
        date: d
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        console.log(year, month, day);
        let newD = new Date(year, month, day);
        let newDS = newD.toISOString().slice(0,10);
        this.setState({entry:{...this.state.entry,date:newDS}});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }

  }

  onUserChange(value: string) {
    console.log("Picked User", value);
    this.setState({entry:{...this.state.entry,user:value}});
    /*
    this.setState({
      selected1: value
    });
    */
  }

  onSave = () =>{
    console.log("On Save Pressed");
    if (this.state.create) {
      createEntry(this.state.entry, this.props.dispatch, this.props.navigation);
      //this.props.navigation.back();
    }else{
      updateEntry(this.state.entry, this.props.dispatch, this.props.navigation);
    }
    
  }

  render() {
    
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem button onPress={this.pickDate}>
              <Left>
                <Text>Date:</Text>
              </Left>
              <Right>
                <Text style={{fontWeight:"500"}}>
                  {moment(this.state.entry.date).format("MMM Do YYYY")}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Distance (km):</Text>
              </Left>
              <Right>
                <Input 
                  defaultValue={this.state.entry.distance.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) =>{
                  if (text.length > 0){
                    this.setState({entry:{...this.state.entry,distance:parseFloat(text)}});
                  }
                }}/>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Duration (min):</Text>
              </Left>
              <Right>
                <Input 
                  defaultValue={(this.state.entry.time/60).toFixed(0)}
                  keyboardType="numeric"
                  onChangeText={(text) =>{
                  if (text.length > 0){
                    this.setState({entry:{...this.state.entry,time:Math.max(0,60*parseFloat(text))}});
                  }
                }}/>
              </Right>
            </CardItem>
            { this.props.profile.is_superuser &&
            <View>
              <CardItem>
                <Left>
                  <Text>User:</Text>
                </Left>
              </CardItem>
              <View padder>
                <Picker
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.entry.user}
                  //selectedValue="key2"
                  onValueChange={this.onUserChange.bind(this)}
                >
                  {this.props.users.map((user, index) => {
                    return (<Item label={user.username} value={user.pk} key={index}/>) 
                  })}
                </Picker>
              </View>
            </View>
            }
            <CardItem>
              <Left />
              <Right>
                <Button
                  onPress={this.onSave}
                >
                  <Text>{this.state.create? 'Create' : 'Save'}</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          {false &&
          <View>
          <Text>{this.props.navigation.state.params.pk}</Text>
          <Text>{JSON.stringify(this.state.entry)}</Text>
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
    ui: state.ui.entriesScreen,
    entries: state.entries,
    users: state.users,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(EditEntryScreen);