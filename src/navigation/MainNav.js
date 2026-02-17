import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from '../utils';

// Screens
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Stack = createStackNavigator();

// Utils
const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
