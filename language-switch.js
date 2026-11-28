document.addEventListener("DOMContentLoaded", () => {
    const englishLyrics = document.getElementById("englishLyrics");
    const japaneseLyrics = document.getElementById("japaneseLyrics");

    const englishBtn = document.getElementById("englishBtn");
    const japaneseBtn = document.getElementById("japaneseBtn");

    if (!englishLyrics || !japaneseLyrics || !englishBtn || !japaneseBtn) return;

    function switchLanguage(language) {
        const isEnglish = language === "en";

        englishLyrics.style.display = isEnglish ? "block" : "none";
        japaneseLyrics.style.display = isEnglish ? "none" : "block";

        englishBtn.classList.toggle("active", isEnglish);
        japaneseBtn.classList.toggle("active", !isEnglish);
    }

    englishBtn.addEventListener("click", () => switchLanguage("en"));
    japaneseBtn.addEventListener("click", () => switchLanguage("ja"));

    switchLanguage("ja");
});