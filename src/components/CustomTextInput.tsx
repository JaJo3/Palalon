import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React, { FC } from 'react';
import { TextInput } from 'react-native-gesture-handler';

interface CustomTextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  [key: string]: any;
}

// Reusable custom text input with label, supports secure entry for passwords
const CustomTextInput: FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <View style={{ width: '100%', paddingHorizontal: 20, marginVertical: 10 }}>
      <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 14 }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
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
