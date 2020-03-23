<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="closeTray" v-if="operation==1">关闭托盘</el-button>
        <el-button type="primary" class="trayClose" @click="returnEntry">返回</el-button>
        <!--        <el-button type="primary" class="trayClose">关闭托盘</el-button>-->
        <!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->
      </div>
    </div>
    <el-header style="height: 0.260417rem;background: #fff;">
      <el-breadcrumb separator="/" class="crumbsH">
        <el-breadcrumb-item :to="{ name: 'roadwayChoice' }">全部巷道</el-breadcrumb-item>
        <el-breadcrumb-item v-if="towShow"><a @click="back1">{{$route.query.name1}}</a></el-breadcrumb-item>
        <el-breadcrumb-item><a @click="back">{{$route.query.names1}}</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!--      <Crumbs :required1="required1" :required2="required2" :required3="required3" :required4="required4"></Crumbs>-->
    </el-header>
    <GroupH :carrier="carrierId" :deviceId="deviceId1" @childByValue="childByValue" @childdatase="childdatase" :number1="number1" :number="number"></GroupH>
  </div>
</template>

<script>
  import Crumbs from '@/components/Crumbs'
  import GroupH from '@/components/GroupH'
  import {
    openL, closeL
  } from '@/api/systemsL'
  export default {
    name: "roadwayLayer",
    components: {
      GroupH,
      Crumbs
    },
    data() {
      return {
        carrierId: '',
        carrierId1: '',
        deviceId1: '',
        names: '',
        names1: '',
        number: '',
        number1: '',
        deviceId: '',
        required1: true,
        required2: true,
        required3: true,
        required4: true,
        towShow: true,
        operation:'',
        childdatases:'',
      }
    },
    created() {
      this.deviceList();
      // this.childByValue();
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      back1() {
        this.$router.go(-2);
      },
        returnEntry(){
            this.$router.push({path: '/stockOut/roadwayChoice/'});
        },
      //关闭
      closeTray() {
          let mv = this;
          mv.childdatases=this.$store.state.LibraryLo;
        if (mv.childdatases == '') {
          this.$message({
            type: 'error',
            message: '请输入库位'
          });
          return false;
        }
        closeL(mv.childdatases).then(response => {
            mv.$store.state.recordPrevious=0;
            mv.openFullScreen2();
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
            mv.$message({
            type: 'success',
            message: response.msg
          });
          return false;
        }).catch(err => {
            mv.$message({
            type: 'error',
            message: err.msg
          });
          return false;
        })
      },
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.operation = childValue
      },
      childdatase: function (childdatase) {
        // childdatase就是子组件传过来的值
        this.childdatases = childdatase
      },
      deviceList() {
        // 取到路由带过来的参数
        let routerParams = this.$route.params.roadwayList;
        let routercarrierId1 = this.$route.query.carrierId;
        let routerdeviceId1 = this.$route.query.deviceId;
        let routerNames1 = this.$route.query.names1;
        let routernumbe1 = this.$route.query.number1;
        let routernumber = this.$route.query.number;
        this.number = routernumber;
        this.number1 = routernumbe1;
        this.names1 = routerNames1;
        this.deviceId1 = routerdeviceId1;
        this.carrierId1 = routercarrierId1;
        // 将数据放在当前组件的数据内
        this.carrierId = routerParams;
        if (this.number1 == undefined) {
          this.towShow = false;
        } else {
          this.towShow = true;
        }
        // console.log(this.carrierId);
      }
    }
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
          cursor: pointer;
        }
      }

    }

  }

  .menuMainContent {
    display: inline-block;
    position: absolute;
    right: 50px;
    top: 0;
    height: 72px;

    .trayClose {
      float: right;
      margin: 14px 28.8px 14px 0;
    }
  }
</style>
