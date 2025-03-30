document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const clearButton = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Якщо кошик порожній
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
                <p>Сеанс: ${item.session}</p>
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

    // Підтвердження покупки
    // Додавання обробника для кнопки підтвердження покупки
    const confirmBtn = document.getElementById("confirm-order");

    if (confirmBtn) {
        confirmBtn.addEventListener("click", function () {
            // Отримуємо контактні дані
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("email").value;

            // Перевіряємо, чи заповнені всі поля
            if (!name || !phone || !email) {
                alert("Будь ласка, заповніть всі поля контактної інформації!");
                return; // Якщо поля не заповнені, припиняємо виконання
            }

            // Перевіряємо, чи є товари в кошику
            const cart = JSON.parse(localStorage.getItem("cart"));
            if (cart && cart.length > 0) {
                alert("Дякуємо за покупку! 🎉");
                localStorage.removeItem("cart"); // Очищуємо кошик
                location.reload(); // Перезавантажуємо сторінку для очищення кошика
            } else {
                alert("Ваш кошик порожній. Будь ласка, оберіть фільми та місця.");
            }
        });
    }
});