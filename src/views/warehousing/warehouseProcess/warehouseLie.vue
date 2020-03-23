<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>
        <el-button type="primary" class="trayClose">关闭托盘</el-button>

        <el-input class="trayTime" style="float: right;width: 100px" v-model="input1" placeholder="库位"></el-input>
      </div>

      <div class="pageSearch">
        <el-autocomplete class="pageAuto" popper-class="my-autocomplete" v-model="state"
                         :fetch-suggestions="querySearch"
                         placeholder="请输入关键字" @select="handleSelect">
          <i class="iconfont icon-icon-test35" slot="suffix" @click="handleIconClick"></i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
        </el-autocomplete>
      </div>

    </div>
    <MaterialEnter :btnText="btnText" :required="required" :dataDrug="this.dataPush" :datasd='deads'></MaterialEnter>
  </div>

</template>

<script>
  import MaterialEnter from '@/components/MaterialEnter'
  import {
    enterL, inquiry
  } from '@/api/library'

  export default {
    name: "warehouseLie",
    components: {
      MaterialEnter,
    },
    data() {
      return {
        btnText: '打开',
        required: true,
        state: '',
        input: '',
        input1: '',
        materialName: '',
        id: '',
        deads: [],
        dataDrug: '',
        dataPush: [],
      }
    },
    watch: {},
    created() {
      this.searchs();
      this.dead();
      this.dataPush.push(this.$route.params.data.data);
    },
    methods: {
      inquiry() {
        let vm = this;
        inquiry({
          barCode: this.materialName
        }).then(res => {
          if (res.code == -1) {
            vm.$message({
              type: 'error',
              message: '条码错误',
              duration: 1000
            });
            return
          }
          for (let i = 0; i < res.data.result.length; i++) {
            if (this.materialName == res.data.result[i].hisCode) {
              this.id = res.data.result[0].id;
              this.enterL();
            }
          }


        });
      },
      enterL() {
        enterL({
          barCode: this.materialName,
        }).then(res => {
          // this.$router.push({name: 'warehouseLie'})
        })
      },
      searchs() {
        this.materialName = this.input;
        if (this.materialName != null && this.materialName.length > 4) {
          this.inquiry();

        }
      },
      loadAll() {
      },
      dead() {
        this.deads = this.$route.params.res
      },
      querySearch(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
    },

  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  /*头部*/
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
</style>
