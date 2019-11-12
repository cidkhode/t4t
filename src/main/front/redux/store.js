/* Boilerplate Redux */
import { createStore, applyMiddleware, compose } from "redux";

/* Redux Thunk - allows async functions -  */
import thunk from 'redux-thunk';

/* Reducers */
import reducer from './reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;