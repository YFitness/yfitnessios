import React, { Component } from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import Index from './Src/Navigation/index';
import Reduser from "./Src/Redusers/index";
export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reduser, {}, applyMiddleware(ReduxThunk))} >
        <Index />
      </Provider>
    )
  }
}
