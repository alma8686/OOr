
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("a.spotify");
    const title = document.querySelector("h1");

    if (!button || !title) return;

    const songName = title.textContent.trim();
    const searchWord = "ONE OK ROCK " + songName;

    button.href =
        "https://music.youtube.com/search?q=" +
        encodeURIComponent(searchWord);

    button.textContent = "YouTube Musicで再生";
    button.target = "_blank";
    button.rel = "noopener noreferrer";
});
