import React, {Component} from 'react';
import {Image , StyleSheet, Text, View , Animated , Easing} from 'react-native';



export default class StartPage extends Component{
      
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
      
    }

    componentDidMount() {
        this.navigate();
        
        this.animate()
    }
    
    navigate = () => {
        setTimeout(() => this.props.navigation.navigate('Login'), 3000)
    };



    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 1,
            duration: 5000,
            // easing: Easing.back(),
            useNativeDriver: true
          }
        ).start();
      };

  

    navigate = () => {
        setTimeout(() => this.props.navigation.navigate('singIn'), 4500)
    };


    render(){
         
          const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [.3, 2, 0]
          })
        return(
            <Animated.View style = {[styles.container ,  {opacity }] }>
            <Animated.View 
            // style = {{transform : [{rotate : this.state.rotate}] , opacity }}
            >
                  <Animated.Text style = {[styles.textStyle , {opacity }] }>Note Me!</Animated.Text>

            </Animated.View>
            
            </Animated.View>
        )
    }
}

let styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor :'#424770',
        justifyContent : 'center',
        alignItems : 'center',
    },
  
    textStyle : {
        fontWeight : '500',
        color : '#F9F9F8',
        fontSize : 50,
        fontFamily : 'cursive'
      },
})