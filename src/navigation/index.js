// utils
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import AuthNav from './AuthNav';
import MainNav from './MainNav';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data } = useSelector(state => state.auth);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [isDarkMode]);

  console.log(data);
  return (
    <NavigationContainer>
        {data && (data.access_token || data.token) ? <MainNav /> : <AuthNav /> }
    </NavigationContainer>
  );
};
