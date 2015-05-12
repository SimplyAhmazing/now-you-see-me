var d3 = require('d3');

var w = 700,
    h = 700,
    r = 600,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node,
    root;

var pack = d3.layout.pack().size([r, r]).value(function(d) {
    return d.size;
});

var vis = d3.select("body").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");


function drawCircles(data){
  function collapse(d, desiredPrunDepth, currentDepth) {
    // Initialize the current depth on the first call
    if ( currentDepth == undefined || currentDepth == null){
      currentDepth = 0
    }
    if (currentDepth < desiredPrunDepth){
      // debugger;
      if ( !d.children) return;
      var depth = currentDepth + 1;
      d.children.forEach(function(child){
        collapse(child, desiredPrunDepth, depth);
      });
    }else {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }
  }


  debugger;
  collapse(data, 3)

  node = root = data;
  var nodes = pack.nodes(root);

  vis.selectAll("circle")
  .data(nodes)
  .enter().append("svg:circle")
  .attr("class", function(d) { return d.children ? "parent" : "child"; })
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .attr("r", function(d) { return d.r; })
  .on("click", function(d) {
    debugger;
    return zoom(node == d ? root : d);
  });

  vis.selectAll("text")
  .data(nodes)
  .enter().append("svg:text")
  .attr("class", function(d) { return d.children ? "parent" : "child"; })
  .attr("x", function(d) { return d.x; })
  .attr("y", function(d) { return d.y; })
  .attr("dy", ".35em")
  .attr("text-anchor", "middle")
  .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
  .text(function(d) { return d.name; });

  d3.select(window).on("click", function() { zoom(root); });
}

function zoom(d, i) {
  if (d.children == null) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }

  debugger;
  var k = r / d.r / 2;
  // dd = d; ii = i;
  // console.log('d is: ' +  d + ' and i is: ' + i);
  console.dir(d, i);
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = vis.transition()
  .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
   .attr({
      "cx": function(d) { return x(d.x); },
      "cy": function(d) { return y(d.y); },
      "r": function(d) { return k * d.r; }
   });

  t.selectAll("text")
   .attr("x", function(d) { return x(d.x); })
   .attr("y", function(d) { return y(d.y); })
   .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}

exports.drawCircles = drawCircles;
