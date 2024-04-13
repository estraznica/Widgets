import { fetchWeatherApi } from 'openmeteo';

export async function fetchWeather(city: string) {
  //Екатеринбург
  let latitude = 56.8519;
  let longitude = 60.6122;
  if (city == 'Афины') {
    latitude = 37.9838;
    longitude = 23.7278;
  } else if (city == 'Джакарта') {
    latitude = -6.2146;
    longitude = 106.8451;
  }
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: ['temperature_2m', 'weather_code'],
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
      weatherCode: current.variables(1)!.value(),
    },
  };
  return weatherData.current;
}

interface WeatherCodes {
  [code: number]: string;
}

export const weatherCodes: WeatherCodes = {
  0: 'Ясно',
  1: 'Преимущественно ясно',
  2: 'Переменная облачность',
  3: 'Пасмурно',
  45: 'Туман',
  48: 'Туман',
  51: 'Дождливо',
  53: 'Дождливо',
  55: 'Дождливо',
  56: 'Дождь',
  57: 'Дождь',
  61: 'Дождь',
  63: 'Дождь',
  65: 'Сильный дождь',
  66: 'Дождь',
  67: 'Сильный дождь',
  71: 'Легкий снегопад',
  73: 'Снегопад',
  75: 'Сильный снегопад',
  77: 'Град',
  80: 'Ливень',
  81: 'Ливень',
  82: 'Ливень',
  85: 'Снегопад',
  86: 'Снегопад',
  95: 'Гроза',
  96: 'Гроза',
  99: 'Гроза',
};
export function getBackround(weather: string) {
  let background = '';
  if (weather == 'Ясно' || weather == 'Преимущественно ясно') {
    background = 'sun';
  }
  if (weather == 'Переменная облачность' || weather == 'Пасмурно' || weather == 'Туман') {
    background = 'cloud';
  }
  if (
    weather == 'Дождливо' ||
    weather == 'Дождь' ||
    weather == 'Сильный дождь' ||
    weather == 'Ливень' ||
    weather == 'Гроза'
  ) {
    background = 'rain';
  }
  if (
    weather == 'Легкий снегопад' ||
    weather == 'Снегопад' ||
    weather == 'Сильный снегопад' ||
    weather == 'Град'
  ) {
    background = 'snow';
  }
  return background;
}
