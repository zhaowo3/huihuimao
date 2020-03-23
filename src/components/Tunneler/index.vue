<template>
  <!--  这个是子组件循环-->
  <el-row :gutter="20" class="tunnelS">
    <el-col :span="4" v-for="(data,index) in roadwayList['data']" :key="index">
      <el-card class="tunnelLi" :body-style="{ padding: '0px' }"
               @click.native="clickList(data.id,roadwayList.required,roadwayList.fn)">
        <div class="tunnelSImg">
          <img :src="lanwei" alt="" class="image">
        </div>
        <div class="tunnelTitle">
          <span>{{data.name}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import lanwei from '@/assets/images/xiangdao.jpg';

  export default {
    name: "Tunneler",
    data() {
      return {
        lanwei,
      }
    },
    props: {
      roadwayList: {
        type: Object,
        default() {
          return {};
        }
      },
      toOneName: String,
      rid: '',
    },
    watch: {},

    methods: {
      clickList(id, required, fn) {
        if (fn == '') {
          return this.$router.push({path: '/stockOut/warehouseLie1'});
        }
        this.$router.go(-1);
        setTimeout(() => {
          this.$router.push({path: '/stockOut/roadwayChoice', query: {rid: id, required, fn}})
        }, 20)
      }
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
      height: 126px;

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
