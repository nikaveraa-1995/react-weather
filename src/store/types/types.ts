export type Weather = {
  main: {
    temp: number;
  };
  name: string;
  weather: { main: string; description: string; icon: string }[];
};
