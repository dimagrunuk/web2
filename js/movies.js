document.addEventListener("DOMContentLoaded", function () {
    const moviesContainer = document.getElementById("movies-container");
    const searchInput = document.getElementById("search-input");

    fetch("./data/movies.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("HTTP error " + res.status);
            }
            return res.json();
        })
        .then(movies => {
            function renderMovies(filteredMovies) {
                moviesContainer.innerHTML = "";

                filteredMovies.forEach(movie => {
                    const card = document.createElement("div");
                    card.classList.add("movie-card");

                    card.innerHTML = `
                        <img src="${movie.image}" alt="${movie.title}" class="movie-image">
                        <h3>${movie.title}</h3>
                        <p>Жанр: ${movie.genre}</p>
                        <p>Рейтинг: ${movie.rating}</p>
                        <p>Ціна: ${movie.price} грн</p>
                        <button class="btn" data-id="${movie.id}">Обрати сеанс</button>
                    `;

                    moviesContainer.appendChild(card);
                });

                document.querySelectorAll(".btn").forEach(button => {
                    button.addEventListener("click", function () {
                        const movieId = this.getAttribute("data-id");
                        window.location.href = `booking.html?id=${movieId}`;
                    });
                });
            }

            renderMovies(movies);

            searchInput.addEventListener("input", () => {
                const value = searchInput.value.toLowerCase();
                const filtered = movies.filter(m =>
                    m.title.toLowerCase().includes(value) || m.genre.toLowerCase().includes(value)
                );
                renderMovies(filtered);
            });
        })
        .catch(err => {
            console.error("Помилка завантаження фільмів:", err);
            moviesContainer.innerHTML = "<p style='text-align: center;'>Помилка завантаження фільмів 😢</p>";
        });
});