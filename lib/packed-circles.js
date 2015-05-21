var d3 = require('d3');
var dirtree = require(__dirname + '/directory-tree');

function PackedCircles(params) {
  var self = this instanceof PackedCircles
           ? this : Object.create(PackedCircles.prototype);
  self.width = params.width;
  self.height = params.height;
  self.radius = Math.sqrt(self.width * self.height) * 0.86;
  self.x_scale = d3.scale.linear().range([0, self.radius]);
  self.y_scale = d3.scale.linear().range([0, self.radius]);

  // self.navigator = navigator; // Object to use to navigate dirs, get dir trees, expand children nodes
  self.containterElementId = params.containterElementId;

  self.startingPath = params.dirPath;

  self.pack = d3.layout.pack().size([self.radius, self.radius]).value(function(d) {
      return d.size;
  });

  self.vis = d3.select("#" + self.containterElementId)
      .insert("svg:svg") // TODO: Whats up w/this h2 ??
      .attr("width", self.width)
      .attr("height", self.height)
      .append("svg:g")
      .attr("transform", "translate(" + (self.width - self.radius) / 2 + "," + (self.height - self.radius) / 2 + ")"); // What's about?

  // self.node = self.root = self.data = dirtree.directoryTree(self.dirPath);

  self.init()
}

PackedCircles.prototype.init = function () {
  this.node = this.root = this.data = dirtree.directoryTree(this.startingPath, null, []);

  var selector = "circles";
  var nodes = this.pack.nodes(this.data);
  this.draw(selector, nodes);

  var self = this;
  // d3.select('#' + this.containterElementId).on("click", function(datum, datumIndex) {
  //   self.zoom(datum, datumIndex);
  // });
}


PackedCircles.prototype.draw = function(selector, nodes) {
  this.drawCircles(selector, nodes);
  this.drawText(selector, nodes);
}


// I think function should take in 'nodes' as an argument
PackedCircles.prototype.drawCircles = function(selector, nodes) {
  var self = this;
  this.vis.selectAll(selector)
    .data(nodes)
    .enter()
    .append("svg:circle")
    .attr("class", function(d) { return d.children ? "parent" : "child"; })
    .attr("id", function(d) { return "id-" + d.value })
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d.r; })
    .on("click", function(d, nodesIndex) {
      return self.zoom(d, nodesIndex); //node == d ? root : d);
    });
}


PackedCircles.prototype.drawText = function(selector, nodes) {
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


PackedCircles.prototype.zoom = function(d, i) {
  debugger;
  var k = this.radius / d.r / 2;
  // dd = d; ii = i;
  // console.log('d is: ' +  d + ' and i is: ' + i);
  console.dir(d, i);
  this.x_scale.domain([d.x - d.r, d.x + d.r]);
  this.y_scale.domain([d.y - d.r, d.y + d.r]);

  var t = this.vis.transition()
    .duration(d3.event.altKey ? 7500 : 750);

  var self = this;
  t.selectAll("circle").attr({
    "cx": function(d) { return self.x_scale(d.x); },
    "cy": function(d) { return self.y_scale(d.y); },
    "r": function(d) { return k * d.r; }
  });

  t.selectAll("text").attr({
    "x": function(d) { return self.x_scale(d.x); },
    "y": function(d) { return self.y_scale(d.y); }
  }).style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  d3.event.stopPropagation();
}

exports.PackedCircles = PackedCircles;



  /* Every time the input dir path is changed we want to recreate the
   * visualization around that new src dir, maybe this shouldn't be 
   * here...
   *
  srcElem.addEventListener(function(e){
    // REDRAW VISUALIZATION W/NEW DIR
  }
  */



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
