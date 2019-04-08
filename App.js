import React, { Component } from 'react'
import { createStore , applyMiddleware  } from 'redux'
import {Provider}  from 'react-redux'
import indexReducer from './src/service/index'
import ThemeProvider from './src/pages/ThemeProvider'
import thunk from "redux-thunk";

const store = createStore(
    indexReducer,
    applyMiddleware(thunk)
  );

  export default class App extends Component{
   
    render(){
        return(
            <Provider  store={store}>
                <ThemeProvider/>
            </Provider>
        )
    }
}