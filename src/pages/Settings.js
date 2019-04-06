import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , View , ScrollView }  from 'react-native';


export default class EditPage extends Component{
 


    static navigationOptions = ({ navigation }) => {
      return{
          title :  'Settings' ,
          headerStyle: {
            backgroundColor: '#303451',
          },
  
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerLeft :(
            <TouchableOpacity
            style = {styles.backButton}
            onPress = {() => {
              navigation.goBack()
              }}>
              <Image 
              style = {styles.backImage}
              source = {require('../assests/back.png')}/>
            </TouchableOpacity>
          ),
          
      }; 
  }
  
    render(){
        return(
            <View style = {styles.container}>
            <ScrollView>
                <TouchableOpacity
                style = {styles.buttonStyle}>
                    <Text style = {styles.textStyle}>Change Theme</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.buttonStyle}>
                    <Text style = {styles.textStyle}>Change Language</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.buttonStyle}>
                    <Text style = {styles.textStyle}>Management</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.buttonStyle}>
                    <Text style = {styles.textStyle}>Switch Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.buttonStyle}>
                    <Text style = {styles.textStyle}>Help</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.buttonStyle}>
                    <Text style = {styles.textStyle}>About Us</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : '#EDEFF2',
        paddingTop : 20,
    },
    backButton :{
        marginLeft : 12,
        height : 20,
        width: 20,
      },
    backImage : {
        width : 20,
        height : 20,
      },
    buttonStyle:{
      borderRadius : 10,
      height : 65,
      paddingHorizontal : 20,
      justifyContent : 'center',
      backgroundColor : '#F9F9F8',
      marginTop : 5,
      marginBottom : 10,
      marginLeft : 25,
      marginRight : 25,
      borderWidth : 4 ,
      elevation :3,
      // borderColor : 'rgba(132, 21, 43 , 1)',
      borderColor : 'rgba(119, 19, 39,.75)',
      
    },
    textStyle : {
      fontWeight: '400',
      color : '#606060',
      fontSize : 18
    }
})