Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cart: [],
            imgCart: imgItem,
            show: false,
            keyAmount: 0 // ключ для обновления суммарной стоимости товара в корзине
        }
    },

    methods: {
        addProduct(item) {
            this.$parent.getJson(`${urlAPI}/addToBasket.json`)
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
                        this.keyAmount += 1;
                    }
                });
        },

        remove(item) {
            this.$parent.getJson(`${urlAPI}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cart.splice(this.cart.indexOf(item), 1);
                        }
                        // уменьшаем стоимость корзины
                        this.cart.amount -= item.price;
                        this.keyAmount -= 1;
                    }
                })
        },
    },

    mounted() {
        this.$parent.getJson(`${urlAPI + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cart.push(item);
                };
                this.cart.amount = data.amount;
            })
    },

    template: `
        <div class="cart" v-show="show">
            <cart-item class="cart-item" v-for="item of cart" :cartItem="item" :img="imgCart" :key="item.id_product">       
            </cart-item>
            <p class="cart__price" v-if="cart.length" :key="keyAmount">Cумма к оплате: {{ cart.amount }}</p>
            <p class="cart-item__info" v-else>Корзина пуста</p>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],

    template: `
        <div>
            <img class="cart-item__img" :src="img" alt="photo product">
            <div>
                <h3 class="cart-item__heading">{{ cartItem.product_name }}</h3>
                <p class="cart-item__text">Цена: {{ cartItem.price }}</p>
                <p class="cart-item__quantity">Количество: {{ cartItem.quantity }}</p>
                <button class="cart-item__btn" type="button" @click="$parent.remove(cartItem)">Удалить</button>
            </div>
        </div>
    `
})