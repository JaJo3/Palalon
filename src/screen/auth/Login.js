import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/CustomTextInput';
import { loginApi } from '../../app/api/auth';

const Login = ({ navigation }) => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailAdd || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    try {
      setLoading(true);
      const result = await loginApi({ email: emailAdd, password });

      if (result.token) {
        // Save token to AsyncStorage for authenticated requests
        await AsyncStorage.setItem('auth_token', result.token);
      }

      Alert.alert('Success', `Welcome ${result.name || emailAdd}`);
      // TODO: Uncomment to navigate after successful login
      // navigation?.replace('MainNav');
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomTextInput
        label="Email Address"
        placeholder="Enter your email address"
        value={emailAdd}
        onChangeText={setEmailAdd}
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
