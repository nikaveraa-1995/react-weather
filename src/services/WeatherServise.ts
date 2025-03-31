import axios, { AxiosResponse } from 'axios';
import { Weather } from '../store/types/types';

export class WeatherServise {
  static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
    return axios.get(
      `api.openweathermap.org/data/2.5/weather?q=${city}&appid=e311f085eed65a20be9cef3ea488369f`,
    );
  }
}
