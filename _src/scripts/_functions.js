// Use Responsive Beacon to communicate media queries to Javascript.
// Uses the Scss from partials/_utils.scss - line 205

// Create the element
$('body').prepend('<div class="responsive-beacon"></div>');
function checkSize() {
    var prop = $(".responsive-beacon").css("width");
    if (prop == "10px") { size = "mobile"; }
    else if (prop == "20px") { size = "tablet"; }
    else if (prop == "30px") { size = "laptop"; }
    else if (prop == "40px") { size = "desktop"; }
    if (DEBUG) console.log("Media = " + size);
    return size;
}

// Trigger Transitions
function trigger(id, scrollOffset) {
    var btn = '.trigger--' + id;

    $(btn).click(function(e) {
        e.preventDefault();

        $('body').addClass('transition');
        $('body').addClass('transition--' + id);

        $('html, body').animate({
            scrollTop: $("#" + id).offset().top - scrollOffset
        }, SCROLLSPEED);

        var href = $(btn).attr('href');

        if (href === undefined) href = $(btn).attr('data-href');

        if (DEBUG) console.log(href);

        setTimeout(function() {
            window.location = href;
        }, 800);
    });
}

// jQuery SmoothScroll for Nav Link
$(function() {
    $('nav a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, SCROLLSPEED);
                setTimeout(function() {
                    $('#nav').removeClass('nav-is-visible');
                }, 100);
                return false;
            }
        }
    });
});
