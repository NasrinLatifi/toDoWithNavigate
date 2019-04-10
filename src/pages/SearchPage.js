import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity ,  View , FlatList , TextInput , Animated }  from 'react-native';
import{connect} from 'react-redux';
import{ setSearchItem , setType , setRemoveItem , setItem , setStep} from '../service/FetchService/action';
import {ThemeContext} from '../components/ThemeContext'
import Icon from 'react-native-vector-icons/FontAwesome';

class Main extends Component {
  
  constructor (props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.state = {
      text : '',
      color : '#303451',
      
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
    const name = this.props.type;
    const step = this.props.step;
    const prps = this.props;
    const stt = this.state;
    this.props.navigation.setParams({name , step ,prps , stt});
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return{
        headerStyle: {
          backgroundColor: '#424770',
        },

        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerLeft :(
          <View style = {styles.headerLeftStyle}>
          <TouchableOpacity
          style = {styles.backButton}
          onPress = {() => {
            navigation.goBack(),
            params.prps.setType (params.name),
            params.prps.setStep (params.step)
            }}>
            <Image 
            style = {styles.backImage}
            source = {require('../assests/back.png')}/>
          </TouchableOpacity>

            <View style = {[styles.headerStyle , {justifyContent : 'space-between'}]}>
                
              <TextInput 
              placeholder = "Search"
              onChangeText = { (input) => {
                params.prps.setType(params.name)
                params.prps.setStep(params.step)
                params.prps.setSearchItem(input)
              
                
              }}
              style = {styles.textInputStyle} />
            </View>

            </View>
        ),
    }; 
}
  render(){
    let theme = this.context
      return(
        <View style = {[styles.container , {backgroundColor: theme.backgroundColor}]}>
              
                <View style = {styles.bodyStyle}>
                <FlatList
                      style = {styles.flatStyle}
                      data = {this.props.stepList}
                      extraData={theme}
                      keyExtractor = {item => item.id.toString()}
                      renderItem ={ ({item , index})  => 
                        <View style = {[styles.itemContainer , { backgroundColor : theme.itemColor, borderLeftColor : this.chooseColor(item.type)}]}>

                         <View style = {[styles.bottomContainer , styles.justPadding]}>
                            <TouchableOpacity style = {styles.textBodyContainer}
                            onPress = {() => this.showFullText(item)}>

                              <View style = {[styles.roundStyle , {borderColor : theme.backgroundColor , backgroundColor : this.chooseColor(item.type)}]} />
                              <Text style = {[styles.textBody , {color : theme.fontColor}]} ellipsizeMode='middle' numberOfLines={1} >{item.text}</Text>
                            </TouchableOpacity>  
                          </View>

                          {
                           ( this.props.step === 'None') &&
                          <View style = {styles.bottomContainer}>

                                 <TouchableOpacity 
                                  style = {[styles.buttonTempStyle , { backgroundColor : theme.redButton ,borderColor :theme.fontColor}]}
                                  onPress ={() => this.props.setRemoveItem(item.id)}>
                                  <Icon name="trash" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                                  
                                </TouchableOpacity>
                                <TouchableOpacity style = {[styles.buttonTempStyle , { backgroundColor : theme.blueButton ,borderColor :theme.fontColor}]}
                                 onPress ={() => this.props.navigation.navigate("Edit" ,{"item" : item})}
                                 >
                                  <Icon name="edit" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                style = {[styles.buttonTempStyle , { backgroundColor : theme.redButton , borderColor :theme.fontColor}]}
                                // onPress ={() => this.props.setRemoveItem(item.id)}
                                >
                                <Icon name="close" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                style = {[styles.buttonTempStyle , { backgroundColor : theme.blueButton , borderColor :theme.fontColor}]}
                                // onPress ={() => this.props.setRemoveItem(item.id)}
                                >
                                <Icon name="check" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                                </TouchableOpacity>
                              
                          </View>
                        }

{
                           !(this.props.step === 'None') &&
                          <View style = {styles.bottomContainer}>

                                 <TouchableOpacity 
                                  style = {[styles.buttonTempStyle , { backgroundColor : theme.redButton ,borderColor :theme.fontColor}]}
                                  onPress ={() => this.props.setRemoveItem(item.id)}>
                                  <Icon name="trash" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                                  
                                </TouchableOpacity>
                                <TouchableOpacity style = {[styles.buttonTempStyle , { backgroundColor : theme.blueButton ,borderColor :theme.fontColor}]}
                                 onPress ={() => this.props.navigation.navigate("Edit" ,{"item" : item})}
                                 >
                                  <Icon name="edit" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                                </TouchableOpacity>
                          </View>
                        }

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
    stepList : state.fetchReducer.selectedItem,
    type : state.fetchReducer.type,
    step :state.fetchReducer.step,
  }
}

export default connect(mapStateToProps ,{setSearchItem , setType , setRemoveItem , setItem , setStep})(Main)

Main.contextType = ThemeContext;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#E8EAED',  
    },
    headerLeftStyle :{
      flexDirection : 'row',
      alignItems : 'center'
    },
    backButton :{
      marginLeft : 12,
      height : 20,
      width: 20,
    },
    headerStyle :{
      flexDirection: 'row', 
      alignItems: 'center',
       marginLeft : 20
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
