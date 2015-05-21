var d3 = require('d3');

function PackedCircles(width, height, navigator, srcElemId, parentContainerId) {
  var self = this instanceof PackedCircles
           ? this : Object.create(PackedCircles.prototype);
  self.width = width;
  self.height = height;
  self.radius = Math.sqrt(self.width * self.height) * 0.86;
  self.x_scale = d3.scale.linear().range([0, r]);
  self.y_scale = d3.scale.linear().range([0, r]);

  self.navigator = navigator; // Object to use to navigate dirs, get dir trees, expand children nodes
  self.srcElem = document.getElementById(srcElemId);  // Input element which holds the starting src dir
  self.parentContainerElem = document.getElementById(parentContainerId);

  // self.startingPath = PackedCircles.getStartingPath();

  self.pack = d3.layout.pack().size([self.radius, self.radius]).value(function(d) {
      return d.size;
  });

  self.vis = d3.select("#" + parentContainerId)
      .insert("svg:svg", "h2") // TODO: Whats up w/this h2 ??
      .attr("width", self.width)
      .attr("height", self.height)
      .append("svg:g")
      .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")"); // What's about?

  self.data = self.node = self.root = null;

  // Starting function
  function init() {
    self.draw();
    d3.select('#' + parentContainerId).on("click", function() {
      zoom(self.root);
    });
  }

  init()
}


PackedCircles.prototype.drawCircles = function() {
  this.vis.selectAll("circle")
    .data(nodes)
    .enter()
    .append("svg:circle")
    .attr("class", function(d) { return d.children ? "parent" : "child"; })
    .attr("id", function(d) { return "id-" + d.value })
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d.r; })
    .on("click", function(d, nodesIndex) {
      return zoom(d, nodesIndex); //node == d ? root : d);
    });
}

PackedCircles.prototype.drawText = function() {
  this.vis.selectAll("text")
    .data(nodes)
    .enter()
    .append("svg:text")
    .attr("class", function(d) { return d.children ? "parent" : "child"; })
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
    .text(function(d) { return d.name; });
}

PackedCircles.prototype.draw = function() {
  this.drawCircles();
  this.drawText();
}

PackedCircles.prototype.zoom = function(d, i) {
  // debugger;
  var k = r / d.r / 2;
  // dd = d; ii = i;
  // console.log('d is: ' +  d + ' and i is: ' + i);
  console.dir(d, i);
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = this.vis.transition()
    .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle").attr({
    "cx": function(d) { return x(d.x); },
    "cy": function(d) { return y(d.y); },
    "r": function(d) { return k * d.r; }
  });

  t.selectAll("text")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y); })
  .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  // // debugger;
  // s = dirtree.directoryTree('/Users/ahmed/Projects/sos/apps/dealerships', null, ['node_modules', '.Trash']);
  // // node = root = s;
  // newNodes = pack.nodes(s);
  // // node = s;
  // //
  // var innerCircles = vis.selectAll("id-" + d.value);
  // innerCircles.remove()

  // var innerCircles = vis.selectAll("id-" + d.value);
  // innerCircles
  // .data(newNodes)
  // .enter()
  // .append("svg:circle")
  // .attr("class", function(d) { return d.children ? "parent" : "child"; })
  // .attr("cx", function(d) { return d.x; })
  // .attr("cy", function(d) { return d.y; })
  // .attr("r", function(d) { return d.r; })



  // node = d;

  d3.event.stopPropagation();
}




  /* Every time the input dir path is changed we want to recreate the
   * visualization around that new src dir, maybe this shouldn't be 
   * here...
   *
  srcElem.addEventListener(function(e){
    // REDRAW VISUALIZATION W/NEW DIR
  }
  */



var dirtree = require(__dirname + '/directory-tree');

// var w = 700,
//     h = 700,
//     r = 600,
//     x = d3.scale.linear().range([0, r]),
//     y = d3.scale.linear().range([0, r]),
//     node,
//     root;

