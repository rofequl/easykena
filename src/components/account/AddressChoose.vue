<template>
  <a-modal v-model="visible" :width="720" :footer="null">
    <template slot="title">
      <p class="my-0" style="font-size: 20px">Shipping Address |
        <a href="#" style="font-size: 12px">Add new address</a>
      </p>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </a-modal>
</template>

<script>
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
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
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
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
  },
];

const data = [];

export default {
  name: "AddressChoose",
  data() {
    return {
      visible: true,
      data,
      columns,
    };
  },
}
</script>

<style scoped>

</style>
