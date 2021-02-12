<template>
  <div class="c-app">
    <Sidebar />
    <CWrapper>
      <Header />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
    </CWrapper>
  </div>
</template>

<script>
import Header from "@/layout/admin/Header";
import Sidebar from "@/layout/admin/Sidebar";

export default {
name: "Admin",
  components: {Sidebar, Header}
}
</script>

<style scoped>

</style>
