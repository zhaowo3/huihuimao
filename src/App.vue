<template>
  <div id="app">
<!--    <keep-alive>-->
<!--      <router-view v-if="isRouterAlive"></router-view>-->
<!--    </keep-alive>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        // isRouterAlive: true,
      }
    },
      // watch:{
      //     $route(to,from){
      //       let scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
      //       this.scrollMap[from.path]=scrollTop;
      //       localStorage.setItem('scrollMap',JSON.stringify(this.scrollMap));
      //   }
      // },
      // updated(){
      //   let hash=window.location.hash.slice(1);
      //   let scrollMap= JSON.parse(localStorage.getItem('scroMap'));
      //   if(scrollMap[hash]&&this.$route.meta.keepAlive){
      //       document.documentElement.scrollTop=scrollMap[hash];
      //       window.pageYOffset=scrollMap[hash];
      //       document.body.scrollTop=scrollMap[hash];
      //   }
      // },
    methods: {
      reload() {
        this.$route.meta.keepAlive = false;
        this.$nextTick(function () {
          this.$route.meta.keepAlive = true
        });
      },
    },
  }

</script>

<style>
</style>
