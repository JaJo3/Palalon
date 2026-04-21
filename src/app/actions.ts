// Action type constants
export const USER_LOGIN = 'USER_LOGIN' as const;
export const USER_LOGOUT = 'USER_LOGOUT' as const;
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST' as const;
export const USER_LOGIN_COMPLETE = 'USER_LOGIN_COMPLETE' as const;
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR' as const;
export const RESET_USER_LOGIN = 'RESET_USER_LOGIN' as const;

// Action type union
export type ActionType =
  | typeof USER_LOGIN
  | typeof USER_LOGOUT
  | typeof USER_LOGIN_REQUEST
  | typeof USER_LOGIN_COMPLETE
  | typeof USER_LOGIN_ERROR
  | typeof RESET_USER_LOGIN;
