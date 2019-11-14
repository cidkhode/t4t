import { combineReducers } from 'redux';

import popup from './reducers/popup.reducer';
import user from './reducers/user.reducer';

const reducer = combineReducers({
	popup,
	user
});

export default reducer;