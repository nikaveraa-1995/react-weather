import { WeatherServise } from '../../services/WeatherServise';
import { currentWeathersSlice } from '../slices/currentWeatherSlice';
import { AppDispatch } from '../store';

export interface Payload {
  latitude?: number;
  longitude?: number;
  city?: string;
}

export const fetchCurrentWeather =
  (payLoad: Payload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currentWeathersSlice.actions.fetchCurrentWeather(payLoad));
      let res;

      if (payLoad.city) {
        res = await WeatherServise.getCurrentWeatherByCity(payLoad.city);
      } else if (payLoad.latitude && payLoad.longitude) {
        res = await WeatherServise.getCurrentWeather(
          payLoad.latitude,
          payLoad.longitude,
        );
      } else {
        throw new Error('Не указаны ни координаты, ни город');
      }

      if (res.status === 200) {
        dispatch(currentWeathersSlice.actions.fetchCurrentWeatherSuccess(res));
      } else {
        dispatch(currentWeathersSlice.actions.fetchCurrentWeatherError(res));
      }
    } catch (error) {
      console.log(error);
    }
  };

export type { AppDispatch };
