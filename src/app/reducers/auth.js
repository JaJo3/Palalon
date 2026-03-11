import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
  RESET_USER_LOGIN,
} from '../actions';

const INITIALSTATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export default function reducer(state = INITIALSTATE, action) {
  console.log(action.type);
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
      };

    case USER_LOGIN_COMPLETE:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case USER_LOGOUT:
      return INITIALSTATE;

    case USER_LOGIN_ERROR:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: action.payload,
      };

    case RESET_USER_LOGIN:
      return INITIALSTATE;

    default:
      return state;
  }
}

export const authLogin = payload => ({
  type: USER_LOGIN,
  payload,
});
