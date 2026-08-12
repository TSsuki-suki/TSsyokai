document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("works-container");

    // 作品データが存在しない場合
    if (!container || typeof works === "undefined") {
        return;
    }

    // 作品カードを生成
    works.forEach(function (work) {

        const card = document.createElement("article");
        card.className = "work-card";

        // ★評価を作る
        function createStars(value) {
            const fullStars = Math.round(value / 2);
            let stars = "";

            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    stars += "★";
                } else {
                    stars += "☆";
                }
            }

            return stars;
        }

        card.innerHTML = `
            <a href="work.html?id=${work.id}" class="work-card-link">

                <div class="work-card-image">
                    ${
                        work.image
                        ? `<img src="${work.image}" alt="${work.title}">`
                        : `<div class="no-image">No Image</div>`
                    }
                </div>

                <div class="work-card-content">

                    <div class="work-catchphrase">
                        ${work.catchphrase || ""}
                    </div>

                    <h3 class="work-card-title">
                        ${work.title}
                    </h3>

                    <div class="work-card-info">
                        <span>${work.media}</span>
                        <span>${work.derivative}</span>
                        <span>${work.status}</span>
                    </div>

                    <div class="work-card-rating">

                        <div>
                            <span class="rating-label">TS主役度</span>
                            <span class="stars">
                                ${createStars(work.tsMain)}
                            </span>
                        </div>

                        <div>
                            <span class="rating-label">おすすめ度</span>
                            <span class="stars">
                                ${createStars(work.recommendation)}
                            </span>
                        </div>

                    </div>

                </div>

            </a>
        `;

        container.appendChild(card);
    });

});
