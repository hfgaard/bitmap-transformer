"use strict";
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var transform = require('./transform');

function fileToObject(file, toFile, transformation) {
  fs.readFile(file, function(err, data) {
    var bitmap = {};
    if (err) {
      console.log('unable to read file');
    } else {
      bitmap.buffer = data;
      bitmap.style = data.toString('ascii', 0, 2);
      bitmap.size = data.readUInt32LE(2);
      bitmap.imageData = data.readUInt32LE(10);
      bitmap.header = data.readUInt32LE(14);
      bitmap.width = data.readUInt32LE(18);
      bitmap.height = data.readUInt32LE(22);
      bitmap.bitsPerPixel = data.readUInt32LE(28);
      bitmap.imageSize = data.readUInt32LE(34);
      bitmap.palette = data.readUInt32LE(46);
    }
    ee.emit(transformation, bitmap, toFile);
  });
}

ee.on('invert', function(bitmap, toFile) {
  transform.invert(bitmap);
  ee.emit('objectToFile', bitmap, toFile);
});

ee.on('grayscale', function(bitmap, toFile) {
  transform.grayscale(bitmap);
  ee.emit('objectToFile', bitmap, toFile);
});

ee.on('objectToFile', function(bitmap, toFile) {
  fs.writeFile(toFile, bitmap.buffer, function(err, data) {
    if (err) {
      console.log('unable to write file');
    } else {
      console.log('file saved');
    }
  });
});

module.exports = fileToObject;
