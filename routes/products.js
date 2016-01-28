'use strict';

var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/', function(req, res, next) {
		res.render('listProducts');
});

router.get('/add', function(req, res, next) {
		res.render('addProduct');
});

router.post('/add', function(req, res) {
	var product = new Product(req.body);
	product.save(function(err, savedProduct) {
		res.status(err ? 400 : 200).send(err || savedProduct);
	})
})

router.delete('/delete/:productId', function(req, res) {
	Product.findById(req.params.productId, function(err, product) {
		console.log(product);
		product.remove(function(err) {
			res.status(err ? 400 : 200).send(err || null);
		});
	});
});

router.get('/info/:productId', function(req, res) {
	console.log(req.params.productId);
	Product.findById(req.params.productId, function(err, product) {
		console.log('err:', err);
		console.log('product', product);
		res.render('infoProduct', {product: product});
	});
});

module.exports = router;