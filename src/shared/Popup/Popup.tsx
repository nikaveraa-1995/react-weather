import React, { useEffect, useState } from 'react';
import s from './Popup.module.scss';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { Item } from '../../pages/Home/components/ThisDayInfo/ThisDayInfo';
import { ThisDayItem } from '../../pages/Home/components/ThisDayInfo/ThisDayItem';

import { Day } from '../../pages/Home/Days/Days';

interface Props {
  day: Day;
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
export const Popup = ({ onClose, day, city }: Props) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      icon_id: 'temp',
      name: 'Temperature',
      value: `${day.temp_day}° - feels like ${day.feels_like}°`,
    },
    {
      icon_id: 'pressure',
      name: 'Pressure',
      value: `${day.pressure} hPa`,
    },
    {
      icon_id: 'precipitation',
      name: 'Precipitation',
      value: `${day.humidity}%`,
    },
    {
      icon_id: 'wind',
      name: 'Wind',
      value: `${day.wind_speed} m/s`,
    },
  ];

  const weatherMain = day.weather[0].day;
  const weatherIcon = weatherIcons[weatherMain] || '';

  return (
    <>
      <div className={s.blur} onClick={onClose}></div>

      <div className={s.popup}>
        <div className={s.day}>
          <div className={s.day__temp}>{Math.round(day.temp_day)}°</div>
          <div className={s.day__name}>{day.day_name}</div>
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
