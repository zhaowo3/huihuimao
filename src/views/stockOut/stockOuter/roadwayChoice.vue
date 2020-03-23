<template>
  <el-container>
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="returnEntry">返回</el-button>

      </div>
    </div>
    <el-header style="height: 0.260417rem;background: #fff;">
      <el-breadcrumb separator="/" class="crumbsH">
        <el-breadcrumb-item :to="{ name: 'roadwayChoice' }">全部巷道</el-breadcrumb-item>
      </el-breadcrumb>
      <!--      <Crumbs :required1="required1"    :required2="required2" :required3="required3" :required4="required4"></Crumbs>-->
    </el-header>
    <el-main>
      <!--       @click="roadwayS"-->
      <el-row :gutter="20" class="tunnelS">
        <el-col :span="6" v-for="(data,index) in roadwayList" v-if="data.hide==true" :key="index">
          <a @click="linkA(data)">
            <!--            :to="{path:'/stockOut/roadwayTunnel/',query: {deviceId:data.id,name:data.name }}"-->
            <el-card class="tunnelLi" :body-style="{ padding: '0px' }">
              <div class="tunnelSImg">
                <img :src="xiangdao" alt="" class="image">
              </div>

              <div class="tunnelTitle">
                <span>{{data.name}}</span>
              </div>
            </el-card>
          </a>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
  // import Crumbs from '@/components/Crumbs'
  // import Tunnel from '@/components/Tunnel'
  // import Tunneler from '@/components/Tunneler'
  import Crumbs from '@/components/Crumbs'
  import {
    deviceList, carrier
  } from '@/api/chioce'
  import xiangdao from '@/assets/images/xiangdao.jpg';

  export default {
    name: "roadwayLayer",
    data() {
      return {
        validator: true,
        valid: false,
        roadwayList: [],
        xiangdao,
        required1: true,
        required2: false,
        required3: false,
        required4: false,
      }
    },
    components: {
      Crumbs,
    },
    created() {
      this.deviceList();

    },
    methods: {
      linkA(data) {
        if (data.deviceType == 1) {
          this.$router.push({path: '/stockOut/roadwayTunnel/', query: {deviceId: data.id, name: data.name}});
        } else {
          this.$router.push({path: '/stockOut/roadTray/', query: {deviceId: data.id, name: data.name}});
        }

      },
        returnEntry(){
            this.$router.push({path: '/stockOut/'});
        },
      deviceList() {
          let mv=this;
        deviceList().then(response => {
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
            // let IpPositonhome=  sessionStorage.getItem('IpPositonhome');
            // mv.roadwayList = response.data;
            response.data.map(items=>{
                mv.$set(items,'hide',false);
                items.hide=true;
            });
            mv.roadwayList = response.data;
            // for(let i=0;i<response.data.length;i++){
            //     mv.$set(response.data[i],'hide',false);
            //     // if(response.data[i].controlIp==IpPositonhome){
            //         // this.$set(response.data[i],'hide',false);
            //         // response.data[i]= response.data[i].hide
            //         // mv.roadwayList =response.data;
            //         response.data[i].hide=true;
            //     // }
            // }

          // console.log(response.data)
        }).catch(err => {
          // console.log(err.data);
        })
      },

    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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

</style>
