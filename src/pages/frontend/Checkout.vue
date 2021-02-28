<template>
   <div class="row " style="padding: 20px 20px 20px 20px;">
      <div class="col-xl-8">
         <div class="mb-4">
            <table style="font-size: 15px;width: 100%;">
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
            <a-button-group style="width: 100%">
              <a-button class="bg-danger text-white" type="primary" style="width: 15%" @click="$router.push('/checkout')">Place Order</a-button>
            </a-button-group>
      </div>
      <div class="col-xl-4 ml-lg-auto">
         <div class="card">
            <div class="card-title">
               <div class="row text-center">
                  <div class="col-6">
                     <h3 class="heading heading-3 strong-400 mb-0">
                        <span>Summary</span>
                     </h3>
                  </div>
                  <div class="col-6 text-right">
                     <span class="badge badge-md badge-success">{{ this.$store.getters.cartProductCount }} Items</span>
                  </div>
               </div>
            </div>
            <div class="card-body">
              <!-- <div class="col-12 text-right">
                 <span class="badge badge-md badge-success">Edit </span>
              </div> -->
              <table style="font-size: 12px;width: 100%;">
                <tr >
                  <th >
                       <p>Email:</p>
                  </th>
                  <td >
                       <p>{{ user.email }}</p>
                  </td>
                  <td class="text-right">
                    <span >
                      <!-- <a id="sign-in" class="btn active btn-outline-success btn-sm"
                         style="background: #f05931;border-color: #f05931;font-size: 10px;" @click.prevent="loginModel = true">
                         EDIT
                      </a> -->
                    </span>
                  </td>
                </tr>
                <tr >
                  <th >
                       <p>Address:</p>
                  </th>
                  <td style="width: 90px" v-if="addresses.length">
                     <p>Region:{{addresses[0].region}},City:{{addresses[0].city}},Area:{{addresses[0].area}}</p>
                  </td>
                  <td class="text-right">
                    <span >
                      <a id="sign-in" class="btn active btn-outline-success btn-sm"
                         style="background: #f05931;border-color: #f05931;font-size: 10px;" @click="showModal();">
                         EDIT
                      </a>
                    </span>
                  </td>
                </tr>
                <tr class="border-bottom">
                  <th >
                       <p style="padding-top: 12px;"><strong>Coupon:</strong></p>
                  </th>
                  <td style="width: 90px" v-if="addresses.length">
                     <input type="text" class="form-control" style="height: 30px;" name="coupon"></input>
                  </td>
                  <td class="text-right">
                    <span >
                      <a id="sign-in" class="btn active btn-outline-success btn-sm"
                         style="font-size: 10px;" @click.prevent="loginModel = true">
                         SUBMIT
                      </a>
                    </span>
                  </td>
                </tr>
              </table>
              <table style="font-size: 12px">
                <tr class="border-bottom" v-for="(cart, k) in cartList" :key="k">
                  <td style="width: 90px">
                      {{k+1}}
                  </td>
                  <td style="width: 150px">
                    <div style="width: 165px" class="mb-0 font-weight-bold sammy-nowrap-2">{{ cart.name }}</div>
                    <p class="my-0">{{ cart.quantity }} X ৳ {{ cart.price }}</p>
                  </td>
                  <td style="width: 90px">
                      {{cart.quantity }}
                  </td>
                  <td style="width: 75px" class="text-right">
                    ৳ {{ cart.price * cart.quantity }}
                  </td>
                </tr>
              </table>
               <table class="table-cart table-cart-review">
                  <tfoot>
                     <tr class="cart-subtotal">
                        <th>Subtotal</th>
                        <td class="text-right">
                           <span class="strong-600">৳ {{totalValue}}</span>
                        </td>
                     </tr>
                     <tr class="cart-subtotal">
                        <th>Discount</th>
                        <td class="text-right">
                           <span class="strong-600">৳ 0</span>
                        </td>
                     </tr>
                     <tr class="cart-total">
                        <th><span class="strong-600">Total</span></th>
                        <td class="text-right">
                           <strong><span>৳ {{totalValue}}</span></strong>
                        </td>
                     </tr>
                  </tfoot>
               </table>
            </div>
         </div>
      </div>
      <a-modal centered :width="750" :visible="addressEditOpen" :footer="null" title="Edit/Add Shipping Address"
               @cancel="closeModal();">
               <a-form-model ref="ruleForm" :model="form" :rules="rules" :hideRequiredMark="true"
                             @keydown="form.onKeydown($event)" @submit.prevent="submitForm()" :layout="'vertical'">
                 <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                          :message="isLoginErrorMessage"/>
                 <a-row :gutter="16">
                   <a-col :md="24" :lg="12">
                     <a-form-model-item ref="full_name" prop="full_name"
                                        label="Full name">
                       <a-input v-model="form.full_name" placeholder="Enter your first and last name. Example: 'Rofat Ahmed'"
                                @blur="() => {$refs.full_name.onFieldBlur();}"/>
                     </a-form-model-item>
                   </a-col>
                   <a-col :md="24" :lg="12">
                     <a-form-model-item ref="phone_number" prop="phone_number"
                                        label="Phone Number">
                       <a-input v-model="form.phone_number" placeholder="Please Enter your phone number"
                                @blur="() => {$refs.phone_number.onFieldBlur();}"/>
                     </a-form-model-item>
                   </a-col>
                   <a-col :md="24" :lg="12">
                     <a-form-model-item ref="region_id" prop="region_id"
                                        label="Region">
                       <a-select show-search placeholder="Please choose your region" style="width: 100%" @change="regionChange"
                                 option-filter-prop="children" :filter-option="filterOption" v-model="form.region_id">
                         <a-select-option v-for="region in regionList" :key="region.id" :value="region.id">
                           {{ region.name }}
                         </a-select-option>
                       </a-select>
                     </a-form-model-item>
                   </a-col>
                   <a-col :md="24" :lg="12">
                     <a-form-model-item ref="city_id" prop="city_id"
                                        label="City">
                       <a-select show-search placeholder="Please choose your city" style="width: 100%"
                                 :disabled="cities.length === 0" @change="cityChange"
                                 option-filter-prop="children" :filter-option="filterOption" v-model="form.city_id">
                         <a-select-option v-for="city in cities" :key="city.id" :value="city.id">
                           {{ city.name }}
                         </a-select-option>
                       </a-select>
                     </a-form-model-item>
                   </a-col>
                   <a-col :md="24" :lg="12">
                     <a-form-model-item ref="area_id" prop="area_id"
                                        label="Area">
                       <a-select show-search placeholder="Please choose your area" style="width: 100%" :disabled="areas.length === 0"
                                 option-filter-prop="children" :filter-option="filterOption" v-model="form.area_id">
                         <a-select-option v-for="area in areas" :key="area.id" :value="area.id">
                           {{ area.name }}
                         </a-select-option>
                       </a-select>
                     </a-form-model-item>
                   </a-col>
                   <a-col :md="24" :lg="12">
                     <a-form-model-item ref="address" prop="address"
                                        label="Address">
                       <a-input v-model="form.address" placeholder="For Example: House# 123 Street# 123, ABC Road"
                                @blur="() => {$refs.address.onFieldBlur();}"/>
                     </a-form-model-item>
                   </a-col>
                   <a-col :md="24" :lg="12">
                     <a-form-model-item label="Select a label for effective delivery:">
                       <a-radio-group default-value="" button-style="solid">
                         <a-radio-button class="mr-3 rounded" value="0">
                           <a-icon type="home"/>
                           HOME
                         </a-radio-button>
                         <a-radio-button class="rounded" value="1">
                           <a-icon type="shop"/>
                           OFFICE
                         </a-radio-button>
                       </a-radio-group>
                     </a-form-model-item>
                   </a-col>

                 </a-row>
                 <a-form-model-item style="text-align: right">
                   <a-button @click="closeModal();" size="large" class="mr-3 px-5">
                     Cancel
                   </a-button>
                   <a-button size="large" type="primary" class="px-5" :loading="form.busy"
                             :disabled="form.busy"  html-type="submit">
                     Save
                   </a-button>
                 </a-form-model-item>
               </a-form-model>
      </a-modal>
   </div>
