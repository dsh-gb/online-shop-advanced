'use strict';

const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 }
];

const renderProduct = (item) => {
    return `<div class="product-item">
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <button class="btn-cart" type="button">Купить</button>
    </div>`;
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    productsList.forEach(elem => document.querySelector('.products').insertAdjacentHTML('beforeend', elem));
};

renderPage(products);