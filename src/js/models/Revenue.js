import axios from 'axios'
import { proxy } from '../shared/constants'
import { paintPieChart, paintLegend, paintAreaChart } from '../shared/functions';

export default function () {
  const category = "Revenue"
  const darkGreen = "#204f16"
  const lightGreen = "#8fd35f"

  axios(`${proxy}https://my-json-server.typicode.com/Hrabenka7/getChartData/revenue`)
    .then(res => {
      paintPieChart(res.data, lightGreen, darkGreen, category )
        .then(paintAreaChart(lightGreen, category))
      paintLegend(res.data, lightGreen, darkGreen, category)
    })
    .catch(err => console.warn(err))
}