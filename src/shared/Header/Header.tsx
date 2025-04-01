import s from './Header.module.scss';
import Select from 'react-select';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../context/ThemeContext';
import { useState } from 'react';
import { useCustomDispatch } from '../../hooks/store';
import { fetchCurrentWeather } from '../../store/slices/currentWeatherSlice';

interface Props {}

export const Header = (props: Props) => {
  const theme = useTheme();
  const dispatch = useCustomDispatch();
  const options = [
    { value: 'city-1', label: 'Slavutich' },
    { value: 'city-2', label: 'Chernihiv' },
    { value: 'city-3', label: 'Kyiv' },
  ];

  const [selectedCity, setSelectedCity] = useState(options[0]);

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

  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  function handleCityChange(selectedOption: any) {
    setSelectedCity(selectedOption);

    const cityName = selectedOption.label;
    console.log('Fetching weather for city:', cityName);

    fetch(
      `${process.env.REACT_APP_API_URL}/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Weather data received:', data);
        const { lat, lon } = data.coord || {};
        if (lat && lon) {
          dispatch(fetchCurrentWeather({ latitude: lat, longitude: lon }));
        } else {
          console.error('Coordinates not found in the response:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
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
          value={selectedCity}
          onChange={handleCityChange}
          styles={colorStyles}
          options={options}
        />
      </div>
    </header>
  );
};
