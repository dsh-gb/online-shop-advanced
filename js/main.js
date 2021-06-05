'use strict';

const urlAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const btnBusket = document.getElementById('busket');

class Cart {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this._getCart()
            .then(data => {
                this.goods = [...data.contents];
                this.render();
            });
    }

    _getCart() {
        return fetch(`${urlAPI}/getBasket.json`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }

    render() {
        const block = document.querySelector('.basket');
        for (let product of this.goods) {
            const productObj = new CartItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

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
    constructor(product, img = 'img/photo-product.jpg') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-item__img" src="${this.img}" alt="photo product">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <p>Количество = ${this.quantity}</p>
                </div>`
    }

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
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    _getProducts() {
        return fetch(`${urlAPI}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error))
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
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
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

let listBasket = new Cart();
listBasket.render();

console.log(list.allPriceProducts());