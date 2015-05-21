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
  $("#visualization-type-dropdown").click(function(){
    console.log('got here');
      var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  });

  var dirInputField = document.getElementById('dir-path');
  // var visDropdropdownField = document.getElementById
  dirInputField.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      //Change visualization
      // init();
      visualize(dirInputField.value);
    }
  });
});
