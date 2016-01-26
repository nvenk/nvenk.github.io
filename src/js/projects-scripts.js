//-------------------------------------
// Scroll Position calculation & Progress Bar
//-------------------------------------

$(document).on('ready', function() {  
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
});

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

function backtotop() {
    $root.animate({
        scrollTop: 0
    }, 900, 'swing');
    return false;
}

//-------------------------------------
// Smooth Scroll links to top
//-------------------------------------

$(document).ready(function(){
	$('a[href^=#]:not([href=#])').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $root.stop().animate({
	        scrollTop: $target.offset().top - 70
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	return false;
});
