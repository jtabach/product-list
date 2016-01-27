'use strict';

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: String,
	description: String,
	price: Number,
	imageurl: String
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;