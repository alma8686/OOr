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

const songList = document.getElementById("song-list");

if (songList) {

    const fileName =
        location.pathname.split("/").pop();

    const dvd = Object.values(dvds).find(
        dvd => dvd.url.split("/").pop() === fileName
    );

    if (dvd) {

        songList.innerHTML = "";

        dvd.songs.forEach((songTitle, index) => {

            const song = songs.find(
                song => song.title === songTitle
            );

            if (song) {

                songList.innerHTML += `
                    <div class="dvd-song">
                        <span class="number">
                            ${index + 1}
                        </span>

                        <a href="../${song.url}">
                            ${song.title}
                        </a>
                    </div>
                `;

            }

        });

    }

}