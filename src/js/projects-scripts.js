//-------------------------------------
// Scroll Position calculation & Progress Bar
//-------------------------------------
$(document).on('ready', function() {  
	var winHeight = $(window).height(), 
	docHeight = $(document).height(),
	progressBar = $('progress'),
	max, value;

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