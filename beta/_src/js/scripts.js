$('.trigger--about').click(function(e){
    e.preventDefault();
    $('body').addClass('transition--about');
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 800);
    var href = $(this).attr('href');
    console.log(href);
    // setTimeout(function() {window.location = href}, 800);
});

$('.trigger--sim').click(function(e){
    e.preventDefault();
    $('body').addClass('transition--sim');
    $('html, body').animate({
        scrollTop: $("#sim").offset().top - 78
    }, 500);
    var href = $(this).attr('href');
    console.log(href);
    setTimeout(function() {window.location = href}, 700);
});

$('.trigger--xtly').click(function(e){
    e.preventDefault();
    $('body').addClass('transition--xtly');
    $('html, body').animate({
        scrollTop: $("#xtly").offset().top - 78
    }, 500);
    var href = $(this).attr('href');
    console.log(href);
    setTimeout(function() {window.location = href}, 700);
});
