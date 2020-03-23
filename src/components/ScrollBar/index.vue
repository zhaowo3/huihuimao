<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="menuLogo"><img :src="logo1o" alt=""/></div>
    <div class="scroll-wrapper" ref="scrollWrapper" style="top: 0.375rem;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import logo1o from '@/assets/images/logo1.png';

  const delta = 15;

  export default {
    name: 'scrollBar',
    data() {
      return {
        top: 0,
        logo1o
      }
    },
    methods: {
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 3
        const $container = this.$refs.scrollContainer
        const $containerHeight = $container.offsetHeight
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperHeight = $wrapper.offsetHeight
        if (eventDelta > 0) {
          this.top = Math.min(0, this.top + eventDelta)
        } else {
          if ($containerHeight - delta < $wrapperHeight) {
            if (this.top < -($wrapperHeight - $containerHeight + delta)) {
              this.top = this.top
            } else {
              this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
            }
          } else {
            this.top = 0
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../../styles/variables.scss';

  .scroll-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #13bbf4;

    .menuLogo {
      width: 135px;
      height: 72px;
      padding: 10px;

      img {
        width: 100%;
        height: 100%;
        display: flex;
        margin: 0 auto;
        align-items: center;
      }
    }

    .scroll-wrapper {
      position: absolute;
      width: 100% !important;
      height: calc(100% - 72px);
      top: 72px;
    }
  }
</style>
