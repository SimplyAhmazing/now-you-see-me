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

function setupWatcher(dir, fileChangeCallBack){
  var watcher = new watch.Watcher({
    paths: dir,
    filters: {
      includeDir: function(name) {
        // TODO: make the ignores a configurable setting
        var skip = /(\.git)|(node_modules)/.test(name);
        return !skip;
      }
    }
  });

  //
  watcher.start(function(){
    console.log('Watcher has been started!!!')
    console.log(arguments)
  });

  watcher.on('any', function(name, type) {
    console.log('file ' + name + ' ' + type + 'd');
  });

  return watcher;
}
