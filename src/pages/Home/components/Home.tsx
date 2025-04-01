import React, { useEffect, useState } from 'react';
import { ThisDay } from './ThisDay/ThisDay';
import { ThisDayInfo } from './ThisDayInfo/ThisDayInfo';
import { Days } from '../Days/Days';
import s from './Home.module.scss';
import { useCustomDispatch, UseCustomSelector } from '../../../hooks/store';
import { fetchCurrentWeather } from '../../../store/thunks/fetchCurrentWeather';
import { selectCurrentWeatherData } from '../../../store/selectors';

interface Props {}

export const Home = (props: Props) => {
  const dispatch = useCustomDispatch();
  const { weather } = UseCustomSelector(selectCurrentWeatherData);
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        // Запрашиваем погоду по координатам
        dispatch(fetchCurrentWeather({ latitude, longitude }));

        // Для отображения города (можно использовать обратное геокодирование)
        fetch(
          `${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`,
        )
          .then(response => response.json())
          .then(data => {
            const cityName = data.name; // Город, полученный из API
            setLocation(cityName);
          });
      },
      error => {
        console.error('Error getting geolocation:', error);
      },
    );
  }, [dispatch]);

  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        <ThisDay weather={weather} city={location} />
        <ThisDayInfo weather={weather} />
      </div>
      <Days />
    </div>
  );
};
