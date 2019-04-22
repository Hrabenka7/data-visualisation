import {countPercentage} from '../../src/js/shared/functions'
import { JSDOM } from 'jsdom'
import * as matchers from 'jasmine-dom-custom-matchers'

describe('function countPercentage', function() {

  it('should count percentage', function() {
    expect(countPercentage(5,10)).toBe(50)
  })

  it('handle division by 0', function () {
    expect(function() { countPercentage(5,0) }).toThrowError(Error)
  })

  it('total value should be greater than device value', function () {
    expect(function () { countPercentage(5, 3) }).toThrowError(Error)
  })

});


describe('test DOM', function () {
  const dom = new JSDOM('<html><body></body></html>');

  beforeAll(function () {
    jasmine.addMatchers(matchers);  //set custom matchers for jasmine
    this.divPercentage = dom.window.document.createElement("div");
    this.divPercentage.setAttribute("id", "percentageTabletRevenue")
    this.divPercentage.textContent = "40%"

    this.donutChart = dom.window.document.createElement("svg");
    this.donutChart.setAttribute("id", "donutPieRevenue")
    
    this.areaChart = dom.window.document.createElement("svg");
    this.areaChart.setAttribute("id", "donutAreaRevenue")

    this.donutChart.appendChild(this.areaChart)

    this.tabletRevenue = dom.window.document.createElement("div");
    this.tabletRevenue.setAttribute("id", "tabletRevenue");
    this.tabletRevenue.textContent = "Tablet"
    this.tabletRevenue.setAttribute("style", "color:red");

  });

  afterAll(function () {
    this.divPercentage.remove()
    this.donutChart.remove();
    this.areaChart.remove();
  })

  it('should have donut chart', function () {
    expect(this.donutChart.getAttribute("id")).toBe('donutPieRevenue');
  });

  it('donut chart should have area chart inside', function () {
     expect(this.areaChart).toBeChildOf(this.donutChart);
   });

  it("div percentageTabletRevenue should have text", function () {
    expect(this.divPercentage).not.toBeEmpty();    
  });

  it("div tabletRevenue should have correct colour", function () {
    expect(this.tabletRevenue).toBeHTMLElement()
    expect(this.tabletRevenue.getAttribute("style")).toContain("color:red")
  })

});
  



