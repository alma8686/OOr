document.addEventListener("DOMContentLoaded", () => {

    const albums = document.querySelectorAll("ul > strong");

    albums.forEach(album => {

        // アルバム名の次にある要素を探す
        let element = album.nextElementSibling;

        // 曲を入れる箱
        const wrapper = document.createElement("div");
        wrapper.className = "album-songs";

        let hasSongs = false;

        while (element) {

            // 次のアルバム名まで
            if (element.tagName === "STRONG") {
                break;
            }

            const next = element.nextElementSibling;

            // 曲
            if (element.tagName === "LI") {
                wrapper.appendChild(element);
                hasSongs = true;
            }

            element = next;
        }

        // 曲がなければ何もしない
        if (!hasSongs) return;

        // 曲を入れる
        album.after(wrapper);

        // 最初は曲一覧を非表示にする
        wrapper.style.display = "none";

        // 開閉できる見た目
        album.classList.add("album-title");

        // アルバム名を画像ごとに識別
    const albumName = album.textContent.trim();

    const albumImages = {
    "ゼイタクビョウ": "images/zei.jpg",
    "BEAM OF LIGHT": "images/beam.jpg",
    "感情エフェクト": "images/kan.jpg",
    "Nicheシンドローム": "images/ni.jpg",
    "残響リファレンス":"images/zan.jpg",
    "人生×僕=":"images/jin.jpg",
    "35xxxv":"images/35.jpg",
    "Ambitions":"images/am.jpg",
    "Eye of the Storm":"images/eye.jpg",
    "Luxury Disease":"images/lu.jpg",
    "DETOX":"images/de.jpg",
    "Unreleased Collection":"images/un.jpg",
    };
    const imagePath = albumImages[albumName];

// 背景画像を設定
if (imagePath) {
    album.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${imagePath}")`;

    wrapper.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${imagePath}")`;
}

    if (albumImages[albumName]) {
        album.dataset.image = albumImages[albumName];
    }

        // 最初は開いている
        //album.dataset.open = "true";

        // 最初は閉じている
     album.dataset.open = "false";

        // ▼を追加
        album.textContent = "▼ " + album.textContent;

        // クリック
        album.addEventListener("click", () => {

            const isOpen = album.dataset.open === "true";

            if (isOpen) {

                wrapper.style.display = "none";

                album.textContent =
                    "▶ " +
                    album.textContent
                        .replace(/^▼ /, "")
                        .replace(/^▶ /, "");

                album.dataset.open = "false";

            } else {

                wrapper.style.display = "block";

                album.textContent =
                    "▼ " +
                    album.textContent
                        .replace(/^▼ /, "")
                        .replace(/^▶ /, "");

                album.dataset.open = "true";
            }

        });

    });

});