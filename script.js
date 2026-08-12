// ========================================
// TS作品図鑑 メインスクリプト
// ========================================


// ----------------------------------------
// 星評価を作る
// 10点満点 → ★5段階
// ----------------------------------------
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


// ----------------------------------------
// 作品カードを作る
// ----------------------------------------
function createWorkCard(work) {

    const card = document.createElement("article");

    card.className = "work-card";


    // 作品ページへのリンク
    const link = document.createElement("a");

    link.href = `work.html?id=${work.id}`;
    link.className = "work-card-link";


    // ------------------------------------
    // 画像
    // ------------------------------------
    const imageArea = document.createElement("div");

    imageArea.className = "work-card-image";


    if (work.image) {

        const img = document.createElement("img");

        img.src = work.image;
        img.alt = work.title;

        imageArea.appendChild(img);

    } else {

        imageArea.innerHTML = `
            <div class="no-image">
                NO IMAGE
            </div>
        `;

    }


    // ------------------------------------
    // 作品情報
    // ------------------------------------
    const info = document.createElement("div");

    info.className = "work-card-info";


    // 一言キャッチコピー
    const catchphrase = document.createElement("div");

    catchphrase.className = "work-card-catchphrase";

    catchphrase.textContent =
        work.catchphrase || "おすすめのTS作品";


    // 作品名
    const title = document.createElement("h3");

    title.className = "work-card-title";

    title.textContent = work.title;


    // 作者
    const author = document.createElement("p");

    author.className = "work-card-author";

    author.textContent =
        `作者：${work.author}`;


    // ------------------------------------
    // 評価
    // ------------------------------------
    const evaluation = document.createElement("div");

    evaluation.className = "work-card-evaluation";


    const tsRating = document.createElement("div");

    tsRating.className = "rating";

    tsRating.innerHTML = `
        <span class="rating-label">TS主役度</span>
        <span class="stars">${createStars(work.tsMain)}</span>
    `;


    const recommendation = document.createElement("div");

    recommendation.className = "rating";

    recommendation.innerHTML = `
        <span class="rating-label">おすすめ度</span>
        <span class="stars">${createStars(work.recommendation)}</span>
    `;


    evaluation.appendChild(tsRating);
    evaluation.appendChild(recommendation);


    // ------------------------------------
    // 組み立て
    // ------------------------------------
    info.appendChild(catchphrase);
    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(evaluation);


    link.appendChild(imageArea);
    link.appendChild(info);

    card.appendChild(link);


    return card;
}


// ----------------------------------------
// 作品を表示する
// ----------------------------------------
function renderWorks(containerId, worksToShow) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }


    // 一度中身を空にする
    container.innerHTML = "";


    // 作品がない場合
    if (worksToShow.length === 0) {

        container.innerHTML = `
            <p class="no-works">
                該当する作品はありません。
            </p>
        `;

        return;
    }


    // カードを生成
    worksToShow.forEach(work => {

        const card = createWorkCard(work);

        container.appendChild(card);

    });

}


// ----------------------------------------
// ページ読み込み時の処理
// ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {


    // ====================================
    // 新着TS小説
    // ====================================

    const novels =
        works.filter(work => work.media === "小説");

    renderWorks(
        "new-novel-container",
        novels.slice(0, 5)
    );


    // ====================================
    // 新着TS漫画
    // ====================================

    const manga =
        works.filter(work => work.media === "漫画");

    renderWorks(
        "new-manga-container",
        manga.slice(0, 5)
    );


    // ====================================
    // 新着TSアニメ
    // ====================================

    const anime =
        works.filter(work => work.media === "アニメ");

    renderWorks(
        "new-anime-container",
        anime.slice(0, 5)
    );


    // ====================================
    // TS作品一覧
    // ====================================

    renderWorks(
        "works-container",
        works.slice(0, 5)
    );


    // ====================================
    // 検索・絞り込み
    // ====================================

    const filterButton =
        document.getElementById("filter-button");


    if (filterButton) {

        filterButton.addEventListener("click", () => {


            const media =
                document.getElementById("media-filter").value;

            const ts =
                document.getElementById("ts-filter").value;

            const derivative =
                document.getElementById("derivative-filter").value;

            const status =
                document.getElementById("status-filter").value;

            const genre =
                document.getElementById("genre-filter").value;


            // --------------------------------
            // 条件に合う作品を検索
            // --------------------------------

            const filteredWorks =
                works.filter(work => {


                    // 作品種別
                    if (
                        media &&
                        work.media !== media
                    ) {
                        return false;
                    }


                    // TS形式
                    if (
                        ts &&
                        !work.tsType.includes(ts)
                    ) {
                        return false;
                    }


                    // オリジナル・二次創作
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
                    if (
                        genre &&
                        !work.genres.includes(genre)
                    ) {
                        return false;
                    }


                    return true;

                });


            // --------------------------------
            // 検索結果を表示
            // --------------------------------

            renderWorks(
                "works-container",
                filteredWorks
            );


            // --------------------------------
            // 検索結果までスクロール
            // --------------------------------

            document
                .getElementById("works")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    }

});
