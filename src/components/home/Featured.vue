<template>
  <div class="weekly-market-wrapper">
    <div class="container-fluid grid-bg-pad">
      <div class="row">
        <h2 class="page-title">Featured Products</h2>
      </div>
      <ProductListing :product="productList"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProductListing from "@/components/product_list/ProductListing";

export default {
  name: "Featured",
  created() {
    if (!this.productList.length > 0) this.$store.dispatch('PRODUCT_LIST');
  },
  computed: {
    ...mapGetters(["isBangla", "productList"]),
  },
  components: {ProductListing},
}
</script>

<style scoped>

</style>
