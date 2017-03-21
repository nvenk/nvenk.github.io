/* MAKE IT A FUNCTION */

var DEBUG = false;


function trigger(id, scrollOffset){
    var btn = '.trigger--' + id;

    if(DEBUG == true) { console.log("iD=" + id,"BTN=" + btn); };

    $(btn).click(function(e){
        e.preventDefault();

        $('body').addClass('transition--' + id);
        $('html, body').animate({
            scrollTop: $("#" + id).offset().top - scrollOffset
        }, 600);

        var href = $(btn).attr('href');

        if(DEBUG == true) { console.log(href); };

        setTimeout(function() {window.location = href}, 800);
    });
};


tList = ['about','sim','xtly','central','puppy'];

for (i=0; i<tList.length; i++){
    trigger(tList[i], 78);
}
