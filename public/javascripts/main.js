'use strict';

$(document).ready(init);

var $rows;

function init() {
	$('#addForm').submit(addCustomProduct);
	$('div').on('click', '.delete', removeProduct);
	$('div').on('click', '.edit', editProduct);
	$('#editForm').submit(editComplete);
	$('#search').keyup(searchList);
	$rows = $('.dataRow');
	// $('tbody').empty().append($rows);
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

function searchList() {
	var queryString = $('#search').val().toLowerCase();
	var $filtered = $rows.filter(function() {
		return $(this).children('.searchable').text().toLowerCase().includes(queryString);
	});
	var sum = 0.00;
	$filtered.children('.price').each(function(i, val) {
		sum += parseFloat($(val).text().slice(1));
	});
	$('#total').text(`Total: $${sum}`);
	$('tbody').empty().append($filtered);
}



























