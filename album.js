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

        // 開閉できる見た目
        album.classList.add("album-title");

        // 最初は開いている
        album.dataset.open = "true";

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