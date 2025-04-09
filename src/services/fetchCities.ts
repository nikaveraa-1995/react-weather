export const fetchCities = async (query: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_API_KEY}`,
  );
  const data = await response.json();

  return data.map((item: any, idx: number) => ({
    value: `${item.lat}-${item.lon}-${idx}`,
    label: `${item.name}, ${item.state || ''} ${item.country}`.trim(),
  }));
};
