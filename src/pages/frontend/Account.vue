<template>
  <a-layout-content>
    <div class="container">
      <div class="row mt-4">
        <div class="col-12">
          <h3 style="color: #5b5555">Manage My Account</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <a-card style="width: 100%">
            <p style="font-size: 18px">Personal Profile |
              <router-link to="/user-profile/edit" style="font-size: 12px">EDIT</router-link>
            </p>
            <p class="mb-1">{{ user.name }}</p>
            <p class="mb-1">{{ user.email }}</p>
            <p class="mb-1">{{addressesCurrentUser[0].phone_number}}</p>
          </a-card>
        </div>
        <div class="col-md-6">
          <a-card style="width: 100%">
            <p style="font-size: 18px">Address Book |
              <router-link to="/user-address/manage" style="font-size: 12px">EDIT</router-link>
            </p>
            <p class="mb-1">{{ user.name }}</p>
            <p class="mb-1">{{addressesCurrentUser[0].address}}</p>
          </a-card>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-6">
          <a-card style="width: 100%">
            <p style="font-size: 18px">Change Password
            </p>
            <a-form-model ref="ruleForm" :model="form" :rules="rules" :hideRequiredMark="true"
                          @keydown="form.onKeydown($event)" @submit.prevent="submitForm()" :layout="'vertical'">
              <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                       :message="isLoginErrorMessage"/>
            <p class="mb-1">
              <a-form-model-item label="Old Password" ref="old_password" has-feedback="" prop="old_password">
              <a-input v-model="form.old_password" placeholder="Enter your Old Password" />
            </a-form-model-item>
          </p>
            <p class="mb-1">
              <a-form-model-item label="New Password" ref="new_password" has-feedback="" prop="new_password">
              <a-input v-model="form.new_password" placeholder="Enter your New Password" />
            </a-form-model-item>
          </p>
            <p class="mb-1">
              <a-form-model-item label="Confirm New Password" ref="confirm_password" has-feedback="" prop="confirm_password">
              <a-input  v-model="form.confirm_password" placeholder="Confirm Your New Password" />
            </a-form-model-item>
          </p>
          <a-form-model-item style="text-align: right">

            <a-button size="large" type="primary" class="px-5"
                       html-type="submit" style="background: #f05931;border-color: white;">
              Change Password
            </a-button>
          </a-form-model-item>
          </a-form-model>
          </a-card>
        </div>
      </div> -->
    </div>
  </a-layout-content>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Account",
  data() {
    return {
      isLoginError: false,
      isLoginErrorMessage: '',
      form: new Form({
        old_password:'',
        new_password:'',
       confirm_password:''
      }),
      rules: {
        old_password: [
          {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'},
          {min: 8, message: 'Old Password minimun length 8 character', trigger: 'change'}
        ],
        new_password: [
          {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'},
          {min: 8, message: 'Old Password minimun length 8 character', trigger: 'change'}
        ],
        confirm_password: [
          {required: true, message: 'You can\'t leave this empty.', trigger: 'blur'},
          {min: 8, message: 'Old Password minimun length 8 character', trigger: 'change'}
        ],
      }
    };
  },
  created() {
    if (!this.addressList.length > 0) this.$store.dispatch('ADDRESS_LIST');
  },
  methods:{
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.form.post('address')
          //     .then(({data}) => {
          //       this.$store.commit('ADDRESS_ADD', data);
          //       this.$router.push('/user-address/manage')
          //     })
          //     .catch(err => {
          //       this.$notification['error']({
          //         message: 'Warning',
          //         description: ((err.response || {}).data || {}).message || 'Something Wrong',
          //         style: {marginTop: '41px'},
          //         duration: 4
          //       })
          //     })
          //     .finally(() => {
          //       this.$refs.ruleForm.resetFields()
          //     });
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["currentUser","addressList"]),
    user() {
      return this.currentUser;
    },
    addressesCurrentUser() {
      let adrs=[];
      adrs=this.addressList.filter((e)=>{
        if(e.user_id == this.currentUser.id && e.default_shipping == 1 ){
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
