import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React, { FC } from 'react';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

// Reusable custom button component with purple background and customizable styles
const CustomButton: FC<CustomButtonProps> = ({ title, onPress, style = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: '#391190',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 5,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
