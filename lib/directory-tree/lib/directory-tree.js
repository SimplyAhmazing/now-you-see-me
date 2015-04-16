var fs = require('fs');
var path = require('path');

function directoryTree(basepath, extensions, skips) {
    var _directoryTree = function (name, extensions) {
        // if (skips && skips.length > 0){
        //     var shouldBreak = false;
        //     skips.forEach(function(skipString){
        //         if (name.indexOf(skipString) > -1){
        //             shouldBreak = true;
        //         }
        //     });

        //     if (shouldBreak){
        //         return null;
        //     };
        // }

        try {
            var stats = fs.statSync(name);
        } catch (e) {
            return null;
        }

        var item = {
            path: path.relative(basepath, name),
            name: path.basename(name),
            size: stats.size
        };

        if (stats.isFile()) {
            if (extensions &&
                extensions.length > 0 &&
                extensions.indexOf(path.extname(name).toLowerCase()) == -1) {
                return null;
            }
            item.type = 'file';
        } else if (stats.isDirectory()) {
            item.type = 'directory';
            item.children = fs.readdirSync(name).map(function (child) {
                return _directoryTree(path.join(name, child), extensions);
            }).filter(function (e) {
                return e != null;
            });

            if (item.children.length == 0) {
                return null;
            }
        } else {
            return null
        }

        return item;
    }
    return _directoryTree(basepath, extensions);
}

exports.directoryTree = directoryTree;

