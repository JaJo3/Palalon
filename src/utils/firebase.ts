import { getAnalytics, logEvent } from '@react-native-firebase/analytics';
import { getCrashlytics, recordError } from '@react-native-firebase/crashlytics';

import {
  GoogleSignin,
  statusCodes,
  type SignInResponse,
} from '@react-native-google-signin/google-signin';
// Firebase is automatically initialized via google-services.json
// No need to manually initialize - @react-native-firebase handles it

// Configure Google Sign-In
export const configureGoogleSignIn = (): void => {
  try {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      // Use Android client ID (type 1) from google-services.json for native Android apps
      webClientId: "930179066116-h63ic6o8pl48sdma4lqggvtbrr3skvvr.apps.googleusercontent.com", 
      offlineAccess: true,
    });
    console.log('✓ GoogleSignin configured successfully');
  } catch (error) {
    console.error('✗ Failed to configure GoogleSignin:', error);
    throw error;
  }
};

// Google Sign-In function with error handling
export const _signInGoogle = async (): Promise<any> => {
  try {
    // Check if Google Play Services are available
    const hasPlayServices = await GoogleSignin.hasPlayServices();

    if (!hasPlayServices) {
      throw new Error('Google Play Services not available');
    }

    const signInResponse: SignInResponse = await GoogleSignin.signIn();
    console.log('Google Sign-In Success:', signInResponse);

    if (signInResponse.type === 'cancelled') {
      return {
        success: false,
        error: 'Sign in was cancelled',
        message: 'Sign in was cancelled',
      };
    }

    const googleUser = signInResponse.data;

    // Log analytics event (modular API — avoids namespaced deprecation warnings)
    try {
      const analyticsInstance = getAnalytics();
      await logEvent(analyticsInstance, 'user_signin_google', {
        method: 'google',
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Failed to log analytics event:', e);
    }

    return {
      success: true,
      data: googleUser,
      message: 'Sign in successful',
    };
  } catch (error: any) {
    let errorMessage = 'Sign in failed';

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMessage = 'Sign in was cancelled';
    } else if (error.code === statusCodes.IN_PROGRESS) {
      errorMessage = 'Sign in is in progress';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage = 'Google Play Services not available';
    } else {
      errorMessage = error.message || 'Sign in error occurred';
    }

    console.error('Google Sign-In Error:', errorMessage);

    try {
      await recordError(getCrashlytics(), new Error(errorMessage));
    } catch (e) {
      console.warn('Failed to log to Crashlytics:', e);
    }

    return {
      success: false,
      error: errorMessage,
      message: errorMessage,
    };
  }
};

// Google Sign-Out function
export const _signOutGoogle = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut();
    console.log('Sign out successful');

    try {
      const analyticsInstance = getAnalytics();
      await logEvent(analyticsInstance, 'user_signout_google', {
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Failed to log analytics event:', e);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Sign out error';
    console.error('Sign out error:', errorMessage);
    try {
      await recordError(getCrashlytics(), new Error(errorMessage));
    } catch (e) {
      console.warn('Failed to log to Crashlytics:', e);
    }
  }
};

// Get current user info
export const _getCurrentUser = async (): Promise<any> => {
  try {
    const userInfo = await GoogleSignin.getCurrentUser();
    console.log('Current User:', userInfo);
    return userInfo;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Get user error';
    console.error('Error getting current user:', errorMessage);
    return null;
  }
};

// Check if user is signed in (by checking if user info exists)
export const _isSignedIn = async (): Promise<boolean> => {
  try {
    const userInfo = await GoogleSignin.getCurrentUser();
    return userInfo != null;
  } catch (error) {
    console.error('Error checking sign in status:', error);
    return false;
  }
};

// Log analytics event
export const logAnalyticsEvent = async (
  eventName: string,
  params?: Record<string, any>
): Promise<void> => {
  try {
    const analyticsInstance = getAnalytics();
    await logEvent(analyticsInstance, eventName, params || {});
    console.log(`Analytics event logged: ${eventName}`);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Record error to Crashlytics
export const recordCrashlyticsError = async (error: Error): Promise<void> => {
  try {
    await recordError(getCrashlytics(), error);
    console.log('Error recorded to Crashlytics');
  } catch (err) {
    console.error('Crashlytics error:', err);
  }
};
