<template>
  <div>
    <el-row>
      <el-col class="formReport">
        <ul>
          <router-link v-for="(item,index) in items" :key="index" :to="{path:'/statement/'+item['url']}">
            <li><span><i class="iconfont" :class='item.icon'></i><span>{{item.name}}</span></span></li>
          </router-link>
        </ul>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import statementDetails from './statements/statementDetails'
  import 'echarts/lib/component/dataZoom'
  export default {
    name: "statementG",
    components: {statementDetails},
    data() {
      return {
        items: [
            {name: '报表首页', url: 'homes', icon: 'icon-tubiao-'},
          // {name: '历史记录', url: 'statementDetails', icon: 'icon-tubiao-'},
          {name: '盘库统计', url: 'statementDetails1', icon: 'icon-tubiao-2'},
          {name: '物资库存统计', url: 'statementDetails2', icon: 'icon-tubiao-10'},
          // {name: '手术物资分析', url: 'statementDetails3', icon: 'icon-tubiao-15'},
          // {name: '消耗统计', url: 'statementDetails4', icon: 'icon-tubiao-16'},
          // {name: '手术排名', url: 'statementDetails5', icon: 'icon-tubiao-11'},
          // {name: '耗材使用明细', url: 'statementDetails6', icon: 'icon-tubiao-17'},
          // {name: '耗材使用统计', url: 'statementDetails7', icon: 'icon-tubiao-5'},
          // {name: '耗材品类用量', url: 'statementDetails8', icon: 'icon-tubiao-12'},
        ],
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .formReport {
    padding: 20px;

    ul {
      float: left;

      a {
        display: inline-block;

        li {
          float: left;
          width: 200px;
          height: 200px;
          margin-left: 20px;
          margin-top: 20px;
          margin-right: 20px;
          line-height: 200px;
          background: #fff;

          span {
            line-height: normal;
            display: inline-block;
            vertical-align: middle;
            width: 100%;

            i {
              text-align: center;
              font-size: 50px;
              display: block;
              margin-bottom: 15px;
              color: #13bbf4;
              margin-top: -50px;
            }

            span {
              font-size: 20px;
              text-align: center;
              height: 10px;
              display: inline-block;
              line-height: normal;
              float: left;
            }
          }

        }
      }

    }
  }
</style>
