export type Weather = {
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  weather: { main: string; description: string; icon: string }[];
};
