<template>
  <div>
    <Header/>
    <a-layout class="main-menu">
      <sidebar/>
      <a-layout :style="{ marginLeft: '300px',minHeight: '100vh'}" class="fcontent">
        <router-view :key="$route.path"></router-view>
        <Footer/>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "@/layout/frontend/Header";
import Sidebar from "@/layout/frontend/Sidebar";
import Footer from "@/layout/frontend/Footer";

export default {
  name: "Frontend",
  components: {Footer, Sidebar, Header}
}
</script>

<style scoped>

</style>
