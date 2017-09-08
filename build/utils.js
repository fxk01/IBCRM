var glob = require('glob');
var path = require('path');

//根路径
exports.fullPath = function(dir) {
  return path.resolve(__dirname, dir);
};
//根据正则和路径返回文件路径对象
exports.pickFiles = function(options) {
  var files = glob.sync(options.pattern);
  return files.reduce(function(data, filename) {
    var matched = filename.match(options.id);
    var name = matched[1];
    data[name] = path.resolve(__dirname, filename);
    return data;
  }, {});
};

exports.folder = function (option) {
  return glob.sync(option.pattern)
};
