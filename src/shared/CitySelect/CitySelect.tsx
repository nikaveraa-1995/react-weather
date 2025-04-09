import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchCities } from '../../services/fetchCities';
import { useDispatch } from 'react-redux';
import { fetchCurrentWeather } from '../../store/thunks/fetchCurrentWeather';
import { AppDispatch } from '../../store/thunks/fetchCurrentWeather';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../context/ThemeContext';

interface Props {
  city: string;
  setCity: (city: string) => void;
}
const defaultCities = [
  { value: 'slavutych', label: 'Slavutich, UA' },
  { value: 'chernihiv', label: 'Chernihiv, UA' },
  { value: 'kyiv', label: 'Kyiv, UA' },
];
export const CitySelect = ({ city, setCity }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const [inputValue, setInputValue] = useState(city);
  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (inputValue.trim().length > 1) {
      const delay = setTimeout(async () => {
        const cities = await fetchCities(inputValue);
        setCityOptions(cities);
      }, 300);

      return () => clearTimeout(delay);
    } else {
      setCityOptions(defaultCities);
    }
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    return newValue;
  };

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      setInputValue(selectedOption.label);
      setCity(selectedOption.label);
      dispatch(fetchCurrentWeather({ city: selectedOption.label }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setCity(inputValue);
      dispatch(fetchCurrentWeather({ city: inputValue }));
    }
  };

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
    input: (styles: any) => ({
      ...styles,
      color: theme.theme === Theme.DARK ? '#fff' : '#000',
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: theme.theme === Theme.DARK ? '#4F4F4F' : '#fff',
      color: theme.theme === Theme.DARK ? '#fff' : '#000',
    }),
  };

  return (
    <Select
      styles={colorStyles}
      options={cityOptions}
      isSearchable
      onInputChange={handleInputChange}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={
        cityOptions.find(opt => opt.label === inputValue) || {
          label: inputValue,
          value: inputValue,
        }
      }
      placeholder="Search city..."
    />
  );
};
