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
var DEBUG = true;

// function checkSize(){
//     var size = "";
//     var prop = $(".responsive-beacon").css("width");
//     if (prop == "1px") { size = "mobile"; }
//     else if (prop == "2px") { size = "tablet";}
//     else if (prop == "3px") { size = "laptop";}
//     else if (prop == "4px") { size = "desktop";}
//     return size;
// };

// Trigger Transitions

function trigger(id, scrollOffset){
    var btn = '.trigger--' + id;

    $(btn).click(function(e){
        e.preventDefault();

        $('body').addClass('transition--' + id);

        $('html, body').animate({
            scrollTop: $("#" + id).offset().top - scrollOffset
        }, 600);

        var href = $(btn).attr('href');

        if(DEBUG == true) { console.log(href);};

        setTimeout(function() {window.location = href}, 800);
    });
};

tList = ['about','sim','xtly','central','puppy'];

$(document).ready(function() {
    console.log('triggered');
    $(this).scrollTop(0);

    // Initial Run
    // cSize = checkSize();

    // if(DEBUG == true) { console.log("Media = " + cSize); };

    for (i=0; i < tList.length; i++){
        trigger(tList[i], 78);
    };


    // ScrollMagic
    var SMcontroller = new ScrollMagic.Controller();

    // SM - Background Image Fade In
    var bgFade = new ScrollMagic.Scene({
        triggerElement: '.background-image',
        offset : 100,
        triggerHook: 0.3
    })
    .setClassToggle('.background-image', 'scrollfX')
    .addIndicators()
    .addTo(SMcontroller);


    // ON RESIZE

    // $(window).smartresize(function(){
    //     newSize = checkSize();
    //
    //     // Trigger Code only when size changes.
    //     if (newSize != cSize) {
    //         cSize = newSize;
    //         if(DEBUG == true) { console.log("Media = " + cSize); };
    //     };
    // });
    //
 });
