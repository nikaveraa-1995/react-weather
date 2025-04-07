export const geocodeCity = async (cityName: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};
