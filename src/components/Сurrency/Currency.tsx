import './currency.css';
import React from 'react';
import { WidgetSettings } from '../../types';
import Select from '../Select/Select';
import { fetchCurrency } from '../../utils/fetchCurrency';
interface Props {
  settings: WidgetSettings;
}

export default function CurencyWidget(props: Props) {
  const { settings } = props;
  const [currency, setCurrency] = React.useState(settings.currency1);
  let currencies = ['eur', 'usd', 'jpy'];
  const handleCurrencySelect = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    settings.currency1 = selectedCurrency;
  };
  const [value, setValue] = React.useState(100);
  React.useEffect(() => {
    fetchCurrency(String(currency)).then((result) => {
      setValue(result.toFixed(2));
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
          <div className="today">Курс на сегодня:</div>
          <div className="currency-value">{value}</div>
        </div>
      </div>
    </>
  );
}
