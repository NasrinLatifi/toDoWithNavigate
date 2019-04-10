import React, {Component} from 'react';
import { createAppContainer , createDrawerNavigator , createStackNavigator , createSwitchNavigator } from 'react-navigation';
import DrawerScreen from '../components/DrawerScreen'
import Settings from '../pages/Settings'
import AddPage from '../pages/AddPage'
import Main from '../pages/Main'
import MainDone from '../pages/MainDone'
import MainClose from '../pages/MainClose'
import Search from '../pages/SearchPage'
import Edit from '../pages/EditPage'
import StartPage from '../pages/StartPage'
import singIn from '../pages/SignIn'
import{connect} from 'react-redux'
import{fetchProducts } from '../service/FetchService/action'


const stackNavigate = createStackNavigator(
    {
      Main : {
        screen: Main,
      },
      Add : {
        screen : AddPage
      },
      Search :{
        screen : Search
      },
      Edit :{
        screen : Edit
      },
      Settings: {
        screen: Settings,
      },
      Finish : {
        screen: MainDone,
      },
      Forgotten : {
        screen: MainClose,
      }
    },
    
    {
      initialRouteName: 'Main',
    }
  )
  


const MyDrawerNavigator = createDrawerNavigator(

  { 
    All: {
      screen: stackNavigate, 
    },
    Work: {
      screen: stackNavigate,
    },
    Family: {
      screen: stackNavigate,
    },
    Study: {
      screen: stackNavigate,
    },
    Wish: {
      screen: stackNavigate,
    },
    Calendar: {
      screen: stackNavigate,
    },
    Edit: {
      screen: stackNavigate,
    },
    Settings: {
      screen: stackNavigate,
    },
    // Finish : {
    //   screen: stackNavigate,
    // },
    // Forgotten : {
    //   screen: stackNavigate,
    // }
    // Add: {
    //   screen: AddPage,
    // },
    
  },
  {
    drawerPosition : 'left',
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

  const Root = createSwitchNavigator(
    {
        Home : StartPage,
        singIn : singIn,
    },
    {
        initialRouteName : 'Home'
    }

  );

  const Temp = createSwitchNavigator(
    {
        Home : StartPage,
       singIn : MyDrawerNavigator,
    },
    {
        initialRouteName : 'Home'
    }

  );


const AppContainer = createAppContainer(Temp);
 class App extends Component {
    componentDidMount (){
      this.props.fetchProducts();
    }
    render() {
      return <AppContainer />;
    }
  }
  export default connect(null,{fetchProducts })(App)


