<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <div class="pageHomeIcon" id="hamburger-pageHomeIcon">
      <router-link to="/">
        <svg-icon icon-class="43" class="color-main"></svg-icon>
      </router-link>
    </div>
    <transition-group name="breadcrumb" id="hamburger-breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.index==='noredirect'||index==levelList.length-1"
              class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.index||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<!--上册菜单-->
<script>

  export default {
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null,
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    mounted() {
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'home') {
          matched = [{path: '/home', meta: {title: '', icon: '58'}}].concat(matched)
        }
        this.levelList = matched
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    margin-left: 10px;
    float: left;
    position: relative;
    padding-left: 50px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }

    .pageHomeIcon {
      float: left;
      /*margin-left: 27px;*/
      position: absolute;
      top: 0;
      height: 100%;
      /*margin-top: 15%;*/
      left: 0;
      margin-right: 15px;
      .svg-icon{
        vertical-align:middle;
      }
    }
  }
</style>
