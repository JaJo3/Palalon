// utils
import { NavigationContainer } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import AuthNav from './AuthNav';
import MainNav from './MainNav';
import { RootState } from '../app/reducers/index';

// Root navigation that conditionally shows AuthNav or MainNav based on user auth state
const RootNavigation: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data, isInitialized } = useSelector((state: RootState) => state.auth);
  const isUserLoggedIn = !!(data && (data.access_token || data.token));

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [isDarkMode]);

  console.log('Auth Data:', data, 'Initialized:', isInitialized, 'Logged In:', isUserLoggedIn);

  // Only render navigation once auth has been initialized
  // This prevents flashing between screens while auth is being checked
  if (!isInitialized) {
    return null; // Splash screen is shown from App.tsx
  }

  return (
    <NavigationContainer
      key={isUserLoggedIn ? 'authenticated' : 'unauthenticated'}
    >
      {isUserLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default RootNavigation;
