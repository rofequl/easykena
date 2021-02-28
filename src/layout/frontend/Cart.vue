<template>
  <a-drawer width="390"
            placement="right"
            :closable="false"
            :visible="cartOpen"
            @close="$emit('closeDrawer')"
  >
    <div>
      <h4><i class="fas fa-shopping-cart mr-2"></i> {{ cartList.length }} Item
        <a-button class="float-right" @click="$emit('closeDrawer')">
          Close
        </a-button>
      </h4>
    </div><hr>
    <div class="mb-4">
      <table style="font-size: 12px">
        <tr class="border-bottom" v-for="(cart, k) in cartList" :key="k">
          <td style="width: 30px"><i class="fas fa-trash mr-2" style="cursor: pointer"
                                     @click="$store.dispatch('Remove_CART',cart)"></i></td>
          <td style="width: 55px">
            <img :src="showImage(cart.thumb_image)" class="m-1" width="40px">
          </td>
          <td style="width: 150px">
            <div style="width: 165px" class="mb-0 font-weight-bold sammy-nowrap-2">{{ cart.name }}</div>
            <p class="my-0">{{ cart.quantity }} X ৳ {{ cart.price }}</p>
          </td>
          <td style="width: 90px">
            <a-input-number id="inputNumber" style="width: 100%" size="small" v-model="cart.quantity" :min="1"
                            :max="cart.max_qty" @change="$store.commit('STORE_CART_PRODUCT')"/>
          </td>
          <td style="width: 75px" class="text-right">
            ৳ {{ cart.price * cart.quantity }}
          </td>
        </tr>
      </table>
    </div>
    <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
    >
      <a-button-group style="width: 100%">
        <a-button class="bg-danger text-white" type="primary" style="width: 70%" @click="checkout();" v-if="this.$store.getters.cartProductCount"> Checkout</a-button>
        <a-button class="bg-success text-white" disabled style="width: 30%">৳ {{totalValue}}</a-button>
      </a-button-group>
        <Login :loginOpen="loginModel" @closeModel="loginModel = false"/>
    </div>
  </a-drawer>

</template>

<script>
import {mapGetters} from "vuex";
import Login from "@/components/Form/Login";

export default {
  props: ['cartOpen'],
  name: "Cart",
  components: {Login},
  data() {
    return {
      visible: false,
      value: 3,
      loginModel: false,
    };
  },
  methods: {
    checkout(){
       if(this.$store.getters.isAuthenticated){
         this.$router.push('/checkout').catch(err => {});
         this.$emit('closeDrawer');
       }else{
         this.loginModel = true
       }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalValue: function () {
      let amount = [];
      amount = this.cartList.map((e) => {
        return e.price * e.quantity;
      })
      return amount.reduce((a, b) => a + b, 0);
    }
  },
}
</script>

<style scoped>

</style>
