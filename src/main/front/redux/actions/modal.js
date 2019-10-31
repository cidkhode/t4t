
import { TOGGLE_SIGNIN, TOGGLE_SIGNUP } from '../selectors/modal.js';

export const toggleSigninModal = () => {
	return { type: TOGGLE_SIGNIN }
}

export const toggleSignupModal = () => {
	return { type: TOGGLE_SIGNUP }
}