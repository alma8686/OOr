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


                <p>
                    <a href="${song.url}?search=${encodeURIComponent(word)}">
                        ${highlight(title, word)}
                    </a>
                </p>



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
        "見つかりませんでした";


    }else{


        result.innerHTML =

        `
        <p>
            ${count}曲見つかりました
        </p>
        `

        +

        html;


    }



});