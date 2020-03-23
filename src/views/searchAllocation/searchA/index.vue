<template>
  <div class="searchIntelligence">
    <Advanced></Advanced>
    <searchList></searchList>
  </div>
</template>

<script>
  import Advanced from '@/components/Advanced'
  import searchList from '@/components/searchList'

  export default {
    name: "searchA",
    components: {
      Advanced,
      searchList
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .searchIntelligence {
    float: left;
    width: 100%;
    height: 100%;
  }
</style>
