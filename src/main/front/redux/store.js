/* Boilerplate Redux */
import { createStore, applyMiddleware, compose } from "redux";

/* Redux Thunk - allows async functions -  */
import thunk from "redux-thunk";

/* Reducers */
import reducer from './reducer.js';

/* 1) Redux Thunk (https://github.com/reduxjs/redux-thunk) - 2) Redux DevTools Extension (https://github.com/zalmoxisus/redux-devtools-extension) */
const enhancers = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(reducer, {}, enhancers);

export default store;