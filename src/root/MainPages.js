import { createStackNavigator } from 'react-navigation';
import AddPage from '../pages/AddPage'
import Main from '../components/Main'
import MainTemp from '../components/MainTemp'

export default stackNavigate = createStackNavigator(
    {
        All: {
            screen: MainTemp, 
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
      Add : {
        screen : AddPage
      }
    },
    
    {
      initialRouteName: 'All',
    }
  )
  