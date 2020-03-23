<template>
  <el-breadcrumb separator="/" class="crumbsH">
    <el-breadcrumb-item :to="{ name: 'roadwayChoice'}" v-if="required1">全部巷道</el-breadcrumb-item>
    <el-breadcrumb-item v-if="required2"><a @click="$router.back(-2)">巷道{{this.deviceId}}</a></el-breadcrumb-item>
    <el-breadcrumb-item v-if="required3"><a @click="$router.back(-1)">货架{{this.carrierId}}</a></el-breadcrumb-item>
    <el-breadcrumb-item :to="{ name: 'roadwayLayer'}" v-if="required4">层级{{this.carrierId}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "Crumbs",
    data() {
      return {}
    },
    props: {
      required1: false,
      required2: false,
      required3: false,
      required4: false,
      deviceId: '',
      carrierId: '',
      deviceId1: ''

    },
    methods: {}
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .crumbsH {
    height: 50px;
    line-height: 50px;
    font-size: 16px;

    span {
      font-weight: normal;

      span {
        font-weight: normal;

        a {
          font-weight: normal;
        }
      }

    }

  }
</style>
