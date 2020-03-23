<template>
<div class="consistently">
  <div name="homeHeaders" class="menuMainContent">
    <div style="float: right;">
      <!--        <el-button type="primary" class="trayClose">关闭托盘</el-button>-->
      <div class="warningIcon">
          <span class="warningEarly" id="hamburger-warningEarly">
            <router-link to="/warningEarly">
              <i class="iconfont icon-icon-test38"></i>
              <!--            <svg-icon icon-class="38" class="color-main"></svg-icon>-->
              <span>补货</span>
              <b>{{remind.quantityWarn}}</b>
            </router-link>
          </span>
        <span class="periodEffective"  id="hamburger-periodEffective">
            <router-link to="/management">
              <i class="iconfont icon-icon-test39"></i>
              <!--          <svg-icon icon-class="39" class="color-main"></svg-icon>-->
              <span>过期</span>
              <b>{{remind.expirationWarn}}</b>
            </router-link>
          </span>
        <div style="float: right;">
          <el-button type="primary" class="trayClose" @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="consistentH">
<!--    <div class="header">-->
<!--      <div class="headImg"></div>-->
<!--      <div class="menuLogo"><img :src="logo1o" alt=""/></div>-->
<!--      <div class="headH2"><h2>每日系统运行报告</h2><h3>今天是{{times}}</h3><h4>恭喜你，系统已经平稳<p>{{dailyList.runTime}}</p>小时</h4></div>-->
<!--    </div>-->
    <div class="bodyS">
      <el-row :gutter="20" style="height: 100%;">
        <el-col :span="12" :lg="12" :md="24" :sm="24" :xs="24" style="height: 100%;">
          <el-row :gutter="20"  style="height: 100%;">
            <el-col :span="24" class="boduF">
              <div class="boduBai">
                <h2>设备运行<span style="float:right;font-size: 10px;color: #ddd;">版本号：{{dailyList.version}}</span></h2>
                <div class="bodySUl">
                  <ul>
                    <li>
                      <h4>{{dailyList.runTime}}小时</h4>
<!--                      <p></p>-->
                      <p>运行时长</p>
                    </li>
                    <li>
                      <h4>{{dailyList.runNumber}}次</h4>
<!--                      <p></p>-->
                      <p>存取次数</p>
                    </li>
                    <li>
                      <h4>{{timeNameMin}}秒</h4>
<!--                      <p></p>-->
                      <p>最短存取时间</p>
                    </li>
                    <li>
                      <h4>{{timeNameMax}}秒</h4>
<!--                      <p></p>-->
                      <p>最长存取时间</p>
                    </li>
                    <li>
                      <h4>{{dailyList.freeTime}}小时</h4>
<!--                      <p></p>-->
                      <p>空闲时间</p>
                    </li>
                  </ul>
                </div>
              </div>

            </el-col>
            <el-col :span="24" class="boduF">
              <div class="boduBai">
                <h2>库存情况</h2>
                <div class="bodySUl">
                  <ul>
                    <li>
                      <h4 class="bodySUlh4">{{dailyList.todayIn}}件</h4>
                      <p></p>
                      <p>今日入库</p>
                    </li>
                    <li>
                      <h4 class="bodySUlh4">{{dailyList.todayOut}}件</h4>
<!--                      <p></p>-->
                      <p>今日出库</p>
                    </li>
                    <li>
                      <h4 class="bodySUlhh" >{{dailyList.todayReturn}}件</h4>
                      <p></p>
                      <p>今日退库</p>
                    </li>
                    <li>
                      <h4 class="bodySUlh4">{{dailyList.materialStock}}件</h4>
<!--                      <p></p>-->
                      <p>物资库存总量</p>
                    </li>
                    <li>
                      <h4 class="bodySUlh4">{{dailyList.materialType}}种</h4>
<!--                      <p></p>-->
                      <p>物资类目数量</p>
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="24" class="boduF">
              <div class="boduBai">
                <h2>手术配台</h2>
                <div class="bodySUl">
                  <ul>
                    <li>
                      <h4 class="bodySUlh4">{{dailyList.operationTotal}}件</h4>
