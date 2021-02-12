<template>
  <a-layout-content>
    <div class="container">
      <div class="row mt-4">
        <div class="col-12">
          <h3 style="color: #5b5555">Add New Address</h3>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12">
          <a-card style="width: 100%">
            <Address/>
          </a-card>
        </div>
      </div>
    </div>
  </a-layout-content>
</template>

<script>
import Address from "@/components/Form/Address";

export default {
  name: "AddAddress",
  components: {Address}
}
</script>

<style scoped>

</style>
