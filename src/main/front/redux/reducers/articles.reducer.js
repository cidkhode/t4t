import {
	UPDATE_USER_ARTICLE_LIST,
	UPDATE_USER_ARTICLE_LIST_ITEM,
	ADD_TO_USER_ARTICLE_LIST,
	DELETE_FROM_USER_ARTICLE_LIST,
} from '../actions/articles.action.js';

export const initialState = {
	user_owned: []
};

export const articles = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER_ARTICLE_LIST:
			return {
				...state,
				user_owned: action.payload
			};

		case UPDATE_USER_ARTICLE_LIST_ITEM:
			return {
				...state,
				user_owned: state.user_owned.map(obj => obj.articleID !== action.payload.articleID ? obj : action.payload)
			};

		case ADD_TO_USER_ARTICLE_LIST:
			return {
				...state,
				user_owned: [...state.user_owned].unshift(action.payload)
			};

		case DELETE_FROM_USER_ARTICLE_LIST:
			return {
				...state,
				user_owned: [...state.user_owned].filter(obj => obj.articleID === action.payload)
			};

		default:
			return state;
	}
};

export default articles;