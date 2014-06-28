var express = require('express');
var router = express.Router();

/*
 * GET volunteerlist.
 */
router.get('/volunteerlist', function(req, res) {
    var db = req.db;
    db.collection('volunteercollection').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addvolunteer.
 */
router.post('/createvolunteer', function(req, res) {
    var db = req.db;
    db.collection('volunteercollection').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'Successfully created volunteer' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deletevolunteer/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('volunteercollection').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: 'Successfully deleted volunteer' } : { msg:'error: ' + err });
    });
});




/* GET volunteer list page. */
router.get('/list', function(req, res) {
    res.render('volunteers/list', { layout: 'layout.jade', title: 'Hello, World!' })
});

/* GET volunteer home page. */
router.get('/', function(req, res) {
    res.render('volunteers/index', {})
});

module.exports = router;
