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

router.post('/', function(req, res) {
	var product = new Product(req.body);
	product.save(function(err, savedProduct) {
		if (err) throw err;
		console.log('product added');
		res.send(savedProduct);
	})
})


module.exports = router;