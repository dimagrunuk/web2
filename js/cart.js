document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const clearButton = document.getElementById("clear-cart");

    let cart = localStorage.getItem("cart");
    if (cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Кошик порожній 😢</p>";
        totalPriceEl.textContent = "Загальна сума: 0 грн";
        return;
    }

    fetch("data/movies.json")
        .then(response => response.json())
        .then(allMovies => {
            let total = 0;

            cart.forEach(item => {
                let movie = allMovies.find(m => m.id === item.id);
                if (movie) {
                    const div = document.createElement("div");
                    div.classList.add("movie-card");

                    const movieTotal = item.quantity * movie.price;
                    total += movieTotal;

                    div.innerHTML = `
                        <div class="cart-item">
                            <img src="${movie.image}" alt="${movie.title}">
                            <div class="cart-info">
                                <h3>${movie.title}</h3>
                                <p>Ціна: ${movie.price} грн</p>
                                <div>
                                    <button class="decrease" data-id="${item.id}">➖</button>
                                    <span style="margin: 0 10px;">${item.quantity}</span>
                                    <button class="increase" data-id="${item.id}">➕</button>
                                </div>
                                <p>Місця: ${item.seats.join(", ")}</p>
                                <p>Сума: ${movieTotal} грн</p>
                                <button class="remove" data-id="${item.id}">Видалити</button>
                            </div>
                        </div>
                    `;
                    cartContainer.appendChild(div);
                }
            });

            totalPriceEl.textContent = "Загальна сума: " + total + " грн";

            // Зміна кількості ➕
            document.querySelectorAll(".increase").forEach(btn => {
                btn.addEventListener("click", function () {
                    let id = parseInt(this.getAttribute("data-id"));
                    cart = cart.map(item => {
                        if (item.id === id) item.quantity += 1;
                        return item;
                    });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    location.reload();
                });
            });

            // Зменшення кількості ➖
            document.querySelectorAll(".decrease").forEach(btn => {
                btn.addEventListener("click", function () {
                    let id = parseInt(this.getAttribute("data-id"));
                    cart = cart.map(item => {
                        if (item.id === id && item.quantity > 1) {
                            item.quantity -= 1;
                        }
                        return item;
                    });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    location.reload();
                });
            });

            // Видалити з кошика
            document.querySelectorAll(".remove").forEach(btn => {
                btn.addEventListener("click", function () {
                    let id = parseInt(this.getAttribute("data-id"));
                    cart = cart.filter(item => item.id !== id);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    location.reload();
                });
            });
        });

    // Очистити весь кошик
    clearButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        location.reload();
    });
});