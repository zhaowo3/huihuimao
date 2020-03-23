<template>
  <el-col :span="18" :gutter="20" style="height: 100%; background: #fff; ">
    <el-col :span="8" style="height: 100%;overflow-y: auto;">
      <div class="privilegeCentre" >
        <div class="privilegeCentreHead" id="hamburger-Equipment">
          <svg-icon icon-class="logo-21" class="color-main"></svg-icon>
          <p>设备控制</p>
        </div>
        <div class="privilegeCentreLi" v-if="device==1">
          <ul class="">
            <li v-for="(item,index) in devices" :key="index">
              <span>设备:{{item.name}}</span>
              <el-switch class="privilegeCentreLiSwitch"
                         style="width: 50px"
                         v-model="item.selected"
                         :active-value="1"
                         :inactive-value="0"
                         @change='handleCheck("devices",item,index)'
                         active-color="#13bbf4"
                         inactive-color="#e5e5e5">
              </el-switch>
            </li>
          </ul>
        </div>
      </div>
    </el-col>
    <el-col :span="8" style="border-left-color: #ddd;border-left-width: 1px;border-left-style: dashed;height: 100%;overflow-y: auto;">
      <div class="privilegeRight"  >
        <div class="privilegeRightHead" id="hamburger-controlMenu">
          <svg-icon icon-class="logo-22" class="color-main"></svg-icon>
          <p>菜单控制</p>
        </div>
        <div class="privilegeRightLi" v-if="menu==1">
          <ul class="" >
            <li :span="24" v-for="(items,index) in permissions" :key="index"  :class='{hit: curSub ==index}' @click="handleCheckSub(index,curSub)">
              <el-col class="privilegeRightLis" >
                <span>{{items.name }}</span>
                <el-switch class="privilegeCentreLiSwitch"
                           style="width: 50px"
                           v-model="items.selected"
                           :label="items.id"
                           :active-value="1"
                           :inactive-value="2"
                           active-color="#13bbf4"
                           @change='handleCheck("permissions",items,index)'
                           inactive-color="#e5e5e5">
                </el-switch>
              </el-col>
            </li>

          </ul>
          <div class="privilegeRightB">
            <el-radio v-model="items.radio" v-for="(items,index) in roles" @change="change(roles,index)" :key="index"
                      :label="items.selected+''+index" class="privilegeLeftChecked">{{items.name}}
            </el-radio>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8" style="border-left-color: #ddd;border-left-width: 1px;border-left-style: dashed;height: 100%;overflow-y: auto;">
      <div class="privilegeRight" :class="{'prohibit':isActive}" >
        <div class="privilegeRightHead" id="hamburger-controlSubmenu">
          <svg-icon icon-class="logo-22" class="color-main"></svg-icon>
          <p>子菜单</p>
        </div>
        <div class="privilegeRightLi" v-if="menu==1">
          <ul class="" >
            <li :span="24" v-for="(itemx,index) in submenu"  v-if="itemx.couNum"  :key="index">
              <el-col class="privilegeRightLis" >
                <span>{{itemx.name }}</span>
                <el-switch class="privilegeCentreLiSwitch"
                           style="width: 50px"
                           v-model="itemx.selected"
                           :label="itemx.id"
                           :active-value="1"
                           :inactive-value="3"
                           active-color="#13bbf4"
                           @change='handleCheckSubmenu("submenu",itemx,index)'
                           inactive-color="#e5e5e5">
                </el-switch>
              </el-col>
            </li>

          </ul>
        </div>
      </div>
    </el-col>
  </el-col>
</template>

<script>
  import {
   submenuMenuId
  } from '@/api/systemsL'
  export default {
    name: "Pright",
    data() {
      return {
        radio: '1',
        cur: 0,
       // curSub:0,
        couNum:false,
        menu:'',
        device:'',
        userEdit:'',
      }
    },
    props: {
      devices: Array,
      permissions: Array,
      submenu:Array,
      curSub:Number,
      userEdits:'',
      isActive: {
        type: Boolean,
        default: false
      },
      roles: {
        type: Array,
        default: function () {
          return [];
        }
      },
      users: Object,
    },
    watch: {
      roles(val) {
        // console.log(val)
      },
      userEdit: function(newValue, oldValue) {
        //每当str的值改变则发送事件update:word , 并且把值传过去
        this.$emit('update:userEdits', newValue)

      },

    },
    created() {
      this.submenuMenuId();
    },
    methods: {
      handleCheckSub(...info){
        this.$emit('SubChanage', info,)
      },

      handleCheck(...info) {
        this.$emit('userChanage', info)
      },
      handleCheckSubmenu(...info) {
        this.$emit('menuChanage', info)
      },
      change(...props) {
        this.$emit('radioChange', props)

      },
      updatePermissionsT() {
        this.$emit('updatePermissions')
      },
      //首页加载权限
      submenuMenuId() {
        let mv=this;
        submenuMenuId(mv.$store.state.user.Secondm.Privilege.id).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
                duration: 1000
            });
            return
          }
          // mv.jurisdiction = response.data;
          for(let i=0;i<response.data.length;i++) {
            if (response.data[i].children == 'device') {
              mv.device = response.data[i].ststus;
            }
            if (response.data[i].children == 'menu') {
              mv.menu = response.data[i].ststus;
            }
            if (response.data[i].children == 'userEdit') {
              mv.userEdit = response.data[i].ststus;
              this.$emit('update:userEdits', mv.userEdit);
            }
          }
        });
      },
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .privilegeCentre {

    background: #fff;
    height: 100%;

    .privilegeCentreHead {
      height: 85px;
      line-height: 85px;

      .color-main {
        float: left;
        margin: 21px 15px 21px 44px;
      }

      p {
        float: left;
        font-size: 20px;
      }
    }

    .privilegeCentreLi {
      padding-left: 44px;

      li {
        float: left;
        width: 100%;
        height: 70px;
        line-height: 70px;
        display: flex;
        span {
          float: left;
          font-size: 18px;
          flex: 1;
          overflow-y: hidden;
          overflow-x: auto;
        }

        .privilegeCentreLiSwitch {
          float: right;
          vertical-align: middle;
          height: 100%;
          margin-right: 10px;
        }
      }
    }
  }

  .privilegeRight {
    .privilegeRightHead {
      height: 85px;
      line-height: 85px;

      .color-main {
        float: left;
        margin: 21px 15px 21px 44px;
      }

      p {
        float: left;
        font-size: 20px;
      }
    }

    .privilegeRightLi {
      padding-left: 44px;
      ul{
        width: 100%;
        display: inline-block;
        float: left;
        li{
          width: 100%;
          float: left;
          display: inline-block;
          cursor: pointer;
          .privilegeRightLis {
            height: 70px;
            line-height: 70px;
            display: flex;
            span {
              float: left;
              font-size: 18px;
              flex: 1;
              overflow-y: hidden;
              overflow-x: auto;
            }

            .privilegeCentreLiSwitch {
              float: right;
              vertical-align: middle;
              height: 100%;
              margin-right: 10px;
            }
          }
        }

      }



    }

    .privilegeRightB {
      padding-top: 30px;
      float: left;
      width: 100%;

      .privilegeLeftChecked {
        float: left;
        width: 100%;
        margin: 0;
        padding-bottom: 30px;
      }
    }
  }
  .active {
    color: red;
  }

  .hit {
    background: #e7f9fe;
  }
  .prohibit {
    pointer-events: none;
    cursor: default;
    opacity: 0.4;
    background: #ddd;
    height: 100%;
  }
</style>