<!--                      <p></p>-->
                      <p>手术数量</p>
                    </li>
                    <li>
                      <h4 class="bodySUlh4">{{dailyList.disposeMaterial}}件</h4>
<!--                      <p></p>-->
                      <p>配台物资总数</p>
                    </li>
                    <li>
                      <h4 class="bodySURed">{{dailyList.returnMaterisl}}件</h4>
<!--                      <p></p>-->
                      <p>退回物资总数</p>
                    </li>

                  </ul>
                </div>
              </div>

            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :lg="12" :md="24" :sm="24" :xs="24" style="height: 100%;">
          <el-row style="height: 100%;">
            <el-col :span="24" style="height: 50%;">
              <div class="boduBai">
                <h2>今日取用</h2>
                <div class="bodyEach">
                    <div id="wapperHeight" class="bodyeHeight" ref="wapperHeightRef">
                      <ve-line :data="dailyList.todayOperationChart" :judge-width="true" :height="wapperHeight" :extend="extend" height="100%" width="100%"></ve-line>
                    </div>
                  </div>
              </div>
            </el-col>
            <el-col :span="24" style="height: 50%;">
              <div class="boduBai">
                <h2>预警情况</h2>
                <div class="bodyEach">
                  <el-row style="height: 100%;" >
                    <el-col :lg="12" :md="12" :sm="12" :xs="24" style="height: 100%;">
                      <div class="bodyUs" ref="bodyEHight">
                        <router-link :to="{path:'/warningEarly/warningLie'}">
                        <el-table
                          :data="houseList1"
                          stripe
                          :height="buHight+'px'"

                          style="width: 100%">
                          <el-table-column prop="name" label="预警名称" align="left" >
                            <template slot-scope="scope">{{scope.row.name}}</template>
                          </el-table-column>
                          <el-table-column prop="supplyQuantity" label="数量" align="left" width="40">
                            <template slot-scope="scope">{{scope.row.supplyQuantity}}</template>
                          </el-table-column>
                          <el-table-column prop="location" label="库位" align="left" width="60">
                            <template slot-scope="scope">{{scope.row.location}}</template>
                          </el-table-column>

                        </el-table>
                        </router-link>
                      </div>

<!--                      <ve-gauge :data="dailyList.quantityWarnChart" :extend="extend" :settings="chartSettings" height="100%"></ve-gauge>-->
                    </el-col>
                    <el-col :lg="12" :md="12" :sm="12" :xs="24" style="height: 100%">
                      <div class="bodyUs" ref="bodyEHight">
                        <router-link :to="{path:'/management/Effective/'}">
                        <el-table
                          :data="houseList"
                          stripe
                          :height="buHight+'px'"
                          style="width: 100%">
                          <el-table-column prop="name" label="效期名称" align="left" >
                            <template slot-scope="scope">{{scope.row.name}}</template>
                          </el-table-column>
                          <el-table-column prop="validDate" label="效期" align="left" width="70">
                            <template slot-scope="scope">{{scope.row.validDate|subStringTime}}</template>
                          </el-table-column>
                          <el-table-column prop="location" label="库位" align="left" width="60">
                            <template slot-scope="scope">{{scope.row.location}}</template>
                          </el-table-column>

                        </el-table>
                        </router-link>
                      </div>
<!--                      <ve-gauge :data="dailyList.expirationWarnChart" :extend="extend" :settings="chartSettings" height="100%"></ve-gauge>-->
                    </el-col>
                  </el-row>


                </div>
              </div>

            </el-col>
          </el-row>
        </el-col>
      </el-row>






    </div>
<!--    <div class="footS">-->
<!--      <p>@SILVER WING</p>-->
<!--    </div>-->
  </div>

</div>
</template>

