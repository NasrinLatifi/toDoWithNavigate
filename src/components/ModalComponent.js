import React, {Component} from 'react';
import {Text, StyleSheet, Modal, TouchableOpacity  , View , Animated , Dimensions , PanResponder}  from 'react-native';


export default class Main extends Component {
    onPressButton (){
        this.props.visible()
    }
    render(){
        return(
            <View style = {styles.container}>
                <Modal
                hardwareAccelerated={true}
                visible={this.props.Alert_Visibility}
                animated={true}
                transparent={true}
                animationType={'fade'}
                onRequestClose={() => {
                    this.options(this.props.options)
                }}
                >
                    <View style ={styles.modalInside}>
                    <TouchableOpacity 
                    onPress = {this.onPressButton.bind(this)}>
                        <Text>press here</Text>
                    </TouchableOpacity>

                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container :{
        height : 100,
        width :100,
        top : 100,
        left : 10
    },
    modalInside: {
        backgroundColor : 'red'
    }
})