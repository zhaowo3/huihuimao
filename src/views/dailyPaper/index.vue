<template>
<div class="consistently">
  <div class="consistentH">
    <div class="header">
      <div class="headImg"></div>
      <div class="menuLogo"><img :src="logo1o" alt=""/></div>
      <div class="headH2"><h2>每日系统运行报告</h2><h3>今天是{{times}}</h3><h4>恭喜你，系统已经平稳<p>{{dailyList.runTime}}</p>小时</h4></div>
    </div>
    <div class="bodyS">
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
            <h4>23</h4>
            <p>ms</p>
            <p>总运行时长</p>
          </li>
          <li>
            <h4>23</h4>
            <p>小时</p>
            <p>总运行时长</p>
          </li>
        </ul>
      </div>
      <h2>今日存取</h2>
      <div style="padding:0 5%;">
        <ve-line :data="chartData" :extend="extend"></ve-line>
      </div>

      <h2>库存情况</h2>
      <div class="bodySUl">
        <ul>
          <li>
            <h4>{{dailyList.todayIn}}</h4>
            <p>件</p>
            <p>今日入库</p>
          </li>
          <li>
            <h4>{{dailyList.todayOut}}</h4>
            <p>件</p>
            <p>今日出库</p>
          </li>

          <li>
            <h4>{{dailyList.materialStock}}</h4>
            <p>件</p>
            <p>物资库存总量</p>
          </li>
          <li>
            <h4>{{dailyList.materialType}}</h4>
            <p>种</p>
            <p>物资类目数量</p>
          </li>
        </ul>
      </div>
      <h2>预警情况</h2>
      <div >
        <el-row>
          <el-col :lg="12" :md="24">
            <ve-gauge :data="chartData1" :extend="extend" :settings="chartSettings"></ve-gauge>
          </el-col>
          <el-col :lg="12" :md="24">
            <ve-gauge :data="chartData2" :extend="extend" :settings="chartSettings"></ve-gauge>
          </el-col>
        </el-row>


      </div>
      <h2>手术配台</h2>
      <div class="bodySUl">
        <ul>
          <li>
            <h4 class="bodySUBlue">{{dailyList.operationTotal}}</h4>
            <p>件</p>
            <p>手术数量</p>
          </li>
          <li>
            <h4 class="bodySUYellow">{{dailyList.disposeMaterial}}</h4>
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
    <div class="footS">
      <p>@SILVER WING</p>
    </div>
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
        name: "dailyPaper",
        data() {
            this.extend = {
                'xAxis.0.axisLabel.color': '#fff',//x轴文本颜色
                'xAxis.0.nameTextStyle.width': '10',//x轴文本颜色
                'yAxis.0.axisLabel.color': "#fff",//y轴文本改变颜色
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
                    columns: ['日期', '存入', '取出'],
                    rows: [
                        { '日期': '2018-01-01', '存入': 1393, '取出': 1093},
                        { '日期': '2018-01-02', '存入': 3530, '取出': 3230},
                        { '日期': '2018-01-03', '存入': 2923, '取出': 2623},
                        { '日期': '2018-01-04', '存入': 1723, '取出': 1423},
                        { '日期': '2018-01-05', '存入': 3792, '取出': 3492},
                        { '日期': '2018-01-06', '存入': 4593, '取出': 4293},
                        { '日期': '2018-01-07', '存入': 1393, '取出': 1093},
                        { '日期': '2018-01-08', '存入': 3530, '取出': 3230},
                        { '日期': '2018-01-09', '存入': 2923, '取出': 2623},
                        { '日期': '2018-01-10', '存入': 1723, '取出': 1423},
                        { '日期': '2018-01-11', '存入': 3792, '取出': 3492},
                        { '日期': '2018-01-12', '存入': 4593, '取出': 4293},
                        { '日期': '2018-01-13', '存入': 1393, '取出': 1093},
                        { '日期': '2018-01-14', '存入': 3530, '取出': 3230},
                        { '日期': '2018-01-15', '存入': 2923, '取出': 2623},
                        { '日期': '2018-01-16', '存入': 1723, '取出': 1423},
                        { '日期': '2018-01-17', '存入': 3792, '取出': 3492},
                        { '日期': '2018-01-18', '存入': 4593, '取出': 4293}
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
            }
        },
        watch: {

        },
        created() {
            let that=this;
            let now=moment().format('YYYY年 MMM Do , a好');
            this.times =now;
            that.getList();
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
            }
        }
    }
</script>

<style scoped>
  body{
    overflow: hidden;
    overflow-y: auto !important;
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

    position: relative;
    width: 100%;

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
    background: #161c2a;

  }
  .bodyS h2{
    font-size: 32px;
    color: #17bbea;
    width: 100%;
    margin-top: 2%;
    margin-bottom: 5%;
    padding: 0 5%;
  }
  .bodySUl{
    width: 100%;
    float: left;
    display: flex;

  }
  .bodySUl ul{
    display: flex;
    width: 100%;
    margin-bottom: 5%;
  }
  .bodySUl li{
    border-right: 1px solid #5f6675;
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
    color: #fff;
    margin-bottom: 50px;
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
  .footS{
    width: 100%;
    float: left;
    background: #161c2a;
    text-align: center;
    color: #5f6675;
    padding-bottom: 30px;
    padding-top: 40px;
  }
</style>
