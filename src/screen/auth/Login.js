import { View, Text, Touchable } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Email Address: {emailAdd}</Text>
      <Text>Password: {password}</Text> */}

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

        <View>
          <Text style={{ 
            color: '#391190', 
            fontSize: 16, 
            fontWeight: '600',
            backgroundColor: '#E0E0E0',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
             }}>
            Login
          </Text>
        </View>
    
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
     <Text style={{ fontSize: 14, color: '#555' }}>Don't have an account? </Text>
       <Text style={{ fontSize: 14, color: '#391190', fontWeight: '600' }}>Sign Up</Text>   
    </View>
    </View>
  );
};

export default Login;
