// =========================
// 収録DVD表示
// =========================

const dvdBox = document.getElementById("dvd");

if (dvdBox) {

    const fileName =
        location.pathname.split("/").pop();

    const song =
        songs.find(
            song => song.url === fileName
        );

    if (
        song &&
        song.dvd &&
        song.dvd.length > 0
    ) {

        dvdBox.innerHTML = `
            <h2>🎬 収録DVD・Blu-ray</h2>

            <ul class="dvd-list">

                ${song.dvd.map(dvdName => {

                    const dvdData =
                        dvds[dvdName];

                    let dvdUrl = null;

                    // =========================
                    // 文字列形式
                    // =========================

                    if (
                        typeof dvdData === "string"
                    ) {

                        dvdUrl = dvdData;

                    }

                    // =========================
                    // オブジェクト形式
                    // =========================

                    else if (
                        dvdData &&
                        dvdData.url
                    ) {

                        dvdUrl =
                            dvdData.url;

                    }


                    if (dvdUrl) {

                        return `
                            <li>
                                <a
                                    class="dvd-link"
                                    href="${dvdUrl}"
                                >
                                    🎬 ${dvdName}
                                </a>
                            </li>
                        `;

                    }


                    return `
                        <li>
                            ${dvdName}
                        </li>
                    `;

                }).join("")}

            </ul>
        `;

    }

}


// =========================
// DVD曲順ナビゲーション
// =========================

const dvdParams =
    new URLSearchParams(
        location.search
    );

const dvdFile =
    dvdParams.get("dvd");

const dvdIndex =
    dvdParams.get("index");


if (
    dvdFile !== null &&
    dvdIndex !== null &&
    typeof dvds !== "undefined"
) {

    const currentIndex =
        Number(dvdIndex);


    // =========================
    // 現在のDVDを探す
    // =========================

    const currentDvd =
        Object.values(dvds).find(dvd => {

            // 文字列形式は曲順を持たない
            if (
                typeof dvd === "string"
            ) {
                return false;
            }

            if (
                !dvd ||
                !dvd.url
            ) {
                return false;
            }

            return (
                dvd.url.split("/").pop()
                === dvdFile
            );

        });


    // =========================
    // DVDが見つかった
    // =========================

    if (
        currentDvd &&
        currentDvd.songs
    ) {

        // =====================
        // 前の曲
        // =====================

        const previousTitle =
            currentDvd.songs[
                currentIndex - 1
            ];


        const previousSong =
            songs.find(
                song =>
                    song.title ===
                    previousTitle
            );


        // =====================
        // 次の曲
        // =====================

        const nextTitle =
            currentDvd.songs[
                currentIndex + 1
            ];


        const nextSong =
            songs.find(
                song =>
                    song.title ===
                    nextTitle
            );


        // =====================
        // ナビゲーション作成
        // =====================

        const navigation =
            document.createElement(
                "div"
            );

        navigation.className =
            "dvd-navigation";


        let html = "";


        // =====================
        // 前の曲
        // =====================

        if (previousSong) {

            html += `
                <a
                    href="${previousSong.url}?dvd=${encodeURIComponent(dvdFile)}&index=${currentIndex - 1}"
                >
                    ← 前の曲
                </a>
            `;

        } else {

            html += `
                <span class="dvd-disabled">
                    ← 前の曲
                </span>
            `;

        }


        // =====================
        // DVD収録曲
        // =====================

        html += `
    <a
        class="dvd-home"
        href="${currentDvd.url}"
    >
        🎬 ${Object.keys(dvds).find(
            name => dvds[name] === currentDvd
        )}
    </a>
`;


        // =====================
        // 次の曲
        // =====================

        if (nextSong) {

            html += `
                <a
                    href="${nextSong.url}?dvd=${encodeURIComponent(dvdFile)}&index=${currentIndex + 1}"
                >
                    次の曲 →
                </a>
            `;

        } else {

            html += `
                <span class="dvd-disabled">
                    次の曲 →
                </span>
            `;

        }


        navigation.innerHTML =
            html;


        // =====================
        // 歌詞の下に表示
        // =====================

        const lyrics =
            document.getElementById(
                "lyrics"
            );


        if (lyrics) {

            lyrics.after(
                navigation
            );

        }

    }

}