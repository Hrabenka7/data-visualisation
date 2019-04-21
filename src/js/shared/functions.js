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
  
  if(total === 0) {
   throw new Error("You can't divide by 0")   
  }

  if(total < device) {
    throw new Error("Total value has to be greater than device value") 
  }

  let result = (parseInt(device) / parseInt(total)) * 100
  return result 
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
    .attr('font-size', '3.2em')
    .attr('y', 20)
    .text(totalFormated + '€')
    // .attr('class', 'circle');

  g.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", '2.5em')
    .style('fill', '#969696')
    .attr('y', -40)
    .text(categoryUC);
  

  // "clock" rectangles
  g.append("rect")
    .attr('y', -200)
    .attr('x', 0)
    .attr("width", 5)
    .attr("height", 10)
    .style('fill', '#969696')

  g.append("rect")
    .attr('y', 180)
    .attr('x', 0)
    .attr("width", 5)
    .attr("height", 10)
    .style('fill', '#969696')

  g.append("rect")
    .attr('y', 0)
    .attr('x', -200)
    .attr("width", 10)
    .attr("height", 5)
    .style('fill', '#969696')

  g.append("rect")
    .attr('y', 0)
    .attr('x', 180)
    .attr("width", 10)
    .attr("height", 5)
    .style('fill', '#969696')


  // line
  // var typeData = [
  //   { x: 0, y: 0, },
  //   { x: 1, y: 1, },
  //   { x: 2, y: 2, },
  //   { x: 3, y: 3, },
  //   { x: 4, y: 4, },
  //   { x: 5, y: 5, },
  //   { x: 6, y: 6, },
  // ];

  // var margin = { top: 0, right: 0, bottom: 0, left: 0 },
  //   width = 200 - margin.left - margin.right,
  //   height = 150 - margin.top - margin.bottom;
  
  // var x = d3.scaleLinear()
  //   .domain([0, d3.max(data, function (d) { return d.x; })])
  //   .range([0, width]);

  // var y = d3.scaleLinear()
  //   .domain([0, d3.max(data, function (d) { return d.y; })])
  //   .range([height, 0]);

  // var xAxis = d3.axisBottom(x)

  // var yAxis = d3.axisLeft(y);

  

  // var area = d3.area()
  //   .x(function (d) {
  //     console.log('d',d) 
  //     return x(d.x); })
  //   .y0(height)
  //   .y1(function (d) { return y(d.y); })
  //   .curve(d3.curveLinear)
    

  // // var svg = d3.select("svg#area")
  // //   .attr("width", width + margin.left + margin.right)
  // //   .attr("height", height + margin.top + margin.bottom)
  // //   .append("g")
  // //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // g.append("path")
  //   .datum(data)
  //   .attr("class", "area")
  //   .attr("d", area);

  // g.append("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(xAxis);

  // g.append("g")
  //   .attr("class", "y axis")
  //   .call(yAxis);


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