<template>
  <!-- Women Banner Section Begin -->
  <section class="women-banner spad">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-5" v-if="products.length > 0">
          <carousel class="product-slider" :nav="false" :items="4" :dots="false" :autoplay="false">
            <div v-for="product in products" v-bind:key="product.id" class="product-item mb-2">
              <div class="pi-pic">
                <img v-if="product.galleries.length > 0" v-bind:src="product.galleries[0].photo" alt=""
                  @click="onHitProduct(product.slug)" />
                <img v-else src="img/mickey1.jpg" alt="" />
                <ul>
                  <li class="w-icon active">
                    <a href="javascript:void(0);" @click="saveToCart(product)"><i class="icon_bag_alt"></i></a>
                  </li>
                  <li class="quick-view">
                    <router-link v-bind:to="'/product/' + product.slug">
                      + Quick View
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{{ product.type }}</div>
                <router-link :to="'/product/' + product.slug">
                  <h5>{{ product.name }}</h5>
                </router-link>
                <div class="product-price">
                  Rp {{ new Intl.NumberFormat("de-DE").format(product.price) }}
                  <!-- <span>$35.00</span> -->
                </div>
              </div>
            </div>
          </carousel>
        </div>
        <div class="col-lg-12 mt-5" v-else>Data Product Tidak Ditemukan</div>
      </div>
    </div>
  </section>
  <!-- Women Banner Section End -->
</template>
<style scoped>
.product-item {
  margin-right: 25px;
}
</style>
<script>
import carousel from "vue-owl-carousel";
import axios from "axios";
export default {
  name: "ProductStore",
  components: {
    carousel,
  },
  data() {
    return {
      products: [],
      cart: []
    };
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem('cart'));
      } catch (error) {
        localStorage.removeItem('cart');
      }
    }
    axios
      .get(this.$apiURL + "/products")
      .then((res) => {
        this.products = res.data.data.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    saveToCart(product) {
      const loggedInState = localStorage.getItem("isLoggedIn");
      if (!loggedInState) {
        return this.$router.push({ name: 'login' });
      }
      const token = localStorage.getItem("token");
      axios.post(`${this.$apiURL}/cart`, { products_id: product.id, products_quantity: 1 }, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.meta.code == 200) {

            this.cart = res.data.data;
            const parsed = JSON.stringify(this.cart);
            localStorage.setItem("cart", parsed);
          } else {
            console.log(res.data.meta.message);
          }
        }).catch(err => {
          console.log(err);
        });

    },
    onHitProduct(slug) {
      return this.$router.push({ name: 'Product', params: { slug } });
    }
  }
};
</script>
