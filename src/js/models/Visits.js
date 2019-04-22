import axios from 'axios';
import { proxy } from '../shared/constants'
import { paintPieChart, paintLegend, paintAreaChart } from '../shared/functions'


export default function () {
  const category = "Visits"
  const brown = "#a5460b"
  const yellow = "#ddbc18"

  axios(`${proxy}https://my-json-server.typicode.com/Hrabenka7/getChartData/Visits`)
    .then(res => {
      paintPieChart(res.data, yellow, brown, category)
        .then(paintAreaChart(yellow, category))
      
      paintLegend(res.data, yellow, brown, category)
    })
    .catch(err => console.warn(err))
}