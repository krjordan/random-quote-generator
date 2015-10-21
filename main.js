$(document).ready(function (){
	// Hide the empty blockquote and show the loading
	// icon as we request another quote.
	$('blockquote').hide();
	$('.load').show();
	getQuote();

	// Do the same as above when the button is clicked
	$('#btn-quote').on('click', function (){
		$('blockquote').hide();
		$('.load').show();
		getQuote();
	});
});

// Get the quote
var getQuote = function (){
	$.ajax({
		url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
		dataType: 'jsonp',
		// If the request is successful
		success: function (data){
			// Hide the loading icon
			$('.load').hide();
			// Show the blockquote element
			$('blockquote').show();
			// Add the quote to the #quoteText element
			$('#quoteText').html(data.quoteText);
			if (data.quoteAuthor !== ''){
				// If there is an author
				$('#quoteAuthor').html(data.quoteAuthor);
			}
			else {
				// When there is no author
				$('#quoteAuthor').html('Unknown')
			}

			// Set the tweet id to a variable since we will be
			// using it a lot.
			var tweet = $('#btn-tweet');
			// Enable the twitter button
			tweet.prop('disabled', false);
			// Remove the click event from the twitter button
			tweet.unbind('click');
			// Set up the twitter button click function
			tweet.click(function (){
				window.open('https://twitter.com/intent/tweet?text=' +
					encodeURIComponent(data.quoteText + ' - ' + data.quoteAuthor));
			});
		},
		// Set up a way to gracefully handle errors
		error: function (xhr, status, error){
			$('#quoteText').text('I\'m not sure what happened there. Click again and let\'s see if that does the trick!');
			$('#quoteAuthor').text('Your Trusty Browser');
			$('#btn-tweet').prop('disabled', true);
		}
	});
};
