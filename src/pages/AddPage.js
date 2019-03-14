import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , View , TextInput}  from 'react-native';
import{connect} from 'react-redux'
import{ setItem} from '../service/action'

 class AddPage extends Component{
    constructor (props) {
        super(props)
        this.state = {
          text : '',
         
        } 
      }

      chooseColor(type) {
        switch (type) {
          case "Work":
            return "#877C92";
    
          case 'Family':
            return "#B75D69";
    
          case 'Study':
            return "#9C7C8B";
    
          case 'Wish':
            return "#DAB1BD";
          
          default:
            return '#AFADB2';
    
        }
      }

    setText(input ){
        
         this.setState ({text : input})
      
    }
    onPressBack (type) {
      this.setState ({text : ''})
      this.props.navigation.navigate(type , {name : type})
    }
    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      
      return{
          // title: navigation.getParam('name', 'NO-ID'),
          title : params ?  params.name : 'A Nested Details Screen' ,
          headerStyle: {
              backgroundColor: '#ffffe6',
            },
            headerTintColor: '#999999',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
      }; 
  }

    
    pressButton (navigation, type) {
      if( this.state.text.length > 0 ){

        this.props.setItem(this.state.text , type)
        this.setState ({text : ''})
        navigation.navigate(type , {name : type})
    }
    }
   
    render(){
        const { navigation } = this.props;
        const type = navigation.getParam('name', 'All');
      
        return(

            <View style = {styles.container}>
              <View style = {[styles.headerStyle , {justifyContent : 'space-between'}]}>
            
                    <View style = {styles.headerStyle}>
                        <TouchableOpacity 
                          style = {styles.drawerBotton}
                           onPress={this.onPressBack.bind(this, type)}
                          >
                              <Image source = {require('../assests/back.png')}
                              style = {styles.imageStyle} />
                          </TouchableOpacity>
                        <Text style = {styles.headerText}>{type}</Text>
                    </View>

                    <View style = {[styles.headerStyle , {justifyContent : 'flex-end'}]}>
            
                        <TouchableOpacity 
                        style = {styles.drawerBottonRight}>
                            <Image 
                            style = {styles.threeStyle}
                            source = {require('../assests/3.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View  style= {styles.inputContainer}>
                    <TextInput
                     value = {this.state.text}
                     placeholder = "Write your Task =)"
                     style = {[styles.textInputStyle , {borderColor : this.chooseColor(type)}]}
                     onChangeText = {this.setText.bind(this )}>
                    </TextInput>

                </View>

                {/* <View style = {styles.buttonContainer}> */}
                <TouchableOpacity 
                      style = {styles.addStyle}
                      onPress ={this.pressButton.bind(this,navigation,type) }
                        style = {styles.addStyle}>
                          <Image 
                          style = {styles.addImageStyle}
                          source = {require('../assests/done.png')}/>
                </TouchableOpacity>
                {/* </View> */}

            </View>
        )
    }
}

export default connect(null ,{ setItem})(AddPage)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#E8EAED',  
    },
    addStyle : {
        backgroundColor:'#771327',
        width : 60,
        height :60,
        borderRadius : 50,
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        right:15,
        bottom:40,
        zIndex : 1
      }, 
      buttonContainer : {
        marginTop : 25,
        alignItems : 'flex-end',
        marginRight : 10,
        justifyContent : 'center',
      },

      addImageStyle : {
        width : 40,
        height :40,
        borderRadius : 50,
      },
    headerText : {
        marginLeft : 20,
        fontWeight: 'bold',
        color : 'white',
        fontSize : 25,
      },

      textInputStyle :{
          height : 100,
          fontSize: 20,
          margin : 40,
          borderRadius : 10,
          backgroundColor : 'white',
          borderWidth : 5,
      },
    searchStyle : {
        width : 38,
        height : 38
      },
      threeStyle : {
        width : 20,
        height : 20
      },
      drawerBotton : {
        marginLeft : 15
      },
      drawerBottonRight :{
        marginRight : 15,
      },
      threeStyle : {
        width : 20,
        height : 20
      },
      inputContainer :{
        alignContent  : 'center',
      },
      headerStyle :{
          flexDirection: 'row', 
          backgroundColor: '#303451',
          // flex : 1,
          height : 60,
          alignItems: 'center',
      },
      imageStyle: {
        width : 27,
        height : 27,
      },
})