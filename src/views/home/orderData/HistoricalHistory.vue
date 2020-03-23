<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="closeTray">关闭托盘</el-button>
                <el-button type="primary" class="trayClose" @click="recovery(orderVoData.orderNumber)">恢复订单</el-button>
        <el-button type="primary" class="trayClose" @click="back">返回</el-button>
      </div>
    </div>

    <!--      <el-button type="primary" class="trayOK" @click="">提取</el-button>-->
    <Details :orderVoData="orderVoData"></Details>
    <HistoryLi :materials="materials" @showChange="showH" :dialogVisible="dialogVisible" :isFinsh="isFinsh"
               @BClickli="BClickLie"></HistoryLi>
    <el-dialog title="请扫码" :visible.sync="dialogTableVisible" :modal="true" :fullscreen="fullscreen"
               custom-class="el-dialog__header-custom dialoVisible">
      <el-input v-model="inputvisible" @keyup.enter="searchs" @input="searchs()" placeholder="物资编码">
        <i slot="suffix" class="iconfont icon-icon-test46"></i>
      </el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closde">取 消</el-button>
    <el-button type="primary" @click="inquiry">确 定</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
  import Details from '@/components/Details'
  import HistoryLi from '@/components/HistoryLi'
  import {
    detailns,againOrder
  } from '@/api/home'
  import {
    orderEnterL
  } from '@/api/library'
  import {
    openL, closeL
  } from '@/api/systemsL'

  export default {
    name: "HistoricalHistory",
    components: {
      Details,
      HistoryLi
    },
    data() {
      return {
        orderNumber: this.$route.query.orderNumber,
        orderVoData: [],
        materials: [],
        isFinsh: false,
        loctData: [],
        dialogVisible: false,
        dialogTableVisible: false,
        fullscreen: false,// 弹窗是否全屏
        values: '',
        inputvisible: '',
        dataStas: '',
        locth: '',
      }
    },
    created() {
      this.$store.state.showBottomNav = false;
      this.getList();
    },

    methods: {

      //  列表头部
      getList() {
        this.listLoading = false;
        detailns(this.orderNumber).then(response => {
          this.listLoading = false;
          this.orderVoData = response.data.orderVo;
          this.materials = response.data.materials;
          if (response.data.materials.length == 0) {
            this.isFinsh = true
          } else {
            this.isFinsh = false
          }
        });
      },
      showH(data) {
        this.dialogTableVisible = true;
        this.dataStas = data;
        this.openTray(data);
      },
      closde() {
        let vm = this;
        vm.dialogVisible = false;
      },
      //扫码
      searchs() {
        this.dataStas.hisCode === this.inputvisible;
        if (this.inputvisible != null && this.inputvisible.length > 4) {
          this.inquiry();

        }
      },
      inquiry() {
        let vm = this;
        if (this.inputvisible != this.dataStas.hisCode) {
          vm.$message({
            type: 'error',
            message: '条码错误',
            duration: 1000
          });
          return false
        }
        orderEnterL({
          barCode: this.inputvisible,
          orderNumber: this.dataStas.orderNumber,
          id: this.dataStas.id,
            bcode:this.dataStas.barcode,
            barcodeSize:this.dataStas.barcodeSize,
        }).then(res => {
          this.dialogVisible = false;
          if (res.code !== '1') {
            vm.$message({
              type: 'error',
              message: '条码错误',
              duration: 1000
            });
            return
          }
          // for(let i=0;i<res.data.result.length;i++){
          //   if(this.dataStas.hisCode==res.data.result[i].hisCode){
          //     this.id=res.data.result[0].id;
          //
          //   }
          // }


        }).catch(err => {

        });
      },
      //  恢复订单
      recovery(order) {
        this.$confirm('是否要恢复该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          againOrder(this.Qs.stringify({
            orderNumber: order
          })).then(response => {
            if(response.code !=='1'){
              this.$message({
                message: response.msg,
                type: 'error',
                duration: 1000,
              });
              return
            }
            this.$message({
              type: 'success',
              message: response.msg,
              duration: 1000,
            });
            this.$router.push({path: '/home'});//返回上一层
            let mv = this;
            for (let i = 0; i < mv.houseList.length; i++) {
              let obj = mv.houseList[i];
              if (obj.orderNumber == order) {
                this.houseList.splice(i, 1);
                i--
              }
            }
            // mv.houseList=[];

            // this.searchSource() // 请求数据
          })
            .catch(() => {

            });
        }).catch(() => {

        });
      },

      openTray(data) {
          this.$store.state.LibraryLo=data.location;
        openL(data.location).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1000,
            });
            return
          }
          this.locth = data.location;
          vm.openFullScreen2();
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000
          });
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '打开失败',
            duration: 1000,
          });
          return false;
        })
      },

      closeTray(data) {
        if (this.locth == '') {
          this.$message({
            type: 'error',
            message: '请输入库位',
            duration: 1000,
          });
          return false;
        }
          this.locth=this.$store.state.LibraryLo;
        closeL(this.locth).then(response => {
            this.$store.state.recordPrevious=0;
            this.openFullScreen2();
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1000,
            });
            return
          }
          this.$message({
            type: 'success',
            message: response.data,
            duration: 1000,
          });
          return false;
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '关闭失败',
            duration: 1000,
          });
          return false;
        })
      },
      back() {
        this.$router.push({path: '/HistoricalOrder'});//返回上一层
      },
      BClickLie(data) {
        this.loctData = data;
        this.loctDataId = data.id;

        // this.
      },
    },
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .trayOK {
    position: absolute;
    right: 32px;
    top: 130px;
    z-index: 999;
    margin: 14px 28.8px;
    padding: 20px;
    font-size: 30px;
    cursor: pointer;
  }

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
  }
</style>
