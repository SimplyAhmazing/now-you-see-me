var domready = require('domready');
var fs = require('fs');

var utils = require(__dirname + '/lib/utils');
var packedCirlces = require(__dirname + '/lib/packed-circles')


var visualizer = null;
var visualizationsMap = {
  'Sunburst': null,
  "Packed Circles": packedCirlces.PackedCircles
};

function visualize (selectedVisualization, dirPath){
  // homeDirTree = dirtree.directoryTree(dirPath, null, ['node_modules', '.Trash']);
  // packedCirlces.drawCircles(homeDirTree);

  try {
    fs.statSync(dirPath);
  } catch (e) {
    alert('' + e);
    return
  }
  var visualizerObject = visualizationsMap[selectedVisualization];

  // The visualizer, after being created should draw in the main area
  visualizer = new visualizerObject({
    width: 700,
    height: 700,
    containterElementId: 'visualization-container',
    'dirPath': dirPath
  })
};


function getDirPath() {
  return $('#dir-path').val();
}


domready(function(){
  $('.selectpicker').change(function(e) {
    var dirPath = getDirPath();
    var visualizationType = $(this).val();

    visualize(visualizationType, dirPath);
  });

  $('#dir-path').on('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      var dirPath = getDirPath();
      var visualizationType = $('.selectpicker').val();

      visualize(visualizationType, dirPath);
    }
  });
});
