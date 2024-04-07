export type Result = {
  date: string;
  value: number;
};
export async function fetchCurrency(currency1: string) {
  let url =
    'https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off';
  let response = await fetch(url);
  let json = await response.json();
  let result: Result = {
    date: json.cbrf.data[0][json.cbrf.columns.indexOf(`CBRF_${currency1}_LAST`) - 1],
    value: json.cbrf.data[0][json.cbrf.columns.indexOf(`CBRF_${currency1}_LAST`)],
  };
  return result;
}
