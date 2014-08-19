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
function list_multi_exercises(req, res){
  var q = {
    // limit: 5, // limite the results to 5 per page
    stale: false,
    descending: true
  };


  // show multiple exercises
  db.view('workout', 'exercise', q).query(function(err, values){
    // 'exercise' view's map function emits personId as key
    // and value as 'date', 'exercise', 'musclegroup' and 'sets'

    // use pluck method from underscore module to retrive data
    // from couchbase
    var keys = _.pluck(values, 'id');
    // console.log('Keys: ' + keys);

    // fetch multiple documents based on the 'keys' object
    db.getMulti( keys, null, function(err, results){
      // console.log('Results: ' + results);
      // console.log(JSON.stringify(results, null, " "));

      // create an array to store the objects which personId
      // match the req.params.name
      var workouts =[ ];

      for (var prop in results) {
        var usr = results[prop].value.personId;

        if(usr !== req.params.user) {
          continue;
        } else {
          console.log(usr);
          workouts.push(results[prop].value);
        }
      }
      // console.log(workouts[0].personId + "\n" + workouts[0].date + "\n" + workouts[0].musclegroup);
      res.send(workouts);

    });
  });
}
app.get('/exercises/list/:user', list_multi_exercises);



// create a new document

//set a function that initiates the creation of a new workout doc.
//we set a template for the new doc and render it
function begin_create_workout(req, res){
  var view = {is_create : true, workout: {
    personId: '',
    date: {"type" : "date", "default": "Date.now"},
    muscleGroup: '',
    exercise: '',
    Sets: ''
  } };
  // use the addworkout view to render the page with the form.
  res.render('addworkout', view);
}
// use a get call to fetch the form
app.get('/createworkout', begin_create_workout);

function done_create_workout(req, res){

}

// access a single document by exercise



// start server on port 8000
http.createServer(app).listen(8000);
console.log('Express Server listening on port 8000');
