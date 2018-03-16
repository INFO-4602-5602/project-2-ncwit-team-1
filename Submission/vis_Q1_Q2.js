/////////vis for Question 1 & 2/////////////

//global variables
///////// HEAD
var colNames = ['Female Enrollment', 'Male Enrollment', 'Female Graduated', 'Male Graduated', 'Female Quit', 'Male Quit'];
var keys = ['tfe', 'tme', 'tfg', 'tmg', 'tfl', 'tml'];
var years = ['2003-2004', '2004-2005', '2005-2006', '2006-2007', '2007-2008', '2008-2009', '2009-2010', '2010-2011', '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016']
//=======
/*
var colNames = ['Female Enrollment', 'Male Enrollment', 'Female Graduated', 'Male Graduated', 'Female Quit', 'Male Quit', 'Female/Male Enrollment', 'Female/Male Graduated', 'Female/Male Quit'];
*/


//MarK: d3 visualization

//MarK: Q1 line graph
var q1Margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};
var q1Width = 800 - q1Margin.left - q1Margin.right;
var q1Height = 500 - q1Margin.top - q1Margin.bottom;

var parseTime = d3.timeParse("%Y");

var q1X = d3.scaleTime().range([0, q1Width]),
    q1Y = d3.scaleLinear().range([q1Height, 0]),
    q1Z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveMonotoneX)
    .x(function(d) {
      return q1X(d.year);
    })
    .y(function(d) {
      return q1Y(d.ratio);
    });

//define svg
var q1_svg = d3.select('#chart_1').append("svg")
  .attr("width", q1Width + q1Margin.left + q1Margin.right)
  .attr("height", q1Height + q1Margin.top + q1Margin.bottom)
  .append("g")
  .attr("transform", "translate(" + q1Margin.left + "," + q1Margin.top + ")");

d3.select('#q1_Form').selectAll('.category').on('change', function() {
  var xs = d3.select('#q1_Form').selectAll('.category:checked');
  var ids = xs[0].map(function(category) {
    return category.id;
  });
  updateLineChart(ids);
});
renderLineChart();

//renderLineChart function
function renderLineChart() {
  d3.csv("data/vis_1_Graduate_Dropout_rate_Year.csv", type, function(error, data) {
    if (error) throw error;

    //select ratios: 'fmg', 'fml', 'fme'
    var categories = data.columns.slice(13).map(function(id) {
      return {
        id: id,
        values: data.map(function(d) {
          return {
            year: d.sy,
            ratio: d[id]
          };
        })
      };
    });

    q1X.domain(d3.extent(data, function(d) {
      return d.sy;
    }));

    var q1Y_padding = 0.04;

    q1Y.domain([
      d3.min(categories, function(c) {
        return d3.min(c.values, function(d) {
          return d.ratio;
        });
      }) - q1Y_padding,
      d3.max(categories, function(c) {
        return d3.max(c.values, function(d) {
          return d.ratio;
        });
      }) + q1Y_padding
    ]);

    q1Z.domain(categories.map(function(c) {
      return c.id;
    }));

    q1_svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + q1Height + ")")
      .call(d3.axisBottom(q1X));

    q1_svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(q1Y))
      .append("text")
      .attr("x", 2)
      .attr("y", q1Y(q1Y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Female/Male Ratio");

    var category = q1_svg.selectAll(".category")
      .data(categories)
      .enter().append("g")
      .attr("class", "category");

    category.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return q1Z(d.id);
      });

    category.append("text")
      .datum(function(d) {
        return {
          id: d.id,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + q1X(d.value.year) + "," + q1Y(d.value.ratio) + ")";
      })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) {
        return d.id;
      });

    category.selectAll(".dot")
      .data(function(d){
        return d.values
      })
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function(d){
        return q1X(d.year);
      })
      .attr("cy", function(d){
        return q1Y(d.ratio);
      })

    //draw legend
    var legend = svg.selectAll(".legend")
        .data(q1color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    //draw legend colored rectangless
    legend.append("rect")
        .attr("x", q1Width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", q1color);

    //draw legend text
    legend.append("text")
        .attr("x", q1Width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})

  });

};

function type(d, _, columns) {
  d.sy = parseTime(d.sy);
  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}

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
  .scale(q2X0);
var q2yAxis = d3.axisLeft()
  .scale(q2Y).ticks(null, "s");

//color scheme
var color = d3.scaleOrdinal()
  .range(["#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var q2_svg = d3.select('#chart_2').append("svg")
  .attr("width", q2Width + q2Margin.left + q2Margin.right)
  .attr("height", q2Height + q2Margin.top + q2Margin.bottom)
  .append("g")
  .attr("transform", "translate(" + q2Margin.left + "," + q2Margin.top + ")");

d3.select('#q2_Form').selectAll('.q2_boxes').on('change', function() {
  var checked_data = [];
  var xs = d3.select('#q2_Form').selectAll('.q2_boxes').each(function() {
    cb = d3.select(this);
    if (cb.property("checked")) {
      checked_data.push(cb.property("value"));
    }
  });
  updateBarChart(checked_data);
});
renderBarChart();
var init_keys = keys.slice(0, 2);
updateBarChart(init_keys);


function renderBarChart() {
  d3.csv("data/vis_1_Graduate_Dropout_rate_Year.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    q2X0.domain(data.map(function(d) {
      return d.sy;
    }));
    q2X.domain(keys).rangeRound([0, q2X0.bandwidth()]);
    q2Y.domain([0, d3.max(data, function(d) {
      return d3.max(keys, function(key) {
        return d[key];
      });
    })]).nice();

    // x axis
    q2_svg.append("g")
      .attr("class", "q2axis_x")
      .attr("transform", "translate(0," + q2Height + ")")
      .call(d3.axisBottom(q2X0));

    //y axis
    q2_svg.append("g")
      .attr("class", "q2axis_y")
      .call(q2yAxis)
      .append("text")
      .attr("x", 2)
      .attr("y", q2Y(q2Y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Count");
  });

}

//renderBarChart function
function updateBarChart(keys) {
  d3.csv("data/vis_1_Graduate_Dropout_rate_Year.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    q2X0.domain(data.map(function(d) {
      return d.sy;
    }));
    q2X.domain(keys).rangeRound([0, q2X0.bandwidth()]);
    q2Y.domain([0, d3.max(data, function(d) {
      return d3.max(keys, function(key) {
        return d[key];
      });
    })]).nice();

    q2_svg.selectAll('.q2axis_x').call(q2xAxis);
    q2_svg.selectAll('.q2axis_y').call(q2yAxis);

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

    q2_svg.exit().transition().attr("height", 0).remove();

    var legend = q2_svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(colNames.slice())
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
