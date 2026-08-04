const search = document.getElementById("search");
const button = document.getElementById("searchButton");
const result = document.getElementById("result");


button.addEventListener("click", ()=>{

    const word = search.value.trim().toLowerCase();

    result.innerHTML = "";


    if(word === ""){
        result.innerHTML = "検索文字を入力してください";
        return;
    }


    let count = 0;


    songs.forEach(song => {

        const title = song.title.toLowerCase();
        const lyrics = (song.lyrics || "").toLowerCase();


        if(
            title.includes(word) ||
            lyrics.includes(word)
        ){

            count++;

            result.innerHTML += `
            <p>
                <a href="${song.url}">
                    ${song.title}
                </a>
            </p>
            `;

        }

    });


    if(count === 0){

        result.innerHTML = "見つかりませんでした";

    }else{

        result.innerHTML = 
        `<p>${count}曲見つかりました</p>` 
        + result.innerHTML;

    }

});