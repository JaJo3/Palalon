import { Image, Text, View } from 'react-native';
import React, { FC } from 'react';
import { IMG } from '../utils';

// User profile screen displaying profile information and logo image
const ProfileScreen: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'blue',
      }}
    >
      <Image
        source={{
          uri: IMG.LOGO,
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 40 }}>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
