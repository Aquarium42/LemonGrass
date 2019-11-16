import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./store/rootReducer";
import {composeWithDevTools} from 'redux-devtools-extension'
/*
const middlewares=[thunkMiddleware];

if (process.env.NODE_ENV ==='development'){
    const {logger} = require('redux-logger');
    middlewares.push(logger);
}
*/
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
