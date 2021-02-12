<template>
  <div v-if="product.length > 0" style="background-color: #fff; padding: 20px;" class="rounded">
    <a-row :gutter="16">
      <a-col :xs="{ span: 24}" :sm="{ span: 12}" :md="{ span: 8}" :lg="{ span: 6}" class="mb-4"
             v-for="(data, k) in product" :key="k">
        <a-card hoverable :bodyStyle="{padding:'4px'}" :style="{borderColor:'#d6cccc'}">
          <div class="card-header p-0">
            <img :src="showImage(data.thumb_image)" class="w-100" height="180px" alt="">
          </div>
          <p class="name sammy-nowrap-2 mb-1">{{ data.name }}</p>
          <p class="mb-2 font-weight-bold">৳ {{ data.price }}</p>
          <p class="mb-0" v-if="cartProductById(data.id)">
            <!--            <button style="background-color: #d4e0de; color: #f05931" :disabled="true"> {{cartProductById(data.id).quantity}} add in Cart</button>-->

            <b-form-spinbutton class="card-spin-button" :formatter-fn="dayFormatter"
                               v-model="cartProductById(data.id).quantity" min="1"
                               :max="cartProductById(data.id).max_qty"></b-form-spinbutton>
          </p>
          <p class="mb-0" v-else>
            <button class="cart-button" @click="addToCart(data)"><i class="fas fa-shopping-cart mr-2"></i> Add to Cart
            </button>
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['product'],
  name: "ProductListing",
  methods: {
    addToCart(product) {
      let data = {};
      data['id'] = product.id;
      data['slug'] = product.slug;
      data['name'] = product.name;
      data['quantity'] = 1;
      data['max_qty'] = product.quantity;
      data['thumb_image'] = product.thumb_image;
      data['price'] = product.price;
      this.$store.dispatch('STORE_CART', data)
    },
    dayFormatter(value) {
      return value + ' add in Cart';
    }
  },
  computed: {
    ...mapGetters(["cartProductById"])
  },
}
</script>

<style scoped lang="scss">
.cart-button {
  border: none;
  outline: 0;
  padding: 5px;
  color: white;
  background-color: #f05931;
  text-align: center;
  cursor: pointer;
  line-height: 28px;
  font-size: 15px;
  margin: -5px !important;
  width: 105%;
}

.cart-button:hover:last-child {
  opacity: 0.7;
}


.card-spin-button {
  padding: 0 !important;
  border-radius: unset !important;
  margin: -5px !important;
  width: 105%;
  background-color: #9dbf5c;
  border: 0;
}

.card-spin-button:focus {
  box-shadow: none !important;
  border: 0;
}


</style>
