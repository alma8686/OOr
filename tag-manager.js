// ========================================
// タグ設定システム
// ========================================


// 使用できるタグ
const TAGS = [
    "ロック",
    "バラード",
    "ラブソング",
    "日本語曲",
    "失恋",
    "応援",
    "人気曲",
    "ライブ定番"
];


// LocalStorageに保存する名前
const STORAGE_KEY = "songTags";


// 現在選択している曲
let currentSong = null;


// ========================================
// 保存されているタグを取得
// ========================================

function getSavedTags() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return {};
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error("タグデータの読み込みに失敗しました");

        return {};

    }

}


// ========================================
// 曲のタグを取得
// ========================================

function getSongTags(song) {

    const savedTags = getSavedTags();


    // 保存済みのタグが存在する場合
    // 空配列でも「保存済み」として扱う
    if (
        Object.prototype.hasOwnProperty.call(
            savedTags,
            song.url
        )
    ) {

        return savedTags[song.url];

    }


    // 保存されていなければ songs.js のタグ
    return song.tags || [];

}


// ========================================
// タグを保存
// ========================================

function saveSongTags(songId, tags) {

    const savedTags = getSavedTags();

    savedTags[songId] = tags;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedTags)
    );

}


// ========================================
// アルバム一覧を作る
// ========================================

function createAlbumList() {

    const albumFilter =
        document.getElementById("albumFilter");


    const albums = [
        ...new Set(
            songs
                .map(song => song.album)
                .filter(album => album)
        )
    ];


   const ALBUM_ORDER = [
    "ゼイタクビョウ",
    "BEAM OF LIGHT",
    "感情エフェクト",
    "Nicheシンドローム",
    "残響リファレンス",
    "人生×僕=",
    "35xxxv",
    "Ambitions",
    "Eye of the Storm",
    "Luxury Disease",
    "DETOX"
];

albums.sort((a, b) => {

    const indexA = ALBUM_ORDER.indexOf(a);
    const indexB = ALBUM_ORDER.indexOf(b);

    // 発売順リストにないアルバムは最後
    if (indexA === -1 && indexB === -1) {
        return a.localeCompare(b, "ja");
    }

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
});


    albums.forEach(album => {

        const option =
            document.createElement("option");

        option.value = album;
        option.textContent = album;

        albumFilter.appendChild(option);

    });

}


// ========================================
// 曲を検索
// ========================================

function searchSongs() {

    const searchText =
        document
            .getElementById("songSearch")
            .value
            .trim()
            .toLowerCase();


    const album =
        document
            .getElementById("albumFilter")
            .value;


    let results = songs.filter(song => {

        const title =
            (song.title || "")
                .toLowerCase();


        const titleMatch =
            title.includes(searchText);


        const albumMatch =
            !album || song.album === album;


        return titleMatch && albumMatch;

    });


    displaySongResults(results);

}


// ========================================
// 検索結果を表示
// ========================================

function displaySongResults(results) {

    const songList =
        document.getElementById("songList");

    const resultCount =
        document.getElementById("resultCount");


    songList.innerHTML = "";


    if (results.length === 0) {

        resultCount.textContent =
            "該当する曲がありません。";

        return;

    }


    resultCount.textContent =
        `${results.length}曲見つかりました`;


    results.forEach(song => {

        const button =
            document.createElement("button");

        button.className =
            "song-result-button";


        button.innerHTML = `
            <span class="song-result-title">
                ${escapeHTML(song.title)}
            </span>

            <span class="song-result-album">
                ${escapeHTML(song.album || "その他")}
            </span>
        `;


        button.addEventListener("click", () => {

            selectSong(song);

        });


        songList.appendChild(button);

    });

}


// ========================================
// 曲を選択
// ========================================

function selectSong(song) {

    currentSong = song;


    const selectedSong =
        document.getElementById("selectedSong");

    const selectedTitle =
        document.getElementById("selectedTitle");

    const selectedAlbum =
        document.getElementById("selectedAlbum");


    selectedSong.style.display = "block";


    selectedTitle.textContent =
        `🎵 ${song.title}`;


    selectedAlbum.textContent =
        `💿 ${song.album || "その他"}`;


    displayTagButtons();


    // 選択した曲が見える位置まで移動
    selectedSong.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ========================================
// タグボタンを表示
// ========================================

function displayTagButtons() {

    const tagButtons =
        document.getElementById("tagButtons");


    tagButtons.innerHTML = "";


    if (!currentSong) {
        return;
    }


    const currentTags =
        getSongTags(currentSong);


    TAGS.forEach(tag => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className = "tag-select-button";

        button.textContent = tag;


        if (currentTags.includes(tag)) {

            button.classList.add("active");

        }


        button.addEventListener("click", () => {

            button.classList.toggle("active");

        });


        tagButtons.appendChild(button);

    });

}


// ========================================
// タグを保存
// ========================================

function handleSaveTags() {

    if (!currentSong) {
        return;
    }


    const buttons =
        document.querySelectorAll(
            ".tag-select-button"
        );


    const selectedTags = [];


    buttons.forEach(button => {

        if (button.classList.contains("active")) {

            selectedTags.push(
                button.textContent
            );

        }

    });


    saveSongTags(
        currentSong.url,
        selectedTags
    );


    const message =
        document.getElementById("saveMessage");


    message.textContent =
        "✅ タグを保存しました！";


    message.className =
        "save-success";


    setTimeout(() => {

        message.textContent = "";

    }, 2500);

}


// ========================================
// 初期タグに戻す
// ========================================

function handleResetTags() {

    if (!currentSong) {
        return;
    }


    const savedTags =
        getSavedTags();


    delete savedTags[currentSong.url];


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedTags)
    );


    displayTagButtons();


    const message =
        document.getElementById("saveMessage");


    message.textContent =
        "🔄 songs.js の初期タグに戻しました。";


    message.className =
        "save-success";


    setTimeout(() => {

        message.textContent = "";

    }, 2500);

}


// ========================================
// HTMLエスケープ
// ========================================

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ========================================
// イベント
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        createAlbumList();


        // 曲名検索
        document
            .getElementById("songSearch")
            .addEventListener(
                "input",
                searchSongs
            );


        // アルバム検索
        document
            .getElementById("albumFilter")
            .addEventListener(
                "change",
                searchSongs
            );


        // 保存
        document
            .getElementById("saveTags")
            .addEventListener(
                "click",
                handleSaveTags
            );


        // 初期状態に戻す
        document
            .getElementById("resetTags")
            .addEventListener(
                "click",
                handleResetTags
            );


        // 最初は曲を全部表示
        searchSongs();

    }
);