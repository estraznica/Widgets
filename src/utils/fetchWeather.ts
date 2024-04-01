import { fetchWeatherApi } from 'openmeteo';

export async function fetchWeather(city: string) {
  let latitude = 56.8519;
  let longitude = 60.6122;
  if (city == 'Москва') {
    latitude = 55.7522;
    longitude = 37.6156;
  } else if (city == 'Санкт-Петербург') {
    latitude = 59.9386;
    longitude = 30.3141;
  }
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: 'temperature_2m',
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: Math.floor(current.variables(0)!.value()),
    },
  };
  return weatherData.current;
}
