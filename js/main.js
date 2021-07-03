'use strict';

class Cart {

    // добавить товар в корзину
    addCart() {

    }

    // очистить всю корзину
    cleanCart() {

    }

    // оплатить корзину
    buyCart() {

    }

};

class CartItem {

    // количество товара
    quantityItem() {

    }

    // удалить товар из корзины
    removeItem() {

    }

    // добавить товар в избранное
    addToFavorite() {

    }

};

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 }
        ];
    }

    render() {
        const block = document.querySelector('.products');
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    allPriceProducts() {
        let sum = 0;
        for (let i = 0; i < this.goods.length; i++) {
            sum += this.goods[i].price;
        };
        return sum;
    }
};

class ProductItem {
    constructor(product, img = 'img/photo-product.jpg') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-item__img" src="${this.img}" alt="photo product">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="btn-cart" type="button">Купить</button>
                </div>`
    }
};

let list = new ProductsList();
list.render();
console.log(list.allPriceProducts());