import { Image, Text, View } from 'react-native';
import React, { FC } from 'react';
import { IMG } from '../utils';

// User profile screen displaying profile information and logo image
const CustomScreen: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'pink',
      }}
    >
      <Image
        source={{
          uri: IMG.LOGO,
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 40 }}>Activity Screens</Text>
    </View>
  );
};

export default CustomScreen;
