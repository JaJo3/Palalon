import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGOUT_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
  RESET_USER_LOGIN,
  INIT_AUTH,
  INIT_AUTH_COMPLETE,
  ActionType,
} from '../actions';
import { LoginResponse } from '../api/auth';

export interface AuthState {
  data: LoginResponse | null;
  isLoading: boolean;
  isError: boolean | string;
  isInitialized: boolean;
}

interface AuthAction {
  type: ActionType;
  payload?: any;
}

const INITIALSTATE: AuthState = {
  data: null,
  isLoading: false,
  isError: false,
  isInitialized: false,
};

// Manages authentication state including login/logout and error handling
export default function authReducer(state: AuthState = INITIALSTATE, action: AuthAction): AuthState {
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
        ...state, //extended variable/spread operator
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
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

    case INIT_AUTH_COMPLETE:
      return {
        ...state,
        isInitialized: true,
      };

    default:
      return state;
  }
}

// Creates login action with user credentials payload
export const authLogin = (payload: any) => ({
  type: USER_LOGIN,
  payload,
});
