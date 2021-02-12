<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong, try again latter.">
    <template #extra>
      <a-button @click="$router.push('/')" type="primary">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "Error-500"
}
</script>

<style scoped>

</style>
