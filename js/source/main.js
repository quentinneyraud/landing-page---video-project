import $ from 'jquery';
import Router from './Router';
import Pager from './Pager';

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
    }
}

new App();