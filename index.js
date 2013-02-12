var redis=require("redis");
var db = redis.createClient();

db.on("error",function(err) {
  console.log("OH NOEZ: " + err);
})

exports.client = function(host,port) {
  var me = {};
  
  host = host || 'localhost';
  port = port || 19090;

  var airport = require("airport");
  var air = airport(host,port);
  var up = air.connect('datastore');
  
  me.set = function(d,k,v,c) {
    up(function(db) {
      var xv = JSON.stringify(v);
      db.set(d,k,xv,c);
    });
  }
  me.get = function(d,k,c) {
    up(function(db) {
      db.get(d,k,function(err,xv) {
        if(err) {
          c(err,null);
        }
        if(xv) {
          var v = JSON.parse(xv);
          c(null,v);
        }
        else {
          c(null,null);
        }
      });
    });
  }
  return me;
};

exports.listen = function(host,port) {
  host = host || 'localhost';
  port = port || 19090;  

  var airport=require("airport");
  var air = airport(host,port);                                                                                                                          
  var srv = air(function(rem,conn) {                                                                                                                             
    this.set = function(d,k,v,c) {
      db.hset(d,k,v,function(e,x) { c(e,x); })
    }
    this.get = function(d,k,c) {
      db.hget(d,k,function(e,x) { c(e,x); })
    }
  }).listen('datastore');         
}

if(!module.parent) {
  exports.listen('localhost',19090);
}

