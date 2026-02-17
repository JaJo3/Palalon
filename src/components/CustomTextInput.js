import { View, Text } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

const CustomTextInput = ({ label, placeholder, value, onChangeText }) => {
  return (
    <View style={{ width: '100%', paddingHorizontal: 20, marginVertical: 10 }}>
      <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 14 }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          width: '100%',
          height: 45,
          paddingHorizontal: 12,
          fontSize: 16,
          borderRadius: 5,
          backgroundColor: '#fff',
        }}
      />
    </View>
  );
};
export default CustomTextInput;
