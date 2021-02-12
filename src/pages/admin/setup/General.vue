<template>
  <div>
    <!-- Page Header -->
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Setup & Configurations
        </span>
        <h3 class="page-title">General Settings</h3>
      </div>
    </div>
    <!-- End Page Header -->

    <CRow class="my-4">
      <CCol md="8">
        <CCardGroup>
          <CCard class="p-4">
            <General_input/>
          </CCard>
        </CCardGroup>
      </CCol>
      <CCol md="4">
        <Language/>
        <Maintenance/>
      </CCol>
    </CRow>


  </div>
</template>

<script>
import General_input from "@/components/general/General_input";
import Language from "@/components/general/Language";
import Maintenance from "@/components/general/Maintenance";

export default {
  name: "General",
  components: {Maintenance, Language, General_input},
}
</script>

<style scoped>

</style>
