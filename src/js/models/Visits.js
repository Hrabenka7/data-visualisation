import axios from 'axios';
import { proxy } from '../shared/constants'
import { paintChart } from '../shared/functions'


export default function () {
  axios(`${proxy}https://my-json-server.typicode.com/Hrabenka7/getChartData/Visits`)
    .then(res => {
      paintChart(res.data, '#ddbc18', '#a5460b', 'Visits')
    })
    .catch(err => console.warn(err))
}