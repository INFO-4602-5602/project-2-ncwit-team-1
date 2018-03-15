/////////vis for Question 1 & 2/////////////

//global variables
var colNames = ['Female Enrollment', 'Male Enrollment', 'Female Graduated', 'Male Graduated', 'Female Quit', 'Male Quit'];



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
var q2Width = 800 - q2Margin.left - q2Margin.right;
var q2Height = 500 - q2Margin.top - q2Margin.bottom;

//set the ranges
var q2X0 = d3.scaleBand()
  .rangeRound([0, q2Width])
  .paddingInner(0.1);

var q2X = d3.scaleBand()
  .padding(0.05);

var q2Y = d3.scaleLinear()
  .range([q2Height, 0]);

//define xy axis
var q2xAxis = d3.axisBottom()
  .scale(q2X);
var q2yAxis = d3.axisLeft()
  .scale(q2Y);

//color scheme
var color = d3.scaleOrdinal()
  .range(["#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var q2_svg = d3.select('#chart_2').append("svg")
  .attr("width", q2Width + q2Margin.left + q2Margin.right)
  .attr("height", q2Height + q2Margin.top + q2Margin.bottom)
  .append("g")
  .attr("transform", "translate(" + q2Margin.left + "," + q2Margin.top + ")");

d3.select('#q2_Form').selectAll('.category').on('change', function() {
  var xs = d3.select('#q2_Form').selectAll('.category:checked');
  var ids = xs[0].map(function(category) {
    return category.id;
  });
  updateBarChart(ids);
});
renderBarChart();

//renderBarChart function
function renderBarChart() {
  d3.csv("data/vis_1_Graduate_Dropout_rate_Year.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    //var keys = data.columns.slice(1, 4);
    var keys = ['tfg', 'tfl', 'tfe', 'tmg', 'tml', 'tme'];

    q2X0.domain(data.map(function(d) {
      return d.sy;
    }));
    q2X.domain(keys).rangeRound([0, q2X0.bandwidth()]);
    q2Y.domain([0, d3.max(data, function(d) {
      return d3.max(keys, function(key) {
        return d[key];
      });
    })]).nice();

    q2_svg.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d) {
        return "translate(" + q2X0(d.sy) + ",0)";
      })
      .selectAll("rect")
      .data(function(d) {
        return keys.map(function(key) {
          return {
            key: key,
            value: d[key]
          };
        });
      })
      .enter().append("rect")
      .attr("x", function(d) {
        return q2X(d.key);
      })
      .attr("y", function(d) {
        return q2Y(d.value);
      })
      .attr("width", q2X.bandwidth())
      .attr("height", function(d) {
        return q2Height - q2Y(d.value);
      })
      .attr("fill", function(d) {
        return color(d.key);
      });

    // x axis
    q2_svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + q2Height + ")")
      .call(d3.axisBottom(q2X0));

    q2_svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(q2Y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", q2Y(q2Y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Count");

    var legend = q2_svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", q2Width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

    legend.append("text")
      .attr("x", q2Width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) {
        return d;
      });




  });
}