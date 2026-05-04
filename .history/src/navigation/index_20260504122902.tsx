// utils
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import React, { FC, useEffect, useRef } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import AuthNav from './AuthNav';
import MainNav from './MainNav';
import { RootState } from '../app/reducers/index';

// Root navigation that conditionally shows AuthNav or MainNav based on user auth state
const RootNavigation: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data, isInitialized } = useSelector((state: RootState) => state.auth);
  const navigationRef = useRef(null);
  const isUserLoggedIn = data && (data.access_token || data.token);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [isDarkMode]);

  // When auth state changes, reset navigation to prevent white screen
  useEffect(() => {
    if (navigationRef.current && !isUserLoggedIn) {
      // Reset navigation stack when user logs out
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'RootAuth' }],
      });
    }
  }, [isUserLoggedIn]);

  console.log('Auth Data:', data, 'Initialized:', isInitialized, 'Logged In:', isUserLoggedIn);

  // Only render navigation once auth has been initialized
  // This prevents flashing between screens while auth is being checked
  if (!isInitialized) {
    return null; // Splash screen is shown from App.tsx
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      key={isUserLoggedIn ? 'authenticated' : 'unauthenticated'}
    >
      {isUserLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default RootNavigation;
