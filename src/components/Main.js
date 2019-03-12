import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , View , FlatList , Animated , TextInput}  from 'react-native';
import{connect} from 'react-redux';
import{ setSearchItem , setType , setRemoveItem , setItem} from '../service/action';


class Main extends Component {

  constructor (props) {
    super(props)
    this.state = {
      spinValue : new Animated.Value(0),
      search : false,
      text : '',
      
    }
    
  }

  goBack(type) {
    this.props.setType (type),
      this.setState ({
        text : '',
        search : false,
      })
  }

  setText(input ){
    this.setState ({text : input})
    if( input.length > 0 ){
      this.props.setSearchItem (input)
  }
}
settingSearch (){
  
  this.setState ({search : true})
}

  componentDidMount (){
    this.spin()
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

    render(){
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'All');
        return(
            <View style = {styles.container}>
            
                {
                  !this.state.search && 

                    <View style = {[styles.headerStyle , {justifyContent : 'space-between'}]}>
                    
                      <View style = {styles.headerStyle}>
                          <TouchableOpacity 
                          style = {styles.drawerBotton}
                          onPress={() =>navigation.toggleDrawer()}>
                              <Image source = {require('../assests/menu1.png')}/>
                          </TouchableOpacity>
                          <Text style = {styles.headerText}>{name}</Text>
                      </View>

                      <View style = {[styles.headerStyle , {justifyContent : 'flex-end'}]}>
                          <TouchableOpacity 
                          onPress = {this.settingSearch.bind(this)}
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

                      
                  </View>
                }

                {
                  this.state.search && 
                    <View style = {[styles.headerStyle , {justifyContent : 'space-between'}]}>
                         <TouchableOpacity 
                          style = {styles.drawerBotton}
                          onPress={ this.goBack.bind(this , name) }>
                              <Image source = {require('../assests/back.png')}
                              style = {styles.imageStyle}/>
                          </TouchableOpacity>

                          <TextInput 
                          //  value = {state.text}
                           placeholder = "Search"
                           onChangeText = {this.setText.bind(this)}
                          style = {styles.textInputStyle} />
                      
                    </View>
                }

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
                      data = {this.props.items}
                      keyExtractor = {item => item.text}
                      renderItem ={ ({item , index})  => 
                        <View style = {styles.itemContainer}>
                            <Text style = {styles.textBody} >{item.text}</Text>
                            <View style = {styles.bottomContainer}>
                              <TouchableOpacity style = {styles.editStyle}>
                                <Text style = {styles.textStyle} >Edit</Text>
                              </TouchableOpacity>
                              <TouchableOpacity 
                              onPress ={() => this.props.navigation.navigate("Add" ,{"type" : name})}
                              style = {styles.deleteStyle}>
                                <Text style = {styles.textStyle}>Delete</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
                        }   />
                      <TouchableOpacity 
                      style = {styles.addStyle}
                        onPress = {() => this.props.setItem("text" , name )}
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
      items : state.selectedItem,
      loading : state.loading
  }
}

export default connect(mapStateToProps ,{setSearchItem , setType , setRemoveItem , setItem})(Main)


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    addStyle : {
      backgroundColor:'white',
      width : 60,
      height :60,
      borderRadius : 50,
      alignItems : 'center',
      justifyContent : 'center',
      position : 'absolute',
      left:15,
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
        backgroundColor: '#000066',
        // flex : 1,
        height : 60,
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
    drawerBottonRight :{
      marginRight : 15,
    },
    animatedStyle : {
      flex : 9,
      alignItems : 'center',
      justifyContent : 'center',
    },
    itemContainer :{
      alignItems : 'center',
      justifyContent : 'space-between',
      flexDirection : 'row',
      borderRadius : 25 ,
      height : 90,
      backgroundColor : '#e6f2ff',
      marginTop : 10,
      marginBottom : 10,
      marginLeft : 25,
      marginRight : 25,
      elevation : 6
    },
    loadingImage :{
      height : 100,
      width : 100,
    },
    textBody : {
      marginLeft : 25,
      fontSize : 23,
      fontWeight : '300',
      textShadowColor: 'rgba(0, 35, 77, 0.1)',
      textShadowOffset: {width: -3, height: 5},
      textShadowRadius: 4
    },
    bottomContainer :{
        marginRight : 20,
        alignItems : 'center',
        justifyContent : 'space-between',
        height : 65,
        width :70,
    },
    textStyle : {
      fontSize : 17,
      fontWeight : '200',
      color : 'white'
    },
    editStyle :{
      width : 60,
      height : 30,
      backgroundColor : '#003577',
      alignItems : 'center',
      justifyContent : 'center',
      borderRadius : 25 ,
    
      
    },
    deleteStyle :{
      width : 60,
      height : 30,
      backgroundColor : '#aa0000',
      alignItems : 'center',
      justifyContent : 'center',
      borderRadius : 25 ,
      
    }
})
