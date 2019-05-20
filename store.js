import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import {fromJS} from 'immutable';
import rootReducer from 'reducer';

// each reducer initialize their data
const initialDefaultState = fromJS({});

const makeStore = (initialState = initialDefaultState) => {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
};

export default makeStore;
