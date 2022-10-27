<template>
  <div class="home">
    <HeaderStore />
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
};
</script>
