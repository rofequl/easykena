<template>
  <a-layout-content>
    <div class="container">
      <div class="row mt-4">
        <div class="col-12">
          <h3 style="color: #5b5555">Edit Profile</h3>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12">
          <a-card style="width: 100%">
            <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical" @submit.prevent="onSubmit()"
                          @keydown="form.onKeydown($event)">
              <div class="row">
                <div class="col-12 col-md-4">
                  <a-form-model-item label="Full name" ref="name" has-feedback="" prop="name">
                    <a-input v-model="form.name" placeholder="Enter your first and last name"/>
                  </a-form-model-item>
                </div>
                <div class="col-12 col-md-4">
                  <p style="color: black">Email Address |
                    <a href="#" @click.prevent="emailModel = true">
                      {{ user.email ? "Change" : "Add" }}
                    </a>
                  </p>
                  <span class="ant-form-text">
                      {{ user.email }}
                    </span>
                </div>
                <div class="col-12 col-md-4">
                  <a-form-model-item label="Phone Number" ref="phone_number" has-feedback="" prop="phone_number">
                    <a-input v-model="form.phone_number" placeholder="Enter your phone number" disabled/>
                  </a-form-model-item>
                </div>
                <div class="col-12 col-md-4">
                  <a-form-model-item label="Gender">
                    <a-select v-model="form.gender" placeholder="please select gender">
                      <a-select-option value="male">
                        Male
                      </a-select-option>
                      <a-select-option value="women">
                        Female
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
                <div class="col-12 col-md-4">
                  <a-form-model-item label="Birthday">
                    <a-date-picker :default-value="moment(form.birthday)" format="YYYY-MM-DD"
                                   @change="dateSelect"
                                   placeholder="Pick a date"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <a-button htmlType="submit" class="float-right px-5" size="large" type="primary" :loading="form.busy"
                            :disabled="form.busy">Update Profile
                  </a-button>
                </div>
              </div>

            </a-form-model>
          </a-card>
        </div>
      </div>
    </div>
    <Email :modelOpen="emailModel" :is-update="!!user.email" @closeModel="emailModel = false"/>
  </a-layout-content>
</template>

<script>
import {mapGetters} from "vuex";
import moment from 'moment';
import Email from "@/components/account/Email";

export default {
  name: "Profile",
  components: {Email},
  data() {
    return {
      emailModel: false,
      form: new Form({
        name: '',
        gender: undefined,
        birthday: undefined,
        phone_number:'',
      }),
      rules: {
        name: [
          {required: true, message: 'Please enter your name', trigger: 'blur'},
          {max: 100, message: 'Name maximum length 100 character', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    moment,
    dateSelect(date) {
      this.form.birthday = moment(date).format('YYYY-MM-DD');
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.post('profile-update')
              .then(() => {
                this.$notification['success']({
                  message: 'congratulations',
                  description: 'Profile update successfully.',
                  style: {marginTop: '47px'},
                });
              })
              .catch(err => {
                this.$notification['error']({
                  message: 'Warning',
                  description: ((err.response || {}).data || {}).message || 'Something Wrong',
                  style: {marginTop: '47px'},
                  duration: 4
                })
              })
        } else {
          return false;
        }
      });
    },
    addEmail() {
      this.emailModel = true;
    }
  },
  created() {
    this.form.fill(this.user);
    if (!this.addressList.length > 0) this.$store.dispatch('ADDRESS_LIST');
    this.addressesCurrentUser;
  },
  watch: {
    user: function () {
      this.form.fill(this.user);
    }
  },
  computed: {
    ...mapGetters({user: "currentUser",addressList:"addressList"}),
    addressesCurrentUser() {
      let adrs=[];
      adrs=this.addressList.filter((e)=>{
        if(e.user_id == this.user.id && e.default_shipping == 1 ){
          return e;
        }
      })
      if(adrs.length>0){
        console.log(adrs);
        this.form.phone_number=adrs[0].phone_number;
      }
  }
  }
}
</script>

<style scoped>

</style>
