var youTubeUrl = 'https://www.googleapis.com/youtube/v3/search';


function getApiData(searchItem, callback) {
	var query = {
		part: 'snippet',
		key: 'AIzaSyC65vVs3VxOP4s8DH92WGLYJd8zTc5qqlU',
		q: searchItem,
		type: 'video'
	}
	$.getJSON(youTubeUrl, query, callback);
}

function displayYouTubeResults(data) {
	var results = '';
	if (data.items) {
		data.items.forEach(function(item) {
			results += '<img src="' + item.snippet.thumbnails.medium.url + '">';
		})
	}
	else {
		results += '<p>No results</p>';
	}
	$('.results').html(results);
}

function submitListener() {
	$('.search-form').submit(function(e) {
		e.preventDefault();
		var query = $(this).find('.query').val();
		getApiData(query, displayYouTubeResults);
	})
}

$(function() {
	submitListener();

})
/*  I need to get the value of the user's input;
make a function that creates JSON for user's input
display the thumbnail of that JSON */