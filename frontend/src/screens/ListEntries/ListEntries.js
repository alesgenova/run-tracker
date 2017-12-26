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
  Form,
  List,
  Fab,
  Icon,
  View,
} from 'native-base';

import { FlatList, SectionList } from 'react-native';

import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation'

import { fakeLogout } from "../../actions/authActions";
import { fetchEntries, deleteEntry } from "../../actions/entriesActions";

import { Week } from '../../components/Week/Week';
import { Entry } from '../../components/Entry/Entry';
import { UserCard } from '../../components/UserCard/UserCard';



class EntriesScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Entries',
  }

  // Source: https://weeknumber.net/how-to/javascript
  getWeek = function (dateS) {
    console.log(dateS);
    let d = new Date(dateS+this.addTimezone());
    
    //d = new Date(+d);
    console.log(d);
    //return "asd-asd";
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    var yearStart = new Date(d.getFullYear(),0,1);
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    //return [d.getFullYear(), weekNo];
    return ""+d.getFullYear()+"-"+weekNo;
  }

  getWeekStart = function (dateS) {
    //let d = new Date(dateS+this.addTimezone());
    let d = new Date(dateS)
    //d = new Date(+d);

    //return "asd-asd";
    d.setTime(d.getTime()+d.getTimezoneOffset()*60000);
    d.setDate(d.getDate() - (d.getDay()));

    return d.toISOString();
   
  }

  addTimezone(){
    let date = new Date();
    let tz = date.getTimezoneOffset();
    let sign = tz > 0 ? "-" : "+";
    let hours = this._pad(Math.floor(Math.abs(tz)/60));
    let mins = this._pad(Math.floor(Math.abs(tz)%60));
    let tzS = sign+hours+mins
    return "T00:00:01"+tzS;
    //"T00:00:01"+this.utilsService.getTimezoneString();
  }

  _pad(n){
    return n < 10 ? "0"+n : n;
  }

  onLogout = () => {
    console.log("Logout Pressed");
    fakeLogout(this.props.dispatch);
  }

  groupByWeek(entries){
    if (entries.length == 0){
      return [];
    }
    let groupedEntries = [];
    let currWeek = "";
    let currGroup = []
    let totalDistance = 0;
    let totalTime = 0;
    for (let entry of entries){
      let entryWeek = this.getWeekStart(entry.date);
      if (currWeek == entryWeek){
        currGroup.push(entry);
        totalDistance += entry.distance;
        totalTime += entry.time;
      }else{
        if (currGroup.length > 0){
          groupedEntries.push({start:currWeek, distance: totalDistance, time:totalTime, data: currGroup});
        }
        currWeek = entryWeek;
        currGroup = [];
        currGroup.push(entry);
        totalDistance = entry.distance;
        totalTime = entry.time;
      }
    }
    if (currGroup.length > 0){
      groupedEntries.push({start:currWeek, distance: totalDistance, time:totalTime, data: currGroup});
    }
    console.log(groupedEntries);
    return groupedEntries;
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
    if (props.loggedIn){
      
    }else{
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

  componentDidMount(){
    this.setState({groupedEntries: this.groupByWeek(this.props.entries)});
  }

  constructor(props) {
    console.log("Constructing HomeScreen");
    super(props);
    this.checkLogin(props);
    if (props.loggedIn){
      fetchEntries(this.props.dispatch);
    }
    this.state = {groupedEntries: []};
  }

  onEditEntry = (pk) => {
    console.log("Edit Entry ", pk);
    this.props.navigation.navigate("EditEntry",{pk:pk})
  }

  onDeleteEntry = (pk) => {
    console.log("Delete Entry ", pk);
    deleteEntry(pk, this.props.dispatch);
  }

  onAddEntry = () => {
    console.log("Add Entry")
    this.props.navigation.navigate("EditEntry",{pk:-1})
  }



  render() {
    console.log("Rendering Home");
    console.log(this.props);
    return (
      <Container>
        <Content padder>
          {this.props.profile  &&
            <UserCard profile={this.props.profile} logout={this.onLogout} />
          }
          {this.props.entries  &&
            <SectionList 
              sections={this.groupByWeek(this.props.entries)}
              renderSectionHeader={({section}) => <Week week={section} />}
              renderItem={({item}) => <Entry entry={item} editFn={this.onEditEntry} deleteFn={this.onDeleteEntry}/>}
              keyExtractor={(item, index) => index}
            />
          }
          <View style={{height:100}} />
        </Content>
        <Fab
            //active={this.state.active}
            //direction="up"
            //containerStyle={{ }}
            style={{ backgroundColor: '#FFC400' }}
            position="bottomRight"
            onPress={this.onAddEntry}>
            <Icon name="add" />
          </Fab>
      </Container>

    );
  }
};


function mapStateToProps(state) {
  //return state.auth;
  return {
    ui: state.ui.entriesScreen,
    entries: state.entries,
    profile: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps)(EntriesScreen);