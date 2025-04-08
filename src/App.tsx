import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/components/Home';
import { MonthStatistics } from './pages/MonthStatics/components/MonthStatistics';
import { Header } from './shared/Header/Header';
import { Popup } from './shared/Popup/Popup';
import { useSelector } from 'react-redux';
import { selectCurrentWeatherData } from './store/selectors';
import { Day } from './pages/Home/Days/Days';

function App() {
  const weather = useSelector(selectCurrentWeatherData); // Получаем данные о погоде
  console.log('Weather data:', weather);

  const currentWeather = weather.weather;
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    setCity('');
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedDay(null);
  };
  console.log('selectedDay', selectedDay);

  return (
    <div className="global-container">
      {showPopup && selectedDay && (
        <Popup day={selectedDay} city={city} onClose={handleClosePopup} />
      )}

      <div className="container">
        <Header city={city} setCity={setCity} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                weather={currentWeather}
                city={city}
                setCity={setCity}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
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
