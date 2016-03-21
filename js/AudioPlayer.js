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
        // Config
        dir: {
            audio: "./audio/",
            images: "./images/"
        },

        // Elements
        el: $('body'),
        players: [],

        init: function () {

            //T.to(this.el, 0.5, {opacity: 0});

            this.initPlayers()
        },

        initPlayers: function () {
            var players = $('.audio-player', this.el),
                player = null;

            for (var i=0; i < players.length; i++) {

                player = $(players[i]);

                this.players.push({
                    el: player,
                    playButton: $('.play-button', player),
                    audio: new Audio(this.dir.audio + player.data('audio'))
                });
            }

            for (var i in this.players) {
                this.players[i].playButton.on('click', this.togglePlayer.bind(this, this.players[i]));
            }
        },

        togglePlayer: function(player) {

            player.playButton.toggleClass("paused");

            if (player.audio.readyState == '4') {

                if (player.audio.paused)
                    player.audio.play();

                else
                    player.audio.pause();


            }

            else
                alert('Please wait, song is loading !');
        }
    }

    App.init();

})(jQuery, TweenMax);