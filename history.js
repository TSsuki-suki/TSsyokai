// ========================================
// 閲覧履歴ページ
// ========================================


// 星評価
function createHistoryStars(value) {

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
// 履歴を表示
// ========================================

function renderHistory() {

    const container =
        document.getElementById(
            "history-container"
        );


    if (!container) {
        return;
    }


    // 保存された履歴を取得

    const history =
        JSON.parse(
            localStorage.getItem(
                "ts-work-history"
            ) || "[]"
        );


    container.innerHTML = "";



    // 履歴がない場合

    if (history.length === 0) {

        const message =
            document.createElement("p");

        message.textContent =
            "まだ閲覧履歴がありません。";

        container.appendChild(message);

        return;
    }



    // 履歴の順番に作品を取得

    history.forEach(function(id) {

        const work =
            works.find(
                work => work.id === id
            );


        // 作品が削除されていた場合
        if (!work) {
            return;
        }



        // カード

        const card =
            document.createElement("article");

        card.className =
            "work-card";



        // --------------------------------
        // 画像
        // --------------------------------

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



        // --------------------------------
        // 情報
        // --------------------------------

        const information =
            document.createElement("div");

        information.className =
            "work-information";



        // キャッチコピー

        const catchphrase =
            document.createElement("div");

        catchphrase.className =
            "work-catchphrase";

        catchphrase.textContent =
            work.catchphrase || "";



        // 作品名

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



        // TS主役度

        const tsMain =
            document.createElement("p");

        tsMain.className =
            "work-rating";

        tsMain.textContent =
            "TS主役度 " +
            createHistoryStars(
                work.tsMain
            );



        // おすすめ度

        const recommendation =
            document.createElement("p");

        recommendation.className =
            "work-rating";

        recommendation.textContent =
            "おすすめ度 " +
            createHistoryStars(
                work.recommendation
            );



        // --------------------------------
        // カード完成
        // --------------------------------

        information.appendChild(
            catchphrase
        );

        information.appendChild(
            title
        );

        information.appendChild(
            tsMain
        );

        information.appendChild(
            recommendation
        );


        card.appendChild(
            imageArea
        );

        card.appendChild(
            information
        );


        container.appendChild(
            card
        );

    });

}



// ========================================
// 履歴削除
// ========================================

function clearHistory() {

    localStorage.removeItem(
        "ts-work-history"
    );


    renderHistory();

}



// ========================================
// ページ読み込み
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderHistory();


        const button =
            document.getElementById(
                "clear-history-button"
            );


        if (button) {

            button.addEventListener(
                "click",
                clearHistory
            );

        }

    }
);
