import { WeatherServise } from '../../services/WeatherServise';
import { currentWeathersSlice } from '../slices/currentWeatherSlice';
import { AppDispatch } from '../store';

export const fetchCurrentWeather =
  (payLoad: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currentWeathersSlice.actions.fetchCurrentWeather());
      const res = await WeatherServise.getCurrentWeather(payLoad);

      if (res.status === 200) {
        dispatch(currentWeathersSlice.actions.fetchCurrentWeatherSuccess(res));
      } else {
        dispatch(currentWeathersSlice.actions.fetchCurrentWeatherError(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
