var bookCheck = false;
var authorCheck = false;
var bandCheck = false;
var showCheck = false;
var movieCheck = false;
var gameCheck = false;


function buildQuery(){
	var queryString = '';
		if(bookCheck){
			queryString = queryString + $('#book-search').val() + ', ';
		}
		if(authorCheck){
			queryString = queryString + $('#author-search').val() + ', ';
		}
		if(bandCheck){
			queryString = queryString + $('#band-search').val() + ', ';
		}
		if(showCheck){
			queryString = queryString + $('#show-search').val() + ', ';
		}
		if(movieCheck){
			queryString = queryString + $('#movie-search').val() + ', ';
		}
		if(gameCheck){
			queryString = queryString + $('#game-search').val() + ', ';
		}

		if(bookCheck || authorCheck || bandCheck || showCheck || movieCheck || gameCheck){
			queryString = queryString.slice(0,-2);
		}

		return queryString;
}

function populateData(resultArray){
	
}

function getData(queryString){
	var queryURL = 'https://www.tastekid.com/api/similar?q=';
	var queryKey = '&k=158414-JSONAPIS-KMPT5AN1'

	var finalURL = queryURL + queryString + queryKey + '&info=1';

	var result = $.ajax({
		url: finalURL,
		dataType: 'jsonp',
		type: 'GET'
	})
	.done(function(result){
		finalResults = result.Similar.Results;
		console.log(finalResults);
	});
}

$(document).ready(function() {
	$('.tab-links a').on('click', function(e){
		e.preventDefault();
		var currentTab = $(this).attr('href');

		$('.results ' + currentTab).show().siblings().hide();

		$(this).parent('li').addClass('active').siblings().removeClass('active');
	});

	$('#search-options').submit(function(e) {
		e.preventDefault();
		$('.tab').html('');

		var queryStr = buildQuery();
		
		console.log(queryStr);

		getData(queryStr);
	});

	$('#book').change(function () {
		if($(this).is(':checked')){
			console.log("checked true");
			bookCheck = true;
		}else{
			console.log("checked false");
			bookCheck = false;
		}
	});

	$('#author').change(function () {
		if($(this).is(':checked')){
			console.log("checked true");
			authorCheck = true;
		}else{
			console.log("checked false");
			authorCheck = false;
		}
	});

	$('#band').change(function () {
		if($(this).is(':checked')){
			console.log("checked true");
			bandCheck = true;
		}else{
			console.log("checked false");
			bandCheck = false;
		}
	});

	$('#show').change(function () {
		if($(this).is(':checked')){
			console.log("checked true");
			showCheck = true;
		}else{
			console.log("checked false");
			showCheck = false;
		}
	});

	$('#movie').change(function () {
		if($(this).is(':checked')){
			console.log("checked true");
			movieCheck = true;
		}else{
			console.log("checked false");
			movieCheck = false;
		}
	});

	$('#game').change(function () {
		if($(this).is(':checked')){
			console.log("checked true");
			gameCheck = true;
		}else{
			console.log("checked false");
			gameCheck = false;
		}
	});

});