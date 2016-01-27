'use strict';

var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/add', function(req, res, next) {
		res.render('addProduct');
});

router.post('/add', function(req, res, next) {
	
});

router.get('/list', function(req, res, next) {
		res.render('listProducts');
});

module.exports = router;