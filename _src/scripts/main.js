var DEBUG = false; 
var size = "";
var SCROLLSPEED = 600;
// var data = $.getJSON('./_src/data.json');
var tList = ['about', 'sim', 'xtly', 'central', 'puppy'];

// Navigation variables
var nav = $('#nav');
var navTrigger = $('.nav-trigger');


$(document).ready(function() {
    // Add Media Tag if DEBUG flag is true
    if (DEBUG) $('body').prepend('<div class="media-tag"></div>');

    // Initialize the Trigger Animations
    for (i = 0; i < tList.length; i++) {
        trigger(tList[i], 0);
    }

    // Enable Smooth Scrolling to the top of the page if 'Home' is clicked on homepage
    if ($('body').hasClass('home')) {
        $('.home-link').on('click', function(e){
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, SCROLLSPEED, 'swing');
            if(DEBUG) console.log('home link pressed');
        });
    }

    // Navigation - Open Nav when trigger is clicked
    navTrigger.on('click', function(event) {
        event.preventDefault();
        nav.toggleClass("nav-is-visible");
    });

    // Navigation - Hide Nav when user is not at the page top
    if ($(window).scrollTop() < 100) {
        nav.addClass('nav-at-top');
    } else {
        nav.addClass('nav-not-at-top');
    }

    /*

        ON SCROLL

    */

    $(window).on('scroll', { previousTop: 0 }, function() {
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

    // Triangle BG
    // if($('body').hasClass('home')) {
    //     window.onload = onLoad;
    //     window.onresize = onResize;
    // }


    /*

        RESPONSIVE MEDIA CLASSES

    */

    var cSize = checkSize();

    // ON RESIZE
    $(window).smartresize(function() {
        newSize = checkSize();

        // Trigger Code only when size changes.
        if (newSize != cSize) {
            cSize = newSize;
            if (DEBUG) console.log("Media = " + cSize);
        }
    });
});
