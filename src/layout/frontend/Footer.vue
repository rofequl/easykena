<template>
  <a-layout-footer class="bg-white p-0">

    <div class="container pt-3">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="footer-description">
            <div class="logo">
              <img :src="showImage(generalSettings.logo_black)" width="200px" class="logo" alt="Logo">
            </div>
            <p class="pt-4 pb-4" style="font-size: 13px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
            <a href=""><i class="fab fa-facebook"></i></a>
            <a href=""><i class="fab fa-twitter"></i></a>
            <a href=""><i class="fab fa-youtube"></i></a>
            <a href=""><i class="fab fa-instagram"></i></a>
          </div><!-- .footer-description end -->
        </div><!-- .col-12 end -->
        <div class="col-12 col-md-7">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="quick-link">
                <h3 class="font-weight-bold h6 mb-5">Quick Link</h3>
                <a href="" class="text-dark">Term & Conditions</a>
                <a href="" class="text-dark">Shipping</a>
                <a href="" class="text-dark">Privacy Policy</a>
                <a href="" class="text-dark">Help</a>
                <a href="" class="text-dark">Products Return</a>
                <a href="" class="text-dark">FAQS</a>
              </div><!-- .footer-title end -->
            </div><!-- .col-12 end -->
            <div class="col-12 col-md-6">
              <div class="contact-us">
                <h3 class="font-weight-bold h6 mb-5">Contact Us</h3>
                <a href="" class="text-dark"><i class="fas fa-map-marker-alt"></i> Chromium Co , 25 Silicon
                  Road, London D04 89GR</a>
                <a href="" class="text-dark"><i class="fas fa-mobile-alt"></i> +27 34 66 2455-198</a>
                <a href="" class="text-dark">Mon-Fri 8:00 to 19:00</a>
                <a href="" class="text-dark"><i class="fas fa-envelope"></i> example@example.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="container">
      <p class="text-center mt-2">&copy; 2021 <a href="/" class="text-success">{{ generalSettings.app_name }}</a> All
        Rights
        Resurved</p>
    </div>
  </a-layout-footer>
</template>

<script>
import {mapGetters} from "vuex";


export default {
  name: "Footer",
  computed: {
    ...mapGetters(["generalSettings", "isBangla"])
  },
}
</script>

<style scoped>
/*Footer Top*/
p {
  font-size: 13px;
}

.h6 {
  margin: 10px 0 !important;
}

.footer-description a {
  padding: 2px 5px;
}

.footer-description i {
  color: #777777;
}

.quick-link a {
  font-size: 14px;
  padding: 5px 0;
  display: block;
}

.contact-us a {
  font-size: 14px;
  display: block;
  padding: 8px 0;
}

.shopping-online a {
  font-size: 14px;
  display: block;
  padding: 8px 0;
}
</style>
