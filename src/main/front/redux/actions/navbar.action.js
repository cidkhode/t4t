export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';

export const updateSearchResults = results => dispatch => dispatch({ type: UPDATE_SEARCH_RESULTS, payload: results });

export const updateSearchQuery = query => dispatch => dispatch({ type: UPDATE_SEARCH_QUERY, payload: query });
