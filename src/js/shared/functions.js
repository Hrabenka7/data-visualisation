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

export async function paintPieChart(data, colorTablet, colorSmartphone, category) {

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

    if(svg) {
      console.log('hey svg just rendered')
    }

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

  }

// paint area chart

export function paintAreaChart(colorTablet, category) {

  if(category === "Impresions") {
    var data = [3, 3.5, 4.2, 4, 3, 4, 3.5, 3, 3.5, 2.5, 2.4, 3.2, 3, 2.4, 2.2, 3];
  }
  else {
    var data = [3, 2.2, 2.4, 3, 3.2, 2.4, 2.5, 3.5, 3, 3.5, 4, 3, 4, 4.2, 3.5, 3];
  }
  var width = 400, height = 400;

  //set color graph area 
  let colourArea;

  switch (category) {
    case "Revenue":
      colourArea = "#eff9e8"
      break;
    case "Impresions":
      colourArea = "#e6eef7"
      break;
    case "Visits":
      colourArea = "#f7f4de"
      break;

    default:
      colourArea = "#ffffff"
  }

  var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, data.length - 1]);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 10]);

  //var xAxis = d3.axisBottom(x)

  //var yAxis = d3.axisLeft(y);

  var line = d3.area()
    .x(function (d, i) { return x(i); })
    .y1(function (d) { return y(d); })
    .y0(height)
    .curve(d3.curveBasis);

  //var svg1 = d3.select("body").append("svg")
  // (`"#donut${category} svg"`)
  var svg1 = d3.select("#donut" + category).select("svg").append("svg")
    .attr("width", width + 60)
    .attr("height", height + 50)
    .append("g")
    .attr("transform", "translate(80, 60)")

  if (svg1) {
    console.log('svg1 too')
  }

  svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
  //.call(xAxis);

  svg1.append("g")
    .attr("class", "y axis")
  //.call(yAxis)

  svg1.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", colourArea)
    .attr('stroke', colorTablet)
    .attr("stroke-width", 2)

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