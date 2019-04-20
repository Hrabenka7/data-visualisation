import axios from 'axios'
import { proxy } from '../shared/constants'
import { paintChart } from '../shared/functions';

export default function () {
  axios(`${proxy}https://my-json-server.typicode.com/Hrabenka7/getChartData/revenue`)
    .then(res => {
      paintChart(res.data, '#8fd35f', '#204f16', 'Revenue')

    })
    .catch(err => console.warn(err))
}