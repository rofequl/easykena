<template>
  <div v-if="product.length > 0" style="background-color: #fff; padding: 20px;" class="rounded">
    <div style="text-align: center;font-size: 15px;">
      <p >
        <span >
          Search result for:<em><strong>{{search}}</strong></em>
       </span>
     </p>
    </div>
    <a-row :gutter="16">
      <a-col :xs="{ span: 24}" :sm="{ span: 12}" :md="{ span: 8}" :lg="{ span: 6}" class="mb-4"
             v-for="(data, k) in product" :key="k">
        <a-card hoverable :bodyStyle="{padding:'4px'}" :style="{borderColor:'#d6cccc'}">
          <div class="card-header p-0" @click="showModal(data);">
            <img :src="showImage(data.thumb_image)" class="w-100" height="180px" alt="">
          </div>
          <p class="name sammy-nowrap-2 mb-1" @click="showModal(data);" style="text-align: center;color: #1a1a1a;padding-top: 5px;font-size: 14px;text-overflow: ellipsis;white-space: normal;overflow: hidden;">{{ data.name }}</p>
          <p class="mb-2 font-weight-bold" style="text-align: center;color: #846666;font-size: 12px;font-weight: 400;margin-top: 1px;">{{ data.unit }}</p>
          <p class="mb-2 font-weight-bold" style="font-size: 18px;text-align: center;">৳ {{ data.price }}</p>
          <p class="mb-0" v-if="cartProductById(data.id)">
            <!--            <button style="background-color: #d4e0de; color: #f05931" :disabled="true"> {{cartProductById(data.id).quantity}} add in Cart</button>-->
            <span v-if="cartProductById(data.id).quantity==0?$store.dispatch('Remove_CART',data):''"></span>
            <b-form-spinbutton class="card-spin-button" :formatter-fn="dayFormatter"
                               v-model="cartProductById(data.id).quantity" min="0"
                               :max="cartProductById(data.id).max_qty"></b-form-spinbutton>
          </p>
          <p class="mb-0" v-else>
            <button class="cart-button" @click="addToCart(data)"><i class="fas fa-shopping-cart mr-2"></i> Add to Cart
            </button>
          </p>
        </a-card>
      </a-col>
    </a-row>
    <a-modal centered :width="750" :visible="productDetails" :footer="null"
       @cancel="closeModal();">
       <div class="row" >
         <div class="col-md-6">
             <div class="card-header p-0" >
               <img :src="showImage(productDetailsData.thumb_image)" class="w-100" height="200px" alt="">
             </div>
         </div>
         <div class="col-md-6">
             <p class="name sammy-nowrap-2 mb-1" >
               <h3>{{ productDetailsData.name }}</h3>
               <span >each</span>
             </p>
             <p class="mb-2 font-weight-bold" style="font-size: 18px;">৳ {{ productDetailsData.price }}</p>
             <p class="mb-0" v-if="cartProductById(productDetailsData.id)">
               <!--            <button style="background-color: #d4e0de; color: #f05931" :disabled="true"> {{cartProductById(data.id).quantity}} add in Cart</button>-->
                <span v-if="cartProductById(productDetailsData.id).quantity==0?$store.dispatch('Remove_CART',productDetailsData):''"></span>
               <b-form-spinbutton style="width:95%;" class="card-spin-button" :formatter-fn="dayFormatter"
                                  v-model="cartProductById(productDetailsData.id).quantity" min="0"
                                  :max="cartProductById(productDetailsData.id).max_qty"></b-form-spinbutton><br>
              <a-button class="bg-danger text-white" type="primary" style="width: 92%" @click="checkout();" v-if="this.$store.getters.cartProductCount"> Checkout</a-button>

             </p>
             <p class="mb-0" v-else>
               <button class="cart-button" @click="addToCart(productDetailsData)"><i class="fas fa-shopping-cart mr-2"></i> Add to Cart
               </button>
             </p>
         </div>
       </div>
       <p><h4>Product Description:</h4></p>
      <p v-html="productDetailsData.description"></p>
    </a-modal>
  </div>
  <div v-else class="">
    <div style="text-align: center;padding-top: 15px;padding-bottom: 155px;font-size: 20px;">
      <p >
        <span >
      Your search <em><strong>{{search}}</strong></em> did not match any products
       </span>
     </p>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  name: "SearchResult",
  data() {
    return {
      productDetails:false,
      search:'',
      product:[],
      productDetailsData:{
        id:'',
        slug:'',
        name:'',
        quantity:'',
        max_qty:'',
        thumb_image:'',
        price:'',
      },
    }
  },
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
    },
    showModal:function(data){
      this.productDetails=true;
      this.productDetailsData=data;
    },
    closeModal:function(){
      this.productDetails=false;
    },
    checkout(){
       if(this.$store.getters.isAuthenticated){
         this.$router.push('/checkout').catch(err => {});
       }else{
         this.loginModel = true
       }
    }
  },
  watch: {
    search: function (value) {
      if (value) {
        ApiService.get("search?keyword="+value)
            .then(({data}) => {
              this.product = data;
            })
            .catch(error => {
              this.$notification['error']({
                message: 'Warning',
                description: ((err.response || {}).data || {}).message || 'Something Wrong',
                style: {marginTop: '41px'},
                duration: 4
              })
            })
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapGetters(["cartProductById"]),
  },
  mounted: function() {
        this.search = this.$route.params.value
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
