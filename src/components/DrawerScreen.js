import React, {Component} from 'react';
import { Text, View , StyleSheet , Image , Dimensions , FlatList , TouchableHighlight } from 'react-native';
import data from '../components/SectionData'
import{connect} from 'react-redux'
import{ setType} from '../service/FetchService/action'

const dim = Dimensions.get('window').height
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
          style ={{height : dim * (7/10)}}
         data = {data}
         keyExtractor={item => item.name}
         renderItem={({item}) =>( 
            <TouchableHighlight style = {styles.itemStyle }
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
          {/* <TouchableHighlight style = {styles.itemStyle}
          onPress = {() => this.props.navigation.navigate('Edit' , {name : 'Edit'} )}>
            <View style = {styles.itemView}>
                <Image source = {require('../assests/writing.png')}
                style = {styles.itemImage}
                />
                <Text style = {styles.textStyle}>Edit Task List</Text>
            </View>    
          </TouchableHighlight> */}
          <TouchableHighlight style = {styles.itemStyle}
          onPress = {() => this.props.navigation.navigate('Settings' , {name : 'Settings'})}>
            <View style = {styles.itemView}>
                <Image source = {require('../assests/settings.png')}
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
      backgroundColor: '#EDEFF2',
  },

  headerContainer :{

      flexDirection : 'row' , 
      marginLeft : 10,
      marginRight : 20,
      marginTop : 40 ,
  },
  headerStyle : {
      // height : 130,
      height : dim * (2/10),
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
    fontWeight : '500',
    color : '#F9F9F8',
    fontSize : 18,
  },
  itemStyle :{
    // marginTop: 22,
    // height : 37 ,
    height : dim * (1/10),
    flexDirection :'row',
    alignItems: 'center',

  },
  itemView : {
    flex : 7,
    marginLeft : 30,
    flexDirection :'row',
    alignItems: 'center',
  },
  borderStyle :{
    height : 3 ,
    marginLeft : 80 ,
    borderTopColor : '#771327',
    marginBottom : 10,
    marginTop : 10,
    borderTopWidth : 1,
  },
  itemImage : {
      width : 32,
      height : 32,
      marginRight : 20
  },
  textStyle :{
    fontWeight : '400',
    color : '#303451',
    fontSize : 19,
  },
  endStyle :{
    height : dim * (1/10),
    marginBottom : 20,
  },
});