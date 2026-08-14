// ========================================
// TS作品図鑑
// 作品一覧ページ用JavaScript
// ========================================


// ========================================
// 初期設定
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById("works-container");

    const resultCount =
        document.getElementById("result-count");

    const noResults =
        document.getElementById("no-results");


    if (!container || typeof works === "undefined") {
        return;
    }



    // ========================================
    // 星評価
    // ========================================

    function createStars(value) {

        const rating =
            Math.max(
                0,
                Math.min(
                    5,
                    Math.round((value || 0) / 2)
                )
            );

        return "★".repeat(rating)
            + "☆".repeat(5 - rating);

    }



    // ========================================
    // 作品カード
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

        imageArea.className =
            "work-card-image";


        if (work.image) {

            const image =
                document.createElement("img");

            image.src = work.image;

            image.alt =
                work.title + "の画像";

            imageArea.appendChild(image);

        } else {

            imageArea.textContent =
                "NO IMAGE";

        }



        // ------------------------------------
        // 本文
        // ------------------------------------

        const body =
            document.createElement("div");

        body.className =
            "work-card-body";



        // ------------------------------------
        // キャッチコピー
        // ------------------------------------

        const catchphrase =
            document.createElement("p");

        catchphrase.className =
            "work-card-catchphrase";

        catchphrase.textContent =
            work.catchphrase || "";



        // ------------------------------------
        // タイトル
        // ------------------------------------

        const title =
            document.createElement("h3");

        title.className =
            "work-card-title";

        title.textContent =
            work.title;



        // ------------------------------------
        // 作者
        // ------------------------------------

        const author =
            document.createElement("p");

        author.className =
            "work-card-author";

        author.textContent =
            "作者：" + (work.author || "不明");



        // ------------------------------------
        // 評価
        // ------------------------------------

        const ratings =
            document.createElement("div");

        ratings.className =
            "work-card-ratings";


        const tsMain =
            document.createElement("p");

        tsMain.innerHTML =
            "TS主役度 " +
            "<span>" +
            createStars(work.tsMain) +
            "</span>";


        const recommendation =
            document.createElement("p");

        recommendation.innerHTML =
            "おすすめ度 " +
            "<span>" +
            createStars(work.recommendation) +
            "</span>";


        ratings.appendChild(tsMain);
        ratings.appendChild(recommendation);



        // ------------------------------------
        // 本文をまとめる
        // ------------------------------------

        body.appendChild(catchphrase);
        body.appendChild(title);
        body.appendChild(author);
        body.appendChild(ratings);


        card.appendChild(imageArea);
        card.appendChild(body);



        // ------------------------------------
        // クリックで作品ページへ
        // ------------------------------------

        card.addEventListener(
            "click",
            function () {

                window.location.href =
                    "work.html?id=" +
                    encodeURIComponent(work.id);

            }
        );


        return card;

    }



    // ========================================
    // 作品一覧表示
    // ========================================

    function displayWorks(list) {

        container.innerHTML = "";


        if (!list || list.length === 0) {

            noResults.style.display =
                "block";

            resultCount.textContent =
                "0作品";

            return;

        }


        noResults.style.display =
            "none";


        resultCount.textContent =
            list.length + "作品";


        list.forEach(function (work) {

            container.appendChild(
                createWorkCard(work)
            );

        });

    }



    // ========================================
    // 検索条件を取得
    // ========================================

    function getFilters() {

        return {

            searchWord:
                document
                    .getElementById("work-search")
                    .value
                    .trim()
                    .toLowerCase(),

            media:
                document
                    .getElementById("media-filter")
                    .value,

            tsType:
                document
                    .getElementById("ts-filter")
                    .value,

            derivative:
                document
                    .getElementById("derivative-filter")
                    .value,

            status:
                document
                    .getElementById("status-filter")
                    .value,

            genre:
                document
                    .getElementById("genre-filter")
                    .value

        };

    }



    // ========================================
    // 作品を絞り込む
    // ========================================

    function filterWorks() {

        const filters =
            getFilters();


        const filtered =
            works.filter(function (work) {


                // --------------------------------
                // キーワード検索
                // --------------------------------

                if (filters.searchWord) {

                    const searchableText = [

                        work.title,
                        work.author,
                        work.site,
                        work.originalWork,
                        work.catchphrase,
                        work.summary,
                        work.points,
                        work.comment,

                        ...(work.tsType || []),
                        ...(work.genres || [])

                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();


                    if (
                        !searchableText.includes(
                            filters.searchWord
                        )
                    ) {

                        return false;

                    }

                }



                // --------------------------------
                // 作品種別
                // --------------------------------

                if (
                    filters.media &&
                    work.media !== filters.media
                ) {

                    return false;

                }



                // --------------------------------
                // TS形式
                // --------------------------------

                if (
                    filters.tsType &&
                    !(work.tsType || []).includes(
                        filters.tsType
                    )
                ) {

                    return false;

                }



                // --------------------------------
                // 作品区分
                // --------------------------------

                if (
                    filters.derivative &&
                    work.derivative !==
                    filters.derivative
                ) {

                    return false;

                }



                // --------------------------------
                // 完結状況
                // --------------------------------

                if (
                    filters.status &&
                    work.status !==
                    filters.status
                ) {

                    return false;

                }



                // --------------------------------
                // ジャンル
                // --------------------------------

                if (
                    filters.genre &&
                    !(work.genres || []).includes(
                        filters.genre
                    )
                ) {

                    return false;

                }



                return true;

            });


        displayWorks(filtered);

    }



    // ========================================
    // URLから検索条件を読み込む
    // ========================================

    function loadUrlFilters() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const search =
            params.get("search");

        const media =
            params.get("media");

        const tsType =
            params.get("tsType");

        const derivative =
            params.get("derivative");

        const status =
            params.get("status");

        const genre =
            params.get("genre");



        // キーワード

        if (search) {

            document.getElementById(
                "work-search"
            ).value = search;

        }



        // 作品種別

        if (media) {

            document.getElementById(
                "media-filter"
            ).value = media;

        }



        // TS形式

        if (tsType) {

            document.getElementById(
                "ts-filter"
            ).value = tsType;

        }



        // 作品区分

        if (derivative) {

            document.getElementById(
                "derivative-filter"
            ).value = derivative;

        }



        // 完結状況

        if (status) {

            document.getElementById(
                "status-filter"
            ).value = status;

        }



        // ジャンル

        if (genre) {

            document.getElementById(
                "genre-filter"
            ).value = genre;

        }



        // URLに検索条件があれば検索

        if (
            search ||
            media ||
            tsType ||
            derivative ||
            status ||
            genre
        ) {

            filterWorks();

        } else {

            displayWorks(works);

        }

    }



    // ========================================
    // 絞り込みボタン
    // ========================================

    document
        .getElementById("filter-button")
        .addEventListener(
            "click",
            function () {

                filterWorks();

            }
        );



    // ========================================
    // 検索ボタン
    // ========================================

    document
        .getElementById("search-button")
        .addEventListener(
            "click",
            function () {

                filterWorks();

            }
        );



    // ========================================
    // Enterキー
    // ========================================

    document
        .getElementById("work-search")
        .addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    filterWorks();

                }

            }
        );



    // ========================================
    // 初期表示
    // ========================================

    loadUrlFilters();

});
