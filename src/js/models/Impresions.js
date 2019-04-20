import axios from 'axios'
import { proxy } from '../shared/constants'
import { paintChart, paintLegend } from '../shared/functions'

export default function () {
  axios(`${proxy}https://my-json-server.typicode.com/Hrabenka7/getChartData/Impresions`)
    .then(res => {
      paintChart(res.data, '#75b7ea', '#0c2749', 'Impresions')
      paintLegend(res.data, '#75b7ea', '#0c2749', 'Impresions')

    })
    .catch(err => console.warn(err))
}

