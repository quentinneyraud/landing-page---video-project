import $ from 'jquery';
import TweenMax from 'gsap';

export default class Video {
    constructor() {
        this.videoPlayed = false;
        this.initializeElements();
        this.initializeListeners();
    }

    getAnimConfig() {
        return{
            videoMiddleHeight: this.$els.video.offsetHeight/2 + 'px',
            videoMiddleWidth: this.$els.video.offsetWidth/2 + 'px',
            maxRadius: Math.sqrt(Math.pow(this.$els.video.offsetHeight, 2) + Math.pow(this.$els.video.offsetWidth, 2)) / 2 + 'px'
        }
    }

    initializeElements() {
        this.$els = {
            video: $('.film')[0],
            overlay: $('.overlay')[0],
            button: $('#video_player'),
            exitButton: $('#video_player_exit')
        }
    }

    initializeListeners() {
        $('#video_player').on('click', this.showVideo.bind(this));
        this.$els.exitButton.on('click', this.hideVideo.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(e) {
        if(e.keyCode === 27 && this.videoPlayed){
            this.hideVideo();
        }
    }

    showVideo() {
        this.videoPlayed = true;
        this.setOverlayZIndex(200);
        this.$els.exitButton.addClass('active');
        let {videoMiddleHeight, videoMiddleWidth, maxRadius} = this.getAnimConfig();

        this.$els.video.currentTime = 0;
        this.$els.video.play();
        TweenMax.fromTo(this.$els.video, 1, {webkitClipPath:'circle(0px at ' + videoMiddleWidth + ' ' + videoMiddleHeight},
            {webkitClipPath:'circle(' + maxRadius + 'px at ' + videoMiddleWidth + ' ' + videoMiddleHeight});

        TweenMax.to(this.$els.overlay, 0.5, {autoAlpha: 1});
    }

    hideVideo() {
        this.videoPlayed = false;
        this.setOverlayZIndex(-200);
        this.$els.exitButton.removeClass('active');
        let {videoMiddleHeight, videoMiddleWidth, maxRadius} = this.getAnimConfig();

        this.$els.video.pause();
        TweenMax.fromTo(this.$els.video, 0.3, {webkitClipPath:'circle(' + maxRadius + 'px at ' + videoMiddleWidth + ' ' + videoMiddleHeight},
            {webkitClipPath:'circle(0px at ' + videoMiddleWidth + ' ' + videoMiddleHeight});

        TweenMax.to(this.$els.overlay, 0.3, {autoAlpha: 0});
    }

    setOverlayZIndex(value) {
        this.$els.overlay.style.zIndex = value;
    }

}