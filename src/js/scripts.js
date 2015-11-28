//-------------------------------------
// Fade Out Pointer on Scroll
//-------------------------------------

$(window).scroll(function() {

    if ($(this).scrollTop()>0)
     {
        $('.pointer').fadeOut();
     }
    else
     {
      $('.pointer').fadeIn();
     }
 });

//-------------------------------------
// Smooth Scroll Pointer
//-------------------------------------

var $root = $('html, body');
$('.projects-link').click(function() {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

