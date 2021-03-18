<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Product
        </span>
        <h3 class="page-title">New Product Entry</h3>
      </div>
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <div class="mx-auto ml-sm-auto mr-sm-0">
          <CButton @click="$router.push('/admin/product/product-list')" block size="sm" color="info">Back to Product
            List Page
          </CButton>
        </div>
      </div>
    </div>
    <hr>
    <!-- End Page Header -->
    <a-form-model ref="ruleForm" :model="form" :rules="rules" @keydown="form.onKeydown($event)" :label-col="labelCol"
                  :wrapper-col="wrapperCol" @submit.prevent="onSubmit()">
      <CRow class="my-4 justify-content-center">
        <CCol md="8">
          <CCard>
            <CCardHeader>
              Product Category Select :
            </CCardHeader>
            <CCardBody>
              <div class="card" style="background-color: #dae2ed;">
                <div class="card-body" style="padding: 12px">
                  <c-row>
                    <c-col>
                      <b-form-select v-model="form.category_id" :options="Object.values(categoryList)" value-field="id"
                                     text-field="name" @input="categorySelect" :select-size="14"
                                     class="cat-select-design"></b-form-select>
                    </c-col>
                    <c-col>
                      <b-form-select v-if="subcategory.length > 0" v-model="form.subcategory_id" :options="subcategory"
                                     :select-size="14" value-field="id" @input="subcategorySelect"
                                     text-field="name" class="cat-select-design"></b-form-select>
                    </c-col>
                    <c-col>
                      <b-form-select v-if="subsubcategory.length > 0" v-model="form.sub_subcategory_id"
                                     :options="subsubcategory" @input="subsubcategorySelect"
                                     :select-size="14" value-field="id"
                                     text-field="name" class="cat-select-design"></b-form-select>
                    </c-col>
                  </c-row>
                </div>
                <div class="card-footer bg-white" style="font-size: 13px">
                  Categories Selected:
                  {{ catNameShow(form.category_id, 'category') }} {{ catNameShow(form.subcategory_id, 'subcategory') }}
                  {{ catNameShow(form.sub_subcategory_id, 'sub-subcategory') }}
                  <CIcon v-if="cat_valid" class="text-success" name="cil-check-circle"/>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              Product Information :
            </CCardHeader>
            <CCardBody>
              <a-form-model-item ref="name" has-feedback="" label="Product Name: " prop="name">
                <a-input
                    v-model="form.name" placeholder="Enter the product name"
                    @blur="() => {$refs.name.onFieldBlur();}"/>
              </a-form-model-item>
              <a-form-model-item ref="sort_desc" has-feedback="" label="Product sort description: " prop="sort_desc">
                <a-input
                    v-model="form.sort_desc" placeholder="Enter the product sort description"
                    @blur="() => {$refs.sort_desc.onFieldBlur();}"/>
              </a-form-model-item>
              <a-form-model-item ref="unit" has-feedback="" label="Unit: " prop="unit">
                <a-input
                    v-model="form.unit" placeholder="Unit (e.g. KG, Pc etc)"
                    @blur="() => {$refs.unit.onFieldBlur();}"/>
              </a-form-model-item>
              <a-form-model-item ref="freatured" has-feedback="" label="Featured: " prop="featured">
                <a-input type="checkbox" name="featured" v-model="form.featured" @click="checkboxClick($event,form);"/>
              </a-form-model-item>
              <div class="ant-row ant-form-item">
                <div class="ant-col ant-col-sm-7 ant-col-lg-7 ant-form-item-label">
                  <label title="Tags: " class="">Tags</label>
                </div>
                <div class="ant-col ant-col-sm-17 ant-col-lg-13 ant-form-item-control-wrapper">
                  <div class="ant-form-item-control"><span class="ant-form-item-children">
                    <div v-for='(tag, index) in form.tags' :key='tag' class='tag-input__tag'>
                      <span @click="removeTag(index)">x</span>
                      {{ tag }}
                    </div>
                    <input type='text' placeholder="Enter a Tag" class='ant-input' @keydown.enter='addTag'
                      @keydown.188='addTag'/></span>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              Product Images :
            </CCardHeader>
            <CCardBody>
              <a-form-model-item ref="thumb_image" has-feedback="" label="Thumbnail Image: " prop="thumb_image">
                <Image_upload v-model="form.thumb_image"/>
              </a-form-model-item>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              Product Description :
            </CCardHeader>
            <CCardBody>
              <vue-editor v-model="form.description"/>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              Product price + stock :
            </CCardHeader>
            <CCardBody>
              <a-form-model-item label="Purchase price: " ref="price" has-feedback="" prop="price">
                <a-input-number
                    :min="1" v-model="form.price"
                    :formatter="value => `৳ ${value}`"
                    :parser="value => value.replace('৳', '')"
                />
              </a-form-model-item>
              <a-form-model-item label="Quantity : " ref="quantity" has-feedback="" prop="quantity">
                <a-input-number id="inputNumber" v-model="form.quantity" :min="1"/>
              </a-form-model-item>
            </CCardBody>
          </CCard>
          <a-button htmlType="submit" type="primary" value="large" class="float-right" :loading="form.busy"
                    :disabled="form.busy">Save Product
          </a-button>
        </CCol>
      </CRow>
    </a-form-model>
  </div>
