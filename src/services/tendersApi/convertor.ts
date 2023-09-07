export class TendersConvertor {
    private readonly dom: Document;

    constructor(html: string) {
        const domparser = new DOMParser();
        this.dom = domparser.parseFromString(html, 'text/html');
    }

    getWinnerName() {
        const winnerName = [...this.dom?.querySelectorAll("h3")]
            .filter(a => a?.textContent?.includes("Протокол розкриття"))[0]
            ?.parentElement
            ?.getElementsByTagName("tbody")[0]
            ?.getElementsByTagName("td")[0]
            ?.innerText

        if (!winnerName) {
            return 'невідомий переможець'
        }
        return winnerName;
    }

    getPublicationDate() {
        let publicationDate = this.dom
            ?.querySelector("span.date")
            ?.textContent
        
        if (!publicationDate) {
            return 'невідома дата публікації'
        }

        return publicationDate;
    }
}
