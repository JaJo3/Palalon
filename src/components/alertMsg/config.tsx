export interface AlertConfig {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
}

export const customSuccess = (message: string, title: string = 'Success'): AlertConfig => ({
  title,
  message,
  type: 'success',
  duration: 2000,
  position: 'top',
});

export const customError = (message: string, title: string = 'Error'): AlertConfig => ({
  title,
  message,
  type: 'error',
  duration: 3000,
  position: 'top',
});

export const customInfo = (message: string, title: string = 'Info'): AlertConfig => ({
  title,
  message,
  type: 'info',
  duration: 2000,
  position: 'top',
});

export const customWarning = (message: string, title: string = 'Warning'): AlertConfig => ({
  title,
  message,
  type: 'warning',
  duration: 2500,
  position: 'top',
});

export default {
  customSuccess,
  customError,
  customInfo,
  customWarning,
};
