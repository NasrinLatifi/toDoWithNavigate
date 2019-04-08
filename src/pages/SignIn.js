import React, {Component} from 'react';
import {Image , StyleSheet, Text, View , Dimensions , TouchableOpacity} from 'react-native';
import { createSwitchNavigator, createAppContainer  } from 'react-navigation';

export default class SingIn extends Component{
      
 

    render(){
        return(
            <View style = {styles.container}>
               <Text style = {styles.textStyle}>Note Me</Text>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor :'#fb9600',
        justifyContent : 'center',
        alignItems : 'center',
    },
  
    textStyle : {
        fontWeight : '500',
        color : '#F9F9F8',
        fontSize : 20,
        fontFamily : 'cursive'
      },
})