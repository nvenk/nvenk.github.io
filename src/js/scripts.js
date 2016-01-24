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
 });

//-------------------------------------
// Smooth Scroll Pointer to Projects Section
// http://stackoverflow.com/questions/6677035/jquery-scroll-to-element
//-------------------------------------

var $root = $('html, body');
$('.projects-link').click(function() {
    $root.animate({
        scrollTop: $('#project-section').offset().top
    }, 500);
    return false;
});

//-------------------------------------
// Fade-In Topbar
//-------------------------------------

// var $triggerHeight = $winHeight * 0.65;
// $(window).scroll(function() {

//     if ($(this).scrollTop() > $triggerHeight)
//      {
//         $('header').fadeIn();
//      }
//     else
//      {
//       $('header').fadeOut();
//      }
//  });

//-------------------------------------
// Back To Top
//-------------------------------------

function backtotop() {
    $root.animate({
        scrollTop: 0
    }, 500);
    return false;
}




