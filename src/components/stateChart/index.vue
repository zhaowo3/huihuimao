<template>
  <div class="baoRightB">
    <!--                柱状图-->
    <ve-histogram :data="chartData" :data-zoom="dataZoom" :extend="extend"  :settings="chartSettings" v-if="ids==0"></ve-histogram>
    <!--                折线图-->
    <ve-line :data="chartData" :data-zoom="dataZoom" :extend="extend"  :settings="chartSettings" v-else-if="ids==1"></ve-line>
<!--    &lt;!&ndash;                饼图&ndash;&gt;-->
<!--    <ve-pie :data="chartData" :data-zoom="dataZoom"   :settings="chartSettings" :extend="extend" v-else-if="ids==2"></ve-pie>-->
    <!--                条形图-->
    <ve-bar :data="chartData" :data-zoom="dataZoom" :settings="chartSettings" :extend="extend"  v-else-if="ids==2"></ve-bar>
    <!--                散点图-->
    <ve-scatter :data="chartData" :data-zoom="dataZoom" :settings="chartSettings" :extend="extend"  v-else-if="ids==3"></ve-scatter>
  </div>
</template>

<script>
  export default {
    name: "stateChart",
    data() {
        this.chartSettings = {
            // metrics: ['数量'],
            // dimension: ['名称']
        }
        this.dataZoom = [
            {
                type: 'slider',
                start: 0,
                end: 20
            }
        ]
        this.extend = {
            //x轴文本设置
            'xAxis.0.axisLabel.rotate':60,//
            'backgroundColor':'#fff',
            // xAxis: {
            //     // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
            //     axisLabel:{
            //         interval:0 ,
            //         formatter:function(val){
            //             return val.split("").join("\n");
            //         }
            //     }
            // },
        }
      return {

      }
    },
    props: {
      chartData: {
        type: Object,
      },
      ids: {
        type: String,
      },
    },
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .baoRightB{
    background: #fff;
    height: 100%;
    margin-top: 22px;
    /*margin-left: 22px;*/
    padding-top: 20px;
  }
</style>
