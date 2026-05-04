import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import RootNavigation from './src/navigation';
import rootSaga from './src/app/sagas';
import configureStore, { StoreConfig } from './src/app/reducers';
import AlertMessage from './src/components/alertMsg';
import SplashScreen from './src/components/SplashScreen';
import { configureGoogleSignIn } from './src/utils/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { INIT_AUTH } from './src/app/actions';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootState } from './src/app/reducers/index';

const storeConfig: StoreConfig = configureStore();
storeConfig.runSaga(rootSaga);

// Inner component that can access Redux store
const AppContent: FC = () => {
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState(true);
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Initialize Firebase and Google Sign-In on app start
    const initializeServices = async () => {
      try {
        // Verify GoogleSignin is available before configuring
        if (!GoogleSignin) {
          throw new Error('GoogleSignin module is not available');
        }

        // Configure GoogleSignin for authentication
        configureGoogleSignIn();
        console.log('✓ Firebase and Google Sign-In initialized successfully');
      } catch (error) {
        console.error('✗ Error during initialization:', error);
        // Continue anyway - app can still function with limited features
      }
    };

    initializeServices();

    // Dispatch auth initialization
    dispatch({ type: INIT_AUTH });

    // Set a timeout to hide splash screen after 5 seconds maximum
    // This prevents infinite loading if something goes wrong
    const timeoutId = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  // Hide splash once auth initialization is complete
  useEffect(() => {
    if (isInitialized) {
      setShowSplash(false);
    }
  }, [isInitialized]);

  return (
    <View style={{ flex: 1 }}>
      <SplashScreen visible={showSplash} />
      {!showSplash && (
        <>
          <RootNavigation />
          <AlertMessage />
        </>
      )}
    </View>
  );
};

const App: FC = () => {
  return (
    <Provider store={storeConfig.store}>
      <PersistGate loading={null} persistor={storeConfig.persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;