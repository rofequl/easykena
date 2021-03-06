<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Coupon
        </span>
        <h3 class="page-title">Coupon List</h3>
      </div>
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <div class="mx-auto ml-sm-auto mr-sm-0">
          <CButton @click="modal()" block size="sm" color="info">Add New Coupon</CButton>
        </div>
      </div>
    </div>
    <!-- End Page Header -->

    <!-- Datatable -->
    <div id="people" class="dataTables_wrapper no-footer my-5">
      <v-client-table :data="couponList" :columns="columns" :options="options" class="text-center">
        <div slot="serial" slot-scope="props">
          {{ props.index }}
        </div>

        <div slot="action" slot-scope="props">
          <a-button-group>
           <a-button @click="modalEDit(props.row)" icon="edit"/>
            <a-popconfirm placement="topRight"
                          title="Are you sure delete this product?"
                          ok-text="Yes"
                          cancel-text="No"
                          @confirm="confirm(props.row.id)">
              <a-button icon="delete"/>
            </a-popconfirm>
          </a-button-group>
        </div>
      </v-client-table>
    </div>
    <!-- End Datatable -->
    <a-modal
        :title="modalAdd? 'Add new coupon':'coupon edit'"
        :okText="modalAdd? 'Submit':'Update'"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="modalAdd? submitFormCoupon() : updateFormCoupon()"
        @cancel="cancelForm">
      <a-form-model ref="ruleForm" :model="form" :rules="rules"
                    @keydown="form.onKeydown($event)" :layout="'vertical'">

        <a-row :gutter="16">
          <a-col :md="24" :lg="12">
            <a-form-model-item ref="name" has-feedback="" prop="name"
                               label="Coupon Code:">
              <a-input v-model="form.coupon_code" placeholder="Enter Coupon Code..."
                       @blur="() => {$refs.name.onFieldBlur();}"/>
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :lg="12">
            <a-form-model-item ref="name" has-feedback="" prop="name"
                               label="Discount Amount:">
              <a-input v-model="form.discount_amount" placeholder="Enter Discount Amount..."
                       @blur="() => {$refs.name.onFieldBlur();}"/>
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :lg="12">
            <a-form-model-item ref="name" has-feedback="" prop="name"
                               label="From Date:">
              <a-input type="date" v-model="form.date_from" placeholder="Enter From Date..."
                       @blur="() => {$refs.name.onFieldBlur();}"/>
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :lg="12">
            <a-form-model-item ref="name" has-feedback="" prop="name"
                               label="To Date:">
              <a-input type="date" v-model="form.date_to" placeholder="Enter To Date..."
                       @blur="() => {$refs.name.onFieldBlur();}"/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  name: "CouponsList",
  data() {
    return {
      visible: false,
      modalAdd: true,
      confirmLoading: false,
      form: new Form({
        id:'',
        coupon_code:'',
        discount_amount:'',
        date_to:'',
        date_from:'',
      }),
      rules: {
        coupon_code: [
          {required: true, message: 'Coupon Code is required', trigger: 'blur'},
        ],
        discount_amount: [
          {required: true, message: 'Discount Amount is required', trigger: 'blur'},
        ],
        date_to: [
          {required: true, message: 'To Date is required', trigger: 'blur'},
        ],
        date_from: [
          {required: true, message: 'From Date is required', trigger: 'blur'},
        ],
      }
    };
  },
  created() {
    if (!this.couponList.length > 0) this.$store.dispatch('COUPON_LIST');
  },
  methods: {
    confirm(id) {
      ApiService.delete('coupons/' + id)
          .then(() => {
            this.$store.commit('COUPON_REMOVE', id);
            this.$notification['success']({
              message: 'Congratulations',
              description: 'Coupon deleted successfully.',
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
    },
    modalEDit(e){
      this.form.fill(e);
      this.modalAdd = false;
      this.visible = true;
    },
    modal(e) {
      if (!e) {
        this.modalAdd = true;
        this.form.fill([]);
      } else {
        this.form.fill(e);
        this.modalAdd = false;
      }
      this.visible = true;
    },
    submitFormCoupon() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.visible = false;
          this.form.post('coupons')
              .then(({data}) => {
                this.$store.commit('COUPON_ADD', data);
                this.$refs.ruleForm.resetFields();
                this.$notification['success']({
                  message: 'Congratulations',
                  description: 'Coupons added successfully.',
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
    updateFormCoupon() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.visible = false;
          this.form.put('coupons/' + this.form.id)
              .then(({data}) => {
                this.$store.commit('COUPON_MODIFY', data);
                this.$refs.ruleForm.resetFields();
                this.$notification['success']({
                  message: 'Congratulations',
                  description: 'Coupon update successfully.',
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

  },
  computed: {
    ...mapGetters(["isBangla", "couponList"]),
    columns() {
      return this.isBangla ? ['serial', 'coupon_code', 'discount_amount', 'date_from', 'date_to', 'action'] : ['serial', 'coupon_code', 'discount_amount', 'date_from', 'date_to', 'action'];
    },
    options() {
      return {
        headings: {
          serial: '#',
          coupon_code: 'Coupon Code',
          discount_amount: 'Discount Amount',
          date_from: 'From Date',
          date_to: 'To Date',
        },
        sortable: ['name'],
        filterable: ['name']
      }
    }
  }
}
</script>

<style scoped>

</style>
