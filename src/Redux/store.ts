import {configureStore} from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducer
import NewsSlice from './NewsSlice'

const persistConfig = {
  key: 'Root',
  storage: AsyncStorage,
}

const persist_reducer = persistReducer(persistConfig, NewsSlice)

const store = configureStore({
    reducer: {
        newsSlice: persist_reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export default store;

export const persistor = persistStore(store);