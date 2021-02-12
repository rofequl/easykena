<template>
  <a-layout-content>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="main-menu mt-0">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link" href="#">Offers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Discount</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">New Recipes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Product Request</a>
              </li>
            </ul>
          </div>
          <Slider :slide="homeSlider" :multiple="true"/>
          <Featured/>
        </div>
      </div>
    </div>
    <Newsletter/>
  </a-layout-content>
</template>

<script>
import {mapGetters} from "vuex";
import Slider from "@/components/home/Slider";
import Deal from "@/components/home/Deal";
import Newsletter from "@/components/home/Newsletter";
import Featured from "@/components/home/Featured";

export default {
  name: "Home",
  components: {Deal, Slider, Newsletter, Featured},
  computed: {
    ...mapGetters(["isBangla", "categoryList", "subcategoryList", "subsubcategoryList", "homeSlider"]),
  }
}
</script>

<style scoped>
a {
  color: #333 !important;
}
</style>
