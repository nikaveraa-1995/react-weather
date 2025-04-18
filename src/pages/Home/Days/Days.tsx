import React, { useEffect, useState } from 'react';
import s from './Days.module.scss';
import { Card } from './Card';
import { Tabs } from './Tabs';
import axios from 'axios';
import { Weather } from '../../../store/types/types';
import { Popup } from '../../../shared/Popup/Popup';

interface Props {
  weather: Weather;

  city: string;
  selectedDay: Day | null;
  setSelectedDay: (day: Day | null) => void;
}

export interface Day {
  pressure: number;
  humidity: number;
  feels_like: number;
  day_name: string;
  info: string;
  icon_id: string;
  temp_night: number;
  weather_main: number;
  day_info: string;
  temp_day: number;
  wind_speed: number;
  weather: { day: string; description: string; icon: string }[];
}

const weatherIcons: { [key: string]: string } = {
  Clear: 'sun',
  Clouds: 'mainly_cloudy',
  Rain: 'rain',
  Thunderstorm: 'mainly_cloudy',
  Drizzle: 'small_rain',
  Snow: 'mainly_cloudy',
  Mist: 'mainly_cloudy',
  Fog: 'mainly_cloudy',
  Haze: 'mainly_cloudy',
  'Clouds+Rain': 'small_rain_sun',
};

export const Days = ({ weather, city, selectedDay, setSelectedDay }: Props) => {
  const [days, setDays] = useState<Day[]>([]);
  const [error] = useState<string>('');

  useEffect(() => {
    if (city) {
      // Запрашиваем данные погоды для нового города
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
        )
        .then(response => {
          const forecast = response.data.list;

          if (!forecast) {
            console.error('Forecast data not found');
            return;
          }

          const filteredForecast = forecast.filter(
            (_: any, index: number) => index % 8 === 0,
          );

          const forecastData = filteredForecast.map((day: any) => ({
            day_name: new Date(day.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'long',
            }),

            icon_id: weatherIcons[day.weather[0].main] || '',
            temp_day: Math.round(day.main.temp),
            temp_night: Math.round(day.main.temp_min),
            info: day.weather[0].description,
            feels_like: Math.round(day.main.feels_like),
            pressure: day.main.pressure,
            humidity: day.main.humidity,
            wind_speed: day.wind.speed,
            weather_main: day.weather[0].main,
            weather: [
              {
                day: day.weather[0].main,
                description: day.weather[0].description,
                icon: day.weather[0].icon,
              },
            ],
          }));

          setDays(forecastData);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]); // Добавляем зависимость от city
  // useEffect(() => {
  //   if ('geolocation' in navigator) {
  //     // Получение геолокации
  //     navigator.geolocation.getCurrentPosition(
  //       position => {
  //         const { latitude, longitude } = position.coords;
  //         fetchWeatherData(latitude, longitude);
  //       },
  //       error => {
  //         console.error('Error getting geolocation', error);
  //         setError('Unable to retrieve your location');
  //       },
  //     );
  //   } else {
  //     setError('Geolocation is not supported by this browser.');
  //   }
  // }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <Tabs />
      <div className={s.days}>
        {days.map((day: Day, index: number) => (
          <Card
            weather={weather}
            key={`${day.icon_id}-${index}`}
            day={day}
            onClick={() => setSelectedDay(day)}
          />
        ))}
        {selectedDay && (
          <Popup
            city={city}
            day={selectedDay}
            onClose={() => setSelectedDay(null)}
          />
        )}
      </div>
    </>
  );
};
