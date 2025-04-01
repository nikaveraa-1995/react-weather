import { RootState } from './store';

export const selectCurrentWeatherData = (state: RootState) =>
  state.currentWeathersSliceReducer;

export const selectCurrentDate = (state: RootState) =>
  state.currentWeathersSliceReducer.currentDate;
