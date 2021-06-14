Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filterList: [],
            imgCatalog: imgItem
        }
    },

    mounted() {
        this.$parent.getJson(`${urlAPI + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filterList.push(el);
                }
            })
    },

    template: `
        <div class="products">
            <product class="product-item" v-for="item of filterList" :product="item" :img="imgCatalog" :key="item.id_product">
            </product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],

    template: `
        <div class="product-item">
            <img class="product-item__img" :src="img" alt="photo product">
            <h3 class="product-item__heading">{{ product.product_name }}</h3>
            <p class="product-item__text">{{ product.price }}</p>
            <button class="product-item__btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
        </div>
    `
});