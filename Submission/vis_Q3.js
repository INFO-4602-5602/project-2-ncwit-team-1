// Reference: https://github.com/zeroviscosity/d3-js-step-by-step/blob/master/step-6-animating-interactivity.html
function test3rdidea_female() {
  (function(d3) {
    'use strict';
    var width = 300;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;
    var legendSpacing = 4;
    var color = d3.scaleOrdinal(d3.schemeCategory20c);
    var svg = d3.select('#female_chart3')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);
    var pie = d3.pie()
      .value(function(d) {
        return d.tfe;
      })
      .sort(null);
    var tooltip = d3.select('#female_chart3')
      .append('div')
      .attr('class', 'tooltip3rd_female');
    tooltip.append('div')
      .attr('id', 'label2nd_female');
    tooltip.append('div')
      .attr('id', 'count_female');
    tooltip.append('div')
      .attr('id', 'percent_female');
    d3.csv('./data/vis_3_Dropout_rate_Declare_Major.csv', function(error, dataset) {
      dataset.forEach(function(d) {
        d.tfe = +d.tfe;
        d.enabled = true;
      });
      var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(d.data.dm);
        })
        .each(function(d) {
          this._current = d;
        });
      path.on('mouseover', function(d) {
        var total = d3.sum(dataset.map(function(d) {
          return (d.enabled) ? d.tfe : 0;
        }));
        var percent = Math.round(1000 * d.data.tfe / total) / 10;
        tooltip.select('#label2nd_female').html(d.data.dm);
        tooltip.select('#count_female').html(d.data.tfe.toFixed(1));
        tooltip.select('#percent_female').html(percent + '%');
        tooltip.style('display', 'inline');
      });
      path.on('mouseout', function() {
        tooltip.style('display', 'inline');
      });
      /* OPTIONAL
      path.on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
          .style('left', (d3.event.layerX + 10) + 'px');
      });
      */
      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * color.domain().length / 2;
          var horz = -3 * legendRectSize;
          var vert = i * height - offset + 10;
          return 'translate(' + horz + ',' + vert + ')';
        });
      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color) // UPDATED (removed semicolon)
        .on('click', function(label) { // NEW
          var rect = d3.select(this); // NEW
          var enabled = true; // NEW
          var totalEnabled = d3.sum(dataset.map(function(d) { // NEW
            return (d.enabled) ? 1 : 0; // NEW
          })); // NEW
          if (rect.attr('class') === 'disabled') { // NEW
            rect.attr('class', ''); // NEW
          } else { // NEW
            if (totalEnabled < 2) return; // NEW
            rect.attr('class', 'disabled'); // NEW
            enabled = false; // NEW
          } // NEW
          pie.value(function(d) { // NEW
            if (d.dm === label) d.enabled = enabled; // NEW
            return (d.enabled) ? d.tfe : 0; // NEW
          }); // NEW
          path = path.data(pie(dataset)); // NEW
          path.transition() // NEW
            .duration(750) // NEW
            .attrTween('d', function(d) { // NEW
              var interpolate = d3.interpolate(this._current, d); // NEW
              this._current = interpolate(0); // NEW
              return function(t) { // NEW
                return arc(interpolate(t)); // NEW
              }; // NEW
            }); // NEW
        }); // NEW
      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
          return d;
        });
    });
  })(window.d3);
}

// Reference: https://github.com/zeroviscosity/d3-js-step-by-step/blob/master/step-6-animating-interactivity.html
function test3rdidea_male() {
  (function(d3) {
    'use strict';
    var width = 300;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;
    var legendSpacing = 4;
    var color = d3.scaleOrdinal(d3.schemeCategory20b);
    var svg = d3.select('#male_chart3')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);
    var pie = d3.pie()
      .value(function(d) {
        return d.tme;
      })
      .sort(null);
    var tooltip = d3.select('#male_chart3')
      .append('div')
      .attr('class', 'tooltip3rd_male');
    tooltip.append('div')
      .attr('id', 'label2nd_male');
    tooltip.append('div')
      .attr('id', 'count_male');
    tooltip.append('div')
      .attr('id', 'percent_male');
    d3.csv('./data/vis_3_Dropout_rate_Declare_Major.csv', function(error, dataset) {
      dataset.forEach(function(d) {
        d.tme = +d.tme;
        d.enabled = true;
      });
      var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(d.data.dm);
        })
        .each(function(d) {
          this._current = d;
        });
      path.on('mouseover', function(d) {
        var total = d3.sum(dataset.map(function(d) {
          return (d.enabled) ? d.tme : 0;
        }));
        var percent = Math.round(1000 * d.data.tme / total) / 10;
        tooltip.select('#label2nd_male').html(d.data.dm);
        tooltip.select('#count_male').html(d.data.tme.toFixed(1));
        tooltip.select('#percent_male').html(percent + '%');
        tooltip.style('display', 'inline');
      });
      path.on('mouseout', function() {
        tooltip.style('display', 'inline');
      });
      /* OPTIONAL
      path.on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
          .style('left', (d3.event.layerX + 10) + 'px');
      });
      */
      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * color.domain().length / 2;
          var horz = -3 * legendRectSize;
          var vert = i * height - offset + 10;
          return 'translate(' + horz + ',' + vert + ')';
        });
      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color) // UPDATED (removed semicolon)
        .on('click', function(label) { // NEW
          var rect = d3.select(this); // NEW
          var enabled = true; // NEW
          var totalEnabled = d3.sum(dataset.map(function(d) { // NEW
            return (d.enabled) ? 1 : 0; // NEW
          })); // NEW
          if (rect.attr('class') === 'disabled') { // NEW
            rect.attr('class', ''); // NEW
          } else { // NEW
            if (totalEnabled < 2) return; // NEW
            rect.attr('class', 'disabled'); // NEW
            enabled = false; // NEW
          } // NEW
          pie.value(function(d) { // NEW
            if (d.dm === label) d.enabled = enabled; // NEW
            return (d.enabled) ? d.tme : 0; // NEW
          }); // NEW
          path = path.data(pie(dataset)); // NEW
          path.transition() // NEW
            .duration(750) // NEW
            .attrTween('d', function(d) { // NEW
              var interpolate = d3.interpolate(this._current, d); // NEW
              this._current = interpolate(0); // NEW
              return function(t) { // NEW
                return arc(interpolate(t)); // NEW
              }; // NEW
            }); // NEW
        }); // NEW
      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
          return d;
        });
    });
  })(window.d3);
}

function display_func_female() {
  // Get the checkbox
  var checkBox = document.getElementById("cb_female");

  // If the checkbox is checked, change its associated display attribute
  if (checkBox.checked == true) {
    document.getElementById('female_chart3').style.display = 'inline';
  } else {
    document.getElementById('female_chart3').style.display = 'none';
  }
}

function display_func_male() {
  // Get the checkbox
  var checkBox = document.getElementById("cb_male");

  // If the checkbox is checked, change its associated display attribute
  if (checkBox.checked == true) {
    document.getElementById('male_chart3').style.display = 'inline';
  } else {
    document.getElementById('male_chart3').style.display = 'none';
  }
}