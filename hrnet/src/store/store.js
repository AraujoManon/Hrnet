import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeeReducer from './employeeSlice';

// Configuration de la persistance
const persistConfig = {
  key: 'root',
  storage,
};

// Créer un reducer persistant
const persistedReducer = persistReducer(persistConfig, employeeReducer);

// Créer le store avec le reducer persistant
const store = configureStore({
  reducer: {
    employees: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Créer le persistor
export const persistor = persistStore(store);
export default store;