import React from 'react';
import s from './Days.module.scss';

interface Props {}

interface Tab {
  value: string;
}

export const Tabs = (props: Props) => {
  const tabs: Tab[] = [
    {
      value: 'For 5 days',
    },
  ];

  return (
    <div className={s.tabs}>
      <div className={s.tabs__wrapper}>
        {tabs.map(tab => (
          <div className={s.tab} key={tab.value}>
            {tab.value}
          </div>
        ))}
      </div>
    </div>
  );
};
