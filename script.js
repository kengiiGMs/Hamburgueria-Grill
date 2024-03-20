const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const closeModalBtn = document.getElementById("close-modal-btn")

/* Modal */
cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex"
})

cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})
/* Modal */