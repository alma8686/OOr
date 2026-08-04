window.addEventListener("load", ()=>{

    const params = new URLSearchParams(
        location.search
    );

    const word = params.get("search");


    if(!word){
        return;
    }


    const lyrics =
    document.querySelector("#lyrics");


    if(!lyrics){
        return;
    }


    const original =
    lyrics.innerHTML;


    const regex =
    new RegExp(
        word.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),
        "gi"
    );


    lyrics.innerHTML =
    original.replace(
        regex,
        `<mark>$&</mark>`
    );


    const target =
    lyrics.querySelector("mark");


    if(target){

        target.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

    }

});