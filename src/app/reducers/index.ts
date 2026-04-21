import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogin } from '../sagas/auth';
import auth, { AuthState } from './auth';

export interface RootState {
  auth: AuthState;
}

export interface StoreConfig {
  store: any;
  persistor: Persistor;
  runSaga: (saga: any) => void;
}

// Create Saga Middleware
const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

// Persist config
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};

// Combine reducers
const rootReducer = combineReducers<RootState>({
  auth: persistReducer(authPersistConfig, auth) as any,
});

// Initializes Redux store with saga middleware and persistence configuration
export default function configureStore(): StoreConfig {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);

  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run,
  };
}
