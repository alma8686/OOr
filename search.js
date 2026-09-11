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


        const tag = this.textContent.trim();


        // ======================
        // お気に入り
        // ======================

        if (this.id === "favoriteTag") {

            favoriteOnly = !favoriteOnly;

        }


        // ======================
        // 通常タグ
        // ======================

        else {

            const index =
                selectedTags.indexOf(tag);


            if (index !== -1) {

                // すでに選択中 → 解除

                selectedTags.splice(index, 1);

            } else {

                // 未選択 → 選択

                selectedTags.push(tag);

            }

        }


        // 状態からボタン表示を作り直す
        updateTagButtons();


        // 曲一覧更新
        showSongs();

    });

});


// ======================
// 曲を表示
// ======================

function showSongs() {

    results.innerHTML = "";


    // タグもお気に入りも選択されていない
    if (
        selectedTags.length === 0 &&
        !favoriteOnly
    ) {

        return;

    }


    let list = songs;


    // ======================
    // タグで絞り込み
    // ======================

    if (selectedTags.length > 0) {

        list = list.filter(song => {

            const tags =
                getEffectiveTags(song);

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
    // お気に入りの場合
    // アルバムごとに表示
    // ======================

    if (favoriteOnly) {

        const albums = {};


        list.forEach(song => {

            const albumName =
                song.album || "その他";


            if (!albums[albumName]) {

                albums[albumName] = [];

            }


            albums[albumName].push(song);

        });


        for (const album in albums) {

            results.innerHTML += `

                <h2 class="album-title">
                    ${album}
                </h2>

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

        }

    }


    // ======================
    // 通常のタグ検索
    // ======================

    else {

        list.forEach(song => {

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

    }


    setupFavorites();

}

