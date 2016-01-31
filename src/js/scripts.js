//-------------------------------------
// Fade Out Pointer on Scroll
//-------------------------------------

$(window).scroll(function() {

    if ($(this).scrollTop() > 5)
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
// Back To Top
//-------------------------------------

function backToTop() {
    $(this).on('click',function(e){
        e.preventDefault();

        $root.animate({
            scrollTop: 0
        }, 900, 'swing');
    })
    return false;
}