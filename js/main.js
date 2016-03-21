'use strict';

/*$(document).on('ready', function () {

    /!*var els = {
        panels: $('.panel')
    };
     els.panels.on('mouseenter', function (e) {
        TweenMax.to(e.target, 0.5, { 'flex-grow': '5' });
    });
     els.panels.on('mouseleave', function (e) {
        TweenMax.to(e.target, 0.5, { 'flex-grow': '1' });
    });*!/
});*/

(function($, T) {
    var App = {
        el: $('body'),

        init: function () {
            console.log('lalala');
            //T.to(this.el, 0.5, {opacity: 0});
        }
    }

    App.init();

})(jQuery, TweenMax);