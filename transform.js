"use strict";
function Transform() {}

Transform.prototype.invert = function(bitmap) {
  if (bitmap.palette === 0) {  
    for (var i = bitmap.imageData; i < bitmap.size; i++) {
      bitmap.buffer[i] = Math.abs(255 - bitmap.buffer.readUInt8(i));
    }
  } else {
    for (var i = bitmap.header; i < bitmap.palette; i++) {
      bitmap.buffer[i] = Math.abs(255 - bitmap.buffer.readUInt8(i));
    }
  }
  return bitmap;
};

Transform.prototype.grayscale = function(bitmap) {
  if (bitmap.palette === 0) {
    for (var i = bitmap.imageData; i < bitmap.size; i += 3) {
      var sum = bitmap.buffer.readUInt8(i) + bitmap.buffer.readUInt8(i + 1) + bitmap.buffer.readUInt8(i + 2);
      var ave = sum / 3;
      bitmap.buffer[i] = ave;
      bitmap.buffer[i + 1] = ave;
      bitmap.buffer[i + 2] = ave;
    }
  } else {
    for (var i = bitmap.header; i < bitmap.palette; i += 3) {
      var sum = bitmap.buffer.readUInt8(i) + bitmap.buffer.readUInt8(i + 1) + bitmap.buffer.readUInt8(i + 2);
      var ave = sum / 3;
      bitmap.buffer[i] = ave;
      bitmap.buffer[i + 1] = ave;
      bitmap.buffer[i + 2] = ave;
    }
  }
  return bitmap;
};

module.exports = new Transform();
