import s from './Header.module.scss';
import Select from 'react-select';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../context/ThemeContext';
import { useState } from 'react';
import { fetchCurrentWeather } from '../../store/thunks/fetchCurrentWeather';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/thunks/fetchCurrentWeather';

interface Props {
  city: string;
  setCity: (city: string) => void;
}

export const Header = ({ city, setCity }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState('');

  const options = [
    { value: 'city-1', label: 'Slavutich' },
    { value: 'city-2', label: 'Chernihiv' },
    { value: 'city-3', label: 'Kyiv' },
  ];

  const colorStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor:
        theme.theme === Theme.DARK ? '#4F4F4F' : 'rgba(71, 147, 255, 0.2)',
      width: '194px',
      height: '37px',
      border: 'none',
      borderRadius: '10px',
      zIndex: 100,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme.theme === Theme.DARK ? '#fff' : '#000',
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
      color: theme.theme === Theme.DARK ? '#fff' : '#000',
    }),
  };

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      const selectedCity = selectedOption.label;
      setCity(selectedCity);
      dispatch(fetchCurrentWeather({ city: selectedCity }));
      setInputValue(selectedCity);
    }
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    return newValue;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setCity(inputValue);
      dispatch(fetchCurrentWeather({ city: inputValue }));
    }
  };

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
        <Select
          styles={colorStyles}
          options={options}
          isSearchable
          onChange={handleSelectChange}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={{ label: inputValue, value: inputValue }}
        />
      </div>
    </header>
  );
};
