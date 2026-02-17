import { View, Text } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput';

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Email Address: {emailAdd}</Text>
      <Text>Password: {password}</Text> */}

      <CustomTextInput
        label="Username"
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
    </View>
  );
};

export default Login;
