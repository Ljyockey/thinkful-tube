var youTubeUrl = 'https://www.googleapis.com/youtube/v3/search';
var nextPageButton = ('<button class="nextPage" type="submit">' +
		'Next</button>');

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
	if (data.items.length !== 0) {
		console.log(data);
		data.items.forEach(function(item) {
			results += '<p>' + item.snippet.title + '<br>' +
			'<a href="https://www.youtube.com/watch?v=' + 
			item.id.videoId + '" target="blank">' +
			'<img src="' + item.snippet.thumbnails.medium.url + '"></a></p>';
		})
		if (data.pageInfo.resultsPerPage < data.pageInfo.totalResults) {
			results += nextPageButton;
			}
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