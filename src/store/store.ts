import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currentWeathersSliceReducer from './slices/currentWeatherSlice';

const rootReducer = combineReducers({
  currentWeathersSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

//returns type
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
