import $ from 'jquery';

const baseTemplateFolder = './templates/';

export default class Pager {
    constructor(page) {
        this.page = page;
    }
    
    fillContainer(el) {
        let file = this.page + '.html';
        $(el).load(baseTemplateFolder + file);
    }
}