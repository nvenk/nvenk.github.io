//-------------------------------------
// Scroll Position calculation & Progress Bar
//-------------------------------------
function progressBar() {
	var winHeight = $(window).height(),
	docHeight = $(document).height(),
	progressBar = $('progress'), max, value;

	/* Set the max scrollable area */
	max = docHeight - winHeight;
	progressBar.attr('max', max);

	$(document).on('scroll', function(){
		value = $(window).scrollTop();
		progressBar.attr('value', value);
	});

	$(window).on('resize', function() {
		winHeight = $(window).height(),
		docHeight = $(document).height();
		max = docHeight - winHeight;
		progressBar.attr('max', max);
		value =  $(window).scrollTop();
		progressBar.attr('value', value);
	});
}

//-------------------------------------
// Fade-In Topbar
//-------------------------------------

$(window).scroll(function() {

    if ($(this).scrollTop() > 200)
     {
        $('.pr-topbar').fadeIn();
     }
    else
     {
      $('.pr-topbar').fadeOut();
     }
 });

//-------------------------------------
// Back To Top
//-------------------------------------

var $root = $('html, body');

function backToTop() {
	$root.animate({
        scrollTop: 0
    }, 900, 'swing');
    return false;
}

//-------------------------------------
// Smooth Scroll links to href
//-------------------------------------

function scrollTo() {
	$('a[href^="#"]:not([href="#"])').on('click',function (e) {
	    e.preventDefault();

	    var $target = $(this.hash);

	    $root.stop().animate({
	        scrollTop: $target.offset().top - 70
	    }, 900, 'swing');
	})
	return false;
}

//-------------------------------------
// Disable Team Links
//-------------------------------------

function disableLinks(){
	$('.team>ul li a').on('click',function(e){
		e.preventDefault();
		console.log('Hello, World!');
	})
	return false;
}
//-------------------------------------
// Execute on Document Ready
//-------------------------------------

$(document).ready(function() {
	scrollTo();
	disableLinks();
	setTimeout(progressBar(),1000);
});
