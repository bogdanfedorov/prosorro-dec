1
const table = document.getElementById('tenders')
const load = document.getElementById('load')
load.addEventListener('click', async () => {
    const tenders = await window.electronAPI.getTenders()

    const tbody = document.querySelector("tbody");
    const template = document.querySelector("#tender-row");

    tenders.forEach(tender => {
        const clone = template.content.cloneNode(true);
        let td = clone.querySelectorAll("td");

        td[0].textContent = tender.id;
        td[1].textContent = tender.winnerName;
        td[2].textContent = tender.publicationDate;
        td[3].textContent = tender.url;

        tbody.appendChild(clone);
    })
})
