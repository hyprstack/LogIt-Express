// require modules
var express = require('express');
var http = require('http');
var path = require('path');
var _ = require('underscore');
var couchbase = require('couchbase');
var fs = require('fs');

var app = express();



// connect to couchbase, at localhost 8091 and accessing bucket 'default'
var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'default'}, function(err) {
    if (err) {
      console.log('Connection Error', err);
    } else {
      console.log('Couchbase connected!');
  }
 });
console.log(db);


// set app view engine options
app.set('views', path.join(__dirname + '/views/templates'));
app.set('view engine', 'jade');



// define landing page
app.get('/home', function(req, res){
  //use template 'lading.jade' from our views directory
  res.render('landing');
});



// get list of exercises form databse using a view
function list_exercises(req, res){
  var q = {
    // limit: 5, // limite the results to 5 per page
    stale: false,
    descending: true
  };

  db.view('workout', 'exercise', q).query(function(err, values){
    // 'exercise' view's map function emits personId as key
    // and value as 'date', 'exercise', 'musclegroup' and 'sets'

    // use pluck method from underscore module to retrive data from couchbase
    var keys = _.pluck(values, 'id');
    console.log('Keys: ' + keys);
    // fetch multiple documents based on the 'keys' object
    db.getMulti( keys, null, function(err, results){
      // console.log('Results: ' + results);
      // console.log(JSON.stringify(results, null, " "));

      var obj =[ ];
      for (var prop in results) {
        var usr = results[prop].value.personId;

        if(usr !== req.params.name) {
          continue;
        } else {
          console.log(usr);
          obj.push(results[prop].value);
        }
      }

      res.send(obj);

    });
  });
}
app.get('/exercises/:name', list_exercises);



// start server on port 8000
http.createServer(app).listen(8000);
console.log('Express Server listening on port 8000');
