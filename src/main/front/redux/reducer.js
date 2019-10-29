import { combineReducers } from 'redux';

import modalReducer from './reducers/modal.js';

const reducer = combineReducers({
	modal_status: modalReducer,
});

export default reducer;