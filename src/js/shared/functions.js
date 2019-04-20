import * as d3 from 'd3'

/** format value (eg. 5000 => 5.000)
 *  @param {int} value of visits || impresions || revenue.
 */

export function formatNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


/** count percentage for each device
 *  @param {int} device  smartphone || tablet.
 *  @param {int} total   smartphone + tabled
 */

export function countPercentage(device, total) {
  return (device / total) * 100
}



/** paint donut chart
 *  @param {Object} data  smartphone & tablet & total with their values.
 *  @param {string} colorTablet
 *  @param {string} colorSmartphone
 *  @param {string} category visits || impresions || revenue
 */

export function paintChart(data, colorTablet, colorSmartphone, category) {

  // variables
  const total = data.total
  const smartphone = data.smartphone
  const tablet = data.tablet
  const categoryUC = category.toUpperCase()

  // format number: thousands separated by period
  const totalFormated = formatNumber(total)
  const smartphoneFormated = formatNumber(smartphone)
  const tabletFormated = formatNumber(tablet)

  // count percentage
  const percentageTablet = countPercentage(tablet, total)
  const percentageSmartphone = countPercentage(smartphone, total)


  var dataChart = [
    { name: 'Smartphone', count: smartphone, percentage: percentageSmartphone, color: colorSmartphone },
    { name: 'Tablet', count: tablet, percentage: percentageTablet, color: colorTablet },
  ];

  /**  Set pie design */
  var width = 540,
    height = 540,
    radius = 220;

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(240);

  var pie = d3.pie()
    .sort(null)
    .value(function (d) {
      console.log('d what they are?', d.count)
      return d.count;
    });


  /** add pie chart to the div id*/
  var svg = d3.select('#donut' + category).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
    .data(pie(dataChart))
    .enter().append("g");

  g.append("path")
    .attr("d", arc)
    .style("fill", function (d, i) {
      return d.data.color;
    });

  g.append("text")
    .attr("transform", function (d) {
      var _d = arc.centroid(d);
      _d[0] *= 1.5;	//multiply by a constant factor
      _d[1] *= 1.5;	//multiply by a constant factor
      return "translate(" + _d + ")";
    })
    .attr("dy", ".50em")
    .style("text-anchor", "middle");

  g.append("text")
    .attr("text-anchor", "middle")
    .attr('font-size', '4em')
    .attr('y', 30)
    .text(totalFormated + '€')
    .attr('class', 'circle');

  g.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", '3em')
    .style('fill', '#969696')
    .attr('y', -40)
    .text(categoryUC);
}

// paint legend

export function paintLegend(data, colorTablet, colorSmartphone, category) {
  document.getElementById('percentageTablet' + category)
    .innerHTML = countPercentage(data.tablet, data.total) + '%'

  document.getElementById('percentageSmartphone' + category)
    .innerHTML = countPercentage(data.smartphone, data.total) + '%'

  document.getElementById('amountTablet' + category)
    .innerHTML = formatNumber(data.tablet) + '€'

  document.getElementById('amountSmartphone' + category)
    .innerHTML = formatNumber(data.smartphone) + '€'

  document.getElementById('tablet' + category).style.color = colorTablet
  document.getElementById('smartphone' + category).style.color = colorSmartphone

}