import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , View , FlatList , Animated , TextInput}  from 'react-native';
import{connect} from 'react-redux'
import{ setItem} from '../service/action'
 class AddPage extends Component{
    // this.props.setRemoveItem(item.id )
    render(){
        // const { navigation } = this.props;
        // const type = navigation.getParam('type', 'All');
        return(
            <View style = {styles.container}>
                    <Text>hrhr</Text>

            </View>
        )
    }
}

export default connect(mapStateToProps ,{ setItem})(AddPage)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'pink',
    },
})