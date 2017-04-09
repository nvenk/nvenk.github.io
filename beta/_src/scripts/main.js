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

        if(href == undefined) href = $(btn).attr('data-href');

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
        trigger(tList[i], 0);
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
