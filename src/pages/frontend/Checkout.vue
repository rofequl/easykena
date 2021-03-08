<template>
   <div class="row " style="padding: 20px 20px 20px 20px;">
      <div class="col-xl-8">
         <div class="mb-4">
            <h4 v-if="this.cartList.length > 0">Order Items</h4>
            <table style="font-size: 15px;width: 100%;">
               <tr class="border-bottom" v-for="(cart, k) in cartList" :key="k">
                 <td style="width: 30px">{{k+1}}.</td>
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
            <h3 v-if="this.cartList.length == 0" style="font-size: 100px;text-align: center;color:#b3c4d4;margin-bottom: 0 !important;">
              <i class="fas fa-shopping-cart"></i>
            </h3>
            <h1 v-if="this.cartList.length == 0" style="font-size: 20px;text-align: center;"><span > </span>
              <span>Your shopping cart is empty, Please add some products before you checkout.</span>
                <div style="padding-top: 15px;">
                 <a-button class="btn active btn-outline-success btn-sm" style="background: #f05931;border-color: #f05931;width: 25%;" type="primary" @click="$router.push('/')" v-if="this.cartList.length == 0">Start Shopping Now</a-button>
               </div>
            </h1>
         </div>
         <a-button-group style="width: 100%">
            <a-button class="btn active btn-outline-success btn-sm" :loading="busy"
                      :disabled="busy" style="background: #f05931;border-color: #f05931;width: 15%;" type="primary" @click="submitOrder(totalValue);" v-if="this.cartList.length > 0">Place Order</a-button>
         </a-button-group>
      </div>
      <div class="col-xl-4 ml-lg-auto">
         <div class="card">
            <div class="card-title">
               <div class="row text-left">
                  <div class="col-12">
                     <h4 class="heading heading-3 strong-400 mb-0" style="padding-left: 18px;padding-top: 15px;">
                        <span>Shipping Address</span>
                     </h4>
                  </div>
               </div>
            </div>
            <div class="card-body">
               <table style="font-size: 12px;width: 100%;">
                  <tr >
                     <th >
                        <p>Email:</p>
                     </th>
                     <td>
                       <p>{{ user.email }}</p>
                     </td>
                     <td class="text-right">
                       <span>
                           <a class="btn active btn-outline-success btn-sm"
                              style="background: #f05931;border-color: #f05931;font-size: 11px;"  href="#" @click.prevent="emailModel = true">
                             {{ user.email ? "Edit" : "Add" }}
                           </a>
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
                        Edit
                        </a>
                        </span>
                     </td>
                  </tr>
               </table>
               <div class="row text-left">
                  <div class="col-12">
                     <h4 class="heading heading-3 strong-400 mb-0" style="padding-top: 15px;padding-bottom: 15px;">
                        <span>Order Summary</span>
                     </h4>
                  </div>
               </div>
               <table class="table-cart table-cart-review">
                  <tfoot>
                     <tr class="cart-subtotal">
                        <th>Subtotal({{ this.$store.getters.cartProductCount }} Items)</th>
                        <td class="text-right">
                           <span class="strong-600">৳ {{totalValue}}</span>
                        </td>
                     </tr>
                     <tr class="cart-subtotal" >
                        <td  style="padding-top: 15px;padding-bottom: 15px;">
                           <input type="text" class="form-control" style="height: 30px;" v-model="couponCode"placeholder="Enter Voucher Code"name="coupon"></input>
                        </td>
                        <td class="text-right" style="padding-top: 15px;padding-bottom: 15px;">
                           <span >
                           <a id="sign-in" class="btn active btn-outline-success btn-sm"
                              style="font-size: 13px;" :loading="busy"
                                 :disabled="busy" @click="applyCoupon(couponCode)" >
                           Apply
                           </a>
                           </span>
                        </td>
                     </tr>
                     <tr class="cart-total">
                        <th><span class="strong-600">Discount</span></th>
                        <td class="text-right">
                           <strong><span>৳ {{discount_amount}}</span></strong>
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
      <a-modal centered :width="750" :visible="addressEditOpen" :footer="null"
         @cancel="closeModal();">
         <a-tabs @change="handleTabClick" :activeKey="customActiveKey"
            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
            <a-tab-pane key="tab1" tab="Shipping Address">
               <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                  :message="isLoginErrorMessage"/>
               <table style="width: 100%;">
                  <thead class="ant-table-thead">
                     <th rowspan="1" class="next-table-header-node first">
                        Full name
                     </th>
                     <th rowspan="1" class="next-table-header-node">
                        Address
                     </th>
                     <th rowspan="1" class="next-table-header-node">
                        Region
                     </th>
                     <th rowspan="1" class="next-table-header-node">
                        Phone Number
                     </th>
                     <th rowspan="1" class="next-table-header-node">
                        Shipping Address
                     </th>
                  </thead>
                  <tbody class="ant-table-tbody">
                     <tr  v-for="(addressSingle, k) in addressesCurrentUser" :key="k">
                        <td >
                           {{addressSingle.full_name}}
                        </td>
                        <td >
                          <span >
                            <a-tag v-if="addressSingle.address_type === 0" color="#2db7f5">HOME</a-tag>
                            <a-tag v-else color="#108ee9">OFFICE</a-tag>
                          </span>
                           {{addressSingle.address}}
                        </td>
                        <td >
                           {{addressSingle.region}}
                        </td>
                        <td >
                           {{addressSingle.phone_number}}
                        </td>
                        <td >
                           <label class="" >
                           <span class="next-radio checked hovered">
                           <span class="next-radio-inner press"></span>
                           <input type="radio" :value="addressSingle.default_shipping" v-model="addressSingle.default_shipping" name="isShipping" @change="radioClick(addressSingle.id);">
                           </span>
                           </label>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <a-form-model-item style="text-align: right;padding-top: 20px;">
                  <a-button @click="closeModal();" size="large" class="mr-3 px-5">
                     Cancel
                  </a-button>
                  <a-button size="large" type="primary" class="px-5" :loading="form.busy"
                     :disabled="form.busy"  html-type="submit" @click="submitChangeShipping(addressesCurrentUser)">
                     Save
                  </a-button>
               </a-form-model-item>
            </a-tab-pane>
            <a-tab-pane key="tab2" tab="Add New address" >
               <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                  message="Invalid credentials"/>
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
                     <a-button size="large" type="primary" class="px-5" :loading="busy"
                        :disabled="busy"  html-type="submit">
                        Save
                     </a-button>
                  </a-form-model-item>
               </a-form-model>
            </a-tab-pane>
         </a-tabs>
      </a-modal>
      <Email :modelOpen="emailModel" :is-update="!!user.email" @closeModel="emailModel = false"/>
   </div>
