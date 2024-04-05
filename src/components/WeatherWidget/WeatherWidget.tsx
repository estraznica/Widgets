import './weather.css';
import React from 'react';
import { fetchWeather } from '../../utils/fetchWeather';
import Select from '../Select/Select';
import { WidgetSettings } from '../../types';
export interface IWeather {
  time: Date;
  temperature2m: number;
}
interface Props {
  settings: WidgetSettings;
}

export default function WeatherWidget(props: Props) {
  const { settings } = props;
  const [city, setCity] = React.useState(settings.city);
  let cities = ['Екатеринбург', 'Москва', 'Санкт-Петербург'];
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    settings.city = selectedCity;
  };
  const [weather, setWeater] = React.useState<IWeather>({ time: new Date(), temperature2m: 0 });
  React.useEffect(() => {
    fetchWeather(String(city)).then((result) => {
      setWeater(result);
    });
  }, [city]);

  return (
    <>
      <div className="weather">
        <Select options={cities} selected={String(city)} onSelect={handleCitySelect}></Select>
        <p>Погода сейчас</p>
        <p>Температура: {weather?.temperature2m} °С</p>
      </div>
    </>
  );
}
