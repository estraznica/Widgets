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
        <div className="select-weather">
          <img src="public/img/location.svg" alt="place" />
          <Select options={cities} selected={String(city)} onSelect={handleCitySelect}></Select>
        </div>
        <div className="weather-now">
          <div>Погода сейчас</div>
          <div className="degree">
            {weather?.temperature2m} °<span>С</span>
          </div>
        </div>
      </div>
    </>
  );
}
