/////////vis for Question 1 & 2/////////////

//global variables

var colNames_Q2 = ['Female Enrollment', 'Male Enrollment', 'Female Graduated', 'Male Graduated', 'Female Quit', 'Male Quit'];
var data_keys = ['tfe', 'tme', 'tfg', 'tmg', 'tfl', 'tml'];


var q1colNames = ['Female/Male Graduated Ratio', 'Female/Male Quit Ratio', 'Female/Male Enrollment Ratio']

//MarK: d3 visualization

//MarK: Q1 line graph
var q1Margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};

var q1Width = 750 - q1Margin.left - q1Margin.right;
var q1Height = 500 - q1Margin.top - q1Margin.bottom;

var parseTime = d3.timeParse("%Y");

var q1X = d3.scaleTime().range([0, q1Width]),
  q1Y = d3.scaleLinear().range([q1Height, 0]),
  q1Z = d3.scaleOrdinal(d3.schemeCategory10);

var q1color = d3.scaleOrdinal(d3.schemeCategory10);

//define xy axis
var q1xAxis = d3.axisBottom()
  .scale(q1X);
var q1yAxis = d3.axisLeft()
  .scale(q1Y);

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

//q1 value -> column_id
var q1_dict = {
  "enrollment": 15,
  "graduated": 13,
  "quit": 14
}

d3.select('#q1_Form').selectAll('.q1_boxes').on('change', function() {
  var checked_data_ids = [];
  var xs = d3.select('#q1_Form').selectAll('.q1_boxes').each(function() {
    cb = d3.select(this);
    if (cb.property("checked")) {
      //  checked_data.push()
      checked_data_ids.push(q1_dict[cb.property("value")]);
    }
  });
  //console.log(checked_data_ids);
  updateLineChart(checked_data_ids);
  //renderLineChart(13);
});
renderLineChart(-1);
updateLineChart([15]);

function updateLineChart(q1_keys) {
  d3.csv("data/vis_1_Graduate_Dropout_rate_Year.csv", type, function(error, data) {
    if (error) throw error;
    if (q1_keys.length == 0) {
      q1_svg.selectAll(".category").remove();
      q1_svg.selectAll(".legend").remove();
    }
    //select ratios: 'fmg', 'fml', 'fme'
    var categories = data.columns.slice(13, 16).map(function(id) {
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

    var scategories = new Array();
    var sQ1LegendNames = new Array();
    var sId = new Array();
    for (var i = 0; i < q1_keys.length; i++) {
      scategories[i] = categories[q1_keys[i] - 13];
      sQ1LegendNames[i] = q1colNames[q1_keys[i] - 13];
      sId[i] = scategories[i].id;
    }

    q1X.domain(d3.extent(data, function(d) {
      return d.sy;
    }));

    var q1Y_padding = 0.04;

    q1Y.domain([
      d3.min(scategories, function(c) {
        return d3.min(c.values, function(d) {
          return d.ratio;
        });
      }) - q1Y_padding,
      d3.max(scategories, function(c) {
        return d3.max(c.values, function(d) {
          return d.ratio;
        });
      }) + q1Y_padding
    ]);

    q1Z.domain(scategories.map(function(c) {
      return c.id;
    }));

    q1_svg.selectAll('.q1axis_x').call(q1xAxis);
    q1_svg.selectAll('.q1axis_y').call(q1yAxis);
    /*
        q1_svg.append("g")
          .attr("class", "axis axis-x")
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
        */
    q1_svg.selectAll(".category").exit().remove();
    var category = q1_svg.selectAll(".category")
      .data(scategories)
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

    //q1_svg.selectAll(".line").remove();
    q1_svg.selectAll(".category").remove();
    q1_svg.selectAll(".legend").remove();
    q1_svg.selectAll(".points").remove();
    q1_svg.selectAll('.q1axis_x').call(q1xAxis);
    q1_svg.selectAll('.q1axis_y').call(q1yAxis);

    //q1_svg.selectAll(".line").attr("height", 0);
    q1Z.domain(categories.map(function(c) {
      return c.id;
    }));

    var category = q1_svg.selectAll(".category")
      .data(scategories)
      .enter().append("g")
      .attr("class", "category");

    category.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        console.log(q1Z(d.id));
        return q1Z(d.id);
      });

    category
      .style("fill", "#FFF")
      .style("stroke", function(d) {
        return q1Z(d.id);
      })
      .selectAll(".dot")
      .data(function(d) {
        return d.values
      })
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", function(d) {
        return q1X(d.year);
      })
      .attr("cy", function(d) {
        return q1Y(d.ratio);
      });

    //empty points
    var points = q1_svg.selectAll('.points')
      .data(scategories)
      .enter()
      .append('g')
      .attr('class', 'points')
      .append('text');

    var legend = q1_svg.selectAll(".legend")
      .data(sQ1LegendNames)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("line")
      .attr("x1", q1Width - 40)
      .attr("x2", q1Width)
      .attr("y1", 10)
      .attr("y2", 10)
      .style("stroke", function(d, i) {
        return q1Z(sId[i]);
      })
      .attr("class", "line");

    legend.append("text")
      .attr("x", q1Width - 45)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        return d;
      })

    var focus = q1_svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('line')
      .attr('class', 'x-hover-line hover-line')
      .attr('y1', 0)
      .attr('y2', q1Height);

    q1_svg.append('rect')
      .attr("transform", "translate(" + q1Margin.left + "," + q1Margin.top + ")")
      .attr("class", "overlay")
      .attr("width", q1Width)
      .attr("height", q1Height)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousemove", mousemove);

    q1_svg.exit().transition().attr("height", 0).remove();

    //Reference: https://codepen.io/anon/pen/GxjERK
    //on how to add Tooptips to lines
    var timeScales = data.map(function(id) {
      return q1X(id.sy);
    });

    function mouseover() {
      focus.style("display", null);
      d3.selectAll('.points text').style("display", null);
    }

    function mouseout() {
      focus.style("display", "none");
      d3.selectAll('.points text').style("display", "none");
    }

    function mousemove() {
      var i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
      var di = data[i - 1];
      focus.attr("transform", "translate(" + q1X(di.sy) + ",0)");
      d3.selectAll('.points text')
        .attr('x', function(d) {
          return q1X(di.sy) + 15;
        })
        .attr('y', function(d) {
          return q1Y(d.values[i - 1].ratio);
        })
        .text(function(d) {
          return d.values[i - 1].ratio.toFixed(3);
        })
        .style('fill', function(d) {
          return q1Z(d.id);
        })
        .style("font-weight", "bold")
        .style("font-size", "0.8em")
        .style("font-family", "sans-serif");
    }
  });
}

