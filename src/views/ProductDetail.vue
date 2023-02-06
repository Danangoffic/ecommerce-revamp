<template>
  <div class="product">
    <HeaderStore />
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more text-left">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Detail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6">
                <div class="product-pic-zoom">
                  <img class="product-big-img" :src="default_image" alt="" loading="lazy" />
                </div>
                <div class="product-thumbs" v-if="product.galleries.length > 0">
                  <carousel class="product-thumbs-track ps-slider" :nav="false" :dots="false">
                    <div v-for="ss in product.galleries" :key="ss.id" class="pt" @click="changeImage(ss.photo)"
                      :class="ss.photo == default_image ? 'active' : ''">
                      <img :src="ss.photo" alt="" />
                    </div>
                  </carousel>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details text-left">
                  <div class="pd-title">
                    <span>oranges</span>
                    <h3>Pure Pineapple</h3>
                  </div>
                  <div class="pd-desc">
                    <p v-html="product.description">
                    </p>
                    <h4>Rp {{ new Intl.NumberFormat("de-DE").format(parseInt(product.price)) }}</h4>
                  </div>
                  <div class="quantity">
                    <a href="#" @click="saveToCart(product.id)" class="primary-btn pd-cart border-0">Add To Cart</a>
                    <!-- <a href="#"  class="primary-btn pd-cart">Add To Cart</a> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->
    <RelatedProduct />

    <FooterStore />
  </div>
</template>
<style scoped>
.product-thumbs .pt {
  margin-right: 10px;
}
</style>
<script>
// @ is an alias to /src
import HeaderStore from "@/components/HeaderStore.vue";
import FooterStore from "@/components/FooterStore.vue";
import carousel from "vue-owl-carousel";
import RelatedProduct from "@/components/RelatedProducts.vue";
import axios from "axios";

export default {
  name: "ProductDetail",
  components: {
    HeaderStore,
    FooterStore,
    carousel,
    RelatedProduct,
  },
  data() {
    return {
      product: {
        galleries: []
      },
      default_image: '',
      cart: [],
      newCart: {},
      token: '',
      isLoggedIn: false
    };
  },
  methods: {
    changeImage(urlImage) {
      this.default_image = urlImage;
    },
    loadProduct() {
      const slug = this.$route.params.slug;
      axios.get(`${this.$apiURL}/products/${slug}`)
        .then(response => (this.setDataPicture(response.data.data)));
    },
    updateMetaInfo() {
      document.title = `${this.product.name} - ${this.$APP_TITLE}`;
      // const metaDescription = document.querySelector('meta[name="description"]');
      // metaDescription.setAttribute("content", );
    },
    setDataPicture(data) {
      this.product = data;

      this.default_image = data.galleries[0].photo;

      this.updateMetaInfo();
    },
    saveToCart(id) {
      const loggedInState = localStorage.getItem("isLoggedIn");
      if (!loggedInState) {
        console.log("Please login first!");
        return this.$router.push({ name: 'login' });
      }
      axios
        .post(this.$apiURL + "/cart", { products_id: id, products_quantity: 1 }, { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then(res => {
          console.log(res);
          if (res.data.meta.code == 200) {
            this.cart = res.data;
            const parsed = JSON.stringify(this.cart);
            localStorage.setItem("cart", parsed);
            this.$emit('cartChanged');
          } else {
            console.log("Add to cart is failed");
          }
        }).catch(e => {
          console.log(e);
        });
    },
    checkUser() {
      axios.get(`${this.$apiURL}/user`, { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then(res => {
          if (res.data.status == 200) {
            this.isLoggedIn = true;
          }
        })
    }
  },
  created() {
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem('cart'));
      } catch (error) {
        localStorage.removeItem('cart');
      }
    }
    this.isLoggedIn = localStorage.getItem("isLoggedIn") ?? false;
    this.token = localStorage.getItem("token") ?? '';
    this.checkUser();

    this.loadProduct();

  },
};
</script>
