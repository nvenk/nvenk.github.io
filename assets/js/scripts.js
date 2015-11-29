//-------------------------------------
// Fade Out Pointer on Scroll
//-------------------------------------

var $winHeight = $(window).height();
var $logoTrigger = $winHeight * 0.55;
var $projPos = $('#project-section').position();

$(window).scroll(function() {

    if ($(this).scrollTop()>0)
     {
        $('.pointer').fadeOut();
     }
    else
     {
      $('.pointer').fadeIn();
     }

// Logo Fade In
    if ($(this).scrollTop() > $logoTrigger)
     {
        $('.side-logo').fadeIn('fast');
     } 
    else
     { 
      $('.side-logo').fadeOut('fast');
     }

// Change Color

     if ($("#project-section"))
     {
        $('.logo-wings').animate({
            'fill' : '#CCC'
        });
     }
     else
     {
        $('.logo-wings').animate({
            'fill' : '#333'
        });
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