// var pack = d3.layout.pack().size([r, r]).value(function(d) {
//     // TODO: should this be a relative size? e.g. relativet to the root dir?
//     return d.size;
// });
// 
// var vis = d3.select("body").insert("svg:svg", "h2")
//     .attr("width", w)
//     .attr("height", h)
//     .append("svg:g")
//     .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");
// 
// 
// function drawCircles(data){
//   
// 
// 
//   collapse(data, 2)
// 
//   node = root = data;
//   nodes = pack.nodes(root);
//   // debugger;
// 
//   vis.selectAll("circle")
//   .data(nodes)
//   .enter()
//   .append("svg:circle")
//   .attr("class", function(d) { return d.children ? "parent" : "child"; })
//   .attr("id", function(d) { return "id-" + d.value })
//   // .attr("data-info", function(d) {
//   // });
//   .attr("cx", function(d) { return d.x; })
//   .attr("cy", function(d) { return d.y; })
//   .attr("r", function(d) { return d.r; })
//   .on("click", function(d, nodesIndex) {
//     return zoom(d, nodesIndex); //node == d ? root : d);
//   });
// 
//   vis.selectAll("text")
//   .data(nodes)
//   .enter()
//   .append("svg:text")
//   .attr("class", function(d) { return d.children ? "parent" : "child"; })
//   .attr("x", function(d) { return d.x; })
//   .attr("y", function(d) { return d.y; })
//   .attr("dy", ".35em")
//   .attr("text-anchor", "middle")
//   .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
//   .text(function(d) { return d.name; });
// 
//   d3.select(window).on("click", function() { zoom(root); });
// }
// 
// function zoom(d, i) {
//   // debugger;
//   var k = r / d.r / 2;
//   // dd = d; ii = i;
//   // console.log('d is: ' +  d + ' and i is: ' + i);
//   console.dir(d, i);
//   x.domain([d.x - d.r, d.x + d.r]);
//   y.domain([d.y - d.r, d.y + d.r]);
// 
//   var t = vis.transition()
//     .duration(d3.event.altKey ? 7500 : 750);
// 
//   t.selectAll("circle")
//   .attr({
//     "cx": function(d) { return x(d.x); },
//     "cy": function(d) { return y(d.y); },
//     "r": function(d) { return k * d.r; }
//   });
// 
//   t.selectAll("text")
//   .attr("x", function(d) { return x(d.x); })
//   .attr("y", function(d) { return y(d.y); })
//   .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });
// 
//   // debugger;
//   s = dirtree.directoryTree('/Users/ahmed/Projects/sos/apps/dealerships', null, ['node_modules', '.Trash']);
//   // node = root = s;
//   newNodes = pack.nodes(s);
//   // node = s;
//   //
//   var innerCircles = vis.selectAll("id-" + d.value);
//   innerCircles.remove()
// 
//   var innerCircles = vis.selectAll("id-" + d.value);
//   innerCircles
//   .data(newNodes)
//   .enter()
//   .append("svg:circle")
//   .attr("class", function(d) { return d.children ? "parent" : "child"; })
//   .attr("cx", function(d) { return d.x; })
//   .attr("cy", function(d) { return d.y; })
//   .attr("r", function(d) { return d.r; })
// 
// 
// 
//   node = d;
// 
//   d3.event.stopPropagation();
// }
// 
// exports.drawCircles = drawCircles;
// 
// function collapse(d, desiredPrunDepth, currentDepth) {
//   // Initialize the current depth on the first call
//   if ( currentDepth == undefined || currentDepth == null){
//     currentDepth = 0
//   }
//   if (currentDepth < desiredPrunDepth){
//     // debugger;
//     if ( !d.children) return;
//     var depth = currentDepth + 1;
//     d.children.forEach(function(child){
//       collapse(child, desiredPrunDepth, depth);
//     });
//   }else {
//     if (d.children) {
//       d._children = d.children;
//       d._children.forEach(collapse);
//       d.children = null;
//     }
//   }
// }
