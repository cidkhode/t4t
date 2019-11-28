export const UPDATE_USER_ARTICLE_LIST = 'UPDATE_USER_ARTICLE_LIST';
export const UPDATE_USER_ARTICLE_LIST_ITEM = 'UPDATE_USER_ARTICLE_LIST_ITEM';
export const ADD_TO_USER_ARTICLE_LIST = 'ADD_TO_USER_ARTICLE_LIST';
export const DELETE_FROM_USER_ARTICLE_LIST = 'DELETE_FROM_USER_ARTICLE_LIST';

export const updateUserArticlesList = list => dispatch => dispatch({ type: UPDATE_USER_ARTICLE_LIST, payload: list });

export const updateUserArticlesListItem = item => dispatch => dispatch({ type: UPDATE_USER_ARTICLE_LIST_ITEM, payload: item });

export const addToUserArticlesList = item => dispatch => dispatch({ type: ADD_TO_USER_ARTICLE_LIST, payload: item });

export const deleteFromUserArticlesList = id => dispatch => dispatch({ type: DELETE_FROM_USER_ARTICLE_LIST, payload: id });