const dvdList = document.getElementById("dvd-list");

if (dvdList && typeof dvds !== "undefined") {

    let html = "";

    Object.entries(dvds).forEach(([dvdName, dvdData]) => {

        let dvdUrl;
        let year = "";

        if (typeof dvdData === "string") {

            dvdUrl = dvdData;

        } else {

            dvdUrl = dvdData.url;
            year = dvdData.year || "";

        }

        html += `
<a class="dvd-card" href="${dvdUrl}">

    <div class="dvd-year">${year}</div>

    <div class="dvd-name">🎬 ${dvdName}</div>

</a>
`;

    });

    dvdList.innerHTML = html;

}