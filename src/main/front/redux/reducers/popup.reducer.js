import { TOGGLE_POPUP } from '../actions/popup.action.js';

const initialState = {
	popupType: '',
	isPopupActive: false,
};

export const popup = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_POPUP:
			return {
				...state,
				isPopupActive: !state.isPopupActive,
				popupType: action.popupType,
			};

		default:
			return state;
	}
};

export default popup;