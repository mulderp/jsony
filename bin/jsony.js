#!/usr/bin/env node

var jsony = require('../');

jsony.load(process.argv[2], function(err, raw) {
  jsony.convert(err, raw, function(err, result) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(JSON.stringify(result));
  });
});

