import React, { useEffect, useState } from 'react';
import s from './Popup.module.scss';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { Item } from '../../pages/Home/components/ThisDayInfo/ThisDayInfo';
import { ThisDayItem } from '../../pages/Home/components/ThisDayInfo/ThisDayItem';
import { Weather } from '../../store/types/types';
import { useSelector } from 'react-redux';
import { selectCurrentDate } from '../../store/selectors';

interface Props {
  weather: Weather;
  city: string;
  onClose: () => void;
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
export const Popup = ({ onClose, weather, city }: Props) => {
  const currentDate = useSelector(selectCurrentDate);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      icon_id: 'temp',
      name: 'Temperature',
      value: `${Math.round(weather.main.temp)}° - feels like ${Math.round(
        weather.main.feels_like,
      )}°`,
    },
    {
      icon_id: 'pressure',
      name: 'Pressure',
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon_id: 'precipitation',
      name: 'Precipitation',
      value: `${weather.main.humidity}%`,
    },
    {
      icon_id: 'wind',
      name: 'Wind',
      value: `${weather.wind.speed} m/s`,
    },
  ];
  const weatherMain: string = weather.weather[0].main;
  const weatherIcon: string = weatherIcons[weatherMain] || '';
  return (
    <>
      <div className={s.blur} onClick={onClose}></div>
      <div className={s.popup}>
        <div className={s.day}>
          <div className={s.day__temp}>{Math.round(weather.main.temp)}°</div>
          <div className={s.day__name}>{currentDate}</div>
          <div className={s.img}>
            <GlobalSvgSelector id={weatherIcon} />
          </div>
          <div className={s.day__time}>
            Time:
            <span> {now.toLocaleTimeString()}</span>
          </div>
          <div className={s.day__city}>
            <span>{city}</span>
          </div>
        </div>
        <div className={s.this__day_info_items}>
          {items.map((item: Item) => (
            <ThisDayItem key={item.icon_id} item={item} />
          ))}
        </div>
        <div className={s.close} onClick={onClose}>
          <GlobalSvgSelector id="close" />
        </div>
      </div>
    </>
  );
};
