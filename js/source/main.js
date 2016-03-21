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
            body: $('body')
        }
    }
    
    initializeListeners() {
        this.$els.document.on('ready', this.onDocumentReady.bind(this));
    }
    
    onDocumentReady() {
        this.router = new Router(window.location.href);
        this.router.getPage(this.onPageDetected.bind(this));
    }
    
    onPageDetected(pageDetected) {
        let {page, error} = pageDetected;

        if(error) {
            page = 'projet';
        }
        
        new Pager(page);
    }
}

new App();