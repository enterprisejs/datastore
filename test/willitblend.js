var PORT = 19992;

var dblib = require("../");
var appserver = require('appserver');
var test = require('tap').test;
var async = require('async');

appserver.listen(PORT);
dblib.listen('localhost',PORT);

var h = {test: "1",foo: false,bar: true};

test("willitblend",function(t) {  
  t.plan(3);
  async.series({
    a: function(cb) {
      var dbc = dblib.client('localhost',PORT);
      dbc.set('willitblend','hash',h,function() {
        //when send is done...
        dbc.get('willitblend','hash',function(e,v) {
          t.equal(v.test,'1');
          t.notOk(v.foo);
          t.ok(v.bar);
          cb();
        });
      });
    }
    
  },function() {
    t.end(); 
  });


})

test('justclose',function(t) {
  process.exit();
})
