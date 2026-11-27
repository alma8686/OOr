
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("a.spotify");
    const title = document.querySelector("h1");

    if (!button || !title) return;

    // YouTube Musicの検索先を設定
    const songName = title.textContent.trim();
    const searchWord = "ONE OK ROCK " + songName;

    button.href =
        "https://music.youtube.com/search?q=" +
        encodeURIComponent(searchWord);

    button.textContent = "YouTube Musicで再生";
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    // 全曲共通のスマホ用ボタン設定
    const style = document.createElement("style");

    style.textContent = `
        @media (max-width: 768px) {
            a.spotify {
                display: block !important;
                width: 240px !important;
                max-width: calc(100vw - 40px) !important;
                box-sizing: border-box !important;
                padding: 14px 10px !important;
                font-size: 14px !important;
                white-space: nowrap !important;
                text-align: center !important;
                background: #ff0033 !important;
                color: white !important;
            }
        }
    `;

    document.head.appendChild(style);
});
