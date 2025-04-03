import React from 'react';
import { Weather } from '../../../../store/types/types';
import s from './ThisDay.module.scss';
import { useSelector } from 'react-redux';
import { selectCurrentDate } from '../../../../store/selectors';
import { useState, useEffect } from 'react';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';

interface Props {
  weather: Weather;
  city: string;
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

export const ThisDay = ({ weather, city }: Props) => {
  const currentDate = useSelector(selectCurrentDate);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const weatherMain: string = weather.weather[0].main;
  const weatherIcon: string = weatherIcons[weatherMain] || '';

  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>{Math.round(weather.main.temp)}°</div>
          <div className={s.this__day_name}>{currentDate}</div>
        </div>

        <GlobalSvgSelector id={weatherIcon} />
      </div>
      <div className={s.bottom__block}>
        <div className={s.this__time}>
          Time:
          <span> {now.toLocaleTimeString()}</span>
        </div>
        <div className={s.this__city}>
          <span>{city}</span>
        </div>
      </div>
    </div>
  );
};
