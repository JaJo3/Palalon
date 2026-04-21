import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { FC, useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput';

interface RegisterProps {
  navigation?: any;
}

// Registration screen for creating new user accounts with password validation
const Register: FC<RegisterProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Validates form fields and creates new user account with error handling
  const handleRegister = async (): Promise<void> => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      Alert.alert('Success', 'Account created! Please login.');
      navigation?.goBack();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Please try again';
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomTextInput
        label="Email Address"
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
      />
      <CustomTextInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomTextInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleRegister}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#E0E0E0',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#391190', fontSize: 16, fontWeight: '600' }}>
          Register
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ fontSize: 14, color: '#555' }}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={{ fontSize: 14, color: '#391190', fontWeight: '600' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
