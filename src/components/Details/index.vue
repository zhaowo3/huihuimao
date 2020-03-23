<template>
  <el-main class="populationMain">
    <div class="app-population" id="hamburger-population">
      <div class="app-h3">
        <h3>{{orderVoData.name}}</h3>
        <h3><span>住院号：</span>{{orderVoData.patientId}}</h3>
      </div>
      <div class="populationUi">
        <el-row>
          <el-col :span="12" style="overflow-x: auto">
            <ul class="populationLi">
              <li style="width: 100%;"><span>手术名称：</span>
                <p :title="orderVoData.operation">{{orderVoData.operation}}</p></li>
              <li><span>手术医师：</span>
                <p :title="orderVoData.doctorIncharge">{{orderVoData.doctorIncharge}}</p></li>
              <li><span>手术时间：</span>
                <p :title="orderVoData.scheduledTime">{{orderVoData.scheduledTime}}</p></li>
              <li><span>麻醉医生：</span>
                <p :title="orderVoData.anaesthesia">{{orderVoData.anaesthesia}}</p></li>
              <!--            <li><span>&nbsp</span><p>{{orderVoData.scheduledTime}}</p></li>-->
              <li><span>年龄：</span>
                <p :title="orderVoData.age">{{orderVoData.age}}</p></li>
              <li><span>性别：</span>
                <p :title="orderVoData.sex">{{orderVoData.sex}}</p></li>
              <li><span>手术房间：</span>
                <p :title="orderVoData.operatiingRoom">{{orderVoData.operatiingRoom}}</p></li>

<!--              <li><span>条码：</span>-->
<!--                <p></p></li>-->
              <li><span>联系电话：</span>
                <p></p></li>
            </ul>
          </el-col>
          <el-col :span="10">
            <div class="populationDescribe"><span>诊断描述</span>
              <p :title="orderVoData.diagBefore">{{orderVoData.diagBefore}}</p></div>
          </el-col>
          <el-col :span="2">
            <div></div>
          </el-col>
        </el-row>

      </div>
    </div>
  </el-main>
</template>

<script>
  export default {
    name: "Details",
    data() {
      return {}
    },
    props: {
      orderVoData: {},
    },
    // watch:{
    //
    //   orderVoData:{
    //    orderVo:'',
    //   },
    // },
    // created() {
    //   this.getDetails();
    // },

    methods: {

      // getDetails() {
      //   let matched = this.$route.matched.filter(item => item.name)
      //   const first = matched[0]
      //   if (first && first.name !== 'home') {
      //     matched = [{ path: '/detailsOrder', meta: { title: '',icon: '58' }}].concat(matched)
      //   }
      //   // this.levelList = matched
      // }

    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .populationMain {
    border-bottom: 1px solid #e1e6e7;
    display: flex;
    padding-bottom: 20px;
    background: #fff;

    .app-population {
      width: 100%;
      border-bottom-width: 1px;
      border-bottom-color: #e1e6e7;
      float: left;

      h3 {
        line-height: 54px;
        font-size: 24px;
        font-weight: normal;
        width: 50%;
        float: left;
      }

      .populationUi {
        .populationLi {
          /*float: left;*/
          display: flex;
          flex-wrap: wrap;
          li {
            width: 33%;
            font-size: 18px;
            /*line-height: 30px;*/
            margin-bottom: 10px;
            display: flex;
            span {
              float: left;
              font-size: 18px;
            }

            p {
              float: left;
              overflow: hidden;/*超出部分隐藏*/
              white-space: nowrap;/*不换行*/
              text-overflow:ellipsis;/*超出部分省略号显示*/
              width: 100%;
              flex: 1;
            }
          }
        }

        .populationDescribe {
          float: left;
          width: 100%;

          span {
            font-size: 20px;
            /*color: #757575;*/
            width: 100%;
            float: left;
            padding-bottom: 10px;
          }

          p {
            font-size: 18px;
            width: 100%;
            line-height: 1.5;
          }
        }
      }
    }
  }
</style>
