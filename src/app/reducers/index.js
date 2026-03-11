import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogin } from '../sagas/auth';

import auth from '../reducers/auth';

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Persist config
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});


// Store setup
export default () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);

  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run,
  };
};
