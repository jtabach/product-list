'use strict';

$(document).ready(init);

var $rows;

function init() {
	$('#addForm').submit(addCustomProduct);
	$('div').on('click', '.delete', removeProduct);
	$('div').on('click', '.edit', editProduct);
	$('#editForm').submit(editComplete);
	$('#search').keyup(searchList);
	$('#products').click(sortByName);
	$rows = $('.dataRow');
	$('#price').click(sortByPrice);
	priceFixed();
}

function addCustomProduct(e) {
	e.preventDefault();
	var name = $('#name').val();
	var description = $('#description').val();
	var price = $('#price').val();
	var imageurl = $('#imageurl').val();

	$.post('/products/add', {
		name: name,
		description: description,
		price: Number(price).toFixed(2),
		imageurl: imageurl
	})
	.success(function(data) {
		location.replace('/');
	})
}

function removeProduct() {
	var id = $(this).closest('tr').data('_id');
	$.ajax({
		url: `/products/delete/${id}`,
		type: 'DELETE',
		success: function(data) {
			location.replace('/');
		}
	});
}

function editProduct() {
	var id = $(this).closest('tr').data('_id');
	$.get(`/products/info/${id}`)
	.done(function(data) {
		window.location = `/products/info/${id}`;
	})
	.fail(function(err) {
		console.log('err', err);
	})
}

function editComplete(e) {
	e.preventDefault();
	var id = $(this).find('button').data('_id');
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
	sum = sum.toFixed(2);

	$('#total').text(`Total: $${sum}`);
	$('tbody').empty().append($filtered);
}

function sortByName() {
	var mult = $(this).data('sort');
	$rows.sort(function(a,b) {
		var aVal = $(a).children('.product').text().toLowerCase();
		var bVal = $(b).children('.product').text().toLowerCase();
		return ((aVal<bVal) ? -1 : 1) * mult;
	});
	$(this).data('sort', -mult);
	$('tbody').empty().append($rows);
}

function sortByPrice() {
	var mult = $(this).data('sort');
	$rows.sort(function(a,b) {
		var aVal = $(a).children('.price').text().slice(1);
		var bVal = $(b).children('.price').text().slice(1);
		return (aVal - bVal) * mult;
	});
	$(this).data('sort', -mult);
	$('tbody').empty().append($rows);
}

function priceFixed() {
	$('.price').each(function(i, val) {
		var corrText = "$" + parseFloat($(val).text().slice(1)).toFixed(2);
		$(val).text(corrText);
	});
}















