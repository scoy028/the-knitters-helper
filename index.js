import React, {Component} from 'react'
import { View } from 'react-native';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {reducer} from "./reducer";
import App from "./App";

const client = axios.create({
  baseURL: 'https://api.ravelry.com',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <App />
        </View>
      </Provider>
    );
  }
}
