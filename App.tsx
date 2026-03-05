import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';

// Import your navigation
import MainNavigation from './src/navigation';
 
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return ( 
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainNavigation />
    </SafeAreaProvider>
  );
};

export default App;
