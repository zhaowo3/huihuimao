<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" style="margin-left: 0;" class="trayClose" @click="Determine">返回</el-button>
<!--        <el-button type="primary" style="margin-left: 0;" class="trayClose" @click="returnData">确定</el-button>-->

      </div>
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="closeTray">关闭托盘</el-button>

      </div>
    </div>
    <el-button type="primary" class="trayOK" :class="{'traygran':isActive}" v-if="$route.query.settlement==1" @click="settleS" id="hamburger-settleS">结算</el-button>
    <Details :orderVoData="orderVoData"></Details>
    <detailsLi :materials="materials" @showChange="showH" :isFinsh="isFinsh"
               :dialogVisible="dialogTableVisible"></detailsLi>
    <el-dialog title="请扫码-退" :visible.sync="dialogTableVisible" :modal="true" :fullscreen="fullscreen" :before-close="handleClose"
               custom-class="el-dialog__header-custom dialoVisible" width="70%">
      <el-carousel v-if="dialogTableVisible" @change="changeCarousel" :initial-index="rootindex" :height="dataHeight" indicator-position="none" trigger="click" arrow="always" :autoplay="false" ref="car" style="min-height: 220px;">
        <el-carousel-item v-for="(items,index) in materialslun"  :key="index" >
          <div style="display: flex;">
            <div style="flex: 3">
              <div class="carouselLS">
            <div class="carouselLeft">
              <el-image :src="items.imgUrl">
                <div slot="error" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
                <div slot="placeholder" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>

              </el-image>
            </div>
            <div class="carouselRight">

              <p class="textes">{{items.materialName}},{{items.aliasName}}</p>
              <p class="textesH">{{items.size}}</p>
              <p class="textes">库位：{{items.location}}<span>已用：{{items.useQuantity}}已退：{{items.returnQuantity}}</span></p>
              <div class="crumbHight" v-if="items.codeType==2||items.codeType==3">
                <el-input-number v-model="items.num1" :disabled="tetede" :controls="false" :min="1" :max="items.numMax"   label="输入数字" style="width: 80%;height: auto;margin-bottom: 10px;float: left;"></el-input-number>
              </div>
              <el-input v-model="inputvisible" :disabled="diste"  ref="gain" autofocus="autofocus" clearable @keyup.enter.native="searchs(inputVal)"
                        placeholder="物资编码" style="text-align: left;float: left;width: 80%;">
                <i slot="suffix" class="iconfont icon-icon-test46"></i>
              </el-input>
            </div>
          </div>
            </div>
            <div style="flex: 2">
              <LibraryDisplay :lots="items.location" ref="child"></LibraryDisplay>
            </div>
          </div>

          <!--          <span slot="footer" class="dialog-footer">-->
          <!--&lt;!&ndash;    <el-button @click="closde">取 消</el-button>&ndash;&gt;-->
          <!--            &lt;!&ndash;    <el-button type="primary" @click="inquiry">确 定</el-button>&ndash;&gt;-->
          <!--  </span>-->

        </el-carousel-item>
      </el-carousel>

    </el-dialog>
  </div>

</template>

