const allowedPages = ['projet', 'intention', 'synopsis', 'animatique', 'sonorite'];

export default class Router {
    constructor(url) {
        this.url = url;
    }
    
    getPage(cb) {
        const urlSplit = this.url.split('#');
        const page = urlSplit[urlSplit.length - 1].toLowerCase();
        cb({
            page: page,
            error: allowedPages.indexOf(page) < 0
        });
    }
}