</template>

<script>
import Image_upload from "@/components/Form/Image_upload";
import {mapGetters} from "vuex";

export default {
  name: "ProductAdd",
  data() {
    return {
      labelCol: {lg: {span: 7}, sm: {span: 7}},
      wrapperCol: {lg: {span: 13}, sm: {span: 17}},
      cat_valid: false,
      cat_method: 1,
      form: new Form({
        category_id: '',
        subcategory_id: '',
        sub_subcategory_id: '',
        cat_position: '',
        name: '',
        sort_desc: '',
        unit: '',
        thumb_image: '',
        description: '',
        quantity: 1,
        price: 1,
        tags:[],
        featured:0,
      }),
      subcategory: [],
      subsubcategory: [],
      rules: {
        name: [
          {required: true, message: 'Product name required', trigger: 'blur'},
          {max: 100, message: 'Product name not more than 100 character', trigger: 'blur'},
        ],
        sort_desc: [
          {max: 200, message: 'Product sort description not more than 200 character.', trigger: 'blur'},
        ],
        unit: [
          {max: 50, message: 'Unit not more than 50 character.', trigger: 'blur'},
        ],
        thumb_image: [
          {required: true, message: 'Please select product Thumbnail image', trigger: 'blur'},
        ],
        quantity: [
          {required: true, message: 'Product quantity required', trigger: 'blur'},
        ],
        price: [
          {required: true, message: 'Product price required', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    checkboxClick(e,form){
      if(e.target.checked == true){
        form.featured =1;
      }else{
        form.featured =0;
      }
    },
    categorySelect(e) {
      if (e !== '' && e !== undefined) {
        this.form.subcategory_id = '';
        this.form.sub_subcategory_id = '';
        this.subcategory = [];
        this.subsubcategory = [];
        this.subcategory = this.subcategoryById(e);
        this.cat_method = 1;
        this.cat_valid = !this.subcategory.length > 0;
      }
    },
    subcategorySelect(e) {
      if (e !== '' && e !== undefined) {
        this.form.sub_subcategory_id = '';
        this.subsubcategory = [];
        this.subsubcategory = this.subsubcategoryById(e);
        this.cat_method = 2;
        this.cat_valid = !this.subsubcategory.length > 0;
      }
    },
    subsubcategorySelect(e) {
      if (e !== '' && e !== undefined) {
        this.cat_method = 3;
        this.cat_valid = true;
      }
    },
    catNameShow(id, type) {
      if (type === 'category' && id !== '') {
        let data = this.categoryNameById(id)
        return data ? data.name : '';
      }

      if (type === 'subcategory' && id !== '') {
        let data = this.subcategoryNameById(id)
        return data ? '>>' + data.name : '';
      }

      if (type === 'sub-subcategory' && id !== '') {
        let data = this.subsubcategoryNameById(id)
        return data ? '>>' + data.name : '';
      }
    },
    onSubmit() {
      if (!this.cat_valid) {
        this.$message.config({
          top: '65px',
          duration: 4,
          maxCount: 3,
        });
        this.$message.warning('You are not select category');
        return false;
      }
      this.form.cat_position = this.cat_method;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.post('product')
              .then(() => {
                this.$notification['success']({
                  message: 'congratulations',
                  description: 'Product entry successfully.',
                  style: {marginTop: '41px'},
                });
                this.$router.push({name: 'admin-productList'});
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
    addTag (event) {
      event.preventDefault()
      var val = event.target.value.trim()
      if (val.length > 0) {
        this.form.tags.push(val)
        event.target.value = ''
      }
    },
    removeTag (index) {
      this.form.tags.splice(index, 1)
      }
  },
  created() {
    if (!this.categoryList.length > 0) this.$store.dispatch('CATEGORY_LIST');
    if (!this.subcategoryList.length > 0) this.$store.dispatch('SUBCATEGORY_LIST');
    if (!this.subsubcategoryList.length > 0) this.$store.dispatch('SUBSUBCATEGORY_LIST');
  },
  components: {Image_upload},
  computed: {
    ...mapGetters(["isBangla", "categoryList", "subcategoryList", "subsubcategoryList", "subcategoryById", "subsubcategoryById", "categoryNameById", "subcategoryNameById",
      "subsubcategoryNameById"])
  },
}
</script>

<style scoped>
.custom-select:focus {
  outline: 0;
  border: 0;
  box-shadow: 0 0 0 0;
}

.cat-select-design {
  border: 1px solid #9199a7 !important;
  font-size: 13px;
}
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
