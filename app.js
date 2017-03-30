var youTubeUrl = 'https://www.googleapis.com/youtube/v3/search';
var prevPageButton = ('<button class="prevPage" type="submit">' +
		'Previous</button>');
var nextPageButton = ('<button class="nextPage" type="submit">' +
		'Next</button>');


//retrieves data from YouTube
function getApiData(searchItem, callback, token) {
	var query = {
		part: 'snippet',
		key: 'AIzaSyC65vVs3VxOP4s8DH92WGLYJd8zTc5qqlU',
		q: searchItem,
		pageToken: token,
		type: 'video'
	}
	$.getJSON(youTubeUrl, query, callback);
}

function getChannelData(channel, callback) {
	var query = {
		part: 'snippet',
		key: 'AIzaSyC65vVs3VxOP4s8DH92WGLYJd8zTc5qqlU',
		channelId: channel,
		type: 'video'
	}
	$.getJSON(youTubeUrl, query, callback);
}



//displays YouTube data to DOM
function displayYouTubeResults(data) {
	var results = '';
	var pageQuery = $('.search-form').find('.query').val();
	console.log(data);

	//checks if sure returned any results
	if (data.items.length !== 0) {
		data.items.forEach(function(item) {
			results += '<p>' + item.snippet.title + ' - <button type="submit" class="channel">' +
			 item.snippet.channelTitle + '</button><br>' +
				'<a class="video" data-featherlight="iframe" href="https://www.youtube.com/embed/' + 
				item.id.videoId + '">' +
				'<img src="' + item.snippet.thumbnails.medium.url + '"></a><br></p><p class="channelThumbnails"></p><p class="channel-more"></p>';
			channelLister(item.snippet.channelId)
		})
		//checks if there needs to be a previous page button and calls its function
		if (data.prevPageToken) {
			results += prevPageButton;
			prevPageListener(data.prevPageButton, pageQuery)
			}
		//checks if there needs to be a next page button and calls its function	
		if (data.nextPageToken) {
			results += nextPageButton;
			nextPageListener(data.nextPageToken, pageQuery);
			}
		}
	else {
		results += '<p>No results</p>';
		}
	$('.results').html(results);
	$('.video').featherlight();
}

function displayChannelThumbnails(data) {
	var results = '';
	data.items.forEach(function(item) {
		results += '<img src="' + item.snippet.thumbnails.default.url + '">';
	})
	$('.channel-more').html(results);
}

function channelLister(channel) {
	$('.results').on('click', '.channel', function(e){
		getChannelData(channel, displayChannelThumbnails);
	})	
}


function prevPageListener(token, query) {
	$('.results').on('click', '.prevPage', function(e){
		getApiData(query, displayYouTubeResults, token);
	})	
}

function nextPageListener(token, query) {
	$('.results').on('click', '.nextPage', function(e){
		getApiData(query, displayYouTubeResults, token);
	})
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