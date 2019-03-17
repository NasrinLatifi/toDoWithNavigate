import { createStackNavigator} from 'react-navigation';
import AddPage from '../pages/AddPage'
import Main from '../components/Main'
import Search from '../pages/SearchPage'
import Edit from '../pages/EditPage'



export default stackNavigate = createStackNavigator(
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
      }
    },
    
    {
      initialRouteName: 'Main',
    }
  )
  