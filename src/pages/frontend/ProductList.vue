<template>
  <a-layout style="padding: 0 24px 24px" class="fcontent">
    <div class="container mt-3">
      <Slider :slide="banner" :multiple="false"/>
      <div class="my-3">
        <a-breadcrumb>
          <a-breadcrumb-item v-if="category_id !== ''">
            <router-link :to="{name: 'category', params: { cat: categoryNameById(category_id).slug }}">
              {{ categoryNameById(category_id).name }}
            </router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-if="subcategory_id !== ''">
            <router-link
                :to="{name: 'category', params: { cat: categoryNameById(category_id).slug, sub: subcategoryNameById(subcategory_id).slug, }}">
              {{ subcategoryNameById(subcategory_id).name }}
            </router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-if="sub_subcategory_id !== ''">{{
              subsubcategoryNameById(sub_subcategory_id).name
            }}
          </a-breadcrumb-item>
          <a-breadcrumb-item>({{ product_list.length }} Results)</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="product-item-categoryHeader">
        <hr class="first">
        <div class="name">
          {{ name }}
        </div>
        <hr class="last">
      </div>

      <CatListing :list="categoryListing" :catType="child_position"/>
      <ProductListing v-if="categoryListing.length < 1" :product="product_list"/>
    </div>
  </a-layout>
</template>

<script>
import Slider from "@/components/home/Slider";
import CatListing from "@/components/product_list/CatListing";
import ProductListing from "@/components/product_list/ProductListing";
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  name: "ProductList",
  data() {
    return {
      banner: '',
      name: '',
      category_id: '',
      subcategory_id: '',
      sub_subcategory_id: '',
      child_position: '',
      child_id: '',
      subcategory_list: [],
      sub_subcategory_list: [],
      product_list: [],
    }
  },
  components: {ProductListing, CatListing, Slider},
  methods: {
    loadChild() {
      if (this.$route.params.subcat) {
        this.child_position = 3;
      } else {
        if (this.$route.params.sub) {
          this.child_position = 2;
        } else {
          this.child_position = 1;
        }
      }
    },
    loadCategory() {
      if (this.$route.params.cat) {
        if (this.categoryList.length > 0) {
          let category = this.categoryNameBySlug(this.$route.params.cat);
          if (category) {
            this.category_id = category.id;
            this.child_position === 1 ? this.child_id = category.id : '';
          } else this.$router.push({name: "error-404"});
        }
      }
    },
    loadSubcategory() {
      if (this.category_id !== '' && this.subcategoryList.length > 0) {
        this.subcategory_list = this.subcategoryById(this.category_id);
        if (this.$route.params.sub) {
          let subcategory = this.subcategoryNameBySlug(this.$route.params.sub);
          if (subcategory) {
            this.subcategory_id = subcategory.id;
            this.child_position === 2 ? this.child_id = subcategory.id : '';
          } else this.$router.push({name: "error"});
        }
      }
    },
    loadSubSubcategory() {
      if (this.subcategory_id !== '' && this.subsubcategoryList.length > 0) {
        this.sub_subcategory_list = this.subsubcategoryById(this.subcategory_id);
        if (this.$route.params.subcat) {
          let sub_subcategory = this.subsubcategoryNameBySlug(this.$route.params.subcat);
          if (sub_subcategory) {
            this.sub_subcategory_id = sub_subcategory.id;
            this.child_position === 3 ? this.child_id = sub_subcategory.id : '';
          } else this.$router.push({name: "error"});
        }
      }
    },
    loadProduct() {
      let url = '';
      if (this.child_position === 1) {
        this.banner = this.categoryNameById(this.category_id).banner;
        this.name = this.categoryNameById(this.category_id).name;
        url += 'category=' + this.child_id;
        if (this.subcategory_list.length === 0) {
          url = 'product-listing?' + url;
          ApiService.get(url)
              .then(({data}) => {
                this.product_list = data;
              })
        }
      }

      if (this.child_position === 2) {
        this.banner = this.subcategoryNameById(this.subcategory_id).banner;
        this.name = this.subcategoryNameById(this.subcategory_id).name;
        url += '&subcategory=' + this.child_id;
        if (this.sub_subcategory_list.length === 0) {
          url = 'product-listing?' + url;
          ApiService.get(url)
              .then(({data}) => {
                this.product_list = data;
              })
        }
      }

      if (this.child_position === 3) {
        this.banner = this.subsubcategoryNameById(this.sub_subcategory_id).banner;
        this.name = this.subsubcategoryNameById(this.sub_subcategory_id).name;
        url += '&subsubcategory=' + this.child_id;
        url = 'product-listing?' + url;
        ApiService.get(url)
            .then(({data}) => {
              this.product_list = data;
            })
      }
    }
  },
  created() {
    this.loadChild();
    this.loadCategory();
  },
  watch: {
    categoryList() {
      this.loadCategory();
    },
    subcategoryList() {
      this.loadSubcategory();
    },
    category_id() {
      this.loadSubcategory();
    },
    subsubcategoryList() {
      this.loadSubSubcategory();
    },
    subcategory_id() {
      this.loadSubSubcategory();
    },
    child_id() {
      this.loadProduct();
    },
  },
  computed: {
    ...mapGetters(["categoryList", "subcategoryList", "subsubcategoryList", "categoryNameById", "categoryNameBySlug", "subcategoryById", "subsubcategoryById",
      "subcategoryNameBySlug", "subsubcategoryNameBySlug", "subcategoryNameById", "subsubcategoryNameById"]),
    categoryListing() {
      if (this.child_position === 1) {
        return this.subcategory_list;
      } else if (this.child_position === 2) {
        return this.sub_subcategory_list;
      } else return [];
    }
  }
}
</script>

<style scoped>

</style>
