function progressBar(){var o,t,n=$(window).height(),r=$(document).height(),e=$("progress");o=r-n,e.attr("max",o),$(document).on("scroll",function(){t=$(window).scrollTop(),e.attr("value",t)}),$(window).on("resize",function(){n=$(window).height(),r=$(document).height(),o=r-n,e.attr("max",o),t=$(window).scrollTop(),e.attr("value",t)})}function backToTop(){return $(this).on("click",function(o){o.preventDefault(),$root.animate({scrollTop:0},900,"swing")}),!1}function scrollTo(){return $("a[href^=#]:not([href=#])").on("click",function(o){o.preventDefault();var t=$(this.hash);$root.stop().animate({scrollTop:t.offset().top-70},900,"swing")}),!1}$(window).scroll(function(){$(this).scrollTop()>200?$(".pr-topbar").fadeIn():$(".pr-topbar").fadeOut()});var $root=$("html, body");$(document).ready(function(){progressBar(),scrollTo()});