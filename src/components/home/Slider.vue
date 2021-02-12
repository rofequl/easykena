<template>
  <div>
    <b-carousel v-if="multiple"
                id="carousel-fade"
                controls
                fade indicators
                img-width="100%"
                img-height="300px"
    >
      <b-carousel-slide v-for="(photo, k) in slide" :key="k"
                        :img-src="showImage(photo)"
      ></b-carousel-slide>
    </b-carousel>
    <b-carousel v-else
                id="carousel-fade"
                fade
                img-width="100%"
                img-height="300px"
    >
      <b-carousel-slide :img-src="showImage(slide)"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: {
    slide: {
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    }
  },
  name: "Slider"
}
</script>

<style scoped>
#carousel-fade >>> img {
  border-radius: 20px;
  height: 300px !important;
  border: 2px solid #00000014;
}
</style>
