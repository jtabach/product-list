'use strict';

var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/', function(req, res, next) {
	Product.find({}, function(err, products) {
		console.log('err:', err);
		console.log('products', products);
		res.render('index',
			{ products: products }
		);
	});
});

module.exports = router;