import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , Alert , View , FlatList , Animated , Dimensions}  from 'react-native';
import{connect} from 'react-redux';
import{ setSearchItem , setType , setRemoveItem , setItem , setStep , editStep} from '../service/FetchService/action';
import {ThemeContext} from '../components/ThemeContext'
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from '../components/MainItem'
import { SwipeListView , SwipeRow } from 'react-native-swipe-list-view';
const dim = Dimensions.get('window')
class Main extends Component {
  
  constructor (props) {
    super(props)
    this.setScrollEnabled = this.setScrollEnabled.bind(this);
    this.state = {
      spinValue : new Animated.Value(0),
      opacityValue : new Animated.Value(0),
      text : '',
      color : '#303451',
      name : '',
      enable: true,
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
    this.props.setStep('None')
    this.spin()
    this.opacity()
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

  opacity () {
    this.state.opacityValue.setValue(0)
    Animated.timing(
      this.state.opacityValue,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start()

  }

  componentWillMount(){
    this.props.setType(this.props.type)
    this.props.setStep('None')
    const name = this.props.type;
    this.props.navigation.setParams({name});
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return{
        title : params ?  (params.name? params.name : 'ALL') : '' ,
        
        
        headerStyle: {
          backgroundColor: '#424770',
        },

        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '500',
          fontFamily: 'sans-serif-medium',
          fontSize : 25
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

setScrollEnabled(enable) {
  this.setState({
    enable,
  });
}

renderItem(item) {
  return (
    <Item
      item={item}
      navigation = {this.props.navigation}
      setScrollEnabled={enable => this.setScrollEnabled(enable)}
    />
  );
}
    render(){
      const opacity = this.state.opacityValue.interpolate({
        inputRange: [0,  1],
        outputRange: [0, 1]
      })
        let theme = this.context
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return(
            <Animated.View style = {[styles.container , {backgroundColor: theme.backgroundColor}]}>
             
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
                      data = {this.props.stepList}
                      extraData={theme}
                      keyExtractor = {item => item.id.toString()}
                      renderItem={({item}) => this.renderItem(item)}
                      scrollEnabled={this.state.enable}
                      />
                      <TouchableOpacity 
                      onPress ={() => this.props.navigation.navigate("Add" ,{"name" : this.props.type})}
                        style = {styles.addStyle}>
                          <Icon name="plus-circle" class="fas fa-coffee fa-2x" size={70} color={theme.redButton} />
                        </TouchableOpacity>
                      
                  </View>
                }
                
            </Animated.View>
            
        )
    }
}

const mapStateToProps=(state)=>{
  return{
    stepList : state.fetchReducer.stepList,
    loading : state.fetchReducer.loading,
    type : state.fetchReducer.type,
  }
}


export default connect(mapStateToProps ,{setSearchItem , setType , setRemoveItem , setItem , setStep , editStep})(Main)

Main.contextType = ThemeContext;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#E8EAED',  
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 35,
    },
    editBack :{
      alignItems: 'flex-end',
     
      justifyContent : 'center',
      width : dim.width - 200 ,
      height : 100,
      borderRadius : 10,
      backgroundColor : 'green'
    },
    deleteBack :{
      justifyContent : 'center',
      alignItems: 'center',
      width : 100,
      height : 60,
      borderTopRightRadius : 10,
      borderBottomRightRadius : 10,
      backgroundColor : 'red'
    },
    addStyle : {
      backgroundColor:'white',
      width : 60,
      height :60,
      borderRadius : 50,
      alignItems : 'center',
      justifyContent : 'center',
      position : 'absolute',
      right:10,
      bottom:50,
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

})
