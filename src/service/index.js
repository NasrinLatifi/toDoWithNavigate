import {combineReducers} from 'redux'



import fetch from './FetchService/reducer'
import UI from './UIService/reducer'


export default  rootReducer =  combineReducers({
    fetchReducer:fetch,
    UIReducer:UI,
})