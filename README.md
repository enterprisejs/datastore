EnterpriseJS Datastore
======================

Quickstart
----------
The below code works.  Functions are:
*   db.get 
*   db.set
*   db.fast_get 
*   db.fast_set

```
    var db = require('datastore').client('localhost',19090);
    
    var domain = 'etest';
    var tval = 'this is another testzz';
    var dbtest = function(db) {
      db.get(domain,tval,function(error,v) {
        if(error) {
          console.log("ERROR! " + error);      
        }
        if(v) {
          console.log(JSON.stringify(v));
        } 
        else {
          db.set(domain,tval,"blah",function() { 
            
            dbtest(db); });
        }
      });
    }
    dbtest(db);
```

More coming soon