</template>
<script>
   import {mapGetters} from "vuex";
   import ApiService from "@/core/services/api.service";
   import Email from "@/components/account/Email";
   export default {
     props: ['cartOpen'],
     name: "Cart",
     components: {Email},
     data() {
       return {
         emailModel: false,
         form: this.$form.createForm(this),
         visible: false,
         value: 3,
         emailEdit:false,
         customActiveKey: 'tab1',
         addressEditOpen:false,
         emailEditOpen:false,
         isLoginError: false,
         isLoginErrorMessage: '',
         couponCode:'',
         discount_amount:0,
         form: new Form({
           id: '',
           full_name: '',
           phone_number: '',
           region_id: undefined,
           city_id: undefined,
           area_id: undefined,
           address: '',
           address_type: '',
           default_shipping:0,
         }),
         cities: [],
         areas: [],
         busy:false,
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
      radioClick(addressSingleId){
        this.addressList.filter((e)=>{
          if(e.id == addressSingleId ){
             e.default_shipping =1;
          }else{
            e.default_shipping =0;
          }
          return e;
        })
      },
      addEmail() {
        this.emailModel = true;
      },
       emailEditClick(){
         this.emailEdit=true;
       },
       handleTabClick(key) {
         this.customActiveKey = key
       },
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
        submitChangeShipping(addressesCurrentUser){
         let shippingAddress=[];
         shippingAddress=this.addressesCurrentUser.filter((e)=>{
           if(e.user_id == this.currentUser.id && e.default_shipping == 1){
             return e;
           }
         })
           if (shippingAddress.length>0) {
             this.busy=true;
             ApiService.put("address_shipping/"+shippingAddress[0].id, shippingAddress[0])
                 .then(({data}) => {
                   this.busy=false;
                   this.$store.commit('ADDRESS_MODIFY', data);
                   this.addressEditOpen=false;
                   this.$notification['success']({
                     message: 'Congratulations',
                     description: 'Shipping Address Added Successfully.',
                     style: {marginTop: '41px'},
                   });
                 })
                 .catch(error => {
                   this.busy=false;
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
       },
        submitForm() {
          this.busy=true;
          if(!this.form.id){
            this.$refs.ruleForm.validate(valid => {
              if (valid) {
                ApiService.post("address", this.form)
                    .then(({data}) => {
                      this.busy=false;
                      this.$store.commit('ADDRESS_ADD', data);
                      this.addressEditOpen=false;
                      this.$notification['success']({
                        message: 'Congratulations',
                        description: 'Address Added Successfully.',
                        style: {marginTop: '41px'},
                      });
                    })
                    .catch(error => {
                      this.busy=false;
                      this.$notification['error']({
                        message: 'Warning',
                        description: ((err.response || {}).data || {}).message || 'Something Wrong',
                        style: {marginTop: '41px'},
                        duration: 4
                      })
                    })
              } else {
                this.busy=false;
                return false;
              }
            });
          }else{
            this.busy=true;
            this.$refs.ruleForm.validate(valid => {
              if (valid) {
                ApiService.put("address/"+this.form.id, this.form)
                    .then(({data}) => {
                      this.busy=false;
                      this.$store.commit('ADDRESS_MODIFY', data);
                      this.addressEditOpen=false;
                      this.$notification['success']({
                        message: 'Congratulations',
                        description: 'Address Edited Successfully.',
                        style: {marginTop: '41px'},
                      });
                    })
                    .catch(error => {
                      this.busy=false;
                      this.$notification['error']({
                        message: 'Warning',
                        description: ((err.response || {}).data || {}).message || 'Something Wrong',
                        style: {marginTop: '41px'},
                        duration: 4
                      })
                    })
              } else {
                this.busy=false;
                return false;
              }
            });
          }
        },
        submitOrder(total){
          this.busy=true;
           var order = {'shipping_address_id':this.addresses[0].id,'items':this.cartList,'total':this.totalValue,'date':'','discount_amount':this.discount_amount};
          ApiService.post("orders", order)
              .then(({data}) => {
                this.busy=false;
                this.$store.commit('EMPTY_PRODUCT_CART');
                this.$store.commit('ORDER_ADD_USER',data);
                this.$notification['success']({
                  message: 'Congratulations',
                  description: 'Order Placed Successfully.',
                  style: {marginTop: '41px'},
                });
              })
              .catch(error => {
                this.busy=false;
                this.$notification['error']({
                  message: 'Warning',
                  description: ((err.response || {}).data || {}).message || 'Something Wrong',
                  style: {marginTop: '41px'},
                  duration: 4
                })
              })
        },
        applyCoupon(couponCode){
          ApiService.get('coupon_code_get/'+couponCode)
              .then(({data}) => {
                  this.discount_amount = data.discount_amount;
              })
              .catch(err => {
                this.$notification['error']({
                  message: 'Warning',
                  description: ((err.response || {}).data || {}).message || 'Something Wrong',
                  style: {marginTop: '41px'},
                  duration: 4
                })
              })
        }
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
         return amount.reduce((a, b) => a + b, 0)-this.discount_amount;
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
       return adrs;
     },
     addressesCurrentUser() {
       let adrs=[];
       adrs=this.addressList.filter((e)=>{
         if(e.user_id == this.currentUser.id ){
           return e;
         }
       })
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
