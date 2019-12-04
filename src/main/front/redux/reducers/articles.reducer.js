import {
	UPDATE_USER_ARTICLE_LIST,
	UPDATE_USER_ARTICLE_LIST_ITEM_TITLE,
	UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION,
	ADD_TO_USER_ARTICLE_LIST,
	DELETE_FROM_USER_ARTICLE_LIST,
} from '../actions/articles.action.js';

export const initialState = {
	userOwned: []
};

export const articles = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER_ARTICLE_LIST:
			return {
				...state,
				userOwned: action.payload
			};

		case UPDATE_USER_ARTICLE_LIST_ITEM_TITLE:
			return {
				...state,
				userOwned: state.userOwned.map(obj => obj.articleID !== action.payload.id ? obj : {...obj, title: action.payload.title})
			};

		case UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION:
			return {
				...state,
				userOwned: state.userOwned.map(obj => obj.articleID !== action.payload.id ? obj : {...obj, description: action.payload.description})
			};

		case DELETE_FROM_USER_ARTICLE_LIST:
			return {
				...state,
				userOwned: [...state.userOwned].filter(obj => obj.articleID !== action.payload)
			};

		default:
			return state;
	}
};

export default articles;