<script>
    import logo1o from '@/assets/images/logo1.png';
    import moment from 'moment';
    import {
        dailyOverview
    } from '@/api/daily'
    import {
        getInfo
    } from '@/api/login'
    import {
        submenuMenuId
    } from '@/api/systemsL'
    import {
        expirationList,quantityWarn
    } from '@/api/material'
    moment.locale('zh-cn');
    export default {
        name: "homes",
        data() {
            this.extend = {
                'xAxis.0.axisLabel.color': '#333',//x轴文本颜色
                'xAxis.0.nameTextStyle.width': '10',//x轴文本颜色
                'yAxis.0.axisLabel.color': "#333",//y轴文本改变颜色
                'legend.textStyle.color': "#505765",//y轴文本改变颜色
                'legend.top':'0',
                // 'series.0.color': "#fff",//柱子背景颜色

            }
            // this.oneSettings={
            //     xAxisType: 'time'
            // }
            this.chartSettings={
                seriesMap:{
                    '数量预警':{
                        min:0,
                        max:999,
                        splitNumber:9,
                        axisLine: {
                            lineStyle: {
                                color: [[0.6, 'lime'],[0.82, '#e5ba25'],[1, '#e60012']],
                                width: 3,
                                shadowColor: '#fff',
                                shadowBlur: 10
                            }
                        },
                        axisLabel:{
                            show:false,
                        }
                    },
                    '效期预警':{
                        min:0,
                        max:999,
                        splitNumber:9,
                        axisLine: {
                            lineStyle: {
                                color: [[0.6, 'lime'],[0.82, '#e5ba25'],[1, '#e60012']],
                                width: 3,
                                shadowColor: '#fff',
                                shadowBlur: 10
                            }
                        },
                        axisLabel:{
                            show:false,
                        }
                    },
                }
            }
            return {
                logo1o,
                times:'',
                chartData1: {
                    columns: ['type',  'value'],
                    rows: [
                        { type: '数量预警(种)', value: 6}
                    ]
                },
                chartData2: {
                    columns: ['type','value'],
                    rows: [
                        { type: '效期预警(种)', value: 333}
                    ]
                },
                wapperHeight:'',
                orgOptions:{},
                dataEmpty: true,
                dailyList:[],
                serverdhd:'',
                serverdesk: {},
                remind: {},
                timeName:localStorage.getItem("Timename"),
                timeNameMax:localStorage.getItem("TimenameMax"),
                timeNameMin:localStorage.getItem("TimenameMin"),
                searchHouse:{
                    pageSize:10,
                    pageNumber:0,
                },
                searchHouse1:{
                    pageSize:10,
                    pageNumber:0,
                },
                houseList:[],
                houseList1:[],
                buHight:'',
            }
        },
        filters:{
            subStringTime(time){
                if (time !== '' && time !== null) {
                    time = time.substring(0,10);
                    // time = time.replace(/-/,'年').replace(/-/,'月') + "日";
                    return time;
                }
            },
        },
        watch: {
            buHight:function () {
                let mv=this;
                this.$nextTick(function () {
                    mv.buHight=mv.$refs.bodyEHight.offsetHeight;
                    // mv.$refs.bodyEHight.offsetHeight;;  //100

                })
            },
            wapperHeight:function () {
                let mv=this;
                mv.$refs.wapperHeightRef.offsetHeight=mv.wapperHeight;
            }
        },
        created() {
            let that=this;
            this.dishFirst();
            let now=moment().format('YYYY年 MMM Do , a好');
            this.times =now;
            that.getList();
            that.timeNames();
            that.xiaoQi();
            that.yuJin();
        },
        mounted(){
            this.orgOptions = {
                yAxis: {
                    minInterval: 1,
                },
            }
        },
        methods: {
            dishFirst() {
                //首页加载
                let mv=this;
                getInfo().then(response => {
                    mv.serverdhd=response.data.main.home.id;
                    mv.serverdesk = response.data;
                    mv.remind = response.data.warnNumberVo;
                    mv.submenuMenuId();
                });
            },
            //首页加载权限
            submenuMenuId() {
                let mv=this;
                submenuMenuId(mv.serverdhd).then(response => {
                    if(response.code !=='1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000
                        });
                        return
                    }
                    mv.jurisdiction = response.data;
                    for(let i=0;i<response.data.length;i++) {
                        if (response.data[i].children == 'materialAdd') {
                            mv.materialAdd = response.data[i].ststus
                        }
                        if (response.data[i].children == 'materialDel') {
                            mv.materialDel = response.data[i].ststus
                        }
                        if (response.data[i].children == 'materialOut') {
                            mv.materialOut = response.data[i].ststus
                        }
                        if (response.data[i].children == 'materialIn') {
                            mv.materialIn = response.data[i].ststus
                        }
                        if (response.data[i].children == 'materialReturn') {
                            mv.materialReturn = response.data[i].ststus
                        }
                        if (response.data[i].children == 'settlement') {
                            mv.settlement = response.data[i].ststus;
                        }
                        if (response.data[i].children == 'oneStorehouse') {
                            mv.oneStorehouse = response.data[i].ststus;
                        }
                        if (response.data[i].children == 'introductionOperation') {
                            mv.introductionOperation = response.data[i].ststus;
                        }

                    }
                    // mv.materialAdd=response.data[0].children.;
                    // mv.materialDel=response.data.children.materialDel;

                });
            },

            getList() {
                let mv=this;
                this.$nextTick(function () {
                    mv.buHight=mv.$refs.bodyEHight.offsetHeight; //100

                })
                //3列表请求
                dailyOverview().then(response => {
                    if (response.code !== '1') {
                        this.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000
                        });
                        return
                    }
                    mv.dailyList=response.data;
                })
            },
            xiaoQi(){
                let mv=this;
                let houseList=this.searchHouse;
                expirationList(houseList).then(response => {
                    if(response.code !=='1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                        });
                        return
                    }
                    mv.houseList=response.data.result;


                }).catch(function(error) {
                    this.$message.error(error)
                    this.droping = false
                });


            },
            yuJin() {
                let mv = this;
                quantityWarn(this.searchHouse).then(response => {
                    if(response.code=='-1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                        });
                        return
                    }
                    mv.houseList1=response.data.result;
                }).catch(function (error) {
                    this.$message.error(error)
                    this.droping = false
                });


            },
            timeNames(){
                let mv=this;



                if(mv.timeNameMax==undefined&&mv.timeNameMin==undefined||mv.timeName==null||mv.timeNameMax==null||mv.timeNameMin==null){

                    // mv.timeNameMax=localStorage.getItem("Timename");
                    mv.timeNameMax=8;
                    mv.timeNameMin=7;
                    // mv.timeNameMin=localStorage.getItem("Timename");
                    localStorage.setItem("TimenameMax", mv.timeNameMax);
                    localStorage.setItem("TimenameMin", mv.timeNameMin);

                }else if(parseInt(mv.timeName)>parseInt(localStorage.getItem("TimenameMax"))){

                    mv.timeNameMax=mv.timeName;
                    // mv.timeNameMax=localStorage.getItem("Timename");
                    localStorage.setItem("TimenameMax", mv.timeName);
                }else if(parseInt(mv.timeName)<parseInt(localStorage.getItem("TimenameMin"))){
                    mv.timeNameMin=mv.timeName;
                    // mv.timeNameMin=localStorage.getItem("Timename");
                    localStorage.setItem("TimenameMin", mv.timeName);

                }

            }

        }
    }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  body{
    overflow: hidden;
    overflow-y: auto !important;
    background: #f0f5fa;
  }
  /*头部*/
  .menuMainContent {
    display: inline-block;
    position: absolute;
    right: 50px;
    top: 0;
    height: 72px;

    .trayClose {
      float: right;
      margin: 14px 28.8px;
    }

    .trayTime {
      float: right;
      margin: 14px 28.8px 14px 0;
      cursor: pointer;

      i {
        font-size: 34px;
        float: right;
        color: #adb0b0;
      }
    }

    .trayTime:hover i {
      color: #00b2ed;
    }

    .warningIcon {
      height: 72px;
      line-height: 72px;
      float: right;
      display: inline-block;

      .warningEarly, .periodEffective {
        float: right;
        display: flex;
        margin: 0 8.8px 0 0;

        :hover {
          i {
            color: #00b2ed;
          }

          span {
            color: #00b2ed;
          }
        }

        a {
          display: flex;
        }

        i {
          font-size: 34px;
          color: #adb0b0;
          vertical-align: middle;
          float: left;
        }

        span {
          font-size: 16px;
          padding-left: 18px;
          line-height: 72px;
          height: 72px;
        }

        b {
          font-size: 16px;
          padding-left: 10px;
          padding-right: 20px;
          color: red;
          font-weight: normal;
          line-height: 72px;
          height: 72px;
        }
      }
    }

    .pageSearch {
      float: right;
      margin-right: 28.8px;

      .pageAuto {
        display: flex !important;

        .el-input__suffix-inner {
          padding: 7px 5px 7px 0px;
          display: flex;
          vertical-align: middle;
          height: 100%;
        }

        i {
          font-size: 30px;
          cursor: pointer;
        }
      }

      .my-autocomplete {
        li {
          line-height: normal;
          padding: 7px;

          .name {
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .addr {
            font-size: 12px;
            color: #b4b4b4;
          }

          .highlighted .addr {
            color: #ddd;
          }
        }
      }
    }
  }
  .consistently{
    width: 100%;
    display: inline-block;
    /*display: flex;*/
    font-size: 16px;
    float: left;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .consistentH{
    height: 100%;
    position: relative;
    width: 100%;

  }
  .boduBai{
    background: #fff;
    width: 100%;
    display: inline-block;
    height:  calc(100% - 20px);
  }
  .header{
    width: 100%;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -ms-flex-negative:0;
    flex-shrink:0;
    float: left;
   height: 800px;
    position: relative;
  }
  .headImg{
    width: 100%;
    height: 100%;
    background:url(../../../assets/images/daily.jpg) 100% 100% no-repeat;
    background-size: cover;
  }
  .menuLogo {
    width: 300px;
    /*height: 100%;*/
    padding: 10px;
    position: absolute;
    left: 50%;
    top: 30px;
    margin-left: -10%;
  }
  .menuLogo img {
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    align-items: center;
  }
  .headH2{
    position: absolute;
    bottom: 30%;
    left: 5%;
    color: #fff;
  }
  .headH2 h2{
    font-size: 32px;
    margin-bottom: 10px;
  }
  .headH2 h3{
    font-size: 28px;
    margin-bottom: 10px;
  }
  .headH2 h4{
    font-size: 24px;
    margin-bottom: 40px;
  }
  .headH2 h4 p{
    color: #71c357;
    display: inline;
    padding: 0 5px;

  }

  .bodyS{
    width: 100%;
    height: 100%;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -ms-flex-negative:0;
    flex-shrink:0;
    float: left;
    position: relative;
    background: #f0f5fa;
    padding: 20px 20px 0 20px;


  }
  .bodyS h2{
    font-size: 32px;
    color: #17bbea;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 40px;
    height: 40px;
  }
  .bodySUl{
    width: 100%;
    float: left;
    display: flex;
    height: calc(100% - 80px);
  }
  .bodyEach{
    height: calc(100% - 80px);
  }
  .bodySUl ul{
    display: flex;
    width: 100%;
    height: 80%;
    overflow: hidden;
  }
  .bodySUl li{
    border-right: 1px solid #eaeaec;
    flex: 1;
    padding-left: 5%;

  }
  .bodySUl li:last-child{
    border: none;
  }
  .bodySUl li p{
    font-size: 16px;
    color: #5f6675;
    margin-bottom: 10px;
  }
  .bodySUl li h4{
    font-size: 24px;
    color: #0e97d7;
    margin-bottom: 40px;
  }
  .bodySUl li h4:after{
    content: "\007C ";
    opacity: 0;
  }
  .bodySUBlue{
    color: #1ffff7 !important;
  }
  .bodySUYellow{
    color: #fff117 !important;
  }
  .bodySURed{
    color: #ff2d63 !important;
  }
  .bodySUlh4{
    color: #333 !important;
  }
  .bodySUlhh{
    color: red !important;
  }
  .footS{
    width: 100%;
    float: left;
    background: #161c2a;
    text-align: center;
    color: #5f6675;
    padding-bottom: 30px;
    padding-top: 40px;
  }
  .boduF{
    height: 33.3%;
  }
  .bodyUs{
    width: 100%;
    height: 100%;
  }
  .bodyeHeight{
    height: 100%;
  }
</style>
