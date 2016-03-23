import $ from 'jquery';

export default class AudioPlayer {

    constructor() {

        this.players = $('.audio-player').map((i, e) => {
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
        for(let player of this.players) {
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