//renderLineChart function
function renderLineChart(q1_key) {
  d3.csv("data/vis_1_Graduate_Dropout_rate_Year.csv", type, function(error, data) {
    if (error) throw error;

    //select ratios: 'fmg', 'fml', 'fme'
    var categories = data.columns.slice(13, 16).map(function(id) {
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

    //console.log(categories);
    q1Z.domain(categories.map(function(c) {
      return c.id;
    }));

    q1_svg.append("g")
      .attr("class", "q1axis_x")
      .attr("transform", "translate(0," + q1Height + ")");

    q1_svg.append("g")
      .attr("class", "q1axis_y");

    return;

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

var q2_tp = d3.select("#q2_tp");


//color scheme
var color = d3.scaleOrdinal()
  .range(["#ff9966", "#00ccff", "#ff6600", "#0066ff", "#ff0000", "#3333cc"]);

var q2_svg = d3.select('#chart_2').append("svg")
  .attr("width", q2Width + q2Margin.left + q2Margin.right)
  .attr("height", q2Height + q2Margin.top + q2Margin.bottom)
  .append("g")
  .attr("transform", "translate(" + q2Margin.left + "," + q2Margin.top + ")");



d3.select('#q2_Form').selectAll('.q2_boxes').on('change', function() {
  var checked_data = [];
  var checked_legned = [];
  var xs = d3.select('#q2_Form').selectAll('.q2_boxes').each(function() {
    cb = d3.select(this);
    if (cb.property("checked")) {
      checked_data.push(cb.property("value"));
      var checked_value = cb.property("value");
      var index = data_keys.indexOf(checked_value);
      checked_legned.push(colNames_Q2[index]);
    }
  });
  updateBarChart(checked_data);
});
renderBarChart();
var init_keys = ['tfe', 'tme'];
var init_legends = colNames_Q2.slice(0, 2);
updateBarChart(init_keys);

//render barchart - create the xy axies only
function renderBarChart() {
  d3.csv("data/vis_1_Graduate_Dropout_rate_Year.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    q2X0.domain(data.map(function(d) {
      return d.sy;
    }));
    q2X.domain(data_keys).rangeRound([0, q2X0.bandwidth()]);
    q2Y.domain([0, d3.max(data, function(d) {
      return d3.max(data_keys, function(key) {
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
  // legend
  var q2_legend = q2_svg.append("g")
    .attr("class", "q2lgd")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(colNames_Q2.slice())
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(-550," + i * 20 + ")";
    });

  q2_legend.append("rect")
    .attr("x", q2Width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

  q2_legend.append("text")
    .attr("x", q2Width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) {
      return d;
    });

}

//updateBarChart function
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

    //update the y axis range
    q2_svg.selectAll('.q2axis_x').call(q2xAxis);
    q2_svg.selectAll('.q2axis_y').call(q2yAxis);

    //set all bar height to 0
    q2_svg.selectAll("rect").attr("height", 0);
    q2_svg.select("g.q2lgd").selectAll("rect").attr("height", 19);

    //update each bar based on the selection
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
        console.log(d.key);
        var colorID = data_keys.indexOf(d.key);
        console.log(colorID);
        return color(colorID);
      })
      .on("mouseover", function(d) {
        q2_tp.html(d.value);
      })
      .on("mouseout", function(d) {
        q2_tp.html("--");
      });

    q2_svg.exit().transition().attr("height", 0).remove();

  });
}