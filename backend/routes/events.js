var express = require('express');
var router = express.Router();

/*
 * GET eventlist.
 */
router.get('/eventlist', function(req, res) {
    var db = req.db;
    db.collection('eventcollection').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addevent.
 */
router.post('/createevent', function(req, res) {
    var db = req.db;
    db.collection('eventcollection').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'Successfully created event' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteevent.
 */
router.delete('/deleteevent/:id', function(req, res) {
    var db = req.db;
    var eventToDelete = req.params.id;
    db.collection('eventcollection').removeById(eventToDelete, function(err, result) {
        res.send((result === 1) ? { msg: 'Successfully deleted event' } : { msg:'error: ' + err });
    });
});




/* GET event list page. */
router.get('/list', function(req, res) {
    res.render('events/list', {})
});

/* GET event home page. */
router.get('/', function(req, res) {
    res.render('events/index', {})
});

module.exports = router;
