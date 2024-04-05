//https://github.com/fawazahmed0/exchange-api
export async function fetchCurrency(currency1: string) {
  let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency1}.json`;
  let response = await fetch(url);
  let data = await response.json();
  return data[currency1].rub;
}
