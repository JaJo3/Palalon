import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN } from '../../app/actions';
import { RootState } from '../../app/reducers/index';
import { _signInGoogle } from '../../utils/firebase';
import { showSuccess, showError, showInfo } from '../../components/alertMsg';

// Login screen for user authentication with username and password inputs
const Login: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState<boolean>(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      // Show success message
      // Navigation happens automatically via RootNavigation when Redux state changes
      showSuccess(`Welcome ${data.user?.email || username}!`, 'Login Successful');
    }
    if (isError && !isLoading) {
      showError(typeof isError === 'string' ? isError : 'Login failed', 'Login Error');
    }
  }, [data, isLoading, isError]);

  // Validates credentials and dispatches login action to Redux store
  const handleLogin = async (): Promise<void> => {
    if (!username || !password) {
      showError('Please enter username and password', 'Validation Error');
      return;
    }
    console.log('Username:', username);
    console.log('Password:', password);

    showInfo('Logging in...', 'Please Wait');
    dispatch({ type: USER_LOGIN, payload: { username, password } });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async (): Promise<void> => {
    setIsGoogleSigningIn(true);
    try {
      showInfo('Signing in with Google...', 'Please Wait');

      const result = await _signInGoogle();

      if (result.success) {
        console.log('Google Sign-In Result:', result.data);
        console.log('User object:', result.data?.user);
        
        // Extract email from GoogleSignin response
        // Try multiple approaches to get the email
        let email = result.data?.user?.email;
        let name = result.data?.user?.name || result.data?.user?.givenName;
        
        // If email is not directly available, try to decode JWT token
        if (!email && result.data?.idToken) {
          try {
            const tokenParts = result.data.idToken.split('.');
            const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
            email = payload.email;
            name = payload.name || name;
            console.log('Extracted from JWT - Email:', email, 'Name:', name);
          } catch (e) {
            console.warn('Failed to decode JWT token:', e);
          }
        }
        
        console.log('Final Extracted Email:', email, 'Name:', name);
        
        if (!email) {
          showError('Could not retrieve email from Google account', 'Sign-In Error');
          setIsGoogleSigningIn(false);
          return;
        }
        
        showSuccess(
          `Welcome ${name || email}!`,
          'Sign-In Successful'
        );

        // Dispatch login action with Google user data
        // Navigation will happen automatically when Redux state updates (in useEffect above)
        dispatch({
          type: USER_LOGIN,
          payload: {
            username: email,
            method: 'google',
            userInfo: result.data,
          },
        });
      } else {
        showError(result.error || result.message, 'Sign-In Failed');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Google Sign-In Error:', errorMsg);
      showError(errorMsg, 'Sign-In Error');
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      {/* Email/Username Login */}
      <View style={{ width: '100%', marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#391190' }}>
          Login
        </Text>

        <CustomTextInput
          label="Username or Email"
          placeholder="Enter your username or email"
          value={username}
          onChangeText={setUsername}
          editable={!isLoading && !isGoogleSigningIn}
        />

        <CustomTextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading && !isGoogleSigningIn}
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading || isGoogleSigningIn}
          activeOpacity={0.8}
          style={{
            backgroundColor: isLoading ? '#a0a0a0' : '#391190',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
          width: '100%',
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
        <Text style={{ marginHorizontal: 10, color: '#666', fontSize: 12 }}>
          OR
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
      </View>

      {/* Google Sign-In Button */}
      <TouchableOpacity
        onPress={handleGoogleSignIn}
        disabled={isLoading || isGoogleSigningIn}
        activeOpacity={0.8}
        style={{
          width: '100%',
          backgroundColor: isGoogleSigningIn ? '#f0f0f0' : '#fff',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ddd',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
            color: '#333',
          }}
        >
          {isGoogleSigningIn ? (
            <ActivityIndicator color="#391190" size="small" />
          ) : (
            '🔵 Sign in with Google'
          )}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={{ fontSize: 14, color: '#555' }}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation?.navigate('Register')}
          disabled={isLoading || isGoogleSigningIn}
        >
          <Text style={{ fontSize: 14, color: '#391190', fontWeight: '600' }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
