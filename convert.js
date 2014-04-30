#!/usr/bin/env node

var jsony = require('./jsony');

jsony.load(process.argv[2], function(e, raw) {
  jsony.convert(e, raw, function(e, result) {
    if (e) {
      console.log(e);
      process.exit(1);
    }
    console.log(JSON.stringify(result));
  });
});

