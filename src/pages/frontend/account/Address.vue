<template>
  <a-layout-content>
    <div class="container">
      <div class="row mt-4">
        <div class="col-12">
          <h3 style="color: #5b5555">Address Book</h3>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12">
          <a-card style="width: 100%">
            <a-table :columns="columns" :data-source="addressesCurrentUser" :pagination="false" rowKey="id">
              <span slot="address" slot-scope="text, record">
                <a-tag v-if="record.address_type === 0" color="#2db7f5">HOME</a-tag>
                <a-tag v-else color="#108ee9">OFFICE</a-tag>{{ text }}
              </span>
              <span slot="shipment" slot-scope="text, record">
                {{ record.region }} - {{ record.city }} - {{ record.area }}
              </span>
              <span slot="shipment" slot-scope="text, record">
                {{ record.region }} - {{ record.city }} - {{ record.area }}
              </span>
              <span slot="default_shipping" slot-scope="text">
                <span style="font-size: 12px;color: #2db7f5">{{ text === 1 ? 'Default Shipping Address' : '' }}</span>
              </span>
              <span slot="action" slot-scope="text, record">
                <a id="sign-in" class="btn active btn-outline-success btn-sm"
                   style="background: #f05931;border-color: #f05931;font-size: 10px;" @click="showModal(record);">
                Edit
                </a>
              </span>
            </a-table>
            <a-button @click="$router.push('/user-address/add')" class="float-right mt-5" type="primary" icon="plus">
              ADD NEW ADDRESS
            </a-button>
          </a-card>
        </div>
      </div>
      <a-modal centered :width="750" :visible="addressEditOpen" :footer="null"
         @cancel="closeModal();">

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
                     <!-- <a-col :md="24" :lg="12">
                        <a-form-model-item label="Shipping Address:">
                           <a-radio-group default-value="" button-style="solid">
                              <a-radio-button class="mr-3 rounded" value="1">
                                 <a-icon type="yes"/>
                                 Yes
                              </a-radio-button>
                              <a-radio-button class="rounded" value="0">
                                 <a-icon type="no"/>
                                 No
                              </a-radio-button>
                           </a-radio-group>
                        </a-form-model-item>
                     </a-col> -->
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

      </a-modal>
    </div>
  </a-layout-content>
</template>

<script>

import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

const columns = [
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    scopedSlots: {customRender: 'address'},
  },
  {
    title: 'Region',
    dataIndex: 'shipment',
    key: 'shipment',
    scopedSlots: {customRender: 'shipment'},
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: '',
    dataIndex: 'default_shipping',
    key: 'default_shipping',
    scopedSlots: {customRender: 'default_shipping'},
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];

const data = [];

export default {
  name: "Address",
  data() {
    return {
      data,
      columns,
      form: this.$form.createForm(this),
      visible: false,
      value: 3,
      emailEdit:false,
      customActiveKey: 'tab1',
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
        default_shipping:'',
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
  created() {
    if (!this.addressList.length > 0) this.$store.dispatch('ADDRESS_LIST');
    if (!this.regionList.length > 0) this.$store.dispatch('REGION_LIST');
    if (!this.cityList.length > 0) this.$store.dispatch('CITY_LIST');
    if (!this.areaList.length > 0) this.$store.dispatch('AREA_LIST');
  },
  methods:{

    showModal:function(data){
      this.form.fill(data);
      this.addressEditOpen=true;
      this.cities = this.cityById(data.region_id);
      this.areas = this.areaById(data.city_id);
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
      this.busy=true;
      if(this.form.id){
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

  },
  computed: {
    ...mapGetters(["addressList","currentUser","regionList", "cityById", "cityList", "areaList", "areaById"]),
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

</style>
