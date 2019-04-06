import React, { Component } from 'react'
import { createStore , applyMiddleware  } from 'redux'
import {Provider}  from 'react-redux'
import Start from './src/routes/index';
import indexReducer from './src/service/index'
import reducer from './src/service/FetchService/reducer'
import thunk from "redux-thunk";

const store = createStore(
    indexReducer,
    applyMiddleware(thunk)
  );

  export default class App1 extends Component{
   
    render(){
        return(
            <Provider  store={store}>
                <Start/>
            </Provider>
        )
    }
}