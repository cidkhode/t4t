import * as userActions from '../actions/user.action';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

export const initialState = {
  waitingToCheck: false,
  isLoading: false,
  isLoggedIn: false,
  userAccountDetails: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case userActions.REQUEST_USER_LOGGED_IN:
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
        isLoading: false,
        waitingToCheck: false,
        isLoggedIn: action.result.status === 0
      };

    case userActions.SAVE_USER_DETAILS:
      console.log(`ACTIONS FOR SAVING: `, action);
      const { userAccountDetails } = action;
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userAccountDetails: {
          ...userAccountDetails,
          name: `${userAccountDetails.firstName} ${userAccountDetails.lastName}`,
          interests: userAccountDetails.interests ? userAccountDetails.interests.split(',').map(interest => ({ title: interest })) : [],
          viewPoints: userAccountDetails.viewPoints ? userAccountDetails.viewPoints.split(',').map(viewPoint => ({ title: viewPoint })) : [],
        }
      };

    default:
      return initialState;
  }
};

export default user;