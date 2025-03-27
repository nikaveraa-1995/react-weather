import React from 'react';
import s from './Days.module.scss';
import { Card } from './Card';
import { Tabs } from './Tabs';

interface Props {}

export interface Day {
  day_name: string;
  day_info: string;
  icon_id: string;
  temp_day: string;
  temp_night: string;
  info: string;
}

export const Days = (props: Props) => {
  const days: Day[] = [
    {
      day_name: 'Today',
      day_info: 'Aug 28',
      icon_id: 'sun',
      temp_day: '+18',
      temp_night: '+15',
      info: 'Cloudy',
    },
    {
      day_name: 'Tomorrow',
      day_info: 'Aug 29',
      icon_id: 'small_rain_sun',
      temp_day: '+18',
      temp_night: '+15',
      info: 'light rain and sun',
    },
    {
      day_name: 'Wed',
      day_info: 'Aug 30',
      icon_id: 'small_rain',
      temp_day: '+18',
      temp_night: '+15',
      info: 'light rain',
    },
    {
      day_name: 'Thu',
      day_info: 'Aug 28',
      icon_id: 'mainly_cloudy',
      temp_day: '+18',
      temp_night: '+15',
      info: 'Cloudy',
    },
    {
      day_name: 'Fri',
      day_info: 'Aug 28',
      icon_id: 'rain',
      temp_day: '+18',
      temp_night: '+15',
      info: 'Cloudy',
    },
    {
      day_name: 'Sat',
      day_info: 'Aug 28',
      icon_id: 'sun',
      temp_day: '+18',
      temp_night: '+15',
      info: 'Cloudy',
    },
    {
      day_name: 'Sun',
      day_info: 'Aug 28',
      icon_id: 'sun',
      temp_day: '+18',
      temp_night: '+15',
      info: 'Cloudy',
    },
  ];

  return (
    <>
      <Tabs />
      <div className={s.days}>
        {days.map((day: Day, index: number) => (
          <Card key={`${day.icon_id}-${index}`} day={day} />
        ))}
      </div>
    </>
  );
};
