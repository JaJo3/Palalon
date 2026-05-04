import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';

interface SplashScreenProps {
  visible?: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#391190' }}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

export default SplashScreen;
