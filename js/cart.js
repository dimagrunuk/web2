document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const clearButton = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Кошик порожній 😢</p>";
        totalPriceEl.textContent = "Загальна сума: 0 грн";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        const movieTotal = item.quantity * item.price;
        total += movieTotal;

        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-info">
                <h3>${item.title}</h3>
                <p>Ціна: ${item.price} грн</p>
                <div>
                    <button class="decrease" data-id="${item.id}" data-session="${item.session}">➖</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}" data-session="${item.session}">➕</button>
                </div>
                <p>Сума: ${movieTotal} грн</p>
                <button class="remove" data-id="${item.id}" data-session="${item.session}">Видалити</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    totalPriceEl.textContent = `Загальна сума: ${total} грн`;

    // Збільшення кількості квитків
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const session = this.getAttribute("data-session");
            cart = cart.map(item => {
                if (item.id == id && item.session == session) item.quantity++;
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });

    // Зменшення кількості квитків
    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const session = this.getAttribute("data-session");
            cart = cart.map(item => {
                if (item.id == id && item.session == session && item.quantity > 1) item.quantity--;
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });

    // Видалення товару з кошика
    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const session = this.getAttribute("data-session");
            cart = cart.filter(item => !(item.id == id && item.session == session));
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });

    // Очистити кошик
    clearButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        location.reload();
    });
});