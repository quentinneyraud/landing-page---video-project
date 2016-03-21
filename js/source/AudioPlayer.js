import $ from 'jquery';

export default class AudioPlayer {

    constructor() {

        let players = [];

        let playersTemp = $('.audio-player'),
            playerTemp = null;

        for (var i=0; i < playersTemp.length; i++) {

            playerTemp = $(playersTemp[i]);

            players.push({
                el: playerTemp,
                playButton: $('.play-button', playerTemp),
                audio: new Audio('./audio/' + playerTemp.data('audio'))
            });
        }

        for (var i in players) {
            players[i].playButton.on('click', this.togglePlayer.bind(this, players[i]));
        }
    }

    togglePlayer(player) {

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