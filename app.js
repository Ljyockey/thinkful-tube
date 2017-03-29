
function submitListener() {
	$('.search-form').submit(function(e) {
		e.preventDefault();
		var input = $(this).find('.query').val();
	})
}

$(function() {

})
/*  I need to get the value of the user's input;
make a function that creates JSON for user's input
display the thumbnail of that JSON */