document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const div = document.createElement('div');
                div.className = 'product';
                div.innerHTML = `
                    <h2>${product.title}</h2>
                    <img src="${product.image}" alt="${product.title}" width="100%">
                    <p>Price: ৳${product.price}</p>
                    <p>${product.description}</p>
                    <p>Size: ${product.size.join(', ')}</p>
                    <p>Category: ${product.category}</p>
                    <p>Stock: ${product.stock}</p>
                    <button onclick="buyNow('${product.title}')">Buy</button>
                `;
                productList.appendChild(div);
            });
        });
});

function buyNow(productTitle) {
    const orderId = 'TODO' + Math.floor(Math.random() * 1000000);
    const message = `Order ID: ${orderId}%0AProduct: ${productTitle}`;
    const contactOptions = `
        <p>Send your order ID using:</p>
        <ul>
            <li><a href="https://t.me/share/url?url=${message}" target="_blank">Telegram</a></li>
            <li><a href="https://m.me/?message=${message}" target="_blank">Messenger</a></li>
            <li><a href="https://wa.me/?text=${message}" target="_blank">WhatsApp</a></li>
        </ul>
    `;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(contactOptions);
}