</template>
<script>
   import {mapGetters} from "vuex";
   import ApiService from "@/core/services/api.service";

   export default {
     props: ['cartOpen'],
     name: "Cart",
     data() {
       return {
         form: this.$form.createForm(this),
         visible: false,
         value: 3,
         addressEditOpen:false,
         emailEditOpen:false,
         isLoginError: false,
         isLoginErrorMessage: '',
         form: new Form({
           id: '',
           full_name: '',
           phone_number: '',
           region_id: undefined,
           city_id: undefined,
           area_id: undefined,
           address: '',
           address_type: '',
           default_shipping:1,
         }),
         cities: [],
         areas: [],
         rules: {
           full_name: [
             {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'},
             {max: 50, message: 'Name maximum length 50 character', trigger: 'change'}
           ],
           phone_number: [
             {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'},
             {pattern: /^(?:\+88|01)?\d{11}\r?$/, message: 'Enter the valid mobile number', trigger: 'change'}
           ],
           region_id: [
             {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'}
           ],
           city_id: [
             {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'}
           ],
           area_id: [
             {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'}
           ],
           address: [
             {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'},
             {max: 300, message: 'Address maximum length 300 character', trigger: 'change'}
           ],
         }
       };
     },
     methods: {
        showModal:function(){
          this.addressEditOpen=true;

        },
        closeModal:function(){
          this.addressEditOpen=false;
        },
        filterOption(input, option) {
          return (
              option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
          );
        },
        regionChange(value) {
          this.form.city_id = undefined;
          this.form.area_id = undefined;
          this.areas = [];
          this.cities = this.cityById(value);
        },
        cityChange(value) {
          this.form.area_id = undefined;
          this.areas = this.areaById(value);
        },
        submitForm() {
          if(!this.form.id){
            this.$refs.ruleForm.validate(valid => {
              if (valid) {
                this.form.default_shipping=1;
                ApiService.post("address", this.form)
                    .then(({data}) => {
                      this.$store.commit('ADDRESS_ADD', data);
                      this.addressEditOpen=false;
                    })
                    .catch(error => {
                    })
              } else {
                return false;
              }
            });
          }else{
            this.$refs.ruleForm.validate(valid => {

              if (valid) {
                ApiService.put("address/"+this.form.id, this.form)
                    .then(({data}) => {
                      this.$store.commit('ADDRESS_MODIFY', data);
                      this.addressEditOpen=false;
                    })
                    .catch(error => {
                    })
              } else {
                return false;
              }
            });
          }

        },
     },
     created() {
       if (!this.addressList.length > 0) this.$store.dispatch('ADDRESS_LIST');
       if (!this.regionList.length > 0) this.$store.dispatch('REGION_LIST');
       if (!this.cityList.length > 0) this.$store.dispatch('CITY_LIST');
       if (!this.areaList.length > 0) this.$store.dispatch('AREA_LIST');
     },
     computed: {
       ...mapGetters(["cartList","currentUser","addressList","regionList", "cityById", "cityList", "areaList", "areaById"]),
       totalValue: function () {
         let amount = [];
         amount = this.cartList.map((e) => {
           return e.price * e.quantity;
         })
         return amount.reduce((a, b) => a + b, 0);
       },
       user() {
         return this.currentUser;
       },
       addresses() {
         let adrs=[];
         adrs=this.addressList.filter((e)=>{
           if(e.user_id == this.currentUser.id && e.default_shipping == 1){
             return e;
           }
         })

         if(adrs.length){
           this.form =adrs[0];
           this.cities=this.cityById(adrs[0].region_id);
           this.areas = this.areaById(adrs[0].city_id);
         }

       return adrs;
     }
   }
 }
</script>
<style scoped>
.table-cart{
  width:100%;
}
</style>
