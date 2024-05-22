import { http } from '../http/http';
import { formatDate } from '../helpers/helpers';
import { ISelectValue } from '../types/select';

export const getAssets = async () => {
  const assets = await http.get('/assets?filter_asset_id=BTC,ETH,XLM,XRP,ADA');

  return assets?.data;
}

interface IExchangeItem {
  time_close: string,
  rate_close: string
}

interface IExchange {
  data: Array<IExchangeItem>
}

export const getExchange = async (currentValue: ISelectValue) => {
  const {data}: IExchange = await http.get(`/exchangerate/${currentValue['asset_id']}/USD/history?period_id=10DAY&time_start=${currentValue['data_start']}&time_end=${currentValue['data_end']}&limit=100000`)

  return ({
    labels: data.map((crypto: IExchangeItem) => formatDate(crypto.time_close)),
    datasets: [
      {
        label: "Price in USD",
        data: data.map((crypto: IExchangeItem) => crypto.rate_close),
        backgroundColor: ['#3d5dff']
      }
    ]
  });
}