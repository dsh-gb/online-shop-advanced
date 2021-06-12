'use strict';

const urlAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const imgItem = 'img/photo-product.jpg';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cart: [],
        filterList: [],
        imgCatalog: imgItem,
        userSearch: '',
        show: false
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(item) {
            this.getJson(`${urlAPI}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cart.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);
                            this.cart.push(prod);
                        };
                        // увеличиваем стоимость корзины
                        this.cart.amount += item.price;
                    }
                });
        },

        remove(item) {
            this.getJson(`${urlAPI}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cart.splice(this.cart.indexOf(item), 1);
                        }
                        // уменьшаем стоимость корзины
                        this.cart.amount -= item.price;
                    }
                })
        },

        searchFilter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filterList = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    mounted() {
        this.getJson(`${urlAPI + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filterList.push(el);
                }
            });

        this.getJson(`${urlAPI + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cart.push(item);
                };
                this.$data.cart.amount = data.amount;
            });
    }
})