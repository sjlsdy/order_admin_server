var express = require('express');
var router = express.Router();

var adminUserDao = require('../dao/adminUserDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/addAdminUser', function(req, res, next) {
	adminUserDao.add(req, res, next);
})

module.exports = router;