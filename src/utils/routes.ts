export const ROUTES = {
  //Login
  LOGIN: 'Login',
  REGISTER: 'Register',
  //Main
  HOME: 'Home',
  PROFILE: 'Profile',
  CUSTOM: 'Custom',
} as const;

export type RouteType = typeof ROUTES[keyof typeof ROUTES];
