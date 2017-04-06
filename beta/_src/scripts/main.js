// Nvenk Specific functions
var DEBUG = true;
var size = "";

function checkSize(){
    var prop = $(".responsive-beacon").css("width");

    if (prop == "10px") { size = "mobile"; }
    else if (prop == "20px") { size = "tablet"; }
    else if (prop == "30px") { size = "laptop"; }
    else if (prop == "40px") { size = "desktop"; }

    if(DEBUG) console.log ("Media = " + size);

    return size;
};

// Trigger Transitions
function trigger(id, scrollOffset){
    var btn = '.trigger--' + id;

    $(btn).click(function(e){
        e.preventDefault();

        $('body').addClass('transition');
        $('body').addClass('transition--' + id);

        $('html, body').animate({
            scrollTop: $("#" + id).offset().top - scrollOffset
        }, 600);

        var href = $(btn).attr('href');

        if(DEBUG) console.log(href);

        setTimeout(function() {window.location = href}, 900);
    });
};

tList = ['about','sim','xtly','central','puppy'];

$(document).ready(function() {
    // Add Media Tag
    if(DEBUG) $('body').prepend('<div class="media-tag"></div>');

    // Initial Run
    var cSize = checkSize();

    for (i=0; i < tList.length; i++){
        trigger(tList[i], 78);
    };

    // ON RESIZE

    $(window).smartresize(function(){
        newSize = checkSize();

        // Trigger Code only when size changes.
        if (newSize != cSize) {
            cSize = newSize;
            if(DEBUG) console.log("Media = " + cSize);
        };
    });
 });


// Konami Keys
 // var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
 //
 // $(document).keydown(function(e) {
 //
 //   kkeys.push( e.keyCode );
 //
 //   if ( kkeys.toString().indexOf( konami ) >= 0 ) {
 //
 //     $(document).unbind('keydown',arguments.callee);
 //
 //     // do something awesome
 //     $("body").addClass("konami");
 //
 //   }
 //
 // });
