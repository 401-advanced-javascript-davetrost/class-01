'use strict';

/**
 * Simple Server
 * @module index
 */

require('dotenv').config();
const validator = require('./lib/validator.js');

const express = require('express');
const app = express();
app.use('/docs', express.static('./docs/'));

/**
 * 
 * / Request Handler (all routes)
 * @param req
 * @param res
 */

app.get('', requestHandler);

function requestHandler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.write('is "false" a boolean? ' + validator.isBoolean('false') + '\n');  // false
  res.write('is true a boolean? ' + validator.isBoolean(true) + '\n');  // true
  res.write('is "true" a boolean? ' + validator.isBoolean('true') + '\n');  // false
  res.write('\n');  // false
  res.write('Please browse to /docs to view documentation for this project.\n');  // false
  res.end();
}

app.listen(process.env.PORT, () => console.log('node.js server running on port', process.env.PORT));
