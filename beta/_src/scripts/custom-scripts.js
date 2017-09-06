var DEBUG = false;

$(window).on('load',function() {

    // Setting Trigger Animations

    var expTrigger = '.trigger';
    var expScrollOffset = 0;
    var expScrollSpeed = 600;

    $(expTrigger).click(function(e) {
        e.preventDefault();

        $(this).closest('section').addClass('active');
        $('section').not($('.active')).addClass('hide');

        $('html, body').animate({
            scrollTop: $(this).parents("section").offset().top - expScrollOffset
        }, expScrollSpeed);

        var href = $(this).attr('href');
        var timeout = 620;

        if (href === undefined) href = $(this).attr('data-href');

        if(DEBUG) console.log(href);

        if(href == 'about.html') {
            timeout = 1000;
        }

        setTimeout(function() {
            window.location = href;
        }, timeout);
    });

});
