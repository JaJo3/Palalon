import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomButton = ({ title, onPress, style = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        backgroundColor: '#391190',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        ...style,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: '600',
          ...textStyle,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;