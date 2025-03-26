import React from 'react';
import s from './ThisDay.module.scss';

interface Props {}

export const ThisDay = (props: Props) => {
  return (
    <header className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.this__temp}>20°</div>
        <div className={s.this__day_day}>Today</div>
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
    </header>
  );
};
