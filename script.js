
function addToCart(item) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex > -1) {
        
        cart[existingItemIndex].quantity += 1;
    } else {

        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}


document.querySelectorAll('.cart a').forEach(button => {
    button.addEventListener('click', function(e) {
        alert("Item added to cart")
        e.preventDefault(); 
        
    
        const productCart = this.closest('.product-cart');
        const itemName = productCart.querySelector('h4').innerText;
        const itemPrice = 78; 
        
        
        const item = {
            name: itemName,
            price: itemPrice
        };
        
        
        addToCart(item);
    });
});

function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElem = document.querySelector('#total-price');

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        
        const itemElem = document.createElement('div');
        itemElem.classList.add('cart-item');
        itemElem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-item">Remove</button>
        `;
        cartContainer.appendChild(itemElem);
    });

    
    totalPriceElem.innerText = totalPrice.toFixed(2);

    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.parentElement.querySelector('h4').innerText;
            removeItemFromCart(itemName);
            renderCart();
        });
    });
}

function removeItemFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
}

renderCart();
