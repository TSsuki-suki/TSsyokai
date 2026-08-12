// ========================================
// TS作品図鑑
// メインJavaScript
// ========================================


// ----------------------------------------
// 星評価を作る
// ----------------------------------------

function makeStars(rating) {

    const maxStars = 5;

    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(maxStars - rating);

    return fullStars + emptyStars;
}



// ----------------------------------------
// 作品カードを作る
// ----------------------------------------

function createWorkCard(work) {

    const card = document.createElement("article");

    card.className = "work-card";


    // 画像
    let imageHTML;

    if (work.image) {

        imageHTML = `
            <img
                src="${work.image}"
                alt="${work.title}"
            >
        `;

    } else {

        imageHTML = `
            <div class="no-image">
                NO IMAGE
            </div>
        `;

    }


    // カード本体
    card.innerHTML = `

        <div class="work-image">
            ${imageHTML}
        </div>


        <div class="work-info">

            <div class="work-catchphrase">
                ${work.catchphrase || ""}
            </div>


            <h3 class="work-title">
                ${work.title}
            </h3>


            <div class="work-rating">

                <div class="rating-item">
                    <span class="rating-label">
                        TS主役度
                    </span>

                    <span class="stars">
                        ${makeStars(work.tsMain)}
                    </span>
                </div>


                <div class="rating-item">
                    <span class="rating-label">
                        おすすめ度
                    </span>

                    <span class="stars">
                        ${makeStars(work.recommendation)}
                    </span>
                </div>

            </div>

        </div>

    `;


    // ----------------------------------------
    // カードをクリックしたとき
    // ----------------------------------------

    card.addEventListener("click", () => {

        if (work.url) {

            window.open(
                work.url,
                "_blank"
            );

        }

    });


    return card;
}



// ----------------------------------------
// 指定した場所に作品を表示
// ----------------------------------------

function displayWorks(worksList, containerId) {

    const container =
        document.getElementById(containerId);


    if (!container) {
        return;
    }


    // 一度中身を空にする

    container.innerHTML = "";


    // 作品が存在しない場合

    if (worksList.length === 0) {

        container.innerHTML = `
            <p class="no-results">
                該当する作品がありません。
            </p>
        `;

        return;
    }


    // 作品カードを生成

    worksList.forEach(work => {

        const card =
            createWorkCard(work);

        container.appendChild(card);

    });

}



// ----------------------------------------
// ページ読み込み時の処理
// ----------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // --------------------------------
        // 作品数
        // --------------------------------

        const workCount =
            document.getElementById("work-count");


        if (workCount) {

            workCount.textContent =
                works.length;

        }



        // --------------------------------
        // TS作品一覧
        // --------------------------------

        displayWorks(
            works,
            "works-container"
        );



        // --------------------------------
        // 新着作品
        // --------------------------------

        const newestWorks =
            [...works]
                .sort(
                    (a, b) =>
                        new Date(b.addedDate)
                        -
                        new Date(a.addedDate)
                );


        // 最新5作品

        const newest =
            newestWorks.slice(0, 5);



        // --------------------------------
        // 新着小説
        // --------------------------------

        displayWorks(
            newest.filter(
                work => work.media === "小説"
            ),
            "new-novel-container"
        );



        // --------------------------------
        // 新着漫画
        // --------------------------------

        displayWorks(
            newest.filter(
                work => work.media === "漫画"
            ),
            "new-manga-container"
        );



        // --------------------------------
        // 新着アニメ
        // --------------------------------

        displayWorks(
            newest.filter(
                work => work.media === "アニメ"
            ),
            "new-anime-container"
        );

    }
);
