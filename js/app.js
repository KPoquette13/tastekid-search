var bookCheck = false;
var authorCheck = false;
var bandCheck = false;
var showCheck = false;
var movieCheck = false;
var gameCheck = false;

var bookList = [];
var authorList = [];
var bandList = [];
var showList = [];
var movieList = [];
var gameList = [];

function buildObject(name, type, description, wURL, yURL){
	var resultObj = {};
	resultObj.name = name;
	resultObj.type = type;
	resultObj.description = description;
	resultObj.wURL = wURL;
	resultObj.yURL = yURL;

	return resultObj;
}

function showObjects(obj){
	var item = $('.templates').clone(); 

	var itemName = item.find('.name');
	itemName.text(obj.name);

	var itemDesc = item.find('.description');
	itemDesc.text(obj.description);

}

function updateLists(){
	if(bookList.length > 0){
		for(var i = 0; i < bookList.length; i++){

		}
	} else {

	}
}

function buildQuery(){
	var queryString = '';
		if(bookCheck){
			queryString = 'book:' + queryString + $('#book-search').val() + ', ';
		}
		if(authorCheck){
			queryString = 'author:' +queryString + $('#author-search').val() + ', ';
		}
		if(bandCheck){
			queryString = 'band:' + queryString + $('#band-search').val() + ', ';
		}
		if(showCheck){
			queryString = 'show:' + queryString + $('#show-search').val() + ', ';
		}
		if(movieCheck){
			queryString = 'movie:' + queryString + $('#movie-search').val() + ', ';
		}
		if(gameCheck){
			queryString = 'game:' + queryString + $('#game-search').val() + ', ';
		}

		if(bookCheck || authorCheck || bandCheck || showCheck || movieCheck || gameCheck){
			queryString = queryString.slice(0,-2);
		}

		return queryString;
}

function populateData(resultArray){
	$.each(resultArray, function(index, value) {
		var name = value.Name;
		var type = value.Type;
		var description = value.wTeaser;
		var wURL = value.wUrl;
		var yURL;
		if(value.yUrl !== null){
			yURL = value.yUrl;
		} else {
			yURL = 'N/A';
		}
		var finalObj = buildObject(name, type, description, wURL, yURL);

		switch(finalObj.type){
			case 'book':
				bookList.push(finalObj);
				break;
			case 'movie':
				movieList.push(finalObj);
				break;
			case 'band':
				bandList.push(finalObj);
				break;
			case 'show':
				showList.push(finalObj);
				break;
			case 'author':
				authorList.push(finalObj);
				break;
			case 'game':
				gameList.push(finalObj);
				break;
		}
	});

	updateLists();
}

function getData(queryString){
	var queryURL = 'https://www.tastekid.com/api/similar?q=';
	var queryKey = '&k=158414-JSONAPIS-KMPT5AN1';

	var finalURL = queryURL + queryString + queryKey + '&info=1';

	var result = $.ajax({
		url: finalURL,
		dataType: 'jsonp',
		type: 'GET'
	})
	.done(function(result){
		var finalResults = result.Similar.Results;
		populateData(finalResults);
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

		getData(queryStr);
	});

	$('#book').change(function () {
		if($(this).is(':checked')){
			bookCheck = true;
		}else{
			bookCheck = false;
		}
	});

	$('#author').change(function () {
		if($(this).is(':checked')){
			authorCheck = true;
		}else{
			authorCheck = false;
		}
	});

	$('#band').change(function () {
		if($(this).is(':checked')){
			bandCheck = true;
		}else{
			bandCheck = false;
		}
	});

	$('#show').change(function () {
		if($(this).is(':checked')){
			showCheck = true;
		}else{
			showCheck = false;
		}
	});

	$('#movie').change(function () {
		if($(this).is(':checked')){
			movieCheck = true;
		}else{
			movieCheck = false;
		}
	});

	$('#game').change(function () {
		if($(this).is(':checked')){
			gameCheck = true;
		}else{
			gameCheck = false;
		}
	});

});