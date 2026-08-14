document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById("manga-container");

    const mangaCount =
        document.getElementById("manga-count");

    const totalCount =
        document.getElementById("total-count");

    const noResults =
        document.getElementById("no-results");


    // ==============================
    // 全作品数
    // ==============================

    if (typeof works !== "undefined") {

        totalCount.textContent =
            works.length;

    }


    // ==============================
    // 絞り込み要素
    // ==============================

    const tsFilter =
        document.getElementById("ts-filter");

    const derivativeFilter =
        document.getElementById("derivative-filter");

    const statusFilter =
        document.getElementById("status-filter");

    const genreFilter =
        document.getElementById("genre-filter");

    const filterButton =
        document.getElementById("filter-button");


    // ==============================
    // ★表示
    // ==============================

    function createStars(value) {

        const max = 5;

        const score =
            Math.max(
                0,
                Math.min(
                    max,
                    Math.round(value / 2)
                )
            );

        return "★".repeat(score) +
               "☆".repeat(max - score);

    }


    // ==============================
    // 作品カード作成
    // ==============================

    function createWorkCard(work) {

        const card =
            document.createElement("article");

        card.className =
            "work-card";


        // ==============================
        // 画像
        // ==============================

        const imageArea =
            document.createElement("div");

        imageArea.className =
            "work-image";


        if (work.image) {

            const image =
                document.createElement("img");

            image.src =
                work.image;

            image.alt =
                work.title;

            imageArea.appendChild(image);

        } else {

            imageArea.textContent =
                "NO IMAGE";

        }


        // ==============================
        // 情報
        // ==============================

        const info =
            document.createElement("div");

        info.className =
            "work-info";


        // キャッチコピー

        if (work.catchphrase) {

            const catchphrase =
                document.createElement("p");

            catchphrase.className =
                "work-catchphrase";

            catchphrase.textContent =
                work.catchphrase;

            info.appendChild(
                catchphrase
            );

        }


        // 作品名

        const title =
            document.createElement("h3");

        const titleLink =
            document.createElement("a");

        titleLink.href =
            "work.html?id=" + work.id;

        titleLink.textContent =
            work.title;

        title.appendChild(
            titleLink
        );

        info.appendChild(
            title
        );


        // 作者

        const author =
            document.createElement("p");

        author.className =
            "work-author";

        author.textContent =
            "作者：" + work.author;

        info.appendChild(
            author
        );


        // TS主役度

        const tsMain =
            document.createElement("p");

        tsMain.className =
            "work-rating";

        tsMain.textContent =
            "TS主役度 " +
            createStars(work.tsMain);

        info.appendChild(
            tsMain
        );


        // おすすめ度

        const recommendation =
            document.createElement("p");

        recommendation.className =
            "work-rating";

        recommendation.textContent =
            "おすすめ度 " +
            createStars(
                work.recommendation
            );

        info.appendChild(
            recommendation
        );


        // ==============================
        // カードクリック
        // ==============================

        card.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.tagName.toLowerCase()
                    !== "a"
                ) {

                    window.location.href =
                        "work.html?id=" +
                        work.id;

                }

            }
        );


        card.appendChild(
            imageArea
        );

        card.appendChild(
            info
        );


        return card;

    }


    // ==============================
    // 漫画取得（media が配列でも文字列でも対応）
    // ==============================

    function getManga() {

        if (
            typeof works ===
            "undefined"
        ) {

            return [];

        }


        return works.filter(
            function (work) {

                const mediaList = Array.isArray(work.media)
                    ? work.media
                    : (work.media ? [work.media] : []);

                return mediaList.includes("漫画");

            }
        );

    }


    // ==============================
    // 作品表示
    // ==============================

    function displayWorks(list) {

        container.innerHTML = "";


        mangaCount.textContent =
            list.length;


        if (list.length === 0) {

            noResults.style.display =
                "block";

            return;

        }


        noResults.style.display =
            "none";


        list.forEach(
            function (work) {

                const card =
                    createWorkCard(
                        work
                    );

                container.appendChild(
                    card
                );

            }
        );

    }


    // ==============================
    // 絞り込み
    // ==============================

    function filterManga() {

        let manga =
            getManga();


        // TS形式

        if (tsFilter.value) {

            manga =
                manga.filter(
                    function (work) {

                        return work.tsType &&
                            work.tsType.includes(
                                tsFilter.value
                            );

                    }
                );

        }


        // 作品区分

        if (
            derivativeFilter.value
        ) {

            manga =
                manga.filter(
                    function (work) {

                        return work.derivative ===
                            derivativeFilter.value;

                    }
                );

        }


        // 完結状況

        if (
            statusFilter.value
        ) {

            manga =
                manga.filter(
                    function (work) {

                        return work.status ===
                            statusFilter.value;

                    }
                );

        }


        // ジャンル

        if (
            genreFilter.value
        ) {

            manga =
                manga.filter(
                    function (work) {

                        return work.genres &&
                            work.genres.includes(
                                genreFilter.value
                            );

                    }
                );

        }


        displayWorks(
            manga
        );

    }


    // ==============================
    // 絞り込みボタン
    // ==============================

    filterButton.addEventListener(
        "click",
        filterManga
    );


    // ==============================
    // 初期表示
    // ==============================

    displayWorks(
        getManga()
    );

});
