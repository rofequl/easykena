<template>
  <div v-if="list.length > 0" style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="6" class="mb-2" v-for="(data, k) in list" :key="k">
        <a-card hoverable :bordered="false" size="small" @click="urlClick(data)">
          <img
              slot="cover"
              alt="example"
              :src="showImage(data.banner)"/>
          <a-card-meta :title="data.name"></a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['list', 'catType'],
  name: "CatListing",
  methods: {
    urlClick(e) {
      if (this.catType === 1) this.$router.push({
        name: 'category',
        params: {cat: this.categoryNameById(e.category_id).slug, sub: e.slug}
      });
      else if (this.catType === 2) this.$router.push({
        name: 'category',
        params: {
          cat: this.categoryNameById(e.category_id).slug,
          sub: this.subcategoryNameById(e.subcategory_id).slug,
          subcat: e.slug
        }
      });
    },
  },
  computed: {
    ...mapGetters(["categoryNameById", "subcategoryNameById"]),
  }
}
</script>

<style scoped>

</style>
