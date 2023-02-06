<template>
  <div class="cart">
    <HeaderStore />
    <div class="breacrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more text-left">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name text-center">Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="cart.length > 0">
                      <tr v-for="item in cart" :key="item.id">
                        <td class="cart-pic first-row">
                          <img class="img-cart" :src="item.photo ?? 'img/mickey1.jpg'" />
                        </td>
                        <td class="cart-title first-row text-center">
                          <h5>{{ item.product.name }}</h5>
                        </td>
                        <td class="p-price first-row">Rp {{ new Intl.NumberFormat("de-DE").format(item.product.price) }}
                        </td>
                        <td class="delete-item" @click="removeCartItem(item.id)">
                          <router-link to="/cart"><i class="material-icons"> close
                            </i></router-link>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="text-center">Data Keranjang Kosong</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8 text-left">
                <h4 class="mb-4">Informasi Pembeli:</h4>
                <div class="user-checkout">
                  <form class="text-left">
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
                      <input type="text" class="form-control" id="namaLengkap" aria-describedby="namaHelp"
                        placeholder="Masukan Nama" v-model="customerInfo.name" />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Email Address</label>
                      <input type="email" class="form-control" id="emailAddress" aria-describedby="emailHelp"
                        placeholder="Masukan Email" v-model="customerInfo.email" />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
                      <input type="text" class="form-control" id="noHP" aria-describedby="noHPHelp"
                        placeholder="Masukan No. HP" v-model="customerInfo.number" />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea class="form-control" id="alamatLengkap" rows="3"
                        v-model="customerInfo.address"></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout text-left">
                  <ul>
                    <li class="subtotal">ID Transaction <span>#SH12000</span></li>
                    <li class="subtotal mt-3">Subtotal <span>Rp {{
                      new
                                            Intl.NumberFormat("de-DE").format(totalPrice)
                    }}</span></li>
                    <li class="subtotal mt-3">Pajak <span>10% Rp {{
                      new Intl.NumberFormat("de-DE").format(totalPricePajak)
                    }}</span></li>
                    <li class="subtotal mt-3">Total Biaya <span>Rp {{
                      new Intl.NumberFormat('de-DE').format(grandTotalPrice)
                    }}</span></li>
                    <li class="subtotal mt-3">Bank Transfer <span>Mandiri</span></li>
                    <li class="subtotal mt-3">
                      No. Rekening <span>2208 1996 1403</span>
                    </li>
                    <li class="subtotal mt-3">Nama Penerima <span>Shayna</span></li>
                  </ul>
                  <a href="#" @click="checkout()" class="proceed-btn mt-2">I ALREADY PAID</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import HeaderStore from "@/components/HeaderStore.vue";
import axios from "axios";

export default {
  name: "ShoppingCart",
  components: {
    HeaderStore,
  },
  data() {
    return {
      cart: [],
      customerInfo: {
        name: '',
        email: '',
        number: '',
        address: ''
      },
      token: '',
      isLoggedIn: false
    }
  },
  methods: {
    loadCart() {
      // this.cart = JSON.parse(localStorage.getItem)
      // axios.get(`${this.$apiURL}/cart`, { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
      //   .then(res => {
      //     if (res.data.meta.code == 200) {
      //        = res.data.data.data;
      //       localStorage.setItem('cart', JSON.stringify(this.cart));
      //     } else {
      //       return this.$router.push('/');
      //     }
      //   }).catch(e => {
      //     console.log(e);
      //     return this.$router.push('/');
      //   });
    },
    checkUser() {
      axios.get(`${this.$apiURL}/user`, { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then(res => {
          if (res.data.status == 200) {
            const name = res.data.data.name;
            const email = res.data.data.email;

            this.customerInfo.name = name;
            this.customerInfo.email = email;
          }
        })
    },
    removeCartItem(id) {
      const otherCart = this.cart.filter(item => item.id != id);
      // this.cart.splice(index, 1);
      this.cart = otherCart;
      const parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
    },
    checkout() {
      let productIds = this.cart.map(product => {
        return product.id
      });

      let checkoutData = {
        name: this.customerInfo.name,
        email: this.customerInfo.email,
        address: this.customerInfo.address,
        number: this.customerInfo.number,
        transaction_total: this.grandTotalPrice,
        transaction_status: 'PENDING',
        transaction_detail: productIds
      };

      axios.post(
        this.$apiURL + "/checkout",
        checkoutData,
        { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then((res) => {
          if (res.data.meta.code == 200) {
            return this.$router.push('/success');
          } else {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
          window.location.reload();
        });
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce(function (item, data) {
        return item + (data.products_quantity * data.product.price);
      }, 0);
    },
    totalPricePajak() {
      return (this.totalPrice * 10) / 100;
    },
    grandTotalPrice() {
      return this.totalPrice + this.totalPricePajak;
    }
  },
  mounted() {
    this.isLoggedInState = localStorage.getItem("isLoggedIn");
    if (!this.isLoggedInState) {
      return this.$router.push('/');
    }
    this.token = localStorage.getItem('token');
    this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log('cart page : ', this.cart);
    this.checkUser();
    // this.loadCart();
  }
};
</script>
<style scoped>
.img-cart {
  width: 100px;
}
</style>