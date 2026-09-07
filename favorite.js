function setupFavorites() {

    document.querySelectorAll(".favorite").forEach(star => {

        const id = star.dataset.id;

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        // 現在の状態を表示
        if (favorites.includes(id)) {
            star.textContent = "★";
            star.classList.add("active");
        } else {
            star.textContent = "☆";
            star.classList.remove("active");
        }

        star.onclick = (e) => {

            e.preventDefault();
            e.stopPropagation();

            // 最新の状態を取得
            let favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];

            // ON → OFF
            if (favorites.includes(id)) {

                favorites =
                    favorites.filter(f => f !== id);

            }
            // OFF → ON
            else {

                favorites.push(id);

            }

            // 保存
            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            // 同じ曲の星を全部更新
            document
                .querySelectorAll(`.favorite[data-id="${id}"]`)
                .forEach(s => {

                    if (favorites.includes(id)) {

                        s.textContent = "★";
                        s.classList.add("active");

                    } else {

                        s.textContent = "☆";
                        s.classList.remove("active");

                    }

                });

        };

    });

}

document.addEventListener("DOMContentLoaded", () => {
    setupFavorites();
});