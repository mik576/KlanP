document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const newsPerPage = 3;
    let newsData = [];

    function renderNews() {
        const start = (currentPage - 1) * newsPerPage;
        const end = start + newsPerPage;
        const newsList = document.getElementById("news-list");

        if (!newsList) return;

        newsList.innerHTML = "";
        newsData.slice(start, end).forEach(news => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `
                <img src="${news.image}" alt="${news.title}">
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p>${news.description}</p>
                    <a href="chitiet.html?id=${news.id}" class="read-more">Đọc tiếp</a>
                </div>
            `;
            newsList.appendChild(newsItem);
        });

        document.getElementById("page-number").innerText = currentPage;
    }

    function fetchNews() {
        fetch("js/news.js")
            .then(response => response.json())
            .then(data => {
                newsData = data;
                renderNews();
            })
            .catch(error => console.error("Lỗi tải dữ liệu:", error));
    }

    document.getElementById("prev-page").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderNews();
        }
    });

    document.getElementById("next-page").addEventListener("click", () => {
        if (currentPage < Math.ceil(newsData.length / newsPerPage)) {
            currentPage++;
            renderNews();
        }
    });

    fetchNews();
});

