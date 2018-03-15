
var tooltip = d3.select('#chart_3')
                .append('div')
                .attr('class', 'tooltip');

tooltip.append('div')
       .attr('class', 'label');
tooltip.append('div')
       .attr('class', 'count');


       var dataset = [
          {dm: "End of First Year", tfe: 2183},
      		{dm: "End of Second Year", tfe: 1747},
      		{dm: "Other", tfe: 5442},
     		  {dm: "Upon Enrollment", tfe: 23214}
       ];
       var width = 350;
       var height = 350;
       var radius = Math.min(width, height) / 2;

       var color = d3.scaleOrdinal(d3.schemeCategory20c);

       var svg = d3.select('#chart_3')
         .append('svg')
         .attr('width', width)
         .attr('height', height)
         .append('g')
         .attr('transform', 'translate(' + (width / 2) +
           ',' + (height / 2) + ')');

       var donutWidth = 70;
       var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.pie()
          .value(function(d) { return d.tfe; })
          .sort(null);

        var legendRectSize = 15;
				var legendSpacing = 10;

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) {
            return color(d.data.dm);
          });


        path.on('mouseover', function(d) {
        var total = d3.sum(dataset.map(function(d) {
        return d.tfe;
  }));
  tooltip.select('.label').html(d.data.dm);
  tooltip.select('.count').html(d.data.tfe);
  tooltip.style('display', 'block');
});

       path.on('mouseout', function() {
       tooltip.style('display', 'none');
});

        var legend = svg.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -4.5 * legendRectSize;
    var vert = i * height - offset +10;
    return 'translate(' + horz + ',' + vert + ')';
  });

        legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

        legend.append('text')
  .attr('x', legendRectSize + legendSpacing +1)
  .attr('y', legendRectSize - legendSpacing +6)
  .text(function(d) { return d; });
