export const UPDATE_USER_ARTICLE_LIST = 'UPDATE_USER_ARTICLE_LIST';
export const UPDATE_USER_ARTICLE_LIST_ITEM_TITLE = 'UPDATE_USER_ARTICLE_LIST_ITEM_TITLE';
export const UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION = 'UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION';
export const ADD_TO_USER_ARTICLE_LIST = 'ADD_TO_USER_ARTICLE_LIST';
export const DELETE_FROM_USER_ARTICLE_LIST = 'DELETE_FROM_USER_ARTICLE_LIST';

export const updateUserArticlesList = list => dispatch => dispatch({ type: UPDATE_USER_ARTICLE_LIST, payload: list });

export const updateUserArticlesListItemTitle = (id, title) => dispatch => dispatch({ type: UPDATE_USER_ARTICLE_LIST_ITEM_TITLE, payload: { id, title } });

export const updateUserArticlesListItemDescription = (id, description) => dispatch => dispatch({ type: UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION, payload: { id, description } });

export const deleteFromUserArticlesList = id => dispatch => dispatch({ type: DELETE_FROM_USER_ARTICLE_LIST, payload: id });