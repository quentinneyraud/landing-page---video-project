import $ from 'jquery';
import Router from './Router';
import Pager from './Pager';
import Video from './Video';
import TweenMax from 'gsap';
import './../../node_modules/gsap/src/minified/plugins/ScrollToPlugin.min';
import AudioPlayer from './AudioPlayer';
/*global ScrollMagic*/
class App {
    constructor() {
        this.firstRun = true;
        this.initializeElements();
        this.initializeListeners();
        this.animateHeader();
        this.animateFloatingImage();
    }
    
    initializeElements() {
        this.$els = {
            document: $(document),
            window: $(window),
            body: $('body'),
            header: $('.main-header'),
            sectionContainer: $('.sectionContainer')
        }
    }
    
    initializeListeners() {
        this.$els.document.on('ready', this.onDocumentReady.bind(this));
        this.$els.window.on('hashchange', this.detectPage.bind(this));
    }
    
    onDocumentReady() {
        this.detectPage();
        new Video();
    }
    
    detectPage() {
        this.router = new Router(window.location.href);
        this.router.getPage(this.onPageDetected.bind(this));
    }
    
    onPageDetected(pageDetected) {
        let {page, error} = pageDetected;
        if(error) {
            page = 'projet';
        }
        if(this.page !== page) {
            this.animateContainerLeave(() => {
                if(this.audioPlayer) {
                    delete this.audioPlayer;
                }
                let pager = new Pager(page);
                pager.fillContainer(this.$els.sectionContainer, this.onContentLoaded.bind(this));
            });
        }
        this.page = page;
    }

    onContentLoaded() {
        if(['sonorite'].indexOf(this.page) > -1) {
            this.audioPlayer = new AudioPlayer();
        }

        if(this.firstRun) {
            this.firstRun = false;
        }else{
            this.animScroll();
        }
        this.animContainer();
    }
    
    animScroll() {
        let scrollValue = 90 * this.$els.window.height() / 100;
        TweenMax.to(this.$els.window, 1, {scrollTo:{y:scrollValue}, ease:Power2.easeOut});
    }
    
    animContainer() {
        let container = $('.container');
        TweenMax.fromTo(container, 0.5, { y: 50, autoAlpha: 0.5 }, { y: 0, autoAlpha: 1 });
    }
    
    animateContainerLeave(cb) {
        let container = $('.container');
        TweenMax.to(container, 0.5, { y: 50, autoAlpha: 0, onComplete: function() { cb(); }});
    }

    animateHeader() {
        let $panelTitles = $('.main__nav .panel__title', this.$els.header);

        let controller = new ScrollMagic.Controller();

        let tween = TweenMax.from($panelTitles, 1, {autoAlpha: 0});

        new ScrollMagic.Scene({triggerElement: this.$els.header, duration: 700})
            .setTween(tween)
            //.addIndicators({name: "staggering"}) // add indicators (requires plugin)
            .addTo(controller);
    }

    animateFloatingImage() {
        let $flImage = $("#floating-image", this.$els.body);

        let controller = new ScrollMagic.Controller();

        let tween = TweenMax.from($flImage, 1, {top: "160vh", rotation: "+=90", transformOrigin:"50% 50%"});

        new ScrollMagic.Scene({triggerElement: this.$els.header, duration: 10000})
            .setTween(tween)
            .addTo(controller);
    }
}

new App();