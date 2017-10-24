var Redshift = require('node-redshift');

var client = {
  user: "ubuntu",
  database: "dev",
  password: "M0nkeyTenn1s",
  port: 5439,
  host: "wsoj-data-science-redshift.c3fnboat0ctt.eu-west-1.redshift.amazonaws.com"
};

// The values passed in to the options object will be the difference between a connection pool and raw connection 
var redshiftClient = new Redshift(client, {
  rawConnection: true
});

module.exports = redshiftClient;
