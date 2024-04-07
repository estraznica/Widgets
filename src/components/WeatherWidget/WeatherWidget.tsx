import './weather.css';
import React from 'react';
import { fetchWeather, weatherCodes, getBackround } from '../../utils/fetchWeather';
import Select from '../Select/Select';
import { WidgetSettings } from '../../types';
export interface IWeather {
  time: Date;
  temperature2m: number;
  weatherCode: number;
}
interface Props {
  settings: WidgetSettings;
}
export default function WeatherWidget(props: Props) {
  const { settings } = props;
  const [city, setCity] = React.useState(settings.city);
  let cities = ['Екатеринбург', 'Афины', 'Джакарта'];
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    settings.city = selectedCity;
  };
  const [weather, setWeater] = React.useState<IWeather>({
    time: new Date(),
    temperature2m: 0,
    weatherCode: 0,
  });
  const [loading, setLoading] = React.useState(true);
  let error = false;
  React.useEffect(() => {
    fetchWeather(String(city))
      .then((result) => {
        setWeater(result);
        setLoading(false);
      })
      .catch(() => {
        error = true;
      });
  }, [city]);
  const updateWeather = () => {
    setLoading(true);
    fetchWeather(String(city))
      .then((result) => {
        setWeater(result);
        setLoading(false);
      })
      .catch(() => {
        error = true;
      });
  };
  const background = getBackround(weatherCodes[weather?.weatherCode]);

  return (
    <>
      <div className={`weather ${loading ? 'no-background' : background}`}>
        <div className="weather-icons">
          <img src="/img/location.svg" alt="place" />
          <button className="update-weather" onClick={updateWeather}>
            <img src="/img/update.svg" alt="0" />
          </button>
        </div>
        <div className="weather-values">
          <div className="select-weather">
            <Select options={cities} selected={String(city)} onSelect={handleCitySelect}></Select>
          </div>
          <div className="weather-now">
            <div>Погода сейчас</div>
            <div className="degree">
              {weather?.temperature2m} °<span>С</span>
            </div>
          </div>
          <div className="weather-description">
            {loading ? '' : weatherCodes[weather?.weatherCode]}
            {error && <>Ошибка</>}
          </div>
        </div>
      </div>
    </>
  );
}
