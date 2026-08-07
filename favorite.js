const favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".favorite").forEach(star=>{

    const id = star.dataset.id;

    if(favorites.includes(id)){
        star.textContent = "★";
        star.classList.add("active");
    }

    star.addEventListener("click",(e)=>{

        e.preventDefault();
        e.stopPropagation();

        if(favorites.includes(id)){

            favorites.splice(favorites.indexOf(id),1);

            star.textContent="☆";
            star.classList.remove("active");

        }else{

            favorites.push(id);

            star.textContent="★";
            star.classList.add("active");

        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

    });

});