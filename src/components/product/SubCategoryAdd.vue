<template>
  <a-modal
      :title="modalAdd? 'Add new sub-category':'Sub-category information edit'"
      :okText="modalAdd? 'Submit':'Update'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="modalAdd? submitForm() : updateForm()"
      @cancel="cancelForm">
    <a-form-model ref="ruleForm" :model="form" :rules="rules"
                  @keydown="form.onKeydown($event)" :layout="'vertical'">

      <a-row :gutter="16">
        <a-col :md="24" :lg="12">
          <a-form-model-item ref="category_id" has-feedback="" prop="category_id"
                             label="Category Name:">
            <a-select show-search placeholder="Select Category" style="width: 100%"
                      option-filter-prop="children" :filter-option="filterOption" v-model="form.category_id">
              <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">
                {{ category.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :md="24" :lg="12">
          <a-form-model-item ref="name" has-feedback="" prop="name"
                             label="Sub-category Name:">
            <a-input v-model="form.name" placeholder="Enter sub-category name..."
                     @blur="() => {$refs.name.onFieldBlur();}"/>
          </a-form-model-item>
        </a-col>
        <a-col v-if="isBangla" :md="24" :lg="12">
          <a-form-model-item ref="name_bd" has-feedback="" prop="name_bd"
                             label="উপ-বিভাগের নাম:">
            <a-input v-model="form.name_bd" placeholder="উপ-বিভাগের নাম লিখুন ..."
                     @blur="() => {$refs.name_bd.onFieldBlur();}"/>
          </a-form-model-item>
        </a-col>
        <a-col :md="24" :lg="12">
          <a-form-model-item label="Sub-category Banner: " prop="banner" help="Image size 800 X 300">
            <Image_upload v-model="form.banner"/>
          </a-form-model-item>
        </a-col>
      </a-row>


    </a-form-model>
  </a-modal>
</template>

<script>
import Image_upload from "@/components/Form/Image_upload";
import {mapGetters} from "vuex";

export default {
  name: "SubCategoryAdd",
  data() {
    return {
      visible: false,
      modalAdd: true,
      confirmLoading: false,
      form: new Form({
        id: '',
        name: '',
        name_bd: '',
        category_id: undefined,
        slug: '',
        banner: '',
      }),
      rules: {
        name: [
          {required: true, message: 'Sub-Category name is required', trigger: 'blur'},
          {max: 50, message: 'Sub-Category name maximum length 50 character', trigger: 'blur'},
        ],
        name_bd: [
          {required: true, message: 'উপ-বিভাগের নাম আবশ্যক', trigger: 'blur'},
          {max: 100, message: 'উপ-বিভাগের নাম সর্বাধিক দৈর্ঘ্য 100 অক্ষর', trigger: 'blur'},
        ],
        banner: [
          {required: true, message: 'Please select banner image', trigger: 'blur'},
        ],
        category_id: [
          {required: true, message: 'Please select category', trigger: 'blur'},
        ],
      }
    };
  },
  methods: {
    modal(e) {
      if (!e) {
        this.modalAdd = true;
      } else {
        this.form.fill(e);
        this.form.banner = this.showImage(e.banner)
        this.modalAdd = false;
      }
      this.visible = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.visible = false;
          this.form.post('subcategory')
              .then(({data}) => {
                this.$store.commit('SUBCATEGORY_ADD', data);
                this.$notification['success']({
                  message: 'Congratulations',
                  description: 'Sub-category add successfully.',
                  style: {marginTop: '41px'},
                  duration: 4
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
    updateForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.visible = false;
          this.form.put('subcategory/' + this.form.id)
              .then(({data}) => {
                this.$store.commit('SUBCATEGORY_MODIFY', data);
                this.$refs.ruleForm.resetFields();
                this.$notification['success']({
                  message: 'Congratulations',
                  description: 'Sub-category update successfully.',
                  style: {marginTop: '41px'},
                  duration: 4
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
    cancelForm() {
      this.$refs.ruleForm.resetFields();
      this.visible = false;
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
  components: {Image_upload},
  created() {
    if (!this.categoryList.length > 0) this.$store.dispatch('CATEGORY_LIST');
  },
  computed: {
    ...mapGetters(["isBangla", "categoryList"])
  },
}
</script>

<style scoped>

</style>
