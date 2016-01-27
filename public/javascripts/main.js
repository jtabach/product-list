'use strict';

$(document).ready(init);

function init() {
	$('form').submit(addCustomProduct);
	$('div').on('click', '.delete', removeProduct);
}

function addCustomProduct(e) {
	e.preventDefault();
	console.log('added');
	var name = $('#name').val();
	var description = $('#description').val();
	var price = $('#price').val();
	// var imageurl = "url(" + $('#imageurl').val() + ")";
	var imageurl = $('#imageurl').val();

	$.post('/products/add', {
		name: name,
		description: description,
		price: price,
		imageurl: imageurl
	})
	.success(function(data) {
		console.log('ok');
		location.replace('/');
	})
}

function removeProduct() {
	var id = $(this).closest('tr').data('_id');
	console.log(id);
	$.ajax({
		url: '/products/delete/' + id + '',
		type: 'DELETE',
		success: function(data) {
			console.log('found id');
			location.replace('/');
		}
	});
}