const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=a047e5786421470e5226ee225453e02c";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
const MOVIE_SEARCH_API = 'https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=256763031e7e01020ee31ba04d1d8e26&query="';

const content = document.getElementById("content");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const pagination = document.querySelector(".pagination");

const ITEMS_PER_PAGE = 10;

let query = "";
let page = 1;

fetchMovies(MOVIE_API_URL, 1);

async function fetchMovies(url, page) {
    const response = await fetch(url + `&page=${page}`);
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    content.innerHTML = "";

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const starCount = Math.floor(Math.random() * 5) + 1;

        const movieElement = document.createElement("div");
        movieElement.classList.add("film");

        movieElement.innerHTML = `
            <img src="${IMAGE_BASE_URL + poster_path}" alt="${title} 포스터">
            <div class="film-info">
                <h3>${title}</h3>
                <span class="rating" aria-label="${starCount} 중 ${starCount}개의 별점">${'⭐'.repeat(starCount)}</span>
            </div>
            <div class="details">
                <h3>미리보기</h3>
                ${overview}
            </div>
        `;
        movieElement.addEventListener("click", () => {
            const confirmBooking = confirm("예약하시겠습니까?");
            if (confirmBooking) {
                alert("예약이 완료되었습니다!");
            }
        });
        content.appendChild(movieElement);
    });
    createPagination();
}

function createPagination() {
    pagination.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.addEventListener("click", () => {
            page = i;
            if (query !== "") {
                fetchMovies(MOVIE_SEARCH_API + query, page);
            } else {
                fetchMovies(MOVIE_API_URL, page);
            }
        });
        pagination.appendChild(pageButton);
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    query = searchInput.value.trim();


    if (query === "") {
        alert("제목을 입력해주세요!");
        searchInput.focus();
        return;
    }


    fetchMovies(MOVIE_SEARCH_API + query, page);
    searchInput.value = "";
});
