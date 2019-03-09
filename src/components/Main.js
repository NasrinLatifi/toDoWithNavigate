import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity , View , FlatList }  from 'react-native';
import{connect} from 'react-redux'
import{fetchProducts , setType} from '../service/action'

class StartPage extends Component {

  componentDidMount (){
    const { navigation } = this.props;
    const type = navigation.getParam('name', 'All');
    this.props.fetchProducts()
    this.props.setType (type)
  }

    render(){
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'All');
        return(
            <View style = {styles.container}>
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
                      style = {styles.drawerBottonRight}
                     >
                          <Image 
                          style = {styles.searchStyle}
                          source = {require('../assests/search.png')}/>
                      </TouchableOpacity>

                      <TouchableOpacity 
                      style = {styles.drawerBottonRight}
                      >
                          <Image 
                          style = {styles.threeStyle}
                          source = {require('../assests/3.png')}/>
                      </TouchableOpacity>

                  </View>

                </View>
                <View style = {styles.bodyStyle}>
                    <FlatList
                      data = {this.props.items}
                      keyExtractor = {item => item.id}
                      renderItem ={ ({item , index})  => 
                           <Text >{item.text}</Text>
                          
                        }    
                    />

                </View>
              
            </View>
        )
    }
}


const mapStateToProps=(state)=>{

  return{
    
      items : state.item,
      loading : state.loading
  }

}

export default connect(mapStateToProps,{fetchProducts , setType})(StartPage)


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchStyle : {
      width : 35,
      height : 35
    },
    threeStyle : {
      width : 20,
      height : 20
    },
    headerStyle :{
        flexDirection: 'row', 
        backgroundColor: '#000066',
        flex : 1,
        alignItems: 'center',
    },
    bodyStyle : {
        flex : 9
    },
    headerText : {
      marginLeft : 20,
      fontWeight: 'bold',
      color : 'white',
      fontSize : 20,
    },
    drawerBotton : {
      marginLeft : 15
    },
    drawerBottonRight :{
      marginRight : 15,
    },
})
