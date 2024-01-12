console.log("Jai Shree Ram")
const API_KEY = "7a45b7bbdd1d43bdb2f3167816639931";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => { fetchNews("India") });

function reload() {
    window.location.reload();
    console.log("Reload happen......")
}

async function fetchNews(category) {
    try {
        const res = await fetch(`${url}${category}&apiKey=${API_KEY}`);
        const data = await res.json();

        if (!data || !data.articles) {
            console.error('Error: Data or articles not found in the API response.');
            return;
        }

        console.log(data);
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}


function clearCard() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector(".card-header img");
    const newsTitle = cardClone.querySelector(".card-content #news-title");
    const newsSource = cardClone.querySelector(".card-content .news-source");
    const newsDesc = cardClone.querySelector(".card-content .news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/Kolkata"
    });
    newsSource.innerHTML = `${article.source.name} | ${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}



let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}

const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})