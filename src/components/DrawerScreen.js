import React, {Component} from 'react';
import { Text, View , StyleSheet , Image , FlatList , TouchableHighlight } from 'react-native';
import data from '../components/SectionData'
import{connect} from 'react-redux'
import{ setType} from '../service/action'
class DrawerScreen extends Component {
  render () {
    return (
      <View style = {styles.container}>
        <View style = {styles.headerStyle}>
            <View style = {styles.headerContainer}>
                <View style = {styles.componentStle}>
                    <Image source = {require('../assests/1.jpg')}
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
            <TouchableHighlight style = {styles.itemStyle}
                onPress = {() => {
                  this.props.setType (item.name );
                  this.props.navigation.navigate(item.name , {name : item.name} )
                  }}>
                <View style = {styles.itemView}>
                    <Image source = {item.image}
                    style = {styles.itemImage}
                    />
                    <Text style = {styles.textStyle}>{item.name}</Text>
                </View>
            </TouchableHighlight>
         ) }
        />
        <View style = {styles.borderStyle}></View>
        <View style = {styles.endStyle}>
          <TouchableHighlight style = {styles.itemStyle}
          onPress = {() => this.props.navigation.navigate('Edit' , {name : 'Edit'} )}>
            <View style = {styles.itemView}>
                <Image source = {require('../assests/edit.png')}
                style = {styles.itemImage}
                />
                <Text style = {styles.textStyle}>Edit Task List</Text>
            </View>    
          </TouchableHighlight>
          <TouchableHighlight style = {styles.itemStyle}
          onPress = {() => this.props.navigation.navigate('Settings' , {name : 'Settings'})}>
            <View style = {styles.itemView}>
                <Image source = {require('../assests/setting.png')}
                style = {styles.itemImage}
                />
                <Text style = {styles.textStyle}>settings</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default connect( null ,{ setType})(DrawerScreen)

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
    marginTop: 12,
    height : 37 ,
    flexDirection :'row',
    alignItems: 'center',

  },
  itemView : {
    marginLeft : 30,
    flexDirection :'row',
    alignItems: 'center',
  },
  borderStyle :{
    height : 1 ,
    marginLeft : 70 ,
    borderTopColor : '#ababab',
    marginBottom : 10,
    marginTop : 10,
    borderTopWidth : 1,
  },
  itemImage : {
      width : 25,
      height : 25,
      marginRight : 20
  },
  textStyle :{
    fontWeight : '200',
    color : '#9a9a9a',
    fontSize : 15,
  },
  endStyle :{
    marginBottom : 20,
  },
});