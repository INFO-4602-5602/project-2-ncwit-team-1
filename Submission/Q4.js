//Reference: https://bl.ocks.org/mbostock/5944371
var margin = {top: 260, right: 432, bottom: 315, left: 390},
    radius = 300 - 10;

var hue = d3v3.scale.category10();

var luminance = d3v3.scale.sqrt()
    .domain([0, 1e6])
    .clamp(true)
    .range([90, 20]);

var svg = d3v3.select("#chart_4").append("svg")
    .attr("width", margin.left + margin.right)
    .attr("height", margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var partition = d3v3.layout.partition()
    .sort(function(a, b) { return d3v3.ascending(a.name, b.name); })
    .size([2 * Math.PI, radius]);

var arc = d3v3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx ; })
    .padAngle(.01)
    .padRadius(radius / 3)
    .innerRadius(function(d) { return radius / 4 * d.depth; })
    .outerRadius(function(d) { return radius / 4 * (d.depth+1)-100; })
    .innerRadius(function(d) { return radius / 4 * (d.depth + 1) - 50;})
    .outerRadius(function(d) { return radius / 4 * (d.depth + 1) - 1; });

d3v3.json("data/vis4.json", function(error, root) {
  if (error) throw error;

  // Compute the initial layout on the entire tree to sum sizes.
  // Also compute the full name and fill color for each node,
  // and stash the children so they can be restored as we descend.
  partition
      .value(function(d) { return d.size; })
      .nodes(root)
      .forEach(function(d) {
        d._children = d.children;
        d.sum = d.value;
        d.key = key(d);
        d.fill = fill(d)
        d.name = d.name;
      });

  // Now redefine the value function to use the previously-computed sum.
  partition
      .children(function(d, depth) { return depth < 2 ? d._children : null; })
      .value(function(d) { return d.sum; });

  var center = svg.append("circle").attr("fill",'white')
      .attr("r", radius / 3)
      .on("click", zoomOut);

  center.append("title")
      .text("zoom out");


  var arces = svg.selectAll("path")
      .data(partition.nodes(root).slice(1));

   arces.enter().append("text").attr("transform",function(d){
        var x=arc.centroid(d)[0]*1.3;  
        var y=arc.centroid(d)[1]*1.3;
        return "translate("+x+","+y+")";  
    }).attr("text-anchor","middle").attr("font-size","10px").attr("font-family","Sofia").text(function(d){return d.name}); 
   arces.enter().append("text").attr("transform",function(d){
        var x=arc.centroid(d.parent)[0]*1.3;  
        var y=arc.centroid(d.parent)[1]*1.3;
        return "translate("+x+","+y+")";  
    }).attr("text-anchor","middle").attr("font-size","10px").attr("font-family","Sofia").text(function(d){return d.parent.name}); 

    arces.enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return d.fill; })
      .each(function(d) { this._current = updateArc(d); })
      .on("click", zoomIn);

    d3v3.selectAll("path").on("mouseover",mouseOverPoint).on("mouseout",mouseOutPoint);
           function mouseOverPoint(d, i){
            //Bell Tooltips:
               svg.append("text").attr({
               id: "t",  // Create an id for text so we can select it later for removing on mouseout
            })
            .text(d.name+"  "+"Percentage: "+d.per+"%")
            .attr("class", "label")
            .attr("transform", "translate(0," + -50 + ")")
            .attr("font-family","Arial");
            };
            function mouseOutPoint(d,i){
                //Bell: Tooltips
                // Select text by id and then remove
            d3v3.select("#t").remove();  // Remove text location
            };
    

      

    

      
    


  function zoomIn(p) {
    if (p.depth > 1) p = p.parent;
    if (!p.children) return;
    zoom(p, p);
  }

  function zoomOut(p) {
    if (!p.parent) return;
    zoom(p.parent, p);
  }

  // Zoom to the specified new root.
  function zoom(root, p) {
    if (document.documentElement.__transition__) return;

    // Rescale outside angles to match the new layout.
    var enterArc,
        exitArc,
        outsideAngle = d3v3.scale.linear().domain([0, 2 * Math.PI]);
  

    function insideArc(d) {
      return p.key > d.key
          ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
          ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0}
          : {depth: 0, x: 0, dx: 2 * Math.PI};
    }

    function outsideArc(d) {
      return {depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
    }

    center.datum(root);
    

    // When zooming in, arcs enter from the outside and exit to the inside.
    // Entering outside arcs start from the old layout.
    if (root === p)  { enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]);}


    arces = arces.data(partition.nodes(root).slice(1), function(d) { return d.key; });

    // When zooming out, arcs enter from the inside and exit to the outside.
    // Exiting outside arcs transition to the new layout.
    if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);

    d3v3.transition().duration(d3v3.event.altKey ? 7500 : 750).each(function() {
      arces.exit().transition()
          .style("opacity", function(d) { return d.depth === 1 + (root === p) ? 1 : 0; })
          .attrTween("d", function(d) { return arcTween.call(this, exitArc(d)); })
          .remove();

      svg.selectAll("text").remove();
    
      arces.enter().append("text").attr("transform",function(d){
        var x=arc.centroid(d)[0]*1.3;  
        var y=arc.centroid(d)[1]*1.3;
        return "translate("+x+","+y+")";  
    }).attr("text-anchor","middle").attr("font-size","10px").attr("font-family","Arial").text(function(d){return d.name;}); 

    function draw(){ 
      arces.enter().append("text").attr("transform",function(d){
        var x=arc.centroid(d.parent)[0]*1.3;  
        var y=arc.centroid(d.parent)[1]*1.3;
        return "translate("+x+","+y+")";  
    }).attr("text-anchor","middle").attr("font-size","10px").attr("font-family","Arial").text(function(d){return d.parent.name;});
    }

    function draw_grand(){ 
      arces.enter().append("text").attr("transform",function(d){
        var x=arc.centroid(d.parent.parent)[0]*1.3;  
        var y=arc.centroid(d.parent.parent)[1]*1.3;
        return "translate("+x+","+y+")";  
    }).attr("text-anchor","middle").attr("font-size","10px").attr("font-family","Arial").text(function(d){return d.parent.parent.name;});
    }

    function draw_out(){
      arces.enter().append("text").attr("transform",function(d){
        var x=arc.centroid(d.parent)[0]*1.3;  
        var y=arc.centroid(d.parent)[1]*1.3;
        return "translate("+x+","+y+")";  
    }).attr("text-anchor","middle").attr("font-size","10px").attr("font-family","Arial").text(function(d){return d.parent.name;});
    }

    if(root === p){
     draw();
     draw_grand();
  }
    if(root !== p){
      draw_out();
    }

      arces.enter().append("path")
          .style("opacity", function(d) { return d.size/20;})
          .style("fill", function(d) { return d.fill; })
          .on("click", zoomIn)
          .each(function(d) { this._current = enterArc(d); });

      d3v3.selectAll("path").on("mouseover",mouseOverPoint).on("mouseout",mouseOutPoint);
           function mouseOverPoint(d, i){
            //Bell Tooltips:
               svg.append("text").attr({
               id: "t",  // Create an id for text so we can select it later for removing on mouseout
            })
            .text(d.parent.name+" "+d.name+"  "+"Percentage: "+d.per+"%")
            .attr("class", "label")
            .attr("transform", "translate(0," + -50 + ")");
            };
            function mouseOutPoint(d,i){
                //Bell: Tooltips
                // Select text by id and then remove
            d3v3.select("#t").remove();  // Remove text location
            };

      arces.transition()
          .style("opacity", 1)
          .attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); });
    });
  }
});

function key(d) {       //get data's names 
  var k = [], p = d;
  while (p.depth) k.push(p.name), p = p.parent;
  return k.reverse().join(".");
}

function fill(d) {    //decide the color to be filled
  var p = d;
  var p1 = d;
  while (p.depth > 1) p = p.parent;
  var c = d3v3.lab(hue(p.name+5));
  c.l = luminance(d.sum);
  return c;
}

function arcTween(b) {
  var i = d3v3.interpolate(this._current, b);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

function updateArc(d) {
  return {depth: d.depth, x: d.x, dx: d.dx};
}

d3v3.select(self.frameElement).style("height", margin.top + margin.bottom + "px");
