// SmartResize Function from Paul Irish
// https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

// Nvenk Specific functions
var DEBUG = false;
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

// Force reload cached back button press - Safari Fix
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload()
    }
});

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

    // ScrollMagic
    var SMcontroller = new ScrollMagic.Controller();

    // SM - Background Image Fade In
    var bgImage = new ScrollMagic.Scene({
        triggerElement: '.background-image',
        offset : 100,
        triggerHook: 0.3
    })
    .setClassToggle('.background-image', 'scrollfX')
    .addTo(SMcontroller);

    if(DEBUG) bgImage.addIndicators();

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
