<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Order
        </span>
        <h3 class="page-title">Orders List</h3>
      </div>
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <!-- <div class="mx-auto ml-sm-auto mr-sm-0">
          <CButton @click="$router.push('/admin/product/product-add')" block size="sm" color="info">Add New Product
          </CButton>
        </div> -->
      </div>
    </div>
    <!-- End Page Header -->

    <!-- Datatable -->
    <div id="people" class="dataTables_wrapper no-footer my-5">
      <v-client-table :data="orderList" :columns="columns" :options="options" class="text-center">
        <div slot="serial" slot-scope="props">
          {{ props.index }}
        </div>
        <div slot="thumb_image" slot-scope="props">
          {{ props.id}}
        </div>
        <div slot="status" slot-scope="props">
          <a-tag v-if="props.row.status == 0" color="#2db7f5">PENDING</a-tag>
          <a-tag v-if="props.row.status == 1" color="#108ee9">DELIVERED</a-tag>
          <a-tag v-if="props.row.status == 2" color="#108ee9">CANCELED</a-tag>
        </div>
        <div slot="action" slot-scope="props">
          <a-button-group>
           <a-button @click="modal(props.row.id)" icon="edit"/>
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
        :width="750"
        :footer=null
        :visible="visible"
        :confirm-loading="confirmLoading"
        @cancel="closeModal()">
        <div class="panel">
   <div class="panel-body">
      <div class="invoice-masthead">
         <div class="invoice-text">
            <h3 class="h1 text-thin mar-no text-primary">Order Details</h3>
         </div>
      </div>
      <div class="row">
         <div class="col-lg-3">
            <label for="update_delivery_status&quot;&quot;">Delivery Status</label>
            <select v-model="orderDetails.status" @change="orderStatusChange(orderDetails.status,orderDetails.id);" class="form-control demo-select2 select2-hidden-accessible" data-minimum-results-for-search="Infinity" id="update_delivery_status" tabindex="-1" aria-hidden="true">
               <option value="0" selected="">Pending</option>
               <option value="1">Delivered</option>
               <option value="2">Canceled</option>
            </select>
         </div>
      </div>
      <hr>
      <div class="invoice-bill row">
         <div class="col-sm-6 text-xs-center">
            <address>
               <strong class="text-main">{{orderDetails.full_name}}</strong><br>
               {{orderDetails.email}}<br>
               {{orderDetails.phone_number}}<br>
               {{orderDetails.address}}
            </address>
         </div>
         <div class="col-sm-6 text-xs-center">
            <table class="invoice-details">
               <tbody>
                  <tr>
                     <td class="text-main text-bold">
                        Order #
                     </td>
                     <td class="text-right text-info text-bold">
                        {{orderDetails.id}}
                     </td>
                  </tr>
                  <tr>
                     <td class="text-main text-bold">
                        Order Status
                     </td>
                     <td class="text-right">
                        <span class="badge badge-info" v-if="orderDetails.status == 0">Pending</span>
                        <span class="badge badge-info" v-if="orderDetails.status == 1">Delivered</span>
                        <span class="badge badge-info" style="background-color: #f5222d;" v-if="orderDetails.status == 2">Canceled</span>
                     </td>
                  </tr>
                  <tr>
                     <td class="text-main text-bold">
                        Order Date
                     </td>
                     <td class="text-right">
                        {{orderDetails.date}}
                     </td>
                  </tr>
                  <tr>
                     <td class="text-main text-bold">
                        Total amount
                     </td>
                     <td class="text-right">
                        {{orderDetails.total}}
                     </td>
                  </tr>
                  <tr>
                     <td class="text-main text-bold">
                        Payment method
                     </td>
                     <td class="text-right">
                        Cash on delivery
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
      <hr class="new-section-sm bord-no">
      <div class="row">
         <div class="col-lg-12 table-responsive">
            <table class="table table-bordered invoice-summary">
               <thead>
                  <tr >
                     <th class="min-col">#</th>
                     <th class="text-uppercase">
                        Product
                     </th>
                     <th class="text-uppercase">
                        Delivery Type
                     </th>
                     <th class="min-col text-center text-uppercase">
                        Qty
                     </th>
                     <th class="min-col text-center text-uppercase">
                        Price
                     </th>
                     <th class="min-col text-right text-uppercase">
                        Total
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr  v-for="(orderItem, k) in orderItems" :key="k">
                     <td>{{k+1}}</td>
                     <td>
                        <strong>{{orderItem.item_name}}</strong>
                     </td>
                     <td>
                        Home Delivery
                     </td>
                     <td class="text-center">
                        {{orderItem.quantity}}
                     </td>
                     <td class="text-center">
                        ৳ {{orderItem.price}}
                     </td>
                     <td class="text-center">
                        ৳ {{orderItem.price * orderItem.quantity }}
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
      <div class="clearfix">
         <table class="table invoice-total">
            <tbody>
               <tr>
                  <td>
                     <strong>Sub Total :</strong>
                  </td>
                  <td style="text-align: right;">
                     ৳ {{orderSubtotal}}
                  </td>
               </tr>
               <tr>
                  <td>
                     <strong>Discount :</strong>
                  </td>
                  <td style="text-align: right;">
                     ৳ {{ orderDetails.discount_amount}}
                  </td>
               </tr>

               <tr>
                  <td>
                     <strong>TOTAL :</strong>
                  </td>
                  <td class="text-bold h4" style="text-align: right;">
                     ৳ {{ orderDetails.total}}
                  </td>
               </tr>
            </tbody>
         </table>
      </div>

   </div>
</div>

    </a-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  name: "OrdersList",
  data() {
    return {
      visible: false,
      modalAdd: true,
      confirmLoading: false,
      orderDetails:{
        id:'',
        full_name:'',
        address:'',
        email:'',
        phone_number:'',
        total:'',
        discount:'',
        status:'',
      },
      orderItems:[],
      orderSubtotal:0,
    };
  },
  created() {
    if (!this.orderList.length > 0) this.$store.dispatch('ORDER_LIST');
  },
  methods: {
    modal(e) {
        this.orderDetailsGet(e);
      this.visible = true;
    },
    orderStatusChange(status,id){
      ApiService.put('orders_status_change/' + id,{'status':status})
          .then((data) => {
            this.$store.commit('ORDER_MODIFY', data.data);
            this.$notification['success']({
              message: 'Congratulations',
              description: 'Order Status Changed successfully.',
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
    totalValue: function () {
      let amount = [];
      amount = this.orderItems.map((e) => {
        return e.price * e.quantity;
      })
      this.orderSubtotal = amount.reduce((a, b) => a + b, 0);
    },
    orderDetailsGet:function(id){
      ApiService.get('orders_details/' + id)
          .then((data) => {

            this.orderDetails=data.data.order;
            this.orderItems=data.data.orderItems;
            this.totalValue();

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

    closeModal:function(){
      this.visible=false;
    },
    confirm(id) {
      ApiService.delete('orders/' + id)
          .then(() => {
            this.$store.commit('ORDER_REMOVE', id);
            this.$notification['success']({
              message: 'Congratulations',
              description: 'Order deleted successfully.',
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
  },
  computed: {
    ...mapGetters(["isBangla", "orderList"]),
    columns() {
      return this.isBangla ? ['serial', 'id', 'full_name', 'address','email','phone_number','total', 'discount','status', 'action'] : ['serial', 'id', 'full_name', 'address','email','phone_number','total', 'discount', 'status','action'];
    },
    options() {
      return {
        headings: {
          serial: '#',
          id: 'Order Id',
          full_name: 'Client',
          status:'Status',
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
