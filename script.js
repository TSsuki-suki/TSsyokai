// ========================================
// TS作品図鑑
// トップページ用JavaScript
// ========================================


// ========================================
// 星評価
// 10点満点 → ★5段階
// ========================================

function createStars(value) {

    const rating = Math.round(value / 2);

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {
            stars += "★";
        } else {
            stars += "☆";
        }

    }

    return stars;
}



// ========================================
// 作品カードを作る
// ========================================

function createWorkCard(work) {

    const card =
        document.createElement("article");

    card.className = "work-card";


    // ------------------------------------
    // 画像
    // ------------------------------------

    const imageArea =
        document.createElement("div");

    imageArea.className = "work-image";


    if (work.image) {

        const image =
            document.createElement("img");

        image.src = work.image;
        image.alt = work.title;

        imageArea.appendChild(image);

    } else {

        imageArea.textContent = "NO IMAGE";

    }



    // ------------------------------------
    // 作品情報
    // ------------------------------------

    const information =
        document.createElement("div");

    information.className =
        "work-information";



    // ------------------------------------
    // キャッチコピー
    // ------------------------------------

    const catchphrase =
        document.createElement("div");

    catchphrase.className =
        "work-catchphrase";

    catchphrase.textContent =
        work.catchphrase || "";



    // ------------------------------------
    // 作品名
    // ------------------------------------

    const title =
        document.createElement("h3");

    title.className =
        "work-title";


    const titleLink =
        document.createElement("a");

    titleLink.href =
        "work.html?id=" + work.id;

    titleLink.textContent =
        work.title;


    title.appendChild(titleLink);



    // ------------------------------------
    // 作者
    // ------------------------------------

    const author =
        document.createElement("p");

    author.className =
        "work-author";

    author.textContent =
        "作者：" + (work.author || "不明");



    // ------------------------------------
    // TS主役度
    // ------------------------------------

    const tsMain =
        document.createElement("p");

    tsMain.className =
        "work-rating";

    tsMain.textContent =
        "TS主役度 " +
        createStars(work.tsMain);



    // ------------------------------------
    // おすすめ度
    // ------------------------------------

    const recommendation =
        document.createElement("p");

    recommendation.className =
        "work-rating";

    recommendation.textContent =
        "おすすめ度 " +
        createStars(work.recommendation);



    // ------------------------------------
    // まとめる
    // ------------------------------------

    information.appendChild(catchphrase);
    information.appendChild(title);
    information.appendChild(author);
    information.appendChild(tsMain);
    information.appendChild(recommendation);


    card.appendChild(imageArea);
    card.appendChild(information);


    return card;
}



// ========================================
// 作品をコンテナに表示
// ========================================

function renderWorks(
    worksToDisplay,
    container
) {

    if (!container) {
        return;
    }


    // 一度空にする

    container.innerHTML = "";


    // 作品がない場合

    if (worksToDisplay.length === 0) {

        const message =
            document.createElement("p");

        message.className =
            "no-results";

        message.textContent =
            "条件に一致する作品がありません。";

        container.appendChild(message);

        return;
    }


    // 作品カードを作成

    worksToDisplay.forEach(function(work) {

        const card =
            createWorkCard(work);

        container.appendChild(card);

    });

}



// ========================================
// 新着作品
// ========================================

function renderNewWorks() {

    const novelContainer =
        document.getElementById(
            "new-novel-container"
        );

    const mangaContainer =
        document.getElementById(
            "new-manga-container"
        );

    const animeContainer =
        document.getElementById(
            "new-anime-container"
        );


    // 新しい作品を上から表示
    // 現段階ではIDが大きいものを新しい作品とする

    const newestWorks =
        [...works]
        .sort((a, b) => b.id - a.id);


    const newestNovels =
        newestWorks
        .filter(work => work.media === "小説")
        .slice(0, 5);


    const newestManga =
        newestWorks
        .filter(work => work.media === "漫画")
        .slice(0, 5);


    const newestAnime =
        newestWorks
        .filter(work => work.media === "アニメ")
        .slice(0, 5);


    renderWorks(
        newestNovels,
        novelContainer
    );


    renderWorks(
        newestManga,
        mangaContainer
    );


    renderWorks(
        newestAnime,
        animeContainer
    );

}



// ========================================
// TS作品一覧
// ========================================

function renderMainWorks() {

    const container =
        document.getElementById(
            "works-container"
        );


    if (!container) {
        return;
    }


    const newestWorks =
        [...works]
        .sort((a, b) => b.id - a.id);


    // トップページでは5作品だけ

    const displayWorks =
        newestWorks.slice(0, 5);


    renderWorks(
        displayWorks,
        container
    );

}



// ========================================
// 条件検索
// ========================================

function setupSearch() {

    const filterButton =
        document.getElementById(
            "filter-button"
        );


    if (!filterButton) {
        return;
    }


    filterButton.addEventListener(
        "click",
        function() {


            // --------------------------------
            // 選択された条件
            // --------------------------------

            const media =
                document.getElementById(
                    "media-filter"
                ).value;


            const tsType =
                document.getElementById(
                    "ts-filter"
                ).value;


            const derivative =
                document.getElementById(
                    "derivative-filter"
                ).value;


            const status =
                document.getElementById(
                    "status-filter"
                ).value;


            const genre =
                document.getElementById(
                    "genre-filter"
                ).value;



            // --------------------------------
            // 作品を絞り込む
            // --------------------------------

            const filteredWorks =
                works.filter(function(work) {


                    // 作品種別

                    if (
                        media &&
                        work.media !== media
                    ) {
                        return false;
                    }



                    // TS形式
                    // tsTypeは配列なので
                    // includesで確認

                    if (
                        tsType &&
                        (
                            !work.tsType ||
                            !work.tsType.includes(tsType)
                        )
                    ) {
                        return false;
                    }



                    // オリジナル / 二次創作

                    if (
                        derivative &&
                        work.derivative !== derivative
                    ) {
                        return false;
                    }



                    // 完結状況

                    if (
                        status &&
                        work.status !== status
                    ) {
                        return false;
                    }



                    // ジャンル
                    // genresは配列

                    if (
                        genre &&
                        (
                            !work.genres ||
                            !work.genres.includes(genre)
                        )
                    ) {
                        return false;
                    }



                    // 全条件を通過

                    return true;

                });



            // --------------------------------
            // 検索結果を表示
            // --------------------------------

            const worksContainer =
                document.getElementById(
                    "works-container"
                );


            renderWorks(
                filteredWorks,
                worksContainer
            );



            // --------------------------------
            // 結果表示場所まで移動
            // --------------------------------

            const worksSection =
                document.getElementById(
                    "works"
                );


            if (worksSection) {

                worksSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}



// ========================================
// ページ読み込み
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderNewWorks();

        renderMainWorks();

        setupSearch();

    }
);
