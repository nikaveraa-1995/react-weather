import React from 'react';
import { Item } from './ThisDayInfo';
import s from './ThisDayInfo.module.scss';
import { IndicatorSvgSelector } from '../../../../assets/icons/indicators/IndicatorsSvgSelector';

interface Props {
  item: Item;
}

export const ThisDayItem = ({ item }: Props) => {
  const { icon_id, name, value } = item;

  return (
    <div className={s.item}>
      <div className={s.indicator}>
        <IndicatorSvgSelector id={icon_id} />
      </div>
      <div className={s.indicator__name}>{name}</div>
      <div className={s.indicator__value}>{value}</div>
    </div>
  );
};
