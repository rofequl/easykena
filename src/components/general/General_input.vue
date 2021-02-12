<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol"
                  @submit.prevent="onSubmit()" @keydown="form.onKeydown($event)">
      <a-form-model-item ref="app_name" has-feedback="" label="System Name: " prop="app_name">
        <a-input
            v-model="form.app_name"
            @blur="() => {$refs.app_name.onFieldBlur();}"
        />
      </a-form-model-item>
      <a-form-model-item v-if="isBangla" ref="" has-feedback="" label="সিস্টেম নাম: ">
        <a-input placeholder="ওয়েবসাইটের নাম লিখুন.."
        />
      </a-form-model-item>
      <a-form-model-item label="System Logo - White: " prop="logo_white">
        <Image_upload v-model="form.logo_white"/>
      </a-form-model-item>
      <a-form-model-item label="System Logo - Black: " prop="logo_black">
        <Image_upload v-model="form.logo_black"/>
      </a-form-model-item>
      <a-form-item class="mt-5"
                   :wrapperCol="wrapperCol"
                   style="text-align: right"
      >
        <a-button htmlType="submit" type="primary" :loading="form.busy"
                  :disabled="form.busy">Update
        </a-button>
      </a-form-item>
    </a-form-model>
  </div>
</template>

<script>
import Image_upload from "@/components/Form/Image_upload";
import {mapGetters} from 'vuex';
import {isEmptyObject} from "ant-design-vue/lib/vc-form/src/utils";

export default {
  name: "General_input",
  components: {Image_upload},
  data() {
    return {
      labelCol: {lg: {span: 7}, sm: {span: 7}},
      wrapperCol: {lg: {span: 10}, sm: {span: 17}},
      form: new Form({
        app_name: '',
        logo_white: '',
        logo_black: '',
      }),
      rules: {
        app_name: [
          {required: true, message: 'Please input your system name', trigger: 'blur'},
          {max: 100, message: 'System name maximum length 100 character', trigger: 'blur'},
        ],
        logo_white: [
          {required: true, message: 'Please select system logo white', trigger: 'blur'},
        ],
        logo_black: [
          {required: true, message: 'Please select system logo black', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.post('general-settings')
              .then(({data}) => {
                this.$store.commit('SET_GENERAL_LIST', data[0]);
                this.$notification['success']({
                  message: 'congratulations',
                  description: 'Data update successfully.',
                  style: {marginTop: '41px'},
                });
              })
              .catch(err => {
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
      });
    },
    loadData() {
      if (!isEmptyObject(this.generalSettings)) {
        this.form.app_name = this.generalSettings.app_name
        this.form.logo_white = this.showImage(this.generalSettings.logo_white)
        this.form.logo_black = this.showImage(this.generalSettings.logo_black)
      }
    },
  },
  created() {
    this.loadData();
  },
  watch: {
    generalSettings: function () {
      this.loadData();
    }
  },
  computed: {
    ...mapGetters(["generalSettings", "isBangla"])
  },
}
</script>

<style scoped>

</style>
