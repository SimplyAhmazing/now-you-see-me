var domready = require('domready');
var watch = require('watch-fs');
var dirtree = require(__dirname + '/lib/directory-tree');
var utils = require(__dirname + '/lib/utils');
var packedCirlces = require(__dirname + '/lib/packed-circles')


function visualize (dirPath){
  // homeDir = utils.getUserHome();
  homeDirTree = dirtree.directoryTree(dirPath, null, ['node_modules', '.Trash']);
  packedCirlces.drawCircles(homeDirTree);

  // dirDiv = document.getElementById('dir-data').innerHTML
  // dirDiv = document.writeContent(homeDirTree);
};

domready(function(){
  var dirInputField = document.getElementById('dir-path');
  dirInputField.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      //Change visualization
      // init();
      visualize(dirInputField.value);
    }
  });
});
