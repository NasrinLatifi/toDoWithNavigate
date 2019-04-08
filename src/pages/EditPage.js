import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , View , TextInput}  from 'react-native';
import{connect} from 'react-redux'
import{ editTask , setType} from '../service/FetchService/action'
import {ThemeContext} from '../components/ThemeContext'


 class EditPage extends Component{
    constructor (props) {
        super(props)
        this.state = {
          text : '',
          item : null,
          type : '',
          navigation : null
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

      setText(input) {
          this.setState({text : input})
      }
      
      pressButton (){
        this.setState({type : this.props.type})
        const text = this.state.text
        const id = this.state.item.id
        if( this.state.text.length > 0 ){
          this.props.editTask (id , text , this.state.item)
          this.state.navigation.goBack()
        }
       
       }

      componentWillMount(){
        
        const prps = this.props;
        const item = this.props.navigation.getParam('item', 'error'); 
        const name = item.type;
        this.setState({item : item})
        this.setState({text : item.text})
        this.setState({navigation : this.props.navigation})
        this.props.navigation.setParams({name ,prps });
      }


    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return{
          title : params ?  params.name? params.name : 'ALL' : 'All Alaki' ,
          headerStyle: {
            backgroundColor: '#424770',
          },
  
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '500',
            fontFamily: 'sans-serif-medium',
            fontSize : 25
          },

          headerLeft :(
            <TouchableOpacity
            style = {styles.backButton}
            onPress = {() => {
              params.prps.setType (params.name),
              navigation.goBack()
              }}>
              <Image 
              style = {styles.backImage}
              source = {require('../assests/back.png')}/>
            </TouchableOpacity>
          ),
          
          headerRight : (
            <TouchableOpacity 
                style = {styles.drawerBottonRight}>
                    <Image 
                    style = {styles.threeStyle}
                    source = {require('../assests/3.png')}/>
            </TouchableOpacity>
          ),
 
  
      }; 
  }
  
   
    render(){
        const type = this.state.item.type
        let theme = this.context
        return(

          <View style = {[styles.container , {backgroundColor: theme.backgroundColor}]}>
                <View  style= {styles.inputContainer}>
                    <TextInput
                     value = {this.state.text}
                     placeholder = "Write your Task =)"
                     style = {[styles.textInputStyle , { backgroundColor : theme.itemColor ,borderColor : this.chooseColor(type)}]}
                     onChangeText = {this.setText.bind(this )}>
                    </TextInput>

                </View>

                <TouchableOpacity 
                      style = {styles.addStyle}
                      onPress ={this.pressButton.bind(this) }
                        style = {styles.addStyle}>
                          <Image 
                          style = {styles.addImageStyle}
                          source = {require('../assests/done.png')}/>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps=(state)=>{
  return{
    selectedItem : state.fetchReducer.selectedItem,
    type : state.fetchReducer.type,
  }
}


export default connect(mapStateToProps ,{ editTask , setType})(EditPage)
EditPage.contextType = ThemeContext;
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
      backButton :{
        marginLeft : 12,
        height : 20,
        width: 20,
      },
      backImage : {
        width : 20,
        height : 20,
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
        paddingLeft :15,
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