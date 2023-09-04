const {JSDOM} = require("jsdom");
const Logger = require("../logger");

class TendersConvertor {
    dom
    logger

    constructor(htmlString) {
        this.dom = new JSDOM(htmlString);
        this.logger = new Logger('TendersConvertor');
    }

    getWinnerName() {
        let winnerName = 'невідомий переможець';
        try {
            winnerName = this.dom.window.document
                .querySelector('table.table')
                .getElementsByTagName('tbody')
                .item(0).getElementsByTagName('tr')
                .item(0).getElementsByTagName('td')
                .item(0).innerHTML
                .replaceAll('   ', '')
                .replaceAll('<br>', '')
                .replaceAll('\n', '')
        } catch (e) {
            this.logger.error(e)
        }

        return winnerName;
    }

    getPublicationDate() {
        let publicationDate = 'невідома дата';
        try {
            publicationDate = this.dom.window.document
                .querySelector('table.table')
                .getElementsByTagName('tbody')
                .item(0).getElementsByTagName('tr')
                .item(0).getElementsByTagName('td')
                .item(3).getElementsByTagName('div')
                .item(0).innerHTML
                .replace('&nbsp;<span>', ' ')
                .replace('</span>', '');
        } catch (e) {
            this.logger.error(e)
        }

        return publicationDate;
    }
}

module.exports = TendersConvertor;
