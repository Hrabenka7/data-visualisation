import axios from 'axios'
import { proxy } from '../shared/constants'
import { paintPieChart, paintLegend, paintAreaChart } from '../shared/functions'

export default function () {
  const category = "Impresions"
  const darkBlue = "#0c2749"
  const lightBlue = "#75b7ea"

  axios(`${proxy}https://my-json-server.typicode.com/Hrabenka7/getChartData/Impresions`)
    .then(res => {
      paintPieChart(res.data, lightBlue, darkBlue, category)
        .then(paintAreaChart(lightBlue, category))
      paintLegend(res.data, lightBlue, darkBlue, category)

    })
    .catch(err => console.warn(err))
}

