import {
    UPDATE_SEARCH_RESULTS, UPDATE_SEARCH_QUERY
} from '../actions/navbar.action.js';

export const initialState = {
    searchQuery: '',
	searchResults: []
};

export const navbar = (state = initialState, action) => {
	switch (action.type) {
        case UPDATE_SEARCH_RESULTS:
			return {
				...state,
				searchResults: action.payload
			};

		case UPDATE_SEARCH_QUERY:
			return {
				...state,
				searchQuery: action.payload
			};

		default:
			return state;
	}
};

export default navbar;