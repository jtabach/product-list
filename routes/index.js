'use strict';

var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/', function(req, res, next) {
	Product.find({}, function(err, products) {
		console.log('err:', err);
		console.log('products', products);
		var total = products.reduce(function(prev, curr) {
			return prev + curr.price;
		},0);
		res.render('index',
			{ products: products, total: total }
		);
	});
});

module.exports = router;