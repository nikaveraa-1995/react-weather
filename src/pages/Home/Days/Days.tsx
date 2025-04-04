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

  weather_main: string;

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

export const Days = ({ weather, city }: Props) => {
  const [days, setDays] = useState<Day[]>([]);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [error, setError] = useState<string>('');

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
      );
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
          weekday: 'short',
        }),
        day_info: new Date(day.dt * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        icon_id: weatherIcons[day.weather[0].main] || '',
        temp_day: `${Math.round(day.main.temp)}°`,
        temp_night: `${Math.round(day.main.temp_min)}°`,
        info: day.weather[0].description,
      }));

      setDays(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Получение геолокации
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        error => {
          console.error('Error getting geolocation', error);
          setError('Unable to retrieve your location');
        },
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

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
