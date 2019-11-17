import * as userActions from '../actions/user.action';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

export const initialState = {
  waitingToCheck: true,
  isLoading: false,
  isLoggedIn: false,
  userAccountDetails: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case userActions.REQUEST_USER_LOGGED_IN:
       return {
        ...state,
        waitingToCheck: true
      };
      
    case userActions.REQUEST_USER_DETAILS:
      return {
        ...state,
        isLoading: true,
      };

    case userActions.IS_USER_LOGGED_IN:
      if (action.result.status !== 0) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER_EMAIL);
      }
      return {
        ...state,
        waitingToCheck: false,
        isLoading: false,
        isLoggedIn: action.result.status === 0
      };

    case userActions.SAVE_USER_DETAILS:
      const { userAccountDetails } = action;
      const {
        firstName, lastName, topics, interests, viewPoints,
      } = userAccountDetails;
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userAccountDetails: {
          ...userAccountDetails,
          name: `${firstName} ${lastName}`,
          topics: topics ? topics : [],
          interests: interests ? interests.split(',').map(interest => ({ title: interest })) : [],
          viewPoints: viewPoints ? viewPoints.split(',').map(viewPoint => ({ title: viewPoint })) : [],
        }
      };

    case userActions.SIGN_USER_OUT:
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER_EMAIL);
      return {
        ...state,
        isLoggedIn: false,
        userAccountDetails: {},
      };

    default:
      return state;
  }
};

export default user;