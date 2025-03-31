import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currentWeathersSliceReducer from './slices/currentWeatherSlice';

const rootReducer = combineReducers({
  currentWeathersSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//returns type
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
