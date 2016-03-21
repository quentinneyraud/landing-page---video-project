import $ from 'jquery';
import Router from './Router';
import Pager from './Pager';
import TweenMax from 'gsap';
import './../../node_modules/gsap/src/minified/TweenMax.min';
import './../../node_modules/gsap/src/minified/plugins/ScrollToPlugin.min';

class App {
    constructor() {
        this.initializeElements();
        this.initializeListeners();
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
            let pager = new Pager(page);
            pager.fillContainer(this.$els.sectionContainer);
        }
        this.page = page;
    }
    
    onPageChange() {
        this.detectPage();
        this.anim();
    }
    
    anim() {
        let scrollValue = 90 * this.$els.window.height() / 100;
        TweenMax.to(this.$els.window, 1, {scrollTo:{y:scrollValue}, ease:Power2.easeOut});
    }
}

new App();