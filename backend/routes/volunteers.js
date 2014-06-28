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





/* GET volunteer list page. */
router.get('/list', function(req, res) {
    res.render('volunteers/list', { layout: 'layout.jade', title: 'Hello, World!' })
});

module.exports = router;
