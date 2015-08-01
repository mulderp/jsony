var fs = require('fs');
var _ = require('underscore');
var JSONy = function() {};

// some config options
JSONy.HEAD = 1; // parse first line as header
JSONy.lineSeparator = '\n';
JSONy.fieldSeparator = ';';

JSONy.load = function(filename, cb) {
  fs.readFile(filename, cb);
}

function _extractRows(raw) {
  return raw.toString().split(JSON.lineSeparator);
}

function _trimArray(array) {
  return array.map(function(str) { return str.trim() });
}

function _splitFields(line) {
  return _trimArray(line.split(JSONy.fieldSeparator));
}

// results are stored in an array
var out = [];
function convert(e, raw, cb) {

  if (!raw) {
    cb("no input", null);
    return
  }

  var lines = _extractRows(raw);

  var head = JSONy.head;

  // use first line as header if available
  if (JSONy.HEAD) {
    start = JSONy.HEAD;
    head = _splitFields(lines[0]);
  }

  if (!head) {
    cb("No header specified", null);
    return;
  }

  for (var i=0; i < lines.length-1; i++) {
    var line = lines[i];
    var fields = _splitFields(line);
    out.push(_.object(head, fields));
  } 

  cb(e, out);
}

JSONy.convert = convert;

module.exports = JSONy
