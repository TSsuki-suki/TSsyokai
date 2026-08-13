// ========================================
// TS作品図鑑
// 作品紹介ページ
// ========================================


// ----------------------------------------
// 星評価
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
// URLから作品IDを取得
// ----------------------------------------

function getWorkId() {

    const params =
        new URLSearchParams(window.location.search);

    return Number(params.get("id"));

}



// ----------------------------------------
// TS形式を表示
// ----------------------------------------

function createTsTypes(tsTypes) {

    if (!tsTypes || tsTypes.length === 0) {

        return "<p>登録なし</p>";

    }


    return `
        <ul class="ts-type-list">

            ${tsTypes.map(type => `
                <li>${type}</li>
            `).join("")}

        </ul>
    `;

}



// ----------------------------------------
// ジャンルを表示
// ----------------------------------------

function createGenres(genres) {

    if (!genres || genres.length === 0) {

        return "<p>登録なし</p>";

    }


    return `
        <div class="genre-list">

            ${genres.map(genre => `
                <span class="genre-tag">
                    ${genre}
                </span>
            `).join("")}

        </div>
    `;

}



// ----------------------------------------
// 作品ページを表示
// ----------------------------------------

function renderWork(work) {

    const container =
        document.getElementById("work-detail");


    // ------------------------------------
    // 画像
    // ------------------------------------

    let imageHTML = "";


    if (work.image) {

        imageHTML = `
            <div class="work-detail-image">

                <img
                    src="${work.image}"
                    alt="${work.title}"
                >

            </div>
        `;

    } else {

        imageHTML = `
            <div class="work-detail-image no-image-large">
                NO IMAGE
            </div>
        `;

    }



    // ------------------------------------
    // 外部サイトへのリンク
    // ------------------------------------

    let readButton = "";


    if (work.url && work.url !== "#") {

        readButton = `
            <a
                href="${work.url}"
                class="work-read-button"
                target="_blank"
                rel="noopener noreferrer"
            >
                この作品を読む
            </a>
        `;

    }



    // ------------------------------------
    // ページタイトル
    // ------------------------------------

    document.title =
        `${work.title} | TS作品図鑑`;



    // ------------------------------------
    // HTML生成
    // ------------------------------------

    container.innerHTML = `

        <div class="work-detail">


            <!-- ==========================
                 キャッチコピー
            =========================== -->

            <p class="work-detail-catchphrase">
                ${work.catchphrase || ""}
            </p>



            <!-- ==========================
                 タイトル
            =========================== -->

            <h1 class="work-detail-title">
                ${work.title}
            </h1>



            <!-- ==========================
                 基本情報
            =========================== -->

            <div class="work-detail-basic">

                ${imageHTML}


                <div class="work-detail-info">

                    <p>
                        <strong>作者：</strong>
                        ${work.author || "不明"}
                    </p>


                    <p>
                        <strong>掲載サイト：</strong>
                        ${work.site || "不明"}
                    </p>


                    <p>
                        <strong>作品種別：</strong>
                        ${work.media || "不明"}
                    </p>


                    <p>
                        <strong>作品区分：</strong>
                        ${work.derivative || "不明"}
                    </p>


                    ${
                        work.originalWork
                        ?
                        `
                        <p>
                            <strong>原作：</strong>
                            ${work.originalWork}
                        </p>
                        `
                        :
                        ""
                    }


                    <p>
                        <strong>完結状況：</strong>
                        ${work.status || "不明"}
                    </p>


                    <p>
                        <strong>年齢区分：</strong>
                        ${work.ageRating || "不明"}
                    </p>

                </div>

            </div>



            <!-- ==========================
                 作品評価
            =========================== -->

            <section class="work-detail-block">

                <h2>
                    作品評価
                </h2>


                <div class="work-rating">

                    <div class="work-rating-item">

                        <span>
                            TS主役度
                        </span>

                        <strong class="stars">
                            ${createStars(work.tsMain)}
                        </strong>

                    </div>


                    <div class="work-rating-item">

                        <span>
                            おすすめ度
                        </span>

                        <strong class="stars">
                            ${createStars(work.recommendation)}
                        </strong>

                    </div>

                </div>

            </section>



            <!-- ==========================
                 TS情報
            =========================== -->

            <section class="work-detail-block">

                <h2>
                    TS情報
                </h2>


                <div class="work-ts-information">

                    <h3>
                        TS形式
                    </h3>

                    ${createTsTypes(work.tsType)}

                </div>

            </section>



            <!-- ==========================
                 ジャンル
            =========================== -->

            <section class="work-detail-block">

                <h2>
                    ジャンル
                </h2>


                ${createGenres(work.genres)}

            </section>



            <!-- ==========================
                 あらすじ
            =========================== -->

            <section class="work-detail-block">

                <h2>
                    あらすじ
                </h2>


                <p class="work-summary">
                    ${work.summary || "あらすじは登録されていません。"}
                </p>

            </section>



            <!-- ==========================
                 TS作品としての魅力
            =========================== -->

            <section class="work-detail-block">

                <h2>
                    この作品のここが凄い！
                </h2>


                <p class="work-points">
                    ${work.points || "紹介文は登録されていません。"}
                </p>

            </section>



            <!-- ==========================
                 管理者コメント
            =========================== -->

            <section class="work-detail-block">

                <h2>
                    管理者コメント
                </h2>


                <p class="work-comment">
                    ${work.comment || "コメントはありません。"}
                </p>

            </section>



            <!-- ==========================
                 作品を読む
            =========================== -->

            <div class="work-read-area">

                ${readButton}

            </div>



            <!-- ==========================
                 戻る
            =========================== -->

            <div class="work-back-area">

                <a
                    href="javascript:history.back()"
                    class="back-button"
                >
                    ← 前のページに戻る
                </a>

            </div>


        </div>

    `;

}



// ----------------------------------------
// ページ読み込み
// ----------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const workId = getWorkId();


        // --------------------------------
        // IDがない場合
        // --------------------------------

        if (!workId) {

            const container =
                document.getElementById(
                    "work-detail"
                );


            container.innerHTML = `

                <div class="work-error">

                    <h1>
                        作品が見つかりません
                    </h1>

                    <p>
                        作品IDが指定されていません。
                    </p>

                    <a href="index.html">
                        トップページへ戻る
                    </a>

                </div>

            `;

            return;

        }



        // --------------------------------
        // 該当作品を探す
        // --------------------------------

        const work =
            works.find(
                item => item.id === workId
            );



        // --------------------------------
        // 作品が存在しない場合
        // --------------------------------

        if (!work) {

            const container =
                document.getElementById(
                    "work-detail"
                );


            container.innerHTML = `

                <div class="work-error">

                    <h1>
                        作品が見つかりません
                    </h1>

                    <p>
                        指定された作品は登録されていません。
                    </p>

                    <a href="index.html">
                        トップページへ戻る
                    </a>

                </div>

            `;

            return;

        }



        // --------------------------------
        // 作品を表示
        // --------------------------------

        renderWork(work);

    }



    // ========================================
// 閲覧履歴を保存
// ========================================

function saveBrowsingHistory(workId) {

    let history = JSON.parse(
        localStorage.getItem("ts-work-history") || "[]"
    );


    // すでに履歴に存在する場合は一度削除
    history = history.filter(
        id => id !== workId
    );


    // 一番上に追加
    history.unshift(workId);


    // 最大10作品まで
    history = history.slice(0, 10);


    // 保存
    localStorage.setItem(
        "ts-work-history",
        JSON.stringify(history)
    );
}
);
