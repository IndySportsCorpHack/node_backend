var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET volunteer list page. */
router.get('/volunteerlist', function(req, res) {
    var db = req.db;
    var collection = db.get('volunteercollection');
    collection.find({},{},function(e,docs){
        res.render('volunteerlist', {
            "volunteerlist" : docs
        });
    });
});

/* GET New volunteer page. */
router.get('/createvolunteer', function(req, res) {
    res.render('createvolunteer', { title: 'Add New Volunteer' });
});

/* POST to add volunteer Service */
router.post('/addvolunteer', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var volunteerEmail = req.body.email;
    var volunteerFirstName = req.body.first_name;
    var volunteerLastName = req.body.last_name;
    var volunteerMobilePhone = req.body.mobile_phone;
    var volunteerAge = req.body.age;
    var volunteerCity = req.body.city;
    var volunteerState = req.body.state;
    var volunteerEventType = req.body.event_type;

    // Set our collection
    var collection = db.get('volunteercollection');

    // Submit to the DB
    collection.insert({
        "email": volunteerEmail,
        "first_name": volunteerFirstName,
        "last_name": volunteerLastName,
        "mobile_phone": volunteerMobilePhone,
        "age": volunteerAge,
        "city": volunteerCity,
        "state": volunteerState,
        "event_type": volunteerEventType
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("volunteerlist");
            // And forward to success page
            res.redirect("volunteerlist");
        }
    });
});

module.exports = router;
