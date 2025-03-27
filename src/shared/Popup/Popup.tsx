import React from 'react';
import s from './Popup.module.scss';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { Item } from '../../pages/Home/components/ThisDayInfo/ThisDayInfo';
import { ThisDayItem } from '../../pages/Home/components/ThisDayInfo/ThisDayItem';

interface Props {}

export const Popup = (props: Props) => {
  const items = [
    {
      icon_id: 'temp',
      name: 'Temperature',
      value: '20° - feels like 17°',
    },
    {
      icon_id: 'pressure',
      name: 'Pressure',
      value: '765 mm of mercury - normal',
    },
    {
      icon_id: 'precipitation',
      name: 'Precipitation',
      value: 'No precipitation',
    },
    {
      icon_id: 'wind',
      name: 'Wind',
      value: '3 m/s southwest - light wind',
    },
  ];
  return (
    <>
      <div className={s.blur}></div>
      <div className={s.popup}>
        <div className={s.day}>
          <div className={s.day__temp}>20°</div>
          <div className={s.day__name}>Wednesday</div>
          <div className={s.img}>
            <GlobalSvgSelector id="sun" />
          </div>
          <div className={s.day__time}>
            Time:
            <span>14:24</span>
          </div>
          <div className={s.day__city}>
            <span>Slavutich</span>
          </div>
        </div>
        <div className={s.this__day_info_items}>
          {items.map((item: Item) => (
            <ThisDayItem key={item.icon_id} item={item} />
          ))}
        </div>
        <div className={s.close}>
          <GlobalSvgSelector id="close" />
        </div>
      </div>
    </>
  );
};
