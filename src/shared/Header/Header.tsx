import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../context/ThemeContext';
import { CitySelect } from '../CitySelect/CitySelect';
import s from './Header.module.scss';

interface Props {
  city: string;
  setCity: (city: string) => void;
}

export const Header = ({ city, setCity }: Props) => {
  const theme = useTheme();

  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logo}>
          <GlobalSvgSelector id="header-logo" />
        </div>
        <div className={s.title}>React weather</div>
      </div>
      <div className={s.wrapper}>
        <div className={s.change_theme} onClick={changeTheme}>
          <GlobalSvgSelector id="change-theme" />
        </div>
        <CitySelect city={city} setCity={setCity} />
      </div>
    </header>
  );
};
