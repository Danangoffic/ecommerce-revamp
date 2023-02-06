<template>
  <!-- Header Section Begin -->
  <header class="header-section">
    <div class="header-top">
      <div class="container">
        <div class="ht-left">
          <div class="mail-service">
            <i class="fa fa-envelope"></i> bu.store@gmail.com
          </div>
          <div class="phone-service"><i class="fa fa-phone"></i> +628 22081996</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="inner-header">
        <div class="row">
          <div class="col-lg-2 col-md-2">
            <div class="logo">
              <router-link to="/">
                <img src="img/logo_bu_store.png" alt="" />
              </router-link>
            </div>
          </div>
          <div class="col-lg-7 col-md-7"></div>
          <div class="col-lg-3 text-right col-md-3 mt-md-4">
            <ul class="nav-right" v-if="isLoggedIn">
              <li class="nav-item bg-transparent cart-icon">
                <a href="#">
                  <i class="icon_bag_alt"></i>
                  <span>{{ cart.length }}</span>
                </a>
                <div class="cart-hover">
                  <div class="select-items">
                    <table>
                      <tbody v-if="cart.length > 0">
                        <tr v-for="item in cart" :key="item.id">
                          <td class="si-pic">
                            <img class="cart-item-photo" :src="item.photo ?? 'img/mickey1.jpg'" loading="lazy"
                              :alt="item.product" />
                          </td>
                          <td class="si-text">
                            <div class="product-selected">
                              <p class="text-dark">{{ item.product.name }} </p>
                              <p>Rp {{ new Intl.NumberFormat("de-DE").format(item.product.price) }} x
                                {{ item.products_quantity }}</p>
                              <h6>{{ item.name }}</h6>
                            </div>
                          </td>
                          <td class="si-close">
                            <i class="ti-close" @click="removeCartItem(item.id)"></i>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="3" class="text-center" style="padding-bottom: 5px !important">
                            <div class="text-disabled">
                              <p>Keranjang Kosong</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="select-total" v-if="cart.length > 0">
                    <span>total:</span>
                    <h5>Rp {{ new Intl.NumberFormat("de-DE").format(totalPrice) }}</h5>
                  </div>
                  <div class="select-button" v-if="cart.length > 0">
                    <router-link to="/cart" class="primary-btn view-card">VIEW CART</router-link>
                    <!-- <router-link to="/checkout" class="primary-btn checkout-btn">CHECK OUT</router-link> -->
                  </div>
                </div>
              </li>
              <li class="nav-item bg-transparent " style="margin-left: 2rem;">
                <a href="#" class="text-dark" @click="logout()">Logout</a>
              </li>
            </ul>
            <ul class="nav-right" v-else>
              <li class="nav-item bg-transparent">
                <router-link to="/login" style="color: #000 !important">Login</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Header End -->
</template>

<script>
import axios from "axios";
export default {
  name: "HeaderStore",
  data() {
    return {
      cart: [],
      isLoggedIn: false,
      token: ''
    }
  },
  methods: {
    removeCartItem(id) {
      axios.delete(`${this.$apiURL}/cart`, { params: { id: id }, headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then(res => {
          if (res.data.meta.code == 200) {
            this.cart = res.data.data;
            localStorage.setItem('cart', JSON.stringify(this.cart));
          } else {
            console.log(res.data.meta.message);
          }
        })
        .catch(err => console.log(err));
    },
    getCartUser() {
      axios.get(this.$apiURL + "/cart", { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then(res => {
          if (res.status == 200) {
            this.cart = res.data.data.data;
            const parsed = JSON.stringify(this.cart);
            localStorage.setItem("cart", parsed);
          }
        }).catch(e => { console.log(e) });
    },
    logout() {
      axios.post(`${this.$apiURL}/logout`, {}, { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then(res => {
          if (res.status == 200) {
            this.cart = [];
            this.isLoggedIn = false;
            this.token = '';
            localStorage.removeItem('cart');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            return window.location.assign("/");
          }
        });

    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce(function (item, data) {
        return item + (data.product.price * data.products_quantity)
      }, 0);
    }
  },
  created() {

    this.isLoggedIn = localStorage.getItem("isLoggedIn") ?? false;
    this.token = localStorage.getItem("token") ?? '';
    if (this.isLoggedIn && this.token != '') {
      this.getCartUser();
    }
    setInterval(() => {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }, 500);
  }
};
</script>
<style scoped>
.cart-item-photo {
  width: 70px;
  height: 90px;
}
</style>