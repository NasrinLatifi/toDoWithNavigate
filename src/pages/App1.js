import React, { Component } from 'react'
import { createStore , applyMiddleware  } from 'redux'
import {Provider}  from 'react-redux'
import Start from './StartPage';
import reducer from '../service/reducer'
import thunk from "redux-thunk";

const store = createStore(
    reducer,
    applyMiddleware(thunk)
  );

export default class App1 extends Component{
    render(){
        return(
            <Provider  store={store}>
                <Start />
            </Provider>
        )
    }
}
