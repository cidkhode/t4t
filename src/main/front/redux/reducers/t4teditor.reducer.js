import { EditorState, ContentState } from "draft-js";
import htmlToDraft from 'html-to-draftjs';

import {
	TOGGLE_ARTICLE_UPDATE_STATE,
	TOGGLE_EDITOR_SUBMIT_STATE,
	UPDATE_CURRENT_EDITOR_ARTICLE,
	UPDATE_ARTICLE_DESCRIPTION,
	UPDATE_ARTICLE_TITLE,
	UPDATE_EDITOR_STATE,
	UPDATE_ARTICLE_ID,
} from '../actions/t4teditor.action.js';

export const initialState = {
	isUpdating: false,
	isSubmitting: false,
	id: null,
	title: "",
	description: "",
	editorState: EditorState.createEmpty(),
};

export const t4teditor = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_ARTICLE_UPDATE_STATE:
			return {
				...state,
				isUpdating: !state.isUpdating
			};

		case TOGGLE_EDITOR_SUBMIT_STATE:
			return {
				...state,
				isSubmitting: !state.isSubmitting
			};

		case UPDATE_CURRENT_EDITOR_ARTICLE:
			const convertedHTML = htmlToDraft(action.payload.article_text);
			const { contentBlocks, entityMap } = convertedHTML;
			const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

			return {
				...state,
				id: action.payload.articleID,
				title: action.payload.title,
				description: action.payload.description,
				editorState: EditorState.createWithContent(contentState)
			};

		case UPDATE_ARTICLE_DESCRIPTION:
			return {
				...state,
				description: action.payload
			};

		case UPDATE_ARTICLE_TITLE:
			return {
				...state,
				title: action.payload
			};

		case UPDATE_EDITOR_STATE:
			return {
				...state,
				editorState: action.payload
			};

		case UPDATE_ARTICLE_ID:
			return {
				...state,
				id: action.payload
			};

		default:
			return state;
	}
};

export default t4teditor;