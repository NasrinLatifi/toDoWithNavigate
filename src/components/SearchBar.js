import React, {Component} from 'react';
import { StyleSheet,  View , TextInput}  from 'react-native';
import{connect} from 'react-redux';
import{ setSearchItem , setType} from '../service/action';


class SearchBar extends Component{
    constructor (props) {
        super(props)
        this.state = {
          text : '',
        }
        
      }

    setText(input , type ){
        
        this.setState ({text : input})
        this.props.setSearchItem(input)
        this.props.setType(type)
   }


    render(){
        const { navigation } = this.props;
        const type = navigation.getParam('name', 'All');
        return(
            <View style = {styles.container}>
                 <View style = {[styles.headerStyle , {justifyContent : 'space-between'}]}>
            
                    <TextInput 
                    placeholder = "Search"
                    value = {this.state.text}
                    onChangeText = {this.setText.bind(this , type )}
                    style = {styles.textInputStyle} />
                </View>
            </View>
        )
    }
}

export default connect(null ,{setSearchItem , setType})(SearchBar)
const styles = StyleSheet.create({
    container :{
        flex :1
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
})