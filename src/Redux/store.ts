import {configureStore} from '@reduxjs/toolkit';

// Reducer
import NewsSlice from './NewsSlice'

const store = configureStore({
    reducer: {
        newsSlice: NewsSlice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export default store;