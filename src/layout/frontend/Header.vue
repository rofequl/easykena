<template>
  <div>
    <div class="header-wrapper">
      <div class="header-top border-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="offset-xl-9 offset-lg-8 offset-md-7 offset-4 col-8 col-md-4 col-lg-3 col-xl-3">
              <ul class="nav ml-lg-2 ml-xl-5">
                <li class="nav-item active">
                  <router-link class="nav-link" to="/">Help
                    <i style="font-size: 13px" class="fas fa-question"></i>
                  </router-link>
                </li>
                <!--            <li class="nav-item">-->
                <!--              <a href="" class="nav-link">BN/ENG</a>-->
                <!--            </li>-->
                <li class="nav-item dropdown">
                  <a-dropdown class="nav-link">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                      Account
                    </a>
                    <a-menu slot="overlay" v-if="$store.getters.isAuthenticated">
                      <a-menu-item v-if="$store.getters.isAdmin" key="1" @click="$router.push('/admin')">
                    <span>
                      <a-icon type="user"/>
                      My Panel</span>
                      </a-menu-item>
                      <a-menu-item v-else key="1" @click="$router.push('/user-profile')">
                    <span>
                      <a-icon type="user"/>
                      Manage My Account</span>
                      </a-menu-item>
                      <a-menu-item key="2" @click="$store.dispatch('LOGOUT')">
                        <span><a-icon type="logout"/> Logout</span>
                      </a-menu-item>
                    </a-menu>
                    <a-menu slot="overlay" v-else>
                      <a-menu-item class="p-4">
                    <span class="d-block pb-3 font-weight-bold" to="/">Welcome To
                     {{ isBangla ? generalSettings.app_name_bd : generalSettings.app_name }}
                    </span>
                        <a id="sign-in" class="btn active btn-outline-success btn-sm"
                           style="background: #f05931;border-color: #f05931;" @click.prevent="loginModel = true">Sign
                          In</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="logo-search-section" :class="{headerTopValue : scrolling}">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4 col-lg-3 col-xl-3 col-sm-3 col-6">
              <router-link to="/" style="height: 61px">
                <img :src="showImage(generalSettings.logo_black)" class="logo"
                     alt="Logo">
              </router-link>
            </div>
            <div class="col-12 col-sm-7 col-md-5 col-lg-6 col-xl-6">
              <div class="row">
                <div class="col-2 col-sm-2 col-md-0 d-md-none">
                  <a-button type="link" @click="$store.commit('toggleSidebarFrontend')" style="font-size: 25px"
                            class="text-black-50">
                    <i class="fas fa-bars"></i>
                  </a-button>
                </div>
                <div class="col-10 col-sm-10 col-md-12 my-2">
                  <div class="input-group cus-input-group">
                    <input type="text" class="form-control" aria-label="Text input with dropdown button">
                    <button type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-2 col-sm-2 col-lg-2 col-xl-2">
              <div class="add-to-card-wrapper">
                <a href="" title="Orders"><i class="fas fa-heart"></i> <sup class="badge badge-success">0</sup></a>
                <a href="/" @click.prevent="cartOpen = true" title="Card"><i class="fas fa-shopping-cart"></i> <sup
                    class="badge badge-success">{{ this.$store.getters.cartProductCount }}</sup></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Cart :cartOpen="cartOpen" @closeDrawer="cartOpen = false"/>
    <Login :loginOpen="loginModel" @closeModel="loginModel = false"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Cart from "@/layout/frontend/Cart";
import Login from "@/components/Form/Login";

export default {
  name: "Header",
  components: {Login, Cart},
  data() {
    return {
      scrolling: true,
      cartOpen: false,
      loginModel: false,
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 20) {
        this.scrolling = false
        this.$store.commit('toggleSidebarTopSize', true)
      } else {
        this.scrolling = true
        this.$store.commit('toggleSidebarTopSize', false)
      }
    }
  },
  computed: {
    ...mapGetters(["generalSettings", "isBangla"])
  },
}
</script>

<style scoped>

</style>
