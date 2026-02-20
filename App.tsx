import React from 'react';
import { View } from 'react-native';
import { verifyInstallation } from 'nativewind';


// Import your navigation
import MainNavigation from './src/navigation';
import { Text } from 'react-native-gesture-handler';

 const App : () => Element = () : Element => {
      verifyInstallation();

  return ( 
    <View className="flex-1 bg-black items-center justify-center gap-4">
     <Text className="text-white font-extrabold" >TEST101</Text>
     <Text className="text-white font-extrabold" >GWAPO KO</Text>
    </View>
  );
};

export default App;
