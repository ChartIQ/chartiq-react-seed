import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import reducer from './reducers'
import App from './components/App'
import 'babel-polyfill'
import './finsemble-functionality'

const middlewares = [thunk];
if(process.env.NODE_ENV === 'development'){

  middlewares.push(logger);
}

let store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);
let chartEl = document.getElementById('chartHere');

render(
  <Provider store={store}>
    <App />
  </Provider>
  , chartEl
)

