import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Weather } from '../types/types';
import { AxiosResponse } from 'axios';

type CurrentWeather = {
  weather: Weather;
  isLoading: boolean;
  responce: Responce;
};

type Responce = {
  status: number;
  message: string;
};

const initialState = {
  weather: {},
  isLoading: false,
  responce: {
    status: 0,
    message: '',
  },
};

export const currentWeathersSlice = createSlice({
  name: 'current_weather',
  initialState,
  reducers: {
    fetchCurrentWeather(state) {
      state.isLoading = true;
    },

    fetchCurrentWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<Weather>>,
    ) {
      state.weather = action.payload.data;
      state.isLoading = false;
      state.responce = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },

    fetchCurrentWeatherError(
      state,
      action: PayloadAction<AxiosResponse<Weather>>,
    ) {
      state.isLoading = false;
      state.responce = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export default currentWeathersSlice.reducer;
