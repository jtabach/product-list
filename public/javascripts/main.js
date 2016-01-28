'use strict';

$(document).ready(init);

function init() {
	$('#addForm').submit(addCustomProduct);
	$('div').on('click', '.delete', removeProduct);
	$('div').on('click', '.edit', editProduct);
	$('#editForm').submit(editComplete);
}

function addCustomProduct(e) {
	e.preventDefault();
	console.log('added');
	var name = $('#name').val();
	var description = $('#description').val();
	var price = $('#price').val();
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
		url: `/products/delete/${id}`,
		type: 'DELETE',
		success: function(data) {
			console.log('found id');
			location.replace('/');
		}
	});
}

function editProduct() {
	var id = $(this).closest('tr').data('_id');
	$.get(`/products/info/${id}`)
	.done(function(data) {
		console.log(data);
		window.location = `/products/info/${id}`;
	})
	.fail(function(err) {
		console.log('err', err);
	})
}

function editComplete(e) {
	e.preventDefault();
	var id = $(this).find('button').data('_id');
	console.log(id);
	$.ajax({
		url: `/products/edit/${id}`,
		type: 'PUT',
		data: {
			name: $('#nameEdit').val(),
			description: $('#descriptionEdit').val(),
			price: $('#priceEdit').val(),
			imageurl: $('#imageurlEdit').val()
		},
		success: function(data) {
			console.log('found id');
			location.replace('/');
		}
	});
}