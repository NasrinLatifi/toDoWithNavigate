import React, {Component} from 'react';
import {Platform, StyleSheet, Image, TouchableOpacity , View} from 'react-native';
import { createStackNavigator, createAppContainer , createDrawerNavigator } from 'react-navigation';
import DrawerScreen from '../components/DrawerScreen'

class Start extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Home',
         
          headerStyle: {
            backgroundColor: '#000066',
            },
  
          
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: 'center',
              alignSelf: 'center',
              justifyContent: "center",
              flex: 1,
              marginLeft : 20,
            },
            headerLeft: 
              <TouchableOpacity 
              style = {{marginRight : 20}}
              onPress={() =>navigation.toggleDrawer()}>
                  <Image source = {require('../assests/menu1.png')}/>
              </TouchableOpacity>,
        }
  
      };
    render(){
        return(
            <View style = {styles.container}>

            </View>
        )
    }
}


const RootStack = createStackNavigator(
    {
      Home: Start,
    //   Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
    }
  );


const MyDrawerNavigator = createDrawerNavigator(
    {
        home : RootStack ,
        },
        {
          drawerPosition : 'left',
          drawerType : 'slider',
          useNativeAnimations : 'true',
        //   drawerBackgroundColor : '#dddddd',
          contentComponent : DrawerScreen ,
          backBehavior : 'initialRoute',
        } ,
        {
          contentOptions: {
            activeTintColor: '#e91e63',
            itemsContainerStyle: {
              marginVertical:10,
            },
            iconContainerStyle: {
              opacity: 1
            }
          }
        },
        {
          initialRouteName: 'home',
        },
    );

    const AppContainer = createAppContainer(MyDrawerNavigator);
    export default class App extends Component {
      render() {
        return <AppContainer />;
      }
    }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: 'green',
    },
})



















