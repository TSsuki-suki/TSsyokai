// ========================================
// TS作品図鑑
// 作品一覧ページ用JavaScript
// ========================================


// ========================================
// DOM
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        const container =
            document.getElementById("works-container");


        const resultCount =
            document.getElementById("result-count");


        const noResults =
            document.getElementById("no-results");


        if (
            !container ||
            typeof works === "undefined"
        ) {
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


            return (
                "★".repeat(rating) +
                "☆".repeat(5 - rating)
            );

        }



        // ========================================
        // 作品カード
        // ========================================

        function createWorkCard(work) {

            const card =
                document.createElement("article");


            card.className =
                "work-card";


            card.addEventListener(
                "click",
                function() {

                    window.location.href =
                        "work.html?id=" +
                        encodeURIComponent(work.id);

                }
            );



            // --------------------------------
            // 画像
            // --------------------------------

            const imageArea =
                document.createElement("div");


            imageArea.className =
                "work-card-image";


            if (work.image) {

                const image =
                    document.createElement("img");


                image.src =
                    work.image;


                image.alt =
                    work.title + "の画像";


                imageArea.appendChild(image);

            } else {

                imageArea.textContent =
                    "NO IMAGE";

            }



            // --------------------------------
            // 本文
            // --------------------------------

            const body =
                document.createElement("div");


            body.className =
                "work-card-body";



            // --------------------------------
            // キャッチコピー
            // --------------------------------

            const catchphrase =
                document.createElement("p");


            catchphrase.className =
                "work-card-catchphrase";


            catchphrase.textContent =
                work.catchphrase || "";



            // --------------------------------
            // タイトル
            // --------------------------------

            const title =
                document.createElement("h3");


            title.className =
                "work-card-title";


            title.textContent =
                work.title;



            // --------------------------------
            // 作者
            // --------------------------------

            const author =
                document.createElement("p");


            author.className =
                "work-card-author";


            author.textContent =
                "作者：" +
                (work.author || "不明");



            // --------------------------------
            // 評価
            // --------------------------------

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



            // --------------------------------
            // カードに追加
            // --------------------------------

            body.appendChild(catchphrase);
            body.appendChild(title);
            body.appendChild(author);
            body.appendChild(ratings);


            card.appendChild(imageArea);
            card.appendChild(body);


            return card;

        }



        // ========================================
        // 作品一覧を表示
        // ========================================

        function displayWorks(list) {

            container.innerHTML = "";


            if (
                !list ||
                list.length === 0
            ) {

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


            list.forEach(
                function(work) {

                    container.appendChild(
                        createWorkCard(work)
                    );

                }
            );

        }



        // ========================================
        // URLから検索条件を取得
        // ========================================

        function getSearchParams() {

            const params =
                new URLSearchParams(
                    window.location.search
                );


            return {

                keyword:
                    params.get("q") || "",

                media:
                    params.get("media") || "",

                tsType:
                    params.get("tsType") || "",

                derivative:
                    params.get("derivative") || "",

                status:
                    params.get("status") || "",

                genre:
                    params.get("genre") || ""

            };

        }



        // ========================================
        // 検索条件をフォームに反映
        // ========================================

        function applySearchParams(params) {


            const searchInput =
                document.getElementById("work-search");


            if (searchInput) {

                searchInput.value =
                    params.keyword;

            }


            document.getElementById(
                "media-filter"
            ).value =
                params.media;


            document.getElementById(
                "ts-filter"
            ).value =
                params.tsType;


            document.getElementById(
                "derivative-filter"
            ).value =
                params.derivative;


            document.getElementById(
                "status-filter"
            ).value =
                params.status;


            document.getElementById(
                "genre-filter"
            ).value =
                params.genre;

        }



        // ========================================
        // 作品を検索
        // ========================================

        function filterWorks() {


            const params =
                getSearchParams();


            const searchWord =
                params.keyword
                    .trim()
                    .toLowerCase();



            const filtered =
                works.filter(
                    function(work) {


                        // --------------------------------
                        // キーワード検索
                        // --------------------------------

                        if (searchWord) {

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
                                    searchWord
                                )
                            ) {

                                return false;

                            }

                        }



                        // --------------------------------
                        // 作品種別
                        // --------------------------------

                        if (
                            params.media &&
                            work.media !== params.media
                        ) {

                            return false;

                        }



                        // --------------------------------
                        // TS形式
                        // --------------------------------

                        if (
                            params.tsType &&
                            !(work.tsType || [])
                                .includes(params.tsType)
                        ) {

                            return false;

                        }



                        // --------------------------------
                        // 作品区分
                        // --------------------------------

                        if (
                            params.derivative &&
                            work.derivative !==
                                params.derivative
                        ) {

                            return false;

                        }



                        // --------------------------------
                        // 完結状況
                        // --------------------------------

                        if (
                            params.status &&
                            work.status !== params.status
                        ) {

                            return false;

                        }



                        // --------------------------------
                        // ジャンル
                        // --------------------------------

                        if (
                            params.genre &&
                            !(work.genres || [])
                                .includes(params.genre)
                        ) {

                            return false;

                        }



                        return true;

                    }
                );



            displayWorks(filtered);

        }



        // ========================================
        // 絞り込みボタン
        // ========================================

        const filterButton =
            document.getElementById(
                "filter-button"
            );


        if (filterButton) {

            filterButton.addEventListener(
                "click",
                function() {


                    const params =
                        new URLSearchParams();


                    const searchInput =
                        document.getElementById(
                            "work-search"
                        );


                    const keyword =
                        searchInput
                            ? searchInput.value.trim()
                            : "";


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



                    if (keyword) {
                        params.set("q", keyword);
                    }

                    if (media) {
                        params.set("media", media);
                    }

                    if (tsType) {
                        params.set("tsType", tsType);
                    }

                    if (derivative) {
                        params.set(
                            "derivative",
                            derivative
                        );
                    }

                    if (status) {
                        params.set(
                            "status",
                            status
                        );
                    }

                    if (genre) {
                        params.set(
                            "genre",
                            genre
                        );
                    }



                    // URLを書き換えて検索

                    const newUrl =
                        "works.html?" +
                        params.toString();


                    window.history.pushState(
                        {},
                        "",
                        newUrl
                    );


                    filterWorks();


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }



        // ========================================
        // ヘッダー検索
        // ========================================

        const searchButton =
            document.getElementById(
                "search-button"
            );


        const searchInput =
            document.getElementById(
                "work-search"
            );


        function executeKeywordSearch() {


            const keyword =
                searchInput.value.trim();


            const params =
                new URLSearchParams();


            if (keyword) {

                params.set(
                    "q",
                    keyword
                );

            }


            window.location.href =
                "works.html?" +
                params.toString();

        }



        if (searchButton) {

            searchButton.addEventListener(
                "click",
                executeKeywordSearch
            );

        }



        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        executeKeywordSearch();

                    }

                }
            );

        }



        // ========================================
        // 初期表示
        // ========================================

        const searchParams =
            getSearchParams();


        applySearchParams(
            searchParams
        );


        filterWorks();

    }
);
