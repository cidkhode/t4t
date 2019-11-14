import { EditorState } from "draft-js";

import {
	TOGGLE_EDITOR_SUBMIT_STATE,
	UPDATE_ARTICLE_TITLE,
	UPDATE_EDITOR_STATE,
	UPDATE_ARTICLE_ID,
} from '../actions/t4teditor.action.js';

export const initialState = {
	isSubmitting: false,
	id: null,
	title: "",
	editorState: EditorState.createEmpty(),
};

export const t4teditor = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_EDITOR_STATE:
			return {
				...state,
				editorState: action.payload
			};

		case TOGGLE_EDITOR_SUBMIT_STATE:
			return {
				...state,
				isSubmitting: !state.isSubmitting
			};

		case UPDATE_ARTICLE_ID:
			return {
				...state,
				id: action.payload
			};

		case UPDATE_ARTICLE_TITLE:
			return {
				...state,
				title: action.payload
			};

		default:
			return state;
	}
};

export default t4teditor;