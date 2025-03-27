document.addEventListener("DOMContentLoaded", function () {
    const movieId = new URLSearchParams(window.location.search).get('id');
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieGenre = document.getElementById("movie-genre");
    const movieRating = document.getElementById("movie-rating");
    const moviePrice = document.getElementById("movie-price");
    const sessionSelect = document.getElementById("session-select");
    const seatsContainer = document.getElementById("seats-container");
    const addToCartBtn = document.getElementById("add-to-cart");

    // Дані для фільмів
    const movies = [
        {
            id: "1",
            title: "Інтерстеллар",
            genre: "Фантастика",
            rating: 8.6,
            price: 150,
            image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
            sessions: ["14:30", "16:40", "18:50"]
        },
        {
            id: "2",
            title: "Джон Вік",
            genre: "Бойовик",
            rating: 7.9,
            price: 130,
            image: "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg",
            sessions: ["14:30", "16:40", "18:50"]
        },
        {
            id: "3",
            title: "Великий Гетсбі",
            genre: "Драма",
            rating: 7.2,
            price: 120,
            image: "https://uakino.me/uploads/posts/2022-05/1652523146_130906145250124631_f0_0.jpg",
            sessions: ["14:30", "16:40", "18:50"]
        }
    ];

    const movie = movies.find(movie => movie.id === movieId);
    if (movie) {
        moviePoster.src = movie.image;
        movieTitle.textContent = movie.title;
        movieGenre.textContent = movie.genre;
        movieRating.textContent = movie.rating;
        moviePrice.textContent = `${movie.price} грн`;

        // Додаємо сеанси до випадаючого списку
        movie.sessions.forEach(session => {
            const option = document.createElement("option");
            option.value = session;
            option.textContent = session;
            sessionSelect.appendChild(option);
        });

        // Генерація місць на екрані
        const seats = Array.from({ length: 25 }, (_, i) => i + 1);
        seats.forEach(seat => {
            const seatButton = document.createElement("button");
            seatButton.classList.add("seat");
            seatButton.textContent = seat;
            seatButton.dataset.seat = seat;
            seatsContainer.appendChild(seatButton);

            seatButton.addEventListener("click", () => {
                seatButton.classList.toggle("selected");
            });
        });

        // Логіка додавання в кошик
        addToCartBtn.addEventListener("click", () => {
            const selectedSeats = Array.from(document.querySelectorAll(".seat.selected")).map(seat => seat.textContent);
            if (selectedSeats.length > 0) {
                const selectedMovie = {
                    title: movie.title,
                    price: movie.price,
                    seats: selectedSeats,
                    session: sessionSelect.value,
                    quantity: selectedSeats.length,
                    image: movie.image,
                    id: movie.id
                };
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingMovieIndex = cart.findIndex(item => item.id === selectedMovie.id);
                if (existingMovieIndex >= 0) {
                    cart[existingMovieIndex].quantity += selectedMovie.quantity;
                } else {
                    cart.push(selectedMovie);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`Фільм ${movie.title} - ${selectedSeats.length} квитків додано до кошика.`);
            } else {
                alert("Оберіть місця!");
            }
        });
    }
});