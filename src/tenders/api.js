const Logger = require("../logger");
const axios = require("axios");

class TenderApi {
    logger

    constructor() {
        this.logger = new Logger('TenderApi');
    }

    async getTenders(page = 1) {
        const url = new URL('https://prozorro.gov.ua/api/search/tenders');
        url.searchParams.append('filterType', 'tenders');
        url.searchParams.append('status[0]', 'complete');
        url.searchParams.append('page', `${page}`);

        let response;
        try {
            response = await axios.post(url.toString())
        } catch (e) {
            this.logger.error(e)
        }

        if (!response) {
            throw new Error('No response');
        }


        return {
            data: response.data.data,
            pagination: {
                page: page,
                perPage: response.data.per_page,
                total: response.data.total,
            }
        };
    }

    async getTenderHtml(tenderId) {
        const url = new URL(`https://prozorro.gov.ua/tender/${tenderId}`);

        let response;
        try {
            response = await axios.get(url.toString())
        } catch (e) {
            this.logger.error(e)
        }

        return {
            url: url.toString(),
            html: response.data,
        };
    }
}


module.exports = TenderApi;
