import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/components/Home';
import { MonthStatistics } from './pages/MonthStatics/components/MonthStatistics';
import { Header } from './shared/Header/Header';
import { Popup } from './shared/Popup/Popup';
import { useSelector } from 'react-redux';
import { selectCurrentWeatherData } from './store/selectors';

function App() {
  const weather = useSelector(selectCurrentWeatherData); // Получаем данные о погоде
  const weatherData = weather.weather;

  // Получаем текущий день недели
  const currentDay = new Date().toLocaleString('en-us', { weekday: 'long' });

  const [showPopup, setShowPopup] = useState(false); // Стейт для отображения/скрытия попапа
  const [city, setCity] = useState<string>(''); // Инициализируем пустую строку

  useEffect(() => {
    // Здесь ты получаешь город динамически, например через геолокацию
    setCity(''); // Или setCity(cityName); если получен из API
  }, []); // Используем пустой

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="global-container">
      {showPopup && (
        <Popup weather={weatherData} city={city} onClose={handleClosePopup} />
      )}

      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                weather={weatherData}
                city={city}
                setCity={setCity}
                day={currentDay}
              />
            }
          />
          <Route path="/month-statistics" element={<MonthStatistics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
