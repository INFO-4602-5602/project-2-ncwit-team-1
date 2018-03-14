/////////vis for Question 1 & 2/////////////

//global variables








//MarK: d3 visualization

//MarK: Q1 line graph






//MarK:Q2 bar chart
//set vis2 margin and width/height
var q2Margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};
var q2Width = 600 - q2Margin.left - q2Margin.right;
var q2Height = 500 - q2Margin.top - q2Margin.bottom;

//set the ranges
var q2X = d3.scaleBand()
  .range([0, q2Width])
  .padding(0.3);
var q2Y = d3.scaleLinear()
  .range([q2Height, 0]);

//define xy axis
var q2xAxis = d3.axisBottom()
  .scale(q2X);
var q2yAxis = d3.axisLeft()
  .scale(q2Y);