var domready = require('domready');
var watch = require('watch-fs');
var dirtree = require(__dirname + '/lib/directory-tree');
var utils = require(__dirname + '/lib/utils');
var packedCirlces = require(__dirname + '/lib/packed-circles')



function init (){
  homeDir = utils.getUserHome();
  homeDirTree = dirtree.directoryTree(homeDir, null, ['node_modules', '.Trash']);

  packedCirlces.drawCircles(homeDirTree);

  // dirDiv = document.getElementById('dir-data').innerHTML
  // dirDiv = document.writeContent(homeDirTree);
};

domready(function(){
  init();
});
