const dvdBox = document.getElementById("dvd");

if (dvdBox) {

    // 現在開いている曲のファイル名
    const fileName =
        location.pathname.split("/").pop();

    // songs.jsから現在の曲を探す
    const song = songs.find(
        song => song.url === fileName
    );

    // DVD情報がある場合
    if (song && song.dvd && song.dvd.length > 0) {

        dvdBox.innerHTML = `
            <h2>🎬 収録DVD・Blu-ray</h2>

            <ul class="dvd-list">

                ${song.dvd.map(dvd => {

                    // dvds.jsからDVDのURLを取得
                    const dvdUrl = dvds[dvd]?.url;

                    // DVDページが登録されている場合
                    if (dvdUrl) {

                        return `
                            <li>
                                <a class="dvd-link" href="${dvdUrl}">
                                    🎬 ${dvd}
                                </a>
                            </li>
                        `;

                    }

                    // DVDページがまだない場合
                    return `
                        <li>
                            ${dvd}
                        </li>
                    `;

                }).join("")}

            </ul>
        `;

    }

}