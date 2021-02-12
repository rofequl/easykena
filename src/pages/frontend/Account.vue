<template>
  <a-layout-content>
    <div class="container">
      <div class="row mt-4">
        <div class="col-12">
          <h3 style="color: #5b5555">Manage My Account</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <a-card style="width: 100%">
            <p style="font-size: 18px">Personal Profile |
              <router-link to="/user-profile/edit" style="font-size: 12px">EDIT</router-link>
            </p>
            <p class="mb-1">{{ user.name }}</p>
            <p class="mb-1">{{ user.email }}</p>
            <p class="mb-1">{{ user.mobile }}</p>
          </a-card>
        </div>
        <div class="col-md-6">
          <a-card style="width: 100%">
            <p style="font-size: 18px">Address Book |
              <router-link to="/user-address/manage" style="font-size: 12px">EDIT</router-link>
            </p>
            <p class="mb-1">Nayem</p>
            <p class="mb-1">157 no. khanpur main road Narayanganj.
              Dhaka - Narayanganj - Narayanganj Sadar
              (+880) 1966634890</p>
          </a-card>
        </div>
      </div>
    </div>
  </a-layout-content>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Account",
  computed: {
    ...mapGetters(["currentUser"]),
    user() {
      return this.currentUser;
    }
  }
}
</script>

<style scoped>

</style>
