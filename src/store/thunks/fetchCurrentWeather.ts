import { WeatherServise } from '../../services/WeatherServise';
import { currentWeathersSlice } from '../slices/currentWeatherSlice';
import { AppDispatch } from '../store';

interface Payload {
  latitude: number;
  longitude: number;
}

export const fetchCurrentWeather =
  (payLoad: Payload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currentWeathersSlice.actions.fetchCurrentWeather(payLoad));
      const res = await WeatherServise.getCurrentWeather(
        payLoad.latitude,
        payLoad.longitude,
      );

      if (res.status === 200) {
        dispatch(currentWeathersSlice.actions.fetchCurrentWeatherSuccess(res));
      } else {
        dispatch(currentWeathersSlice.actions.fetchCurrentWeatherError(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
