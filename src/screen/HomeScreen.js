import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import { IMG, ROUTES } from '../utils';
import { useDispatch } from 'react-redux';
import { USER_LOGOUT } from '../app/actions';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('User logged out');
    dispatch({ type: USER_LOGOUT });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'red',
      }}
    >
      <Image
        source={{
          uri: 'https://th.bing.com/th/id/R.5eb1959636a370b661bc91940fe49cee?rik=DiotHJlkKQR6dg',
        }}
        style={{ width: 200, height: 200 }}
      />

      <Text style={{ fontSize: 20 }}>HomeScreen</Text>

      {/* LOGOUT BUTTON */}
      <Pressable onPress={handleLogout}>
        <Text
          style={{
            backgroundColor: 'lightgray',
            fontSize: 30,
            color: 'black',
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          Log out
        </Text>
      </Pressable>

      {/* PROFILE BUTTON */}
      <Pressable
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
        style={{
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 40, color: 'white' }}>
          GO TO PROFILE
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;