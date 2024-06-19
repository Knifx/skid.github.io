async function searchProducts() {
    const query = document.getElementById('query').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Идет поиск...';

    try {
        const url = `https://skidkaonline.ru/apiv3/products/?limit=30&offset=0&shop_id=9&city_id=72&fields=id,name,name2,shops_ids,url,noted,discount_url,discount_name,date,notalladdr,image336,imagefull,brands,pricebefore,priceafter,discount_type,discount,externalurl,countPlus,countMinus,comments,desc,color,daystitle,liked,started_today,published_today&query=${query}`;
        console.log(`Запрос к API: ${url}`);
        const response = await axios.get(url);
        console.log('Ответ от API:', response.data);

        if (response.data.products) {
            const products = response.data.products;
            resultsDiv.innerHTML = '';
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>Цена: ${product.priceafter} руб.</p>
                    <img src="${product.image336.src}" alt="${product.name}" style="max-width: 200px;">
                `;
                resultsDiv.appendChild(productDiv);
            });
        } else {
            resultsDiv.innerHTML = 'Товары не найдены.';
        }
    } catch (error) {
        resultsDiv.innerHTML = 'Ошибка при поиске товаров.';
        console.error('Ошибка при запросе к API:', error);
    }
}
