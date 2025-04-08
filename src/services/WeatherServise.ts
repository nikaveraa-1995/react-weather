import { AxiosResponse } from 'axios';
import { Weather } from '../store/types/types';
import api from '../assets/axios';

// export class WeatherServise {
//   static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
//     return api.get<Weather>(`/weather?q=${city}`);
//   }
// }

export class WeatherServise {
  // Метод для получения погоды по координатам (широта, долгота)
  static getCurrentWeather(
    latitude: number,
    longitude: number,
  ): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`/weather?lat=${latitude}&lon=${longitude}`);
  }
  static getCurrentWeatherByCity(city: string) {
    return api.get(
      `${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`,
    );
  }
}
