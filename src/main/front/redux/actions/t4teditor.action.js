export const TOGGLE_ARTICLE_UPDATE_STATE = 'TOGGLE_ARTICLE_UPDATE_STATE';
export const TOGGLE_EDITOR_SUBMIT_STATE = 'TOGGLE_EDITOR_SUBMIT_STATE';
export const UPDATE_ARTICLE_DESCRIPTION = 'UPDATE_ARTICLE_DESCRIPTION';
export const UPDATE_ARTICLE_TITLE = 'UPDATE_ARTICLE_TITLE';
export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE';
export const UPDATE_ARTICLE_ID = 'UPDATE_ARTICLE_ID';

export const toggleArticleUpdateState = id => dispatch => dispatch({ type: TOGGLE_ARTICLE_UPDATE_STATE });

export const toggleEditorSubmitState = () => dispatch => dispatch({ type: TOGGLE_EDITOR_SUBMIT_STATE });

export const updateArticleDescription = description => dispatch => dispatch({ type: UPDATE_ARTICLE_DESCRIPTION, payload: description });

export const updateArticleTitle = title => dispatch => dispatch({ type: UPDATE_ARTICLE_TITLE, payload: title });

export const updateEditorState = editorState => dispatch => dispatch({ type: UPDATE_EDITOR_STATE, payload: editorState });

export const updateArticleId = id => dispatch => dispatch({ type: UPDATE_ARTICLE_ID, payload: id });