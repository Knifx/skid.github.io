async function searchProducts() {
    const query = document.getElementById('query').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Идет поиск...';

    try {
        const response = await fetch(`https://api.example.com/search?query=${query}`); // Замените на ваш реальный API
        const products = await response.json();

        resultsDiv.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <p>Цена: ${product.price}</p>
                <img src="${product.image_url}" alt="${product.name}" style="max-width: 200px;">
            `;
            resultsDiv.appendChild(productDiv);
        });
    } catch (error) {
        resultsDiv.innerHTML = 'Ошибка при поиске товаров.';
        console.error(error);
    }
}
