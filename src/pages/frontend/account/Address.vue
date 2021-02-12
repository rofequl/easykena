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
            <a-table :columns="columns" :data-source="addressList" :pagination="false" rowKey="id">
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
                <span style="font-size: 12px;color: #2db7f5">{{ text === 0 ? 'Default Shipping Address' : '' }}</span>
              </span>
              <span slot="action" slot-scope="text, record">
                EDIT
              </span>
            </a-table>
            <a-button @click="$router.push('/user-address/add')" class="float-right mt-5" type="primary" icon="plus">
              ADD NEW ADDRESS
            </a-button>
          </a-card>
        </div>
      </div>
    </div>
  </a-layout-content>
</template>

<script>

import {mapGetters} from "vuex";

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
    };
  },
  created() {
    if (!this.addressList.length > 0) this.$store.dispatch('ADDRESS_LIST');
  },
  computed: {
    ...mapGetters(["addressList"])
  }
}
</script>

<style scoped>

</style>
