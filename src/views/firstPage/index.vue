<template>
  <div class="consistently">
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
                  <h2>设备运行</h2>
                  <div class="bodySUl">
                    <ul>
                      <li>
                        <h4>{{dailyList.runTime}}</h4>
                        <p>小时</p>
                        <p>总运行时长</p>
                      </li>
                      <li>
                        <h4>{{dailyList.runNumber}}</h4>
                        <p>次</p>
                        <p>存取次数</p>
                      </li>
                      <li>
                        <h4>{{timeNameMax}}</h4>
                        <p>s</p>
                        <p>最短存取时间</p>
                      </li>
                      <li>
                        <h4>{{timeNameMin}}</h4>
                        <p>s</p>
                        <p>最长存取时间</p>
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
                        <h4 class="bodySUlh4">{{dailyList.todayIn}}</h4>
                        <p>件</p>
                        <p>今日入库</p>
                      </li>
                      <li>
                        <h4 class="bodySUlh4">{{dailyList.todayOut}}</h4>
                        <p>件</p>
                        <p>今日出库</p>
                      </li>
                      <li>
                        <h4 class="bodySUlhh">{{dailyList.materialStock}}</h4>
                        <p>件</p>
                        <p>物资库存总量</p>
                      </li>
                      <li>
                        <h4 class="bodySUlh4">{{dailyList.materialType}}</h4>
                        <p>种</p>
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
                        <h4 class="bodySUlh4">{{dailyList.operationTotal}}</h4>
                        <p>件</p>
                        <p>手术数量</p>
                      </li>
                      <li>
                        <h4 class="bodySUlh4">{{dailyList.disposeMaterial}}</h4>
                        <p>件</p>
                        <p>配台物资总数</p>
                      </li>
                      <li>
                        <h4 class="bodySURed">{{dailyList.returnMaterisl}}</h4>
                        <p>件</p>
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
                    <ve-line :data="chartData" :extend="extend" height="100%" width="100%"></ve-line>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" style="height: 50%;">
                <div class="boduBai">
                  <h2>预警情况</h2>
                  <div class="bodyEach">
                    <el-row style="height: 100%;">
                      <el-col :lg="12" :md="12" :sm="12" :xs="24" style="height: 100%;">
                        <ve-gauge :data="chartData1" :extend="extend" :settings="chartSettings" height="100%"></ve-gauge>
                      </el-col>
                      <el-col :lg="12" :md="12" :sm="12" :xs="24" style="height: 100%;">
                        <ve-gauge :data="chartData2" :extend="extend" :settings="chartSettings" height="100%"></ve-gauge>
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
    moment.locale('zh-cn');
    export default {
        name: "firstPage",
        data() {
            this.extend = {
                'xAxis.0.axisLabel.color': '#333',//x轴文本颜色
                'xAxis.0.nameTextStyle.width': '10',//x轴文本颜色
                'yAxis.0.axisLabel.color': "#333",//y轴文本改变颜色
                'legend.textStyle.color': "#505765",//y轴文本改变颜色
                'legend.bottom':'0',
                // 'series.0.color': "#fff",//柱子背景颜色

            }
            // this.oneSettings={
            //     xAxisType: 'time'
            // }
            this.chartSettings={
                seriesMap:{
                    '数量预警(种)':{
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
                    },
                    '效期预警(种)':{
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
                    },
                }
            }
            return {
                logo1o,
                times:'',
                chartData: {
                    columns: ['时间', '存入', '取出'],
                    rows: [
                        { '时间': '2018-01-01', '存入': 1393, '取出': 1093},
                        { '时间': '2018-01-02', '存入': 3530, '取出': 3230},
                        { '时间': '2018-01-03', '存入': 2923, '取出': 2623},
                        { '时间': '2018-01-04', '存入': 1723, '取出': 1423},
                        { '时间': '2018-01-05', '存入': 3792, '取出': 3492},
                        { '时间': '2018-01-06', '存入': 4593, '取出': 4293},
                        { '时间': '2018-01-07', '存入': 1393, '取出': 1093},
                        { '时间': '2018-01-08', '存入': 3530, '取出': 3230},
                        { '时间': '2018-01-09', '存入': 2923, '取出': 2623},
                        { '时间': '2018-01-10', '存入': 1723, '取出': 1423},
                        { '时间': '2018-01-11', '存入': 3792, '取出': 3492},
                        { '时间': '2018-01-12', '存入': 4593, '取出': 4293},
                        { '时间': '2018-01-13', '存入': 1393, '取出': 1093},
                        { '时间': '2018-01-14', '存入': 3530, '取出': 3230},
                        { '时间': '2018-01-15', '存入': 2923, '取出': 2623},
                        { '时间': '2018-01-16', '存入': 1723, '取出': 1423},
                        { '时间': '2018-01-17', '存入': 3792, '取出': 3492},
                        { '时间': '2018-01-18', '存入': 4593, '取出': 4293}
                    ]
                },
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
                dataEmpty: true,
                dailyList:[],
                timeName:localStorage.getItem("Timename"),
                timeNameMax:localStorage.getItem("TimenameMax"),
                timeNameMin:localStorage.getItem("TimenameMin"),
            }
        },
        watch: {

        },
        created() {
            let that=this;
            let now=moment().format('YYYY年 MMM Do , a好');
            this.times =now;
            that.getList();
            that.timeNames();
        },
        methods: {
            getList() {
                let that=this;
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
                    that.dailyList=response.data;
                })
            },
            timeNames(){
                let that=this;
                let MAX=localStorage.getItem("TimenameMax");
                let Min=localStorage.getItem("TimenameMin");
                if(that.timeNameMax==''&&that.timeNameMin==''){
                    that.timeNameMax=localStorage.setItem("TimenameMax", that.timeName);
                    that.timeNameMin=localStorage.setItem("TimenameMin", that.timeName);
                    // that.timeNameMax=that.timeName;
                    // that.timeNameMin=that.timeName;
                }else if(that.timeName<that.timeNameMax){
                    that.timeNameMax=that.timeName;
                }else if(that.timeName>that.timeNameMin){
                    that.timeNameMin=that.timeName;
                }
            }

        }
    }
</script>

<style scoped>
  body{
    overflow: hidden;
    overflow-y: auto !important;
    background: #f0f5fa;
  }
  .consistently{
    width: 100%;
    display: inline-block;
    /*display: flex;*/
    font-size: 16px;
    float: left;
    position: absolute;
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
    background:url(../../assets/images/daily.jpg) 100% 100% no-repeat;
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
    margin-bottom: 10px;
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
    margin-bottom: 10%;
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
</style>
