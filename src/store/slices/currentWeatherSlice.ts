import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Weather } from '../types/types';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';

type CurrentWeather = {
  weather: Weather;
  isLoading: boolean;
  responce: Responce;
  currentDate: string;
  location: string;
};

type Responce = {
  status: number;
  message: string;
};

const initialState: CurrentWeather = {
  weather: {
    main: {
      temp: 0,
    },
    name: '',
    weather: [{ main: '', description: '', icon: '' }],
  },

  currentDate: format(new Date(), 'dd.MM.yy'),
  isLoading: false,
  responce: {
    status: 0,
    message: '',
  },

  location: '',
};

export const currentWeathersSlice = createSlice({
  name: 'current_weather',
  initialState,
  reducers: {
    fetchCurrentWeather(state) {
      state.isLoading = true;
    },

    // fetchCurrentWeatherSuccess(
    //   state,
    //   action: PayloadAction<AxiosResponse<Weather>>,
    // ) {
    //   state.weather = action.payload.data;
    //   state.location = action.payload.cityName;
    //   state.isLoading = false;
    //   state.responce = {
    //     status: action.payload.status,
    //     message: action.payload.statusText,
    //   };
    // },

    fetchCurrentWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<Weather>>, // Стандартный тип ответа от API
    ) {
      const { data } = action.payload; // Получаем данные от API
      const cityName = data.name; // Название города

      state.weather = data; // Сохраняем информацию о погоде
      state.location = cityName; // Сохраняем город
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
export const {
  fetchCurrentWeather,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherError,
} = currentWeathersSlice.actions;
export default currentWeathersSlice.reducer;
