'use strict';

const urlAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const imgItem = 'img/photo-product.jpg';

const app = new Vue({
    el: '#app',

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        }
    },
})