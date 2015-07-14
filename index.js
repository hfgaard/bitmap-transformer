"use strict";
var bitmapReader = require('./bitmapReader');

bitmapReader('./bitmaps/non-palette-bitmap.bmp', './bitmaps/non-palette-bitmap-invert.bmp', 'invert');
bitmapReader('./bitmaps/palette-bitmap.bmp', './bitmaps/palette-bitmap-invert.bmp', 'invert');

bitmapReader('./bitmaps/non-palette-bitmap.bmp', './bitmaps/non-palette-bitmap-grayscale.bmp', 'grayscale');
bitmapReader('./bitmaps/palette-bitmap.bmp', './bitmaps/palette-bitmap-grayscale.bmp', 'grayscale');
