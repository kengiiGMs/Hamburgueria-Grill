const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

const menu = document.getElementById("menu");
let cart = []; //Array para armazenar os itens

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCounter = document.getElementById("cart-count");

const checkoutBtn = document.getElementById("checkout-btn");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn")

const spanItem = document.getElementById("date-span")

/* Modal */
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
})

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
})

/* Coletando informações dos itens */
menu.addEventListener("click", function (event) {

    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addItem(name, price);
    }
})

/* Função para adicionar ao carrinho */
function addItem(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        /* Se o Item já existir, aumenta apenas a quantidade + 1 */
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        })
    }

    updateCartModal();
}

/* Atualiza o carrinho */
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">${item.price.toFixed(2)}</p>
                </div>

                <div>
                    <button class="remove-from-cart-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>
            </div>
        `

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

/* Remover itens do Carrinho */
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");

        removeitemCart(name);
    }
})

function removeitemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();

    }
}

/* Validando o Input de Endereço */
addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

/* Ações para finalizar o pedido */
checkoutBtn.addEventListener("click", function () {

    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
        Toastify({
            text: "Ops... o Restaurante está Fechado!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();

        return;
    }

    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500")
        return;
    }

    //Enviar o pedido para api whats
    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$: ${item.price.toFixed(2)} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems);

    //Adicionar o número de celular
    const phone = "";

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    addressInput.value = "";
    updateCartModal();
})

/* Validando o Horário do Restaurante */
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
    //se retornar true o restaurante está aberto
}

const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}