import React, {Component} from 'react';
import {TouchableOpacity, Text, View , StyleSheet , Image , FlatList } from 'react-native';
import data from '../components/SectionData'
 
export default class DrawerScreen extends Component {
  render () {
    return (
      <View style = {styles.container}>
        <View style = {styles.headerStyle}>
            <View style = {styles.headerContainer}>
                <View style = {styles.componentStle}>
                    <Image source = {require('../assests/1.png')}
                    style = {styles.headerImage}/> 
                </View>
                <View style = {styles.componentStle}>
                    <Text style = {styles.emailStyle}>Zohaooder@gmail.com</Text>
                </View>
            </View>
        </View>

        <FlatList
         data = {data}
         keyExtractor={item => item.name}
         renderItem={({item}) =>( 
            <TouchableOpacity style = {styles.itemStyle}>
                <View style = {styles.itemView}>
                    <Image source = {item.image}
                    style = {styles.itemImage}
                    />
                    <Text>{item.name}</Text>
                </View>
                

            </TouchableOpacity>
         ) }
          
        />
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#fff',
  },

  headerContainer :{

      flexDirection : 'row' , 
      marginLeft : 10,
      marginRight : 20,
      marginTop : 40 ,
  },
  headerStyle : {
      height : 130,
      alignItems: 'center',
      backgroundColor: '#000066',
  }, 
  componentStle : {
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerImage : {
        width : 50,
        height  : 50,
        borderRadius : 50,
        backgroundColor: '#fff',
  },
  emailStyle : {
    marginLeft : 10,
    color : 'white',
    fontSize : 18,
  },
  itemStyle :{
    marginTop: 15,
    height : 40 ,
    flexDirection :'row',
    alignItems: 'center',

  },
  itemView : {
    marginLeft : 30,
    flexDirection :'row',
    alignItems: 'center',
  },
  itemImage : {
      width : 25,
      height : 25,
      marginRight : 20
  },

});