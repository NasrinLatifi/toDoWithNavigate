import React, {Component} from 'react';
import { createAppContainer , createDrawerNavigator } from 'react-navigation';
import DrawerScreen from '../components/DrawerScreen'
import Main from '../root/MainPages'
import{connect} from 'react-redux'
import{fetchProducts } from '../service/action'
import AddPage from './AddPage'


const MyDrawerNavigator = createDrawerNavigator(

  { 
    All: {
      screen: Main, 
    },
    Work: {
      screen: Main,
    },
    Family: {
      screen: Main,
    },
    Study: {
      screen: Main,
    },
    Wish: {
      screen: Main,
    },
    Calendar: {
      screen: Main,
    },
    Edit: {
      screen: Main,
    },
    Settings: {
      screen: Main,
    },
    // Add: {
    //   screen: AddPage,
    // },
    
  },
  {
    drawerPosition : 'left',
    useNativeAnimations : 'true',
    contentComponent : DrawerScreen ,
    backBehavior : 'initialRoute',
  } ,
  {
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical:10,

      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    
  },
 
  );
  

  const AppContainer = createAppContainer(MyDrawerNavigator);
 class App extends Component {
    componentDidMount (){
      this.props.fetchProducts();
    }
    render() {
      return <AppContainer />;
    }
  }
  export default connect(null,{fetchProducts })(App)









