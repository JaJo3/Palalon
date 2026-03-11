import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN } from '../../app/actions';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector(state => state.auth);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      // console.log('Login Success! User Data:', data);
      // console.log('Received Token:', data.token);
     // Alert.alert('Success', `Welcome ${data.name || username}`);
      // TODO: Uncomment to navigate after successful login
      // navigation?.replace('MainNav');
    }
    // if (isError && !isLoading) {
    //   console.log('LOGIN FAILED:', isError);
    //   Alert.alert('Login Failed', isError || 'Please try again');
    // }
  }, [data, isLoading, isError, username]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    console.log('Username:', username);
    console.log('Password:', password);

    dispatch({ type: USER_LOGIN, payload: { username, password } });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomTextInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <CustomTextInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#E0E0E0',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: '#391190',
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ fontSize: 14, color: '#555' }}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
          <Text style={{ fontSize: 14, color: '#391190', fontWeight: '600' }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
