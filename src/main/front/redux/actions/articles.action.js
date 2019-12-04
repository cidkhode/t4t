import { RESET_EDITOR } from './t4teditor.action';

export const UPDATE_USER_ARTICLE_LIST = 'UPDATE_USER_ARTICLE_LIST';
export const UPDATE_USER_ARTICLE_LIST_ITEM_TITLE = 'UPDATE_USER_ARTICLE_LIST_ITEM_TITLE';
export const UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION = 'UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION';
export const ADD_TO_USER_ARTICLE_LIST = 'ADD_TO_USER_ARTICLE_LIST';
export const DELETE_FROM_USER_ARTICLE_LIST = 'DELETE_FROM_USER_ARTICLE_LIST';

export const updateUserArticlesListItemTitle = (id, title) => dispatch => dispatch({ type: UPDATE_USER_ARTICLE_LIST_ITEM_TITLE, payload: { id, title } });

export const updateUserArticlesListItemDescription = (id, description) => dispatch => dispatch({ type: UPDATE_USER_ARTICLE_LIST_ITEM_DESCRIPTION, payload: { id, description } });

export const fetchUserArticles = (userEmail) => dispatch => {
  return fetch(`/api/article/get-user-articles?userEmail=${userEmail}`, { headers: { 'Content-Type': 'application/json' }})
    .then(res => res.json())
    .then(list => dispatch({ type: UPDATE_USER_ARTICLE_LIST, payload: list }))
    .catch(err => console.error('Error: ', err));
};

export const deleteFromUserArticlesList = id => (dispatch) => {
  return fetch(`/api/article/delete-article`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      articleId: id,
    })
  }).then(resp => resp.json())
    .then(json => {
      console.log(`FETCH WORKED`);
      if (json.status === 0) {
        dispatch({ type: DELETE_FROM_USER_ARTICLE_LIST, payload: id });
        dispatch({ type: RESET_EDITOR });
      }
    }).catch(error => console.error(`Couldn't delete article: `, id, `. Error: `, error));
};