<template>
  <div class="advance">
    <el-row>
      <el-col :span="24">
        <el-main class="grid-content bg-purple-dark">
          <p>高级搜索</p>
          <div class="advanceButtonS">
            <el-button v-for="(item,index) in item" :key="index" type="plain" round>{{item.title}}</el-button>
          </div>
        </el-main>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Advanced",
    data() {
      return {
        item: [{
          title: '订单'
        }, {
          title: '历史订单'
        }, {
          title: '选配模板'
        }, {
          title: '出库'
        }, {
          title: '入库'
        }, {
          title: '效期'
        }, {
          title: '预警'
        }, {
          title: '一级库'
        }, {
          title: '盘库'
        }, {
          title: '物资配置'
        }, {
          title: '报表'
        }]
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .advance {
    display: inline-block;
    width: 100%;
    float: left;

    .grid-content {
      p {
        float: left;
        font-size: 16px;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }

      .advanceButtonS {
        width: calc(100% - 100px);
        float: left;

        button {
          float: left;
        }

        button:hover {
          background: #00b2ed;
          color: #fff;
        }
      }
    }

  }

</style>
