import React from 'react';
import s from './ThisDay.module.scss';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';

interface Props {}

export const ThisDay = (props: Props) => {
  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>20°</div>
          <div className={s.this__day_name}>Today</div>
        </div>

        <GlobalSvgSelector id="sun" />
      </div>
      <div className={s.bottom__block}>
        <div className={s.this__time}>
          Time:
          <span>14:24</span>
        </div>
        <div className={s.this__city}>
          <span>Slavutich</span>
        </div>
      </div>
    </div>
  );
};
