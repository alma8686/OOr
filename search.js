const search = document.getElementById("search");
const result = document.getElementById("result");

function getEffectiveTags(song) {

    const savedTags =
        JSON.parse(
            localStorage.getItem("songTags") || "{}"
        );

    if (
        Object.prototype.hasOwnProperty.call(
            savedTags,
            song.url
        )
    ) {

        return savedTags[song.url];

    }

    return song.tags || [];

}

// 検索文字を黄色表示
function highlight(text, word){

    if(!word){
        return text;
    }


    const regex = new RegExp(
        word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "gi"
    );


    return text.replace(
        regex,
        `<mark>$&</mark>`
    );

}





// 検索
search.addEventListener("input", ()=>{


    const word = search.value.trim();

    const searchWord = word.toLowerCase();


    result.innerHTML = "";


    if(word === ""){
        return;
    }



    let count = 0;

    let html = "";



    songs.forEach(song => {



        const title = song.title;

        const lyrics = song.lyrics || "";



        const titleLower = title.toLowerCase();

        const lyricsLower = lyrics.toLowerCase();



        let hitLyrics = "";



        // 歌詞のヒット場所取得
        const index = lyricsLower.indexOf(searchWord);



        if(index !== -1){


            const start = Math.max(
                0,
                index - 30
            );


            const end = Math.min(
                lyrics.length,
                index + word.length + 50
            );



            hitLyrics =
            lyrics.substring(start,end)
            .replaceAll("\n"," ");


        }





        // 曲名または歌詞にヒット
        if(
            titleLower.includes(searchWord) ||
            lyricsLower.includes(searchWord)
        ){


            count++;



html += `

<div class="search-item">

    <div class="song-row">
        <a href="${song.url}?search=${encodeURIComponent(word)}">
            ${highlight(title, word)}
        </a>

        <span class="favorite" data-id="${song.url}">
            ☆
        </span>
    </div>

    ${
        hitLyrics
        ?
        `
        <p class="hit">
            ${highlight(hitLyrics, word)}
        </p>
        `
        :
        ""
    }

</div>

`;


        }


    });




    if(count === 0){


        result.innerHTML =
        "該当する曲が見つかりません";


    }else{


        result.innerHTML =

        `
        <p>
            ${count}曲見つかりました
        </p>
        `

        +

        html;

        setupFavorites();

    }



});

// ======================
// タグ検索
// ======================

const results = document.getElementById("results");

let selectedTags = [];
let favoriteOnly = false;


// ======================
// タグボタンの見た目を更新
// ======================

function updateTagButtons() {

    document.querySelectorAll("#tags button").forEach(button => {

        const tag = button.textContent.trim();

        // お気に入りボタン
        if (button.id === "favoriteTag") {

            button.classList.toggle(
                "active",
                favoriteOnly
            );

            return;
        }


        // 通常タグ
        button.classList.toggle(
            "active",
            selectedTags.includes(tag)
        );

    });

}


// ======================
// タグボタン
// ======================
document.querySelectorAll("#tags button").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        // お気に入り
        if (this.id === "favoriteTag") {

            favoriteOnly = !favoriteOnly;

            // 見た目を直接変更
            this.classList.toggle("active", favoriteOnly);

        }

        // 通常タグ
        else {

            const tag = this.textContent.trim();

            // 見た目を直接ON/OFF
            this.classList.toggle("active");

            if (this.classList.contains("active")) {

                // タグを追加
                if (!selectedTags.includes(tag)) {
                    selectedTags.push(tag);
                }

            } else {

                // タグを削除
                selectedTags =
                    selectedTags.filter(t => t !== tag);

            }
        }

        // スマホでタップ後に残るフォーカスを解除
        this.blur();

        // 曲を更新
        showSongs();
    });

});


// ======================
// タグをすべて解除
// ======================

const clearTagsButton =
    document.getElementById("clearTagsButton");

if (clearTagsButton) {

    clearTagsButton.addEventListener("click", function() {

        // 選択中のタグを全部解除
        selectedTags = [];

        // お気に入りも解除
        favoriteOnly = false;

        // ボタンの見た目を全部リセット
        document
            .querySelectorAll("#tags button")
            .forEach(button => {

                button.classList.remove("active");

            });

        // 状態表示と検索結果をリセット
        showSongs();

        // タップ後のフォーカスを解除
        this.blur();
    });

}


// ======================
// 曲を表示
// ======================


function showSongs() {
    results.innerHTML = "";

    const tagStatus =
        document.getElementById("tag-status");

    // タグもお気に入りも選択されていない
    if (
        selectedTags.length === 0 &&
        !favoriteOnly
    ) {
        if (tagStatus) {
            tagStatus.innerHTML = "";
        }
        return;
    }

    let list = songs;

    // ======================
    // タグで絞り込み
    // ======================
    if (selectedTags.length > 0) {
        list = list.filter(song => {
            const tags = getEffectiveTags(song);

            return selectedTags.every(tag =>
                tags.includes(tag)
            );
        });
    }

    // ======================
    // お気に入りで絞り込み
    // ======================
    if (favoriteOnly) {
        const favorites =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        list = list.filter(song =>
            favorites.includes(song.url)
        );
    }

    // ======================
    // 選択中のタグ＋件数
    // ======================
    if (tagStatus) {
        let text = "";

        if (selectedTags.length > 0) {
            text =
                "🏷️ 選択中： " +
                selectedTags.join(" × ");
        }

        if (favoriteOnly) {
            if (text !== "") {
                text += " × ";
            }

            text += "⭐ お気に入り";
        }

        tagStatus.innerHTML = `
            <div class="tag-status-box">
                ${text}
                <span class="tag-count">
                    ${list.length}曲
                </span>
            </div>
        `;
    }

    // ======================
    // 曲がない場合
    // ======================
    if (list.length === 0) {
        results.innerHTML =
            "<p>該当する曲がありません</p>";
        return;
    }

    // ======================
    // アルバムごとに分類
    // ======================
    const albums = {};

    list.forEach(song => {
        const albumName =
            song.album || "その他";

        if (!albums[albumName]) {
            albums[albumName] = [];
        }

        albums[albumName].push(song);
    });

    // ======================
    // アルバムごとに表示
    // ======================
    for (const album in albums) {

        // アルバムタイトル
        results.innerHTML += `
            <h2 class="album-title">
                📀 ${album}
            </h2>
        `;

        // 曲一覧
        results.innerHTML += `
            <div class="album-songs">
        `;

        albums[album].forEach(song => {

            results.innerHTML += `
                <div class="search-item">

                    <div class="song-row">

                        <a href="${song.url}">
                            ${song.title}
                        </a>

                        <span
                            class="favorite"
                            data-id="${song.url}">
                            ☆
                        </span>

                    </div>

                </div>
            `;

        });

        results.innerHTML += `
            </div>
        `;
    }

    // ======================
    // お気に入りボタンを設定
    // ======================
    setupFavorites();

    // ======================
    // アルバム開閉
    // ======================
    document
        .querySelectorAll(".album-title")
        .forEach(title => {

            title.addEventListener(
                "click",
                function() {

                    const songsArea =
                        this.nextElementSibling;

                    if (songsArea) {
                        songsArea.classList.toggle(
                            "hidden"
                        );
                    }

                }
            );

        });
}





