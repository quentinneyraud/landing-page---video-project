import $ from 'jquery';

export default class AudioPlayer {

    constructor() {

        /*let players = [];

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
        }*/

        this.players = $('.audio-player').map((e) => {

            let element = $(e);
            return {
                el: element,
                playButton: $('.play-button', element),
                audio: new Audio('./audio/' + element.data('audio'))
            }
        });

        this.addListener();
    }

    addListener() {
        for(let player in this.players) {
            player.playButton.on('click', this.togglePlayer.bind(this, player));
        }
    }

    togglePlayer(player) {


        if (player.audio.readyState == '4') {

            if (player.audio.paused) {
                player.playButton.toggleClass("paused");
                player.audio.play();
            } else {
                player.playButton.toggleClass("paused");
                player.audio.pause();
            }
        }

        else
            alert('Please wait, song is loading !');
    }
}