let path = require('path');
let util = require('util');
let v8 = require('v8');

console.log(path.basename(__filename));

var dirUploads = path.join(__dirname, 'www', 'files', 'uploads');

util.log(dirUploads);

util.log(v8.getHeapStatistics());
