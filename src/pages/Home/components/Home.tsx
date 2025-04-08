import React, { useEffect } from 'react';
import { ThisDay } from './ThisDay/ThisDay';
import { ThisDayInfo } from './ThisDayInfo/ThisDayInfo';
import { Day, Days } from '../Days/Days';
import s from './Home.module.scss';
import { useCustomDispatch, UseCustomSelector } from '../../../hooks/store';
import { fetchCurrentWeather } from '../../../store/thunks/fetchCurrentWeather';
import { selectCurrentWeatherData } from '../../../store/selectors';
import { Weather } from '../../../store/types/types';

interface Props {
  weather: Weather;
  city: string;

  setCity: (city: string) => void;
  selectedDay: Day | null;
  setSelectedDay: (day: Day | null) => void;
}

export const Home = ({
  weather,
  city,
  setCity,
  selectedDay,
  setSelectedDay,
}: Props) => {
  const dispatch = useCustomDispatch();
  const { weather: currentWeather } = UseCustomSelector(
    selectCurrentWeatherData,
  );

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
            setCity(cityName);
          });
      },
      error => {
        console.error('Error getting geolocation:', error);
      },
    );
  }, [dispatch, setCity]);

  useEffect(() => {
    if (city) {
      dispatch(fetchCurrentWeather({ city }));
    }
  }, [city, dispatch]);

  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        <ThisDay weather={currentWeather} city={city} />
        <ThisDayInfo weather={weather} />
      </div>
      <Days
        weather={weather}
        city={city}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
    </div>
  );
};
