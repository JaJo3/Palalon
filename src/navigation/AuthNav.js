import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from '../utils';

// Screens
import Login from '../screen/auth/Login';
import HomeScreen from '../screen/HomeScreen';

const Stack = createStackNavigator();

// Utils
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
