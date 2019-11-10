export const IS_USER_LOGGED_IN = 'IS_USER_LOGGED_IN';
export const REQUEST_USER_LOGGED_IN = 'REQUEST_USER_LOGGED_IN';
export const REQUEST_USER_DETAILS = 'REQUEST_USER_DETAILS';
export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';

export const checkIfUserLoggedIn = (userEmail) => (dispatch) => {
  dispatch({ type: REQUEST_USER_LOGGED_IN });
  return fetch('/api/get-user-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail })
  }).then(response => response.json())
    .then(result => dispatch({ type: IS_USER_LOGGED_IN, result }))
    .catch(err => console.error(err));
};

export const fetchUserAccountDetails = (userEmail) => (dispatch) => {
  dispatch({ type: REQUEST_USER_DETAILS });
  return fetch(`/api/user?userEmail=${userEmail}`)
    .then(response => response.json())
    .then(userAccountDetails => {
      console.log(userAccountDetails);
      dispatch({ type: SAVE_USER_DETAILS, userAccountDetails })
    })
    .catch(err => console.error(err));
};
