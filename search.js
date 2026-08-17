const search = document.getElementById("search");
const result = document.getElementById("result");


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

document.querySelectorAll("#tags button").forEach(button => {

    button.onclick = () => {
        const tag = button.textContent.trim();


        console.log("押されたタグ:", tag);


        if(selectedTags.includes(tag)){

            selectedTags =
            selectedTags.filter(t => t !== tag);

            button.classList.remove("active");

        }else{

            selectedTags.push(tag);

            button.classList.add("active");

        }


        showSongs();

    };

});



function showSongs(){

    results.innerHTML = "";

    // タグもお気に入りも選択されていない
    if(selectedTags.length === 0 && !favoriteOnly){
        return;
    }

    let list = songs;


    // ======================
    // タグで絞り込み
    // ======================

    if(selectedTags.length > 0){

        list = list.filter(song =>
            selectedTags.every(tag =>
                song.tags.includes(tag)
            )
        );

    }


    // ======================
    // お気に入りで絞り込み
    // ======================

    if(favoriteOnly){

        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        list = list.filter(song =>
            favorites.includes(song.url)
        );

    }


    // ======================
    // お気に入りの場合
    // アルバムごとに表示
    // ======================

    if(favoriteOnly){

        const albums = {};


        list.forEach(song => {

            const albumName = song.album || "その他";

            if(!albums[albumName]){
                albums[albumName] = [];
            }

            albums[albumName].push(song);

        });


        // アルバムごとに表示

        for(const album in albums){

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

    else{

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

function setupFavorites(){

    document.querySelectorAll(".favorite").forEach(star=>{

        const id = star.dataset.id;

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        if(favorites.includes(id)){
            star.textContent="★";
            star.classList.add("active");
        }

        star.onclick=(e)=>{

            e.preventDefault();
            e.stopPropagation();

            let favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];

if(favorites.includes(id)){
    favorites = favorites.filter(f => f !== id);
}else{
    favorites.push(id);
}

localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
);

// 同じ曲の星を全部更新
document
.querySelectorAll(`.favorite[data-id="${id}"]`)
.forEach(s => {

    if(favorites.includes(id)){
        s.textContent = "★";
        s.classList.add("active");
    }else{
        s.textContent = "☆";
        s.classList.remove("active");
    }

});
        };

    });

}

const favoriteButton = document.getElementById("favoriteTag");

favoriteButton.onclick = () => {

    favoriteOnly = !favoriteOnly;

    favoriteButton.classList.toggle("active");

    showSongs();

};