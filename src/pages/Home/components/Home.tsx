import React from 'react';
import { ThisDay } from './ThisDay/ThisDay';
import s from './Home.module.scss';

interface Props {}

export const Home = (props: Props) => {
  return (
    <div className={s.home}>
      <ThisDay />
    </div>
  );
};
