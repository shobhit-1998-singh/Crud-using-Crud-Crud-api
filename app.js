const apiUrl = 'https://crudcrud.com/api/9cf999f2e3a244f3967e09fe4806cec2/products';
let totalValue = 0;

// Add Product
async function addProduct() {
    const priceInput = document.getElementById('price');
    const nameInput = document.getElementById('name');
    const price = parseFloat(priceInput.value);
    const name = nameInput.value;

    if (!price || !name) return;

    const product = { price, name };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    priceInput.value = '';
    nameInput.value = '';
    getProducts();
}

// Get Products
async function getProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const productList = document.getElementById('product-list');
    const totalValueElement = document.getElementById('total-value');

    productList.innerHTML = '';
    totalValue = 0;

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Name: ${product.name}, Price: Rs ${product.price}`;
        totalValue += product.price;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteProduct(product._id);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => updateProduct(product._id, product.name, product.price);

        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        productList.appendChild(li);
    });

    totalValueElement.textContent = totalValue;
}
// Delete Product
async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    getProducts();
}

// Update Product
async function updateProduct(id, currentName, currentPrice) {
    const newName = prompt("Enter new name:", currentName);
    const newPrice = prompt("Enter new price:", currentPrice);

    if (newName === null || newName === '' || newPrice === null || newPrice === '') return;

    const updatedProduct = { name: newName, price: parseFloat(newPrice) };

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    });

    getProducts();
}

// Initialize
getProducts();
