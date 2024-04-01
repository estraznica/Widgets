import './weather.css';
import React from 'react';
import { fetchWeather } from '../../utils/fetchWeather';
import Select from '../Select/Select';
export interface IWeather {
  time: Date;
  temperature2m: number;
}
export default function WeatherWidget() {
  const [city, setCity] = React.useState('');
  let cities = ['Екатеринбруг', 'Москва', 'Санкт-Петербург'];
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };
  const [weather, setWeater] = React.useState<IWeather>({ time: new Date(), temperature2m: 0 });
  React.useEffect(() => {
    fetchWeather(city).then((result) => {
      setWeater(result);
    });
  }, [city]);

  return (
    <>
      <div className="weather">
        <Select options={cities} onSelect={handleCitySelect}></Select>
        <p>Погода сейчас</p>
        <p>Температура: {weather?.temperature2m} °С</p>
      </div>
    </>
  );
}
