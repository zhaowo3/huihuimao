<template>
  <el-row :gutter="20" class="tunnelS">
    <el-col :span="6" v-for="(data,index) in roadwayList" :key="index">
      <el-card class="tunnelLi" :body-style="{ padding: '0px' }">
        <div class="tunnelSImg">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
               class="image">
        </div>

        <div class="tunnelTitle">
          <span>{{data.name}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Tunnel",
    props: ['roadwayList'],
    created() {
      this.latticeList();
    },
    methods: {
      //  列表左侧列表点击
      latticeList(data, index) {
        this.$emit('prevStep', data, index);//select事件触发后，自动触发showCityName事件
      },
    },
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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
