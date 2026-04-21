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
  const { data } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [isDarkMode]);

  console.log(data);
  return (
    <NavigationContainer>
      {data && (data.access_token || data.token) ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default RootNavigation;
