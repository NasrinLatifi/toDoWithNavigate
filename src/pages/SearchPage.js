import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity ,  View , FlatList , TextInput }  from 'react-native';
import{connect} from 'react-redux';
import{ setSearchItem , setType , setRemoveItem , setItem} from '../service/action';

class Main extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      text : '',
      color : '#303451',
      cleanText(){
        this.text = ''
      } 
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

  


  componentWillMount(){
    // this.props.setType(this.props.type)
    const name = this.props.type;
    const prps = this.props;
    const stt = this.state;
    this.props.navigation.setParams({name ,prps , stt});
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return{
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
            navigation.goBack(),
            params.prps.setType (params.name)
            // params.stt.cleanText()
            }}>
            <Image 
            style = {styles.backImage}
            source = {require('../assests/back.png')}/>
          </TouchableOpacity>
        ),

        headerRight: (
         
          <View style = {[styles.headerStyle , {justifyContent : 'space-between'}]}>
    
            <TextInput 
            placeholder = "Search"
            // value = {params.stt.text}
            onChangeText = { (input) => {
              params.prps.setType(params.name)
              params.prps.setSearchItem(input)
             
              
            }}
            style = {styles.textInputStyle} />
        </View>
           
        ),
    
    }; 
}
  
  

    render(){
        
        return(
            <View style = {styles.container}>
               
                  <View style = {styles.bodyStyle}>
                    
                  
                    <FlatList
                      style = {styles.flatStyle}
                      data = {this.props.selectedItem}
                      keyExtractor = {item => item.id.toString()}
                      renderItem ={ ({item , index})  => 
                        <View style = {[styles.itemContainer , { borderLeftColor : this.chooseColor(item.type) }]}>

                          
                          <TouchableOpacity style = {styles.textBodyContainer}
                          onPress = {() => this.showFullText(item)}>

                            <View style = {[styles.roundStyle , { backgroundColor : this.chooseColor(item.type)}]} />
                            <Text style = {styles.textBody} >{item.text.slice(0,25)}{item.text.length>25 && "..." }</Text>
                          </TouchableOpacity>  
                          

                          <View style = {styles.bottomContainer}>
                              <TouchableOpacity style = {[styles.buttonTempStyle , {borderColor : this.chooseColor(item.type) }]}>
                                <Image source = {require('../assests/edit.png')}
                                style = {styles.imageButtonStyle}/>
                              </TouchableOpacity>
                              <View style = {[styles.buttonTempStyle , {borderColor : this.chooseColor(item.type) }] }>
                                <TouchableOpacity 
                                onPress ={() => this.props.setRemoveItem(item.id)}>
                                  <Image source = {require('../assests/delete-button.png')}
                                  style = {styles.imageButtonStyle}/>
                                </TouchableOpacity>
                              </View>
                          
                          </View>

                        </View>
                        }   />
                      <TouchableOpacity 
                      style = {styles.addStyle}
                      onPress ={() => this.props.navigation.navigate("Add" ,{"name" : this.props.type})}
                        style = {styles.addStyle}>
                          <Image 
                          style = {styles.addImageStyle}
                          source = {require('../assests/plus.png')}/>
                        </TouchableOpacity>
                      
                  </View>
                
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
  return{
    selectedItem : state.selectedItem,
    type : state.type,
  }
}

export default connect(mapStateToProps ,{setSearchItem , setType , setRemoveItem , setItem})(Main)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#E8EAED',  
    },
    backButton :{
      marginLeft : 12,
      height : 20,
      width: 20,
    },
    headerStyle :{
      flexDirection: 'row', 
      alignItems: 'center',
      marginRight : 25
  },
  textInputStyle : {
      paddingLeft :15,
      backgroundColor : 'white',
      marginRight : 15,
      width : 300,
      height : 40,
      borderRadius : 20,
    },
    backImage : {
      width : 20,
      height : 20,
    },
    addStyle : {
      backgroundColor:'white',
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
    addImageStyle : {
      width : 60,
      height :60,
      borderRadius : 50,
    },
    flatStyle : {
      alignContent  : 'center',
      marginTop : 10,
      zIndex:-1
    },
    searchStyle : {
      width : 38,
      height : 38
    },
    threeStyle : {
      width : 20,
      height : 20
    },
 
    bodyStyle : {
        flex : 9,
        marginTop : 2
    },
    drawerBotton : {
      marginLeft : 15
    },
    imageStyle: {
      width : 27,
      height : 27,
    },

    itemContainer :{
      borderRadius : 10 ,
      height : 120,
      backgroundColor : '#F9F9F8',
      marginTop : 10,
      marginBottom : 10,
      marginLeft : 25,
      marginRight : 25,
      borderLeftWidth : 10 ,
      elevation :3,

    },
   
    bottomContainer :{
      flexDirection: 'row', 
        flex : 1,
        marginRight : 15,
        marginLeft : 15,
        marginBottom : 10,
        alignItems : 'center',
        justifyContent : 'center',
      
    },
    imageButtonStyle : {
      width : 20,
      height : 20,
    },
   
    textBodyContainer : {
      flexDirection: 'row', 
      flex :3,
      marginLeft : 25,
      marginRight : 10,
      marginBottom : 15,
      alignItems : 'center',
    },
    roundStyle :{
      width :10,
      height :10,
      marginRight : 5,
      borderRadius : 50, 
    },
    textBody : {
      fontSize : 23,
      fontWeight : '300',
      color : '#606060'
    },
    buttonTempStyle :{
      width : 60,
      height : 35,
      alignItems : 'center',
      justifyContent : 'center',
      borderWidth : 3 , 
      borderRadius : 10,
      marginRight : 10,
      marginLeft : 10,
      marginBottom : 10,
      // backgroundColor : '#E8EAED',

    }
    
})
