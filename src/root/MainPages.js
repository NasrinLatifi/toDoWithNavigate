import { createStackNavigator} from 'react-navigation';
import AddPage from '../pages/AddPage'
import Main from '../components/Main'
import MainTemp from '../components/MainTemp'



export default stackNavigate = createStackNavigator(
    {
      Main : {
        screen: Main,
      },
      Add : {
        screen : AddPage
      }
    },
    
    {
      initialRouteName: 'Main',
    }
  )
  