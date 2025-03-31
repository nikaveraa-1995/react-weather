import { AxiosResponse } from 'axios';
import { Weather } from '../store/types/types';
import api from '../assets/axios';

export class WeatherServise {
  static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`/weather?q=${city}`);
  }
}
