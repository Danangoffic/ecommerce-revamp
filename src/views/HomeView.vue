<template>
  <div class="home">
    <HeaderStore @cart-changed="() => { this.cart = JSON.parse(localStorage.getItem('cart')) }" />
    <HeroStore />
    <ProductStore />
    <InstaListStore />
    <PartnerStore />
    <FooterStore />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderStore from "@/components/HeaderStore.vue";
import HeroStore from "@/components/HeroStore.vue";
import ProductStore from "@/components/ProductStore.vue";
import InstaListStore from "@/components/InstaListStore.vue";
import PartnerStore from "@/components/PartnerStore.vue";
import FooterStore from "@/components/FooterStore.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    HeaderStore,
    HeroStore,
    ProductStore,
    InstaListStore,
    PartnerStore,
    FooterStore,
  },
  created() {
    document.title = `${this.$APP_TITLE}`;
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUser();
    }
  },
  data() {
    return {
      isAuth: false,
      token: ''
    }
  },
  methods: {
    getUser() {
      axios
        .get(this.$apiURL + "/user", { headers: { 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json', 'Content-Type': "application/json" } })
        .then((res) => {
          if (res.status == 200) {
            this.isAuth = true;
          }
          console.log(`is auth ${this.isAuth}`);
        })
        .catch((err) => console.log(err));
    }
  }
};
</script>
