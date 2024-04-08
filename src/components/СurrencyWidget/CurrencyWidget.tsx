import './currency.css';
import React from 'react';
import { WidgetProps } from '../../types';
import Select from '../Select/Select';
import { fetchCurrency, Result } from '../../utils/fetchCurrency';

export default function CurencyWidget(props: WidgetProps) {
  const { settings } = props;
  const [currency, setCurrency] = React.useState(settings.currency1);
  let currencies = ['EUR', 'USD'];
  const handleCurrencySelect = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    settings.currency1 = selectedCurrency;
  };
  const [value, setValue] = React.useState<Result>({ date: '', value: 100 });
  let error = false;
  React.useEffect(() => {
    fetchCurrency(String(currency))
      .then((result: Result) => {
        setValue({ date: result.date, value: Number(result.value.toFixed(2)) });
      })
      .catch(() => {
        error = true;
      });
  }, [currency]);

  return (
    <>
      <div className="currency">
        <div className="select-currency">
          <Select
            options={currencies}
            selected={String(currency)}
            onSelect={handleCurrencySelect}></Select>
          <div>{settings.currency2}</div>
        </div>
        <div className="currency-values">
          <div className="today">Курс ЦБРФ:</div>
          <div className="currency-value">{value.value}</div>
        </div>
        {!error ? (
          <div className="currency-date">*Установлен {value.date}</div>
        ) : (
          <div className="currency-error">Ошибка</div>
        )}
      </div>
    </>
  );
}
