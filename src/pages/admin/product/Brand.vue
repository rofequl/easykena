<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Product
        </span>
        <h3 class="page-title">Brand</h3>
      </div>
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <div class="mx-auto ml-sm-auto mr-sm-0">
          <CButton @click="$refs.child.modal()" block size="sm" color="info">Add New Brand</CButton>
        </div>
      </div>
    </div>
    <!-- End Page Header -->

    <!-- Datatable -->
    <div id="people" class="dataTables_wrapper no-footer my-5">
      <v-client-table :data="brandList" :columns="columns" :options="options" class="text-center">
        <div slot="serial" slot-scope="props">
          {{ props.index }}
        </div>
        <div slot="logo" slot-scope="props">
          <img :src="showImage(props.row.logo)" class="border" width="80px">
        </div>
        <div slot="action" slot-scope="props">
          <a-button-group>
            <a-button @click="$refs.child.modal(props.row)" icon="edit"/>
            <a-popconfirm placement="topRight"
                          title="Are you sure delete this brand?"
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

    <!-- Modal -->
    <BrandAdd ref="child"/>
    <!-- End Modal -->

  </div>
</template>

<script>
import BrandAdd from "@/components/product/BrandAdd";
import ApiService from "@/core/services/api.service";
import {mapGetters} from "vuex";

export default {
  name: "Brand",
  components: {BrandAdd},
  created() {
    if (!this.brandList.length > 0) this.$store.dispatch('BRAND_LIST');
  },
  methods: {
    confirm(id) {
      ApiService.delete('brand/' + id)
          .then((data) => {
            if (data.data.result === 'Error') {
              this.$notification['error']({
                message: 'Warning',
                description: data.data.message,
                style: {marginTop: '41px'},
              });
            } else {
              this.$store.commit('BRAND_REMOVE', id);
              this.$notification['success']({
                message: 'Congratulations',
                description: 'Brand delete successfully.',
                style: {marginTop: '41px'},
              });
            }
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
    ...mapGetters(["isBangla", "brandList"]),
    columns() {
      return this.isBangla ? ['serial', 'name', 'name_bd', 'logo', 'action'] : ['serial', 'name', 'logo', 'action'];
    },
    options() {
      return {
        headings: {
          serial: '#',
          name: 'Brand Name',
          logo: 'Brand Logo',
          name_bd: 'বিভাগের নাম',
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
