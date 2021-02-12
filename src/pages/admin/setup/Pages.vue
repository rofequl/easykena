<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Setup & Configurations
        </span>
        <h3 class="page-title">Website Pages</h3>
      </div>
    </div>
    <hr>
    <!-- End Page Header -->

    <!-- Table -->
    <div class="card card-body p-0">
      <a-table :columns="columns" :data-source="data" :pagination="false">
        <span slot="url" slot-scope="text">
          <a :href="text" target="_blank">{{text}}</a>
        </span>
        <span slot="action">
          <a-button @click="$router.push({name:'home-edit'})" icon="edit"/>
        </span>
      </a-table>
    </div>
    <!-- End Table -->

  </div>
</template>

<script>

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
    scopedSlots: {customRender: 'url'},
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];

export default {

  name: "Pages",
  data() {
    return {
      data: [],
      columns,
    };
  },
  methods: {
    loadData() {
      console.log(window.location.origin)
      this.data.push(
          {
            key: '1',
            name: 'Home',
            url: window.location.origin,
          }
      )
    }
  },
  created() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>
