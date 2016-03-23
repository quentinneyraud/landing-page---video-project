import $ from 'jquery';
import Router from './Router';
import Pager from './Pager';
import TweenMax from 'gsap';
import './../../node_modules/gsap/src/minified/TweenMax.min';
import './../../node_modules/gsap/src/minified/plugins/ScrollToPlugin.min';
import AudioPlayer from './AudioPlayer';

class App {
    constructor() {
        this.initializeElements();
        this.initializeListeners();
        this.animateHeader();
        this.firstRun = true;
    }
    
    initializeElements() {
        this.$els = {
            document: $(document),
            window: $(window),
            body: $('body'),
            sectionContainer: $('.sectionContainer')
        }
    }
    
    initializeListeners() {
        this.$els.document.on('ready', this.onDocumentReady.bind(this));
        this.$els.window.on('hashchange', this.onPageChange.bind(this));
    }
    
    onDocumentReady() {
        this.detectPage();
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
            if(this.audioPlayer) {
                delete this.audioPlayer;
            }
            let pager = new Pager(page);
            pager.fillContainer(this.$els.sectionContainer, this.onContentLoaded.bind(this));

        }
        this.page = page;
    }
    
    onPageChange() {
        this.animateContainerLeave(this.detectPage.bind(this));
    }
    
    onContentLoaded() {
        if(['sonorite'].indexOf(this.page) > -1) {
            this.audioPlayer = new AudioPlayer();   
        }
        if(!this.firstRun) {
            this.animScroll();
        }else{
            this.firstRun = false;
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
        let $header = $('.main-header', this.$els.body)
        let $panelTitles = $('.main__nav .panel__title', $header);

        let controller = new ScrollMagic.Controller();

        let tween = TweenMax.from($panelTitles, 1, {autoAlpha: 0});

        new ScrollMagic.Scene({triggerElement: $header, duration: 700})
            .setTween(tween)
            //.addIndicators({name: "staggering"}) // add indicators (requires plugin)
            .addTo(controller);
    }
}

new App();