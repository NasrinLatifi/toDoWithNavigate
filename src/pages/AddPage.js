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

    setText(input ){
        
        if( input.length > 0 ){
            this.setState ({text : input})
      }
    }
   
    render(){
        const { navigation } = this.props;
        const type = navigation.getParam('type', 'All');
        return(
            <View style = {styles.container}>
                <View style = {[styles.headerStyle , {justifyContent : 'space-between'}]}>
            
                    <View style = {styles.headerStyle}>
                        <TouchableOpacity 
                          style = {styles.drawerBotton}
                           onPress={() => {
                            this.props.navigation.navigate(type , {name : type})
                             }}
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
                     placeholder = "Write your Task =)"
                     style = {styles.textInputStyle}
                     onChangeText = {this.setText.bind(this )}>
                    </TextInput>

                </View>

                <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                      style = {styles.addStyle}
                      onPress ={ () => {
                            if( this.state.text.length > 0 ){
                                this.props.setItem(this.state.text , type)
                                this.props.navigation.navigate(type , {name : type})
                            }
                            }
                        }
                        style = {styles.addStyle}>
                          <Image 
                          style = {styles.addImageStyle}
                          source = {require('../assests/done.png')}/>
                </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default connect(null ,{ setItem})(AddPage)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
    },
    addStyle : {
        backgroundColor:'#000066',
        width : 60,
        height :60,
        borderRadius : 50,
        alignItems : 'center',
        justifyContent : 'center',
        // position : 'absolute',
        zIndex : 1
      }, 
      buttonContainer : {
        marginTop : 10,
        alignItems : 'center',
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
          height : 300,
          backgroundColor : "#e6f2ff",
          margin : 40,
          borderRadius : 20,
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
          backgroundColor: '#000066',
          // flex : 1,
          height : 60,
          alignItems: 'center',
      },
      imageStyle: {
        width : 27,
        height : 27,
      },
})