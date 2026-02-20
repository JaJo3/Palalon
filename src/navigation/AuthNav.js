import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';

// Screens
import Login from '../screen/auth/Login';
import Register from '../screen/auth/Register';

const Stack = createStackNavigator();

// Utils
const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
