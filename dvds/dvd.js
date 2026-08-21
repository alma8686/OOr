// =========================
// DVD背景画像
// =========================

const dvdFileName =
    location.pathname.split("/").pop();

const currentDvd =
    Object.values(dvds).find(
        dvd => dvd.url.split("/").pop() === dvdFileName
    );

if (currentDvd && currentDvd.background) {

    document.body.style.backgroundImage =
        `linear-gradient(
            rgba(0,0,0,0.35),
            rgba(0,0,0,0.45)
        ),
        url("../${currentDvd.background}")`;

}


// =========================
// DVD収録曲一覧
// =========================

const songList =
    document.getElementById("song-list");

if (songList) {

    const fileName =
        location.pathname.split("/").pop();

    const dvd =
        Object.values(dvds).find(
            dvd => dvd.url.split("/").pop() === fileName
        );

    if (dvd) {

        songList.innerHTML = "";

        dvd.songs.forEach(
            (songTitle, index) => {

                const song =
                    songs.find(
                        song => song.title === songTitle
                    );

                if (song) {

                    const dvdName =
                        encodeURIComponent(
                            dvd.url.split("/").pop()
                        );

                    songList.innerHTML += `
                        <div class="dvd-song">

                            <span class="number">
                                ${String(index + 1).padStart(2, "0")}
                            </span>

                            <a
                                href="../${song.url}?dvd=${dvdName}&index=${index}"
                            >
                                ${song.title}
                            </a>

                        </div>
                    `;

                }

            }
        );

    }

}