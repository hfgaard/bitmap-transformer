var expect = require('chai').expect;
var transform = require('../transform');

describe('transform.js', function() {
  
  describe('invert', function() {
    it('will invert the contents of the bitmap', function() {
      var bitmap = {};
      bitmap.buffer = new Buffer([255, 51, 204]);
      bitmap.imageData = 0;
      bitmap.size = 3;
      bitmap.palette = 0;
      var invert = transform.invert(bitmap);
      var endResult = new Buffer([0, 204, 51]);
      expect(invert.buffer).to.eql(endResult);
    });
  });

  describe('grayscale', function() {
    it('will change the contents of the bitmap to grayscale', function() {
      var bitmap = {};
      bitmap.buffer = new Buffer([255, 51, 204]);
      bitmap.imageData = 0;
      bitmap.size = 3;
      bitmap.palette = 0;
      var grayscale = transform.grayscale(bitmap);
      var endResult = new Buffer([170, 170, 170]);
      expect(grayscale.buffer).to.eql(endResult);
    });
  });
});
