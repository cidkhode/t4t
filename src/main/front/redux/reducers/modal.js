
import { TOGGLE_SIGNIN, TOGGLE_SIGNUP } from '../selectors/modal.js';

// cost cause state shouldn't be mutated
const initialState = {
	is_signin_open: false,
	is_signup_open: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SIGNIN:
			return Object.assign({}, state, { is_signin_open: !state.is_signin_open });
			break;

		case TOGGLE_SIGNUP:
			return Object.assign({}, state, { is_signup_open: !state.is_signup_open });
			break;

		default:
			return state;
	}
}