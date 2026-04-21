import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { ROUTES } from '../utils';

// Screens
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import CustomScreen from '../screen/CustomScreen';

const Stack = createStackNavigator();

// Navigation stack for authenticated users with Home and Profile screens
const MainNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ROUTES.CUSTOM} component={CustomScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