<script>
  let speechSU = new window.SpeechSynthesisUtterance();
  import smalls from '@/assets/images/small.jpg';
  import Details from '@/components/Details'
  import LibraryDisplay from '@/components/LibraryDisplay'
  import detailsLi from '@/components/detailsLi'
  import {debounce} from '@/utils/debounce';
  import {
    detailns
  } from '@/api/home'
  import {
    openL, closeL
  } from '@/api/systemsL'
  import {
    returnS, settleS
  } from '@/api/library'

  export default {
    name: "detailsOrder",
    components: {
      Details,
      detailsLi,
        LibraryDisplay
    },
    inject: ['reload'],
    data() {
      return {
          carouselIndex:0,
          nowIndex:"",
          h:0,//定义时，分，秒，毫秒并初始化为0；
          m:0,
          ms:0,
          s:0,
          time:0,
          str:'',
          mytime:'',
          sumTimes:0,
          orderNumber: this.$route.query.orderNumber,
          orderVoData: [],
          materialslun:[],
          materials: [],
          isFinsh: false,
          loading: false,
          input: '',
          values: '',
          loctDataloc:'',
          num1:1,
          fullscreen: false,// 弹窗是否全屏
          inputvisible: '',
          dialogVisible: false,
          dialogTableVisible: false,
          dataStas:[],
          isActive:false,
          isCha:true,
          rootindex:'',
          items:[],
          smalls,
          diste:false,
          tetede:false,
          ind:'',
      }
    },
      props: {
          dataHeight: {
              type: String,
              default: '300px'
          }
      },
      beforeRouteLeave (to, from, next) {
          if (to.name === 'home') {
              to.meta.keepAlive = true
          }

          to.meta.isCha = this.isCha;
          next()
      },
    created() {
      this.$store.state.showBottomNav = false;
      this.getList();
      this.$watch('inputvisible', debounce((val) => {
        if (val == "") {
          return
        }
        //扫码查找
        this.searchs(val);
      }, 1000));
    },
    mounted () {
        document.addEventListener("keydown", (event) => {
            if (event.which == 37)
                this.$refs.car.prev();
            if (event.which == 39)
                this.$refs.car.next();
        })
    },

    methods: {
      //  列表头部
      getList() {
        this.listLoading = false;
        detailns(this.orderNumber).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1000,
            });
            return
          }
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
        leftClick(){
          let mv=this;

            // console.log("zuo")
        },
        rightClick(){
            let mv=this;
            // console.log("you")
        },
        changeCarousel(value,index){
            // console.log(value,index)
            let mv=this;
            mv.munS=value;
            mv.inputvisible='';
            if(mv.materialslun[value].useQuantity==0){
                mv.materialslun[value].num1=0;
                mv.diste=true;
                mv.tetede=true;
            }else {
                mv.diste=false;
                mv.tetede=false;
                this.openTray(this.dataStas);
            }
            // mv.$nextTick( () =>{
            //     // mv.$refs.child[mv.munS].parentMsg(mv.materialslun[value].location);
            // })
            mv.items=mv.materialslun[value];
            if(value>index){
                this.rightClick()
            }else if(value<index) {
                this.leftClick()
            }

        },
      showH(data,index,item) {
          let mv=this;
          mv.carouselIndex = item.showIndex;
          let newdata = data.filter((value,index)=>{
              return value.useQuantity!==0
          })


          for(let i=0;i<newdata.length;i++){
            if(item.id==newdata[i].id){
                mv.ind=i;
            }
          }
          mv.materialslun = newdata;
          item.munMax=item.useQuantity;
          mv.rootindex=mv.ind;
          mv.loctDataId = item.id;
          mv.loctDataloc=item.location;
          mv.items = item;
          // mv.num1=item.supplyQuantity-item.awayQuantity;
          if(this.$store.state.whetherTest == true){
              this.dialogTableVisible = true;
              this.$nextTick( () =>{
                  mv.$refs.gain[mv.rootindex].focus();
                  // mv.$refs.child[mv.carouselIndex].parentMsg(mv.loctDataloc);
              });
              this.num1=1;
          }
        this.dataStas = item;
        this.openTray(item);
          this.start();


      },
        // handleCheckedChange(){
        //     let mv = this;
        // },
        //计时开始
        //重置时间
        // timer(){   //定义计时函数
        //     this.ms=this.ms+50;         //毫秒
        //     if(this.ms>=1000){
        //         this.ms=0;
        //         this.s=this.s+1;         //秒
        //     }
        //     if(this.s>=60){
        //         this.s=0;
        //         this.m=this.m+1;        //分钟
        //     }
        //     if(this.m>=60){
        //         this.m=0;
        //         this.h=this.h+1;        //小时
        //     }
        //     this.str =this.toDub(this.m)+":"+this.toDub(this.s)+"."+this.toDubms(this.ms);
        //     // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
        // },
        sumTime(){
            this.sumTimes=this.sumTimes+1;      //秒
            this.str=this.sumTimes;
        },
        reset(){  //重置
            this.sumTimes=0;
            this.str="0";
        },
        start(){  //开始
            this.time=setInterval(this.sumTime,1000);
        },
        stop(){  //暂停
            clearInterval(this.time);
        },
        toDub(n){  //补0操作
            if(n<10){
                return "0"+n;
            }
            else {
                return ""+n;
            }
        },
        toDubms(n){  //给毫秒补0操作
            if(n<10){
                return "00"+n;
            }
            else {
                return ""+n;
            }

        },
        //计时结束
        handleClose(done){
            let vm = this;
            vm.stop();
            localStorage.setItem("Timename", this.str);
            vm.reset();
            done();
        },
        openTray(data) {
            let mv=this;
            let lan=data.location;
            let result=lan.split("-");

            mv.$nextTick( () =>{
                mv.$refs.child[mv.rootindex].parentMsg(data.location);
            })
            if(this.$store.state.LibraryLo==''){
                mv.pushDataList(data);
            }else {
                let resultData=this.$store.state.LibraryLo.split("-");
                let resultD1=parseInt(resultData.slice(0)[0]);
                let resultD2=parseInt(resultData.slice(1)[0]);
                let result1=parseInt(result.slice(0)[0]);
                let result2=parseInt(result.slice(1)[0]);
                if(resultData.length==result.length&&resultD1==result1&&resultD2==result2){
                    if(this.$store.state.recordPrevious==0){
                        mv.pushDataList(data);
                    }else {
                        return;
                    }
                }else {
                    mv.pushDataList(data);
                }
            }
        },
        pushDataList(data) {
          this.locth=data.location;
          this.openFullScreen2();
          this.$store.state.LibraryLo=this.locth;
        openL(data.location).then(response => {
            this.$store.state.recordPrevious=1;
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1000,
            });
            return
          }
            if(this.$store.state.whetherTest == false){
                this.dialogTableVisible = true;
            }

            this.locth = data.location;
            this.$store.state.LibraryLo=this.locth

        }).catch(err => {
            this.$message({
                type: 'error',
                message: err.msg,
                customClass: 'zZindex',
                duration: 1000,
            });
            return false;
        })
      },
      searchs(inputvisible) {
        let mv = this;
        // if(mv.dataStas.barcode ==inputvisible.toString().toUpperCase().substring(0, 4)||this.dataStas.hisCode ==inputvisible) {

          this.$confirm('确定要退料?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            returnS({
              barCode: inputvisible,
              orderNumber: mv.items.orderNumber,
              id: mv.items.id,
              trayLocation: this.items.location,
                number:mv.items.num1,
                codeType:mv.items.codeType,
                barcodeSize:mv.items.barcodeSize,
                isHerp:mv.items.isHerp,
                bcode:mv.items.barcode,
            }).then(res => {
              if (res.code !== '1') {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1000,
                });
                return
              }
                mv.items.returnQuantity += mv.items.num1;
                mv.items.useQuantity-= mv.items.num1;
              // mv.dataStas.quantity -= 1;
                if(mv.items.codeType==2||mv.items.codeType==3){
                    localStorage.setItem("Timename", this.str);
                }
              if (mv.items.useQuantity == 0) {
                  mv.diste=true;
                  mv.tetede=true;
                  localStorage.setItem("Timename", this.str);
              }
              mv.getList();
                mv.$refs.car.next();
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000,
              });
              speechSU.text = '已退' + mv.items.materialName + mv.items.num1 + mv.items.smallUnitDesc;
              window.speechSynthesis.speak(speechSU);
                // mv.num1='1';
                mv.inputvisible = '';
            }).catch(err => {

            });
          }).catch(err => {

          });
        // }else {
        //   this.$message({
        //     message: '物资编码与实际物资编码不相同',
        //     type: 'error',
        //     duration: 1000
        //   });
        //   return;
        // }
      },
      // returnq(data){
      //   returnS(this.Qs.stringify({orderNumber:data.orderNumber, id:data.id,barCode:11})).then(response => {
      //
      //   })
      // },
        returnData(){
            // this.isCha=false;
            this.$router.push({path: '/home',query:{orderNumber:this.$route.query.orderNumber}});
        },
        Determine(){
            this.$router.push({path: '/home',query:{orderNumber:this.$route.query.orderNumber}});
        },
      //关闭
      closeTray(data) {
          let mv=this;
          mv.locth=this.$store.state.LibraryLo;
        if (this.locth == '') {
          this.$message({
            type: 'error',
            message: '请输入库位',
            duration: 1000,
          });
          return false;
        }
        closeL(this.locth).then(response => {
            mv.$store.state.recordPrevious=0;
            mv.openFullScreen2();
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
      settleS() {
        this.$confirm('是否要结算该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          settleS({orderNumber: this.orderVoData.orderNumber}).then(response => {
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
            this.isActive=true;
              this.isCha=false;
            setTimeout(() => {
                this.$router.push({path: '/home'});
              // this.reload();
            },500);
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '结算失败',
              duration: 1000,
            });
            return false;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结算',
            duration: 1000,
          });
        });
      },

    }

  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .textes{
    text-align: left;
    height: 30px;
    margin-bottom: 10px;
    font-size: 20px;
    span{
      margin-left: 30px;
    }
  }
  .textesH{
    text-align: left;
    height: 20px;
    margin-bottom: 10px;
    font-size: 16px;
  }
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
  .traygran{
    background: #ddd !important;
    cursor: not-allowed;
    pointer-events:none
  }
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
  }
  .carouselLS{
    display: flex;
    .carouselLeft{
      flex: 1;
      img{
        height: 100%;
        width: 100%;
      }
      /*width: 100px;*/
    }
    .carouselRight{
      flex: 2;
      padding-left: 50px;
    }
  }
</style>
