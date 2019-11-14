import { combineReducers } from 'redux';

import popup from './reducers/popup.reducer';
import user from './reducers/user.reducer';
import t4teditor from './reducers/t4teditor.reducer';

const reducer = combineReducers({
	popup,
	user,
	t4teditor
});

export default reducer;