'use strict';

const async = require('async');
const redshift = require('../lib/redshift');

module.exports.putUrl = (cb) => {
  redshift.connect((err) => { //create connection manually
    if (err) throw err;
    else {
      redshift.query('SELECT * FROM "hackday"', {
        raw: true
      }, (err, data) => { //query redshift
        if (err) throw err;
        else {
          const results = data;
          redshift.close();
          cb(err, data);
        }
      });
    }
  })
};
