import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , Alert , View , FlatList , Animated , TextInput}  from 'react-native';
import{connect} from 'react-redux';
import{ setSearchItem , setType , setRemoveItem , setItem} from '../service/FetchService/action';

class Main extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      spinValue : new Animated.Value(0),
      text : '',
      color : '#303451',
      name : 'Alaki',
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

  componentDidMount (){
    this.spin()
  }

  showFullText (item){
    Alert.alert( "created at :" + item.date.toString(), item.text );
  }

  spin () {
    this.state.spinValue.setValue(0)
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start(() => this.spin())

  }

  componentWillMount(){
    this.props.setType(this.props.type)
    const name = this.props.type;
    this.props.navigation.setParams({name});
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return{
        title : params ?  (params.name? params.name : 'ALL') : '' ,
        headerStyle: {
          backgroundColor: '#303451',
        },

        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerRight: (
          <View style = {[styles.headerStyle , {justifyContent : 'flex-end'}]}>
            <TouchableOpacity 
             onPress = {() => {navigation.navigate('Search')}}
            style = {styles.drawerBottonRight}>
              <Image 
                style = {styles.searchStyle}
                source = {require('../assests/search.png')}/>
            </TouchableOpacity>

            <TouchableOpacity 
            style = {styles.drawerBottonRight}>
                <Image 
                style = {styles.threeStyle}
                source = {require('../assests/3.png')}/>
            </TouchableOpacity>
         </View>
         
        ),
        headerLeft :(
          <TouchableOpacity 
          style = {styles.drawerBotton}
          onPress={() =>navigation.toggleDrawer()}>
              <Image source = {require('../assests/menu1.png')}/>
          </TouchableOpacity>
        ),

    }; 
}
    render(){
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return(
            <View style = {styles.container}>
             
                {
                  this.props.loading && 
                    <View style = {styles.animatedStyle}>
                        <Animated.Image 
                        style = {[styles.loadingImage , {  transform: [{rotate: spin }]}]}
                        source = {require ('../assests/loading1.png')} />

                    </View>
                }
                {
                  !this.props.loading &&  
                  <View style = {styles.bodyStyle}>
                    <FlatList
                      style = {styles.flatStyle}
                      data = {this.props.selectedItem}
                      keyExtractor = {item => item.id.toString()}
                      renderItem ={ ({item , index})  => 
                        <View style = {[styles.itemContainer , { borderLeftColor : this.chooseColor(item.type) }]}>

                         <View style = {[styles.bottomContainer , styles.justPadding]}>
                            <TouchableOpacity style = {styles.textBodyContainer}
                            onPress = {() => this.showFullText(item)}>

                              <View style = {[styles.roundStyle , { backgroundColor : this.chooseColor(item.type)}]} />
                              <Text style = {styles.textBody} ellipsizeMode='middle' numberOfLines={1} >{item.text}</Text>
                            </TouchableOpacity>  
                          </View>

                          <View style = {styles.bottomContainer}>
                                <TouchableOpacity style = {styles.buttonTempStyle}
                                 onPress ={() => this.props.navigation.navigate("Edit" ,{"item" : item})}
                                 >
                                  <Image source = {require('../assests/edit.png')}
                                  style = {styles.imageButtonStyle}/>
                                  <Text style = {styles.iconText}>Edit</Text>
                                </TouchableOpacity>
                              
                                <TouchableOpacity 
                                style = {styles.buttonTempStyle}
                                onPress ={() => this.props.setRemoveItem(item.id)}>
                                  <Image source = {require('../assests/delete-button.png')}
                                  style = {styles.imageButtonStyle}/>
                                  <Text  style = {styles.iconText}>Delete</Text>
                                </TouchableOpacity>
                              
                          
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
                }
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
  return{
    selectedItem : state.fetchReducer.selectedItem,
    loading : state.fetchReducer.loading,
    type : state.fetchReducer.type,
  }
}

export default connect(mapStateToProps ,{setSearchItem , setType , setRemoveItem , setItem})(Main)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#E8EAED',  
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
    headerStyle :{
        flexDirection: 'row', 
        alignItems: 'center',
    },
    bodyStyle : {
        flex : 9,
        marginTop : 2
    },
    headerText : {
      marginLeft : 20,
      fontWeight: 'bold',
      color : 'white',
      fontSize : 25,
    },
    drawerBotton : {
      marginLeft : 15
    },
    imageStyle: {
      width : 27,
      height : 27,
    },
    textInputStyle : {
      backgroundColor : 'white',
      marginRight : 15,
      width : 300,
      height : 40,
      borderRadius : 20,
    },
    iconText :{
      color : '#707070',
      marginLeft : 5 ,
      fontSize : 15
    },
    drawerBottonRight :{
      marginRight : 15,
    },
    animatedStyle : {
      flex : 9,
      alignItems : 'center',
      justifyContent : 'center',
    },
    loadingImage :{
      height : 100,
      width : 100,
    },
    justPadding :{
      paddingRight : 20
    },
    itemContainer :{
      borderRadius : 10 ,
      // height : 120,
      flex :1 ,
      paddingHorizontal : 20,
      justifyContent : 'space-between',
      backgroundColor : '#F9F9F8',
      marginTop : 10,
      marginBottom : 10,
      marginLeft : 25,
      marginRight : 25,
      borderLeftWidth : 10 ,
      // borderBottomWidth : 3,
      elevation :3,
    },
    bottomContainer :{
      flexDirection: 'row', 
        flex : 1,
        paddingVertical : 5,
        alignItems : 'center',
        justifyContent : 'center',
    },
    imageButtonStyle : {
      width : 23,
      height : 23,
    },
    textBodyContainer : {
      flexDirection: 'row', 
      flex :3,
      paddingTop : 10,
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
      color : '#707070',
      fontFamily: "vincHand",
    },
    buttonTempStyle :{
      borderColor : '#707070',
      width : 90,
      height : 40,
      alignItems : 'center',
      justifyContent : 'center',
      borderWidth : 1 , 
      borderRadius : 10,
      marginRight : 10,
      marginLeft : 10,
      marginBottom : 10,
      flexDirection : 'row',
      
      // backgroundColor : '#E8EAED',
    }
})
