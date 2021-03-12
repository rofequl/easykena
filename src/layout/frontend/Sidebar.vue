<template>

  <a-layout-sider width="300"
                  :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 2,background:'white !important',}"
                  :class="{top:$store.state.sidebarTopSize,customStyle:$store.state.sidebarMinimizeFront}"
                  class="border-right">
    <div class="all-category">
      <span class="font-weight-bold">Category List</span>
      <router-link to="/category" class="float-right text-white">View All</router-link>
    </div>
    <a-menu :open-keys="openKeys" :default-selected-keys="defaultKey"
            mode="inline"
            :style="{ height: '90%', borderRight: 0 }">
      <template v-for="category in categoryList">
        <a-menu-item v-if="!subcategoryById(category.id).length > 0" :key="category.slug"
                     @click="categoryClick(category.slug)">
          <img :src="showImage(category.icon)" width="15px" class="mr-2">
          <span>{{ category.name }}</span>
        </a-menu-item>
        <a-sub-menu v-if="subcategoryById(category.id).length > 0" :key="category.slug"
                    @titleClick="categoryClick(category.slug)">
          <span slot="title">
         <img :src="showImage(category.icon)" width="15px" class="mr-2">
          <span>{{ category.name }}</span>
          </span>
          <template v-for="subcategory in subcategoryById(category.id)">
            <a-menu-item v-if="!subsubcategoryById(subcategory.id).length > 0" :key="subcategory.slug"
                         @click="subcategoryClick(category.slug, subcategory.slug)">
              <span>{{ subcategory.name }}</span>
            </a-menu-item>
            <a-sub-menu v-if="subsubcategoryById(subcategory.id).length > 0" :key="subcategory.slug"
                        @titleClick="subcategoryClick(category.slug, subcategory.slug)">
             <span slot="title">
          <span>{{ subcategory.name }}</span>
          </span>
              <template v-for="subsubcategory in subsubcategoryById(subcategory.id)">
                <a-menu-item :key="subsubcategory.slug"
                             @click="sub_subcategoryClick(category.slug, subcategory.slug, subsubcategory.slug)">
                  <span>{{ subsubcategory.name }}</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      openKeys: [],
      defaultKey: [],
    };
  },
  methods: {
    categoryClick(e) {
      this.$router.push({name: 'category', params: {cat: e}}).catch(()=>{})
    },
    subcategoryClick(cat, sub) {
      this.$router.push({name: 'category', params: {cat: cat, sub: sub}}).catch(()=>{})
    },
    sub_subcategoryClick(cat, sub, subCat) {
      this.$router.push({name: 'category', params: {cat: cat, sub: sub, subcat: subCat}}).catch(()=>{})
    },
    openSidebar() {
      this.openKeys = [];
      if (this.$route.params.cat) this.openKeys.push(this.$route.params.cat);
      if (this.$route.params.sub) this.openKeys.push(this.$route.params.sub);
      if (this.$route.params.subcat) this.openKeys.push(this.$route.params.subcat);
    },
    loadChild() {
      this.defaultKey = [];
      if (this.$route.params.subcat) this.defaultKey.push(this.$route.params.subcat);
      else if (this.$route.params.sub) this.defaultKey.push(this.$route.params.sub);
      else if (this.$route.params.cat) this.defaultKey.push(this.$route.params.cat);
    },
  },
  created() {
    this.loadChild();
    this.openSidebar();
    if (!this.categoryList.length > 0) this.$store.dispatch('CATEGORY_LIST');
    if (!this.subcategoryList.length > 0) this.$store.dispatch('SUBCATEGORY_LIST');
    if (!this.subsubcategoryList.length > 0) this.$store.dispatch('SUBSUBCATEGORY_LIST');
  },
  computed: {
    ...mapGetters(["isBangla", "categoryList", "subcategoryList", "subsubcategoryList", "subcategoryById", "subsubcategoryById"]),
  },
  watch: {
    $route: function () {
      this.openSidebar();
      this.loadChild();
    }
  }
}
</script>

<style scoped>
.top {
  top: 61px;
  transition: all 0.5s;
}


@media only screen and (max-width: 770px) {
  .top {
    top: 90px;
    transition: all 0.5s;
  }

  .customStyle {
    width: 0 !important;
    min-width: 0 !important;
  }
  .ant-layout-sider {
   background:white !important;
  }
}
</style>
