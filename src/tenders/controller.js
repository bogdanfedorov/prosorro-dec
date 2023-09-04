const TenderApi = require("./api");
const TendersConvertor = require("./convertor");
const Logger = require("../logger");

class TenderController {
    /**
     * @type {TenderApi}
     */
    tenderApi
    /**
     * @type {Logger}
     */
    logger
    /**
     * @type {number}
     */
    currentPage
    /**
     * @type {number}
     */
    pageFinish
    /**
     * @type {[]}
     */
    data

    constructor() {
        this.tenderApi = new TenderApi();
        this.logger = new Logger('TenderController');
        this.currentPage = 1;
        this.data = [];
    }


    /**
     * @return {Promise<Array<{
     *     id: string,
     *     winnerName: string,
     *     publicationDate: string,
     *     url: string,
     * }>>}
     */
    async next() {
        let tendersResponse;
        try {
            tendersResponse = await this.tenderApi.getTenders(this.currentPage++)
        } catch (e) {
            this.logger.error(e)
        }

        tendersResponse.data = await Promise.all(
            tendersResponse.data.map(async tender => {
                const {html, url,} = await this.tenderApi.getTenderHtml(tender.tenderID);

                const tenderConvertor = new TendersConvertor(html);
                const winnerName = tenderConvertor.getWinnerName();
                const publicationDate = tenderConvertor.getPublicationDate();

                return {
                    id: tender.tenderID,
                    winnerName,
                    publicationDate,
                    url
                }

            })
        )

        const {data, ...pagination} = tendersResponse
        this.currentPage = this.currentPage + 1;
        this.pageFinish = pagination.total / pagination.per_page;

        this.data = [...this.data, ...data];

        return this.data;
    }
}


module.exports = TenderController;
