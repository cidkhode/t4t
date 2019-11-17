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
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userAccountDetails: {
          ...userAccountDetails,
          name: `${userAccountDetails.firstName} ${userAccountDetails.lastName}`,
          topics: userAccountDetails.topicIds.length > 0 ? userAccountDetails.topicIds.split(',').map(topicId => ({ title: topicId })) : [],
          interests: userAccountDetails.interests ? userAccountDetails.interests.split(',').map(interest => ({ title: interest })) : [],
          viewPoints: userAccountDetails.viewPoints ? userAccountDetails.viewPoints.split(',').map(viewPoint => ({ title: viewPoint })) : [],
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