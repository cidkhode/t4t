export const TOGGLE_POPUP = 'TOGGLE_POPUP';

export const togglePopup = (popupType) => dispatch => {
	dispatch({ type: TOGGLE_POPUP, popupType });
};
