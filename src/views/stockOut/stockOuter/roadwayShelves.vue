<template>
  <el-container style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="returnEntry">返回</el-button>
        <!--        <el-button type="primary" class="trayClose">关闭托盘</el-button>-->
        <!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->
      </div>
    </div>
    <el-header style="height: 0.260417rem;background: #fff;">
      <el-breadcrumb separator="/" class="crumbsH">
        <el-breadcrumb-item :to="{ name: 'roadwayChoice' }">全部巷道</el-breadcrumb-item>
        <el-breadcrumb-item><a @click="back">{{$route.query.name}}</a></el-breadcrumb-item>
        <!--        {{this.roadwayList[0].status}}-->
        <el-breadcrumb-item>{{$route.query.name1}}</el-breadcrumb-item>
        <!--      <Crumbs :required1="required1" :carrierId="this.carrierId"  :required2="required2" :required3="required3" :required4="required4"></Crumbs>-->
      </el-breadcrumb>

    </el-header>
    <el-main>
      <el-row :gutter="20" class="tunnelS">
        <el-col :span="6" v-for="(data,index) in roadwayList" :class="{disabled:hasError==data.status }" :key="index">
          <router-link
            :to="{path:'/stockOut/roadwayLayer/',query: {carrierId:data.id,name1:name1,number:number,names1:names1,name:data.name,number1:data.number,deviceId:deviceId}}">
            <el-card class="tunnelLi" :body-style="{ padding: '0px' }">
              <div class="tunnelSImg">
                <img :src="xiangdao" class="image">
              </div>

              <div class="tunnelTitle">
                <span>{{data.name}}</span>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
  import Crumbs from '@/components/Crumbs'
  // import Tunnel from '@/components/Tunnel'
  // import Tunneler from '@/components/Tunneler'
  import {
    shelf
  } from '@/api/chioce'
  import xiangdao from '@/assets/images/huojia.jpg';

  export default {
    name: "roadwayShelves",
    data() {
      return {
        validator: true,
        valid: false,
        roadwayList: [],
        xiangdao,
        carrierId: '',
        number: '',
        names: '',
        names1: '',
        number1: '',
        deviceId: '',
        carrierId1: '',
        required1: true,
        required2: true,
        required3: true,
        required4: false,
        deviceId1: '',
        hasError:false,
      }
    },
    components: {
      Crumbs,
      // Tunnel,
      // Tunneler
    },
    created() {
      this.deviceList();

    },
    methods: {
        returnEntry(){
            this.$router.push({path: '/stockOut/roadwayChoice/'});
        },
      deviceList() {
        // 取到路由带过来的参数
        let routerParams = this.$route.query.carrierId;
        let routerNumber = this.$route.query.number;
        let routerNames = this.$route.query.name;
        let routerNames1 = this.$route.query.name1;
        let routercarrierId1 = this.$route.query.carrierId1;
        let routerdeviceId = this.$route.query.deviceId;
        this.carrierId1 = routercarrierId1;
        this.deviceId = routerdeviceId;
        this.names1 = routerNames1;
        // 将数据放在当前组件的数据内
        this.number = routerNumber;
        this.name1 = routerNames;
        // this.namesl=routerNamesl;
        this.carrierId = routerParams;
        // console.log("routerParams", this.msg); // 输出 test message
        shelf(this.carrierId).then(response => {
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
                duration: 1000
            });
            return
          }
          this.roadwayList = response.data;
          this.carrierId = response.data[0].carrierId;
          // console.log(response.data)
        }).catch(err => {
          // console.log(err.data);
        })
      },
      back() {
        this.$router.go(-1);
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

  .tunnelS {
    .tunnelLi {
      margin-bottom: 20px;
    }

    .tunnelLi:hover {
      border-style: solid;
      border-width: 1px;
      border-color: #13bbf4;
      cursor: pointer;
    }

    .tunnelSImg {
      width: 100%;
      height: 196px;
    }

    img {
      width: 100%;
      height: 100%;
      float: left;
    }

    .tunnelTitle {
      display: flex;
      margin: 20px 0;

      span {
        text-align: center;
        font-size: 18px;
        width: 100%;
      }
    }
  }
  .disabled {

    pointer-events: none;

    cursor: default;

    opacity: 0.6;
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
