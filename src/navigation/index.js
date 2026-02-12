import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';

// Utils
import { ROUTES } from '../utils';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
        />
        <Stack.Screen
          name={ROUTES.PROFILE}
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
