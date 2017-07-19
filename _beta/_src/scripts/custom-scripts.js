var DEBUG = false;

$(window).on('load',function() {
    var primeCtrl = new ScrollMagic.Controller({ name: 'primeTrigger' });
    var leaveCtrl = new ScrollMagic.Controller({ name: 'leaveTrigger',
                                                 globalSceneOptions: { triggerHook: 'onLeave' }});

    // Hero Image
    var fadeTween = TweenMax.fromTo('.hero',
                                    1,
                                    { opacity: 0.6 },
                                    { opacity: 0 });
    var heroScene = new ScrollMagic.Scene({ duration: 350 })
                                            .setTween(fadeTween)
                                            .addTo(primeCtrl);
    if(DEBUG) heroScene.addIndicators({ name:"Fade Hero" });

    // Skill Icons Stagger
    var skillTween = TweenMax.staggerFromTo(".skill-icons .icon",
                                            0.5,
                                            { opacity: 0, y: -60 },
                                            { opacity: 1, y: 0 },
                                            0.15 );
    var skillScene = new ScrollMagic.Scene({ triggerElement: '.skill-icons',
                                            //  reverse: false,
                                             duration: 150 })
                                             .setTween(skillTween)
                                             .addTo(primeCtrl);
    if(DEBUG) skillScene.addIndicators({ name:"Fade Icons" });

    // Setting Trigger Animations

    var expTrigger = '.trigger';
    var expScrollOffset = 0;
    var expScrollSpeed = 600;

    $(expTrigger).click(function(e) {
        e.preventDefault();

        $(this).parent('section').addClass('active');
        $('section').not($('.active')).addClass('hide');

        $('html, body').animate({
            scrollTop: $(this).parents("section").offset().top - expScrollOffset
        }, expScrollSpeed);

        var href = $(this).attr('href');

        if (href === undefined) href = $(this).attr('data-href');

        if(DEBUG) console.log(href);

        setTimeout(function() {
            window.location = href;
        }, 620);
    });


});
