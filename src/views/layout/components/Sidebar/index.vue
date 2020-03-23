<template>
  <!--  -->
  <scroll-bar>
    <el-menu style="padding: 0"
             mode="vertical"
             :show-timeout="200"
             :default-active="$route.path"
             :collapse="isCollapse"
             background-color="#13bbf4"
             text-color="#fff"
             active-text-color="#fff">
      <sidebar-item id="hamburger-scrollWrapper"  :routes="roles" ></sidebar-item>

    </el-menu>
    <div class="poppss" id="hamburger-popperT">
      <el-popover   popper-class="popperLeft popperT"
                    placement="right"
                    width="194.4"
                    visible-arrow="false"
                    trigger="click">

        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <ul class="mui-table-view">
              <router-link v-for="(item,index) in leftBotomRols" :default-active="$route.path" :key="index" :to="{path:'/'+item['url']}"
                           v-if="item.openStatus">
                <li class="mui-table-view-cell"  ><i class="iconfont" :class="item.icon"></i>
                  <p>{{item.name}}</p></li>
              </router-link>
            </ul>
          </div>
        </div>
<!--        id="hamburger-popperT"-->
        <el-button class="hamburgerMenu"  slot="reference">
          <svg-icon icon-class="63" class="color-main" ></svg-icon>
        </el-button>
      </el-popover>
    </div>


  </scroll-bar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'
  import {
    orderLists
  } from '@/api/home'

  export default {
    inject: ['reload'],
    data() {
      return {
        pageSize: 1,
      }

    },
    components: {SidebarItem, ScrollBar},
    computed: {
      ...mapGetters([
        'sidebar',
      ]),
      userHeader(){
        return this.$store.state.user.userHeader
      },
      roles() {
        return this.$store.state.user.roles;
      },
      leftBotomRols() {
        return this.$store.state.user.leftBotomRols;
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    created() {
      this.menuHidden();
      // this.$root.eventHub.$on('updatePermissions', (data)=>{
      //   // 处理数据
      //   this.reload();
      // })
    },
    methods: {
      menuHidden() {
        this.listLoading = false;
        orderLists(this.pageSize).then(response => {
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
                duration: 1000
            });
            return
          }
          this.listLoading = false;
        });
      },

    },
  }

</script>
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .popperLeft {
    margin-left: 0 !important;
    padding: 0 !important;

    .cell {
      font-size: 18px;
    }
  }

  .mui-scroll-wrapper {
    .mui-table-view-cell {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;

      .iconfont {
        font-size: 26px;
        padding-right: 20px;
        float: left;
        color: #00b2ec;
      }

      p {
        float: left;
      }
    }

    .mui-table-view-cell:hover {
      background: #13bbf4;
      color: #fff;
      cursor: pointer;

      .iconfont {
        color: #fff;
      }
    }
  }
  .poppss{

    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    display: inline-block;
    float: left;
    height: 100px;

  }
</style>
