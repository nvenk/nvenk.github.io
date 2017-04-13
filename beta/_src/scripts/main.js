// Nvenk Specific functions
var DEBUG = false;
var size = "";
var SCROLLSPEED = 600;

function checkSize() {
    var prop = $(".responsive-beacon").css("width");

    if (prop == "10px") {
        size = "mobile";
    } else if (prop == "20px") {
        size = "tablet";
    } else if (prop == "30px") {
        size = "laptop";
    } else if (prop == "40px") {
        size = "desktop";
    }

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
        }, 750);
    });
}

var tList = ['about', 'sim', 'xtly', 'central', 'puppy'];

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

$(document).ready(function() {
    // Add Media Tag
    if (DEBUG) $('body').prepend('<div class="media-tag"></div>');

    // Triangle BG

    // if($('body').hasClass('home')) {
    //     window.onload = onLoad;
    //     window.onresize = onResize;
    // }

    // Initial Run
    var cSize = checkSize();

    for (i = 0; i < tList.length; i++) {
        trigger(tList[i], 0);
    }

    if ($('body').hasClass('home')) {
        $('.home-link').on('click', function(e){
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, SCROLLSPEED, 'swing');
            if(DEBUG) console.log('home link pressed');
        });
    }

    // ON RESIZE
    $(window).smartresize(function() {
        newSize = checkSize();

        // Trigger Code only when size changes.
        if (newSize != cSize) {
            cSize = newSize;
            if (DEBUG) console.log("Media = " + cSize);
        }
    });

    // Navigation
    var nav = $('#nav');
    var navTrigger = $('.nav-trigger');

    navTrigger.on('click', function(event) {
        event.preventDefault();
        nav.toggleClass("nav-is-visible");
    });

    if ($(window).scrollTop() < 100) {
        nav.addClass('nav-at-top');
    } else {
        nav.addClass('nav-not-at-top');
    }

    // Scroll Triggers

    $(window).on('scroll', {
            previousTop: 0
        },
        function() {
            var currentTop = $(window).scrollTop();

            if (currentTop < 100) {
                nav.addClass('nav-at-top');
                nav.removeClass('nav-not-at-top');
                if (cSize != "mobile") {
                    nav.removeClass('nav-is-visible');
                }
            } else {
                nav.removeClass('nav-at-top');
                nav.addClass('nav-not-at-top');
            }
            /*

            //check if user is scrolling up
    	     if (currentTop < this.previousTop ) {
    	    	//if scrolling up...
    	    	//add class 'is-visible' to the main navigation
    	    	//if currentTop == 0, remove 'is-fixed' and 'is-visible' classes
    	    } else {
    	    	//if scrolling down...
                console.log('down');
    	    	//add the 'is-fixed' class to the main navigation as soon as it is no longer visible
    	    	//add class 'is-visible' to the main navigation
    	    }

            */
            // set previousTop for the next iteration
            this.previousTop = currentTop;
        }
    );

});
