// Add to cart functionality
document.getElementById('addToCartButton').addEventListener('click', function() {
    const productName = "หูฟัง Logitech G435 Lightspeed Gaming Wireless Headphone Black and Neon Yellow"; // Product name
    const productPrice = 1880; // Product price
    const productImage = "images/product3-3.jpg"; // Product image URL
    const quantity = parseInt(document.getElementById('quantity').value);

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.name === productName);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity; // Update quantity
    } else {
        cartItems.push({
            name: productName,
            price: productPrice,
            image: productImage, // Add image to cart item
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems)); // Save updated cart to localStorage
    updateCart(); // Call updateCart to refresh the cart display
});

// Function to update the cart display
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('cartTable');
    const totalPriceElement = document.getElementById('totalPrice');
    const taxElement = document.getElementById('tax');
    const grandTotalElement = document.getElementById('grandTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    // Clear the existing table rows
    cartTable.innerHTML = `
        <tr>
            <th>สินค้า</th>
            <th>จำนวน</th>
            <th>ราคารวม</th>
            <th>จัดการ</th>
        </tr>
    `;

    let total = 0;

    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block'; // Show empty cart message
        return; // Exit if the cart is empty
    } else {
        emptyCartMessage.style.display = 'none'; // Hide empty cart message
    }

    // Consolidate items in the cart
    const consolidatedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity; // Update quantity
        } else {
            acc.push(item); // Add new item
        }
        return acc;
    }, []);

    consolidatedItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${item.image}" alt="${item.name}"> <!-- Display product image -->
                    <div>
                        <p>${item.name}</p>
                        <small>ราคา: ${item.price.toFixed(2)} THB</small>
                    </div>
                </div>
            </td>
            <td>
                <input type="number" value="${item.quantity}" class="quantity" onchange="updateTotal()">
            </td>
            <td>THB${itemTotal.toFixed(2)}</td>
            <td><a href="#" onclick="removeItem(this)">Remove</a></td>
        `;
        cartTable.appendChild(row);
    });

    // Calculate tax and grand total
    const tax = total * 0.07; // 7% tax rate
    const grandTotal = total + tax;

    totalPriceElement.innerText = `THB${total.toFixed(2)}`;
    taxElement.innerText = `THB${tax.toFixed(2)}`;
    grandTotalElement.innerText = `THB${grandTotal.toFixed(2)}`;
}
