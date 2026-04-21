import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import RootNavigation from './src/navigation';
import rootSaga from './src/app/sagas';
import configureStore, { StoreConfig } from './src/app/reducers';
import AlertMessage from './src/components/alertMsg';
import { configureGoogleSignIn } from './src/utils/firebase';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const storeConfig: StoreConfig = configureStore();
storeConfig.runSaga(rootSaga);

const App: FC = () => {
  useEffect(() => {
    // Initialize Firebase and Google Sign-In on app start
    try {
      configureGoogleSignIn();
      console.log('Google Sign-In configured successfully');
    } catch (error) {
      console.error('Error configuring Google Sign-In:', error);
    }
  }, []);

  return (
    <Provider store={storeConfig.store}>
      <PersistGate loading={null} persistor={storeConfig.persistor}>
        <View style={{ flex: 1 }}>
          <RootNavigation />
          <AlertMessage />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;