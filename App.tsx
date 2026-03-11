import React from 'react';
import MainNavigation from './src/navigation';
import rootSaga from './src/app/sagas';
import configureStore from './src/app/reducers';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor, runSaga } = configureStore();
runSaga(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;