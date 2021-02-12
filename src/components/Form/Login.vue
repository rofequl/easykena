<template>
  <a-modal centered :width="350" :visible="loginOpen" :footer="null" title="Sign In to your account"
           @cancel="$emit('closeModel')">
    <a-form :form="form" class="login-form user-layout-login"
            @submit="handleSubmit">
      <a-tabs @change="handleTabClick" :activeKey="customActiveKey"
              :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
        <a-tab-pane key="tab1" tab="Mobile number">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                   :message="isLoginErrorMessage"/>
          <a-form-item>
            <a-input size="large" type="text" placeholder="Mobile number(eg +8801234567891)"
                     v-decorator="['mobile', {rules: [{ required: true, message: 'Please enter the mobile number' },
                     {pattern: /^(?:\+88|01)?\d{11}\r?$/, message: 'Enter the valid mobile number'}], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" placeholder="Verification code"
                         v-decorator="['otp', {rules: [{ required: true, message: 'Enter the verification code!' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                  class="getCaptcha"
                  tabindex="-1"
                  v-text="!state.smsSendBtn && 'Get code' || (state.time+' s')"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getOTP"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="Email address" disabled>
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                   message="Invalid credentials"/>
          <a-form-item>
            <a-input
                size="large"
                placeholder="Email"
                v-decorator="[
                'email',
                {rules: [{ required: true, message: 'Please enter your email address' },{type: 'email',message: 'The input is not valid E-mail!'}]},
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
                size="large"
                placeholder="Password"
                v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please enter your password' },{ min: 6, message: 'Password minimum 6 character' }]}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <a-form-item style="margin-top:24px">
        <a-button
            size="large"
            type="primary"
            html-type="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
        >Login
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {mapActions} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  props: ['loginOpen'],
  name: "Login",
  data() {
    return {
      form: this.$form.createForm(this),
      customActiveKey: 'tab1',
      isLoginError: false,
      isLoginErrorMessage: '',
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 telephone
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  methods: {
    ...mapActions(['LOGIN']),
    handleTabClick(key) {
      this.customActiveKey = key
    },
    handleSubmit(e) {
      e.preventDefault();

      const {form: {validateFields}, state, customActiveKey, LOGIN} = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab2' ? ['email', 'password'] : ['mobile', 'otp']

      validateFields(validateFieldsKey, {force: true}, (err, values) => {
        if (!err) {
          if (customActiveKey === 'tab1' && state.smsSendBtn === false) {
            this.isLoginError = true
            this.isLoginErrorMessage = 'Verification code expired..';
            state.loginBtn = false;
            return false;
          }
          LOGIN(values)
              .then(() => this.loginSuccess())
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false
              })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      });

    },
    getOTP(e) {
      e.preventDefault()
      const {form: {validateFields}, state} = this

      validateFields(['mobile'], {force: true}, (err, values) => {
        if (!err) {
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
          const hide = this.$message.loading('OTP Sending...', 0)
          ApiService.post('send-otp', {mobile: values.mobile}).then(() => {
            setTimeout(hide, 2500)
          }).catch(err => {
            this.requestFailed(err)
            setTimeout(hide, 1)
            clearInterval(interval)
            state.time = 60
            state.smsSendBtn = false
          })
        }
      })
    },
    loginSuccess() {
      this.$store.dispatch('VERIFY_AUTH');
      this.$emit('closeModel')
    },
    requestFailed(err) {
      this.isLoginError = true
      this.isLoginErrorMessage = ((err.response || {}).data || {}).message || 'Invalid credentials';
    }
  },
}
</script>

<style scoped lang="scss">
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
