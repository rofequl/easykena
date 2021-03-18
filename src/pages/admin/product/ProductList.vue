<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Product
        </span>
        <h3 class="page-title">Product List</h3>
      </div>
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <div class="mx-auto ml-sm-auto mr-sm-0">
          <CButton @click="$router.push('/admin/product/product-add')" block size="sm" color="info">Add New Product
          </CButton>
        </div>
      </div>
    </div>
    <!-- End Page Header -->
    <!-- Datatable -->
    <div id="people" class="dataTables_wrapper no-footer my-5">
      <v-client-table :data="productList" :columns="columns" :options="options" class="text-center">
        <div slot="serial" slot-scope="props">
          {{ props.index }}
        </div>
        <div slot="thumb_image" slot-scope="props">
          <img :src="showImage(props.row.thumb_image)" class="border" width="80px">
        </div>
        <div slot="tags" slot-scope="props" >
          <div v-for='(tag, index) in props.row.tags' :key='tag' class='ant-tag ant-tag-has-color' style="background: #40a9ff;">
            {{ tag }}
          </div>
        </div>
        <div slot="featured" slot-scope="props">
          <p v-if="props.row.featured == 1">Yes</p>
          <p v-else>No</p>
        </div>
        <div slot="action" slot-scope="props">
          <a-button-group>
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
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  name: "ProductList",
  created() {
    if (!this.productList.length > 0) this.$store.dispatch('PRODUCT_LIST');
  },
  methods: {
    confirm(id) {
      ApiService.delete('product/' + id)
          .then(() => {
            this.$store.commit('PRODUCT_REMOVE', id);
            this.$notification['success']({
              message: 'Congratulations',
              description: 'Product delete successfully.',
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
    ...mapGetters(["isBangla", "productList"]),
    columns() {
      return this.isBangla ? ['serial', 'thumb_image', 'name','tags', 'quantity', 'price','featured', 'action'] : ['serial', 'thumb_image', 'name','tags', 'quantity', 'price','featured', 'action'];
    },
    options() {
      return {
        headings: {
          serial: '#',
          name: 'Product Name',
          tags:'Tags',
          featured:'Featured',
          thumb_image: 'Thumbnail Image',
        },
        sortable: ['name'],
        filterable: ['name','tags']
      }

    }
  }
}
</script>

<style scoped>

</style>
