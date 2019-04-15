import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, PanResponder , Animated , Alert} from 'react-native';
import{ setSearchItem , setType , setRemoveItem , setItem , setStep , editStep} from '../service/FetchService/action';
import Icon from 'react-native-vector-icons/FontAwesome';
import{connect} from 'react-redux';
import {ThemeContext} from '../components/ThemeContext'

const dim = Dimensions.get('window')
 class MainItem extends Component {
    constructor(props) {
        super(props);
    
        this.gestureDelay = -35;
        this.scrollViewEnabled = true;
    
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderMove: (evt, gestureState) => {
            if ( gestureState.dx < -35 ) {
            //   this.setScrollViewEnabled(false);
              let newX = gestureState.dx + this.gestureDelay;
              position.setValue({x: newX, y: 0});
            }
          },
          onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > -150) {
              Animated.timing(this.state.position, {
                toValue: {x: 0, y: 0},
                duration: 150,
                useNativeDriver: true
              }).start(() => {
                this.setScrollViewEnabled(true);
              });
            } else {
              Animated.spring(this.state.position, {
                toValue: {x: -180, y: 0},
                damping : 10,
                useNativeDriver: true
              }).start(() => {
                this.setScrollViewEnabled(true);
              });
            }
          },
        });
    
        this.panResponder = panResponder;
        this.state = { panResponder , position};
      }
    
      setScrollViewEnabled(enabled) {
        if (this.scrollViewEnabled !== enabled) {
          this.props.setScrollEnabled(enabled);
          this.scrollViewEnabled = enabled;
        }
      }
      setScrollViewEnabled(enabled) {
        if (this.scrollViewEnabled !== enabled) {
          this.props.setScrollEnabled(enabled);
          this.scrollViewEnabled = enabled;
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
      
  showFullText (item){
    Alert.alert( "created at :" + item.date.toString(), item.text );
  }

    render(){
        const item = this.props.item;
        let theme = this.context;
        let handler = this.state.panResponder.panHandlers
        return(
            <View style = {styles.flatStyle} >

                <View style = {styles.absoluteCell}>
                    <View style = {[styles.editBack ,  { backgroundColor : theme.blueButton}]}>
                        <TouchableOpacity 
                            style = {[styles.editBack ,  {  padding : 35 , backgroundColor : theme.blueButton}]}
                            onPress ={() => this.props.navigation.navigate("Edit" ,{"item" : item})}
                            >
                            <Icon name="edit" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                            
                          </TouchableOpacity>
                                    
                        </View>
                        <View style = {[styles.deleteBack , {backgroundColor : theme.redButton}]}>
                            <TouchableOpacity 
                                style = {[styles.deleteBack , {backgroundColor : theme.redButton}]}
                                onPress ={() =>
                                this.props.setRemoveItem(item.id)}
                            >
                                <Icon name="trash" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} /> 
                            </TouchableOpacity>
                        </View>
                     </View>

                <Animated.View style = {[styles.itemContainer , { transform: [{ translateX: this.state.position.x }, { translateY: this.state.position.y }] ,backgroundColor : theme.itemColor, borderLeftColor : this.chooseColor(item.type)}]} {...handler}>
               

                <View style = {[styles.bottomContainer , styles.justPadding]}>
                    <TouchableOpacity style = {styles.textBodyContainer}
                        onPress = {() => this.showFullText(item)}>

                        <View style = {[styles.roundStyle , {borderColor : theme.backgroundColor , backgroundColor : this.chooseColor(item.type)}]} />
                        <Text style = {[styles.textBody , {color : theme.fontColor}]} ellipsizeMode='middle' numberOfLines={1} >{item.text}</Text>
                    </TouchableOpacity>  
                </View>

                <View style = {styles.bottomContainer}>
                    
                    <TouchableOpacity 
                    style = {[styles.buttonTempStyle , { backgroundColor : theme.redButton , borderColor :theme.fontColor}]}
                    onPress ={() => this.props.editStep(item.id , 'Close' , item)}
                    >
                    <Icon name="close" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style = {[styles.buttonTempStyle , { backgroundColor : theme.blueButton , borderColor :theme.fontColor}]}
                    onPress ={() => this.props.editStep(item.id , 'Done' , item)}
                    >
                    <Icon name="check" class="fas fa-coffee fa-sm" size={23} color={theme.iconColor} />
                    </TouchableOpacity>
                    
                
                </View>

            </Animated.View>
            
        </View>
        )
    }
}

export default connect(null ,{setSearchItem , setType , setRemoveItem , setItem , setStep , editStep})(MainItem)

MainItem.contextType = ThemeContext;

const styles = StyleSheet.create({
    flatStyle : {
        flex : 1,
        alignContent  : 'center',
        marginTop : 10,
        
      },
      justPadding :{
        paddingRight : 20
      },
      textBodyContainer : {
        flexDirection: 'row', 
        flex :3,
        paddingTop : 10,
        marginBottom : 15,
        alignItems : 'center',
        
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
       flex : 1,
        justifyContent : 'center',
        // width : dim.width - 200 ,
        // height : 100,
        borderRadius : 10,
      },
      deleteBack :{
        justifyContent : 'center',
        alignItems: 'center',
        width : 75,
        height : 60,
        borderTopRightRadius : 10,
        borderBottomRightRadius : 10,
      },
      absoluteCell: {
        position: 'absolute',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 35,
      },

      absoluteCellText: {
        margin: 16,
        color: '#FFF',
      },
    itemContainer :{
        borderRadius : 10 ,
        flex :1 ,
        paddingHorizontal : 20,
        justifyContent : 'space-between',
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
          paddingVertical : 5,
          alignItems : 'center',
          justifyContent : 'center',
      },
      roundStyle :{
        width :13,
        height :13,
        marginRight : 5,
        borderRadius : 50, 
        borderWidth : 2 ,
      },
      textBody : {
        fontSize : 23,
        fontWeight : '300',
        color : '#707070',
        //fontFamily: "vincHand",
        fontFamily : 'sans-serif-medium',
      },
      buttonTempStyle :{
        borderColor : '#707070',
        width : 55,
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