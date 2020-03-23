<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>

  </div>
</template>

<script>

  import {Navbar, Sidebar, AppMain} from './components'
  // import ResizeMixin from './mixin/ResizeHandler'
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    // props: {
    //   warning:true,
    // },
    // mixins: [ResizeMixin],
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      classObj() {
        return {
           hideSidebar: !this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
</style>
