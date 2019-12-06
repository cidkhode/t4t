export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

export const updateSearchResults = results => dispatch => dispatch({ type: UPDATE_SEARCH_RESULTS, payload: results });
