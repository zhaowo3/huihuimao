<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="Determine">返回</el-button>
      </div>
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="closeTray">关闭托盘</el-button>
        <!--        <el-button type="primary" class="trayClose" @click="openTray">打开托盘</el-button>-->

      </div>
    </div>
    <div class="menuMainRightB">
      <el-button type="primary" class="trayOK" @click="returnData" id="hamburger-determination">确定</el-button>
    </div>
    <!--      <el-button type="primary" class="trayOK" @click="">提取</el-button>-->
    <Details :orderVoData="orderVoData"></Details>
    <HistoricalLi :materials="materials" @showChange="showH" :dialogVisible="dialogVisible" :isFinsh="isFinsh"
                  @BClickli="BClickLie"></HistoricalLi>
    <el-dialog title="请扫码" :visible.sync="dialogTableVisible" :modal="true" :fullscreen="fullscreen" :before-close="handleClose"
               custom-class="el-dialog__header-custom dialoVisible"  width="70%">
      <el-carousel v-if="dialogTableVisible" @change="changeCarousel" :initial-index="rootindex" :height="dataHeight" indicator-position="none" trigger="click" arrow="always" :autoplay="false" ref="car" style="min-height: 220px">
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
              <p class="textes">库位：{{items.location}}<span>应：{{items.supplyQuantity}}已：{{items.awayQuantity}}</span></p>
              <div class="crumbHight" v-if="items.codeType==2||items.codeType==3">
                <el-input-number v-model="items.num1" :controls="false" :disabled="tetede" :min="items.numMin" :max="items.numMax" label="输入数字" style="width: 80%;height: auto;margin-bottom: 10px;float: left;"></el-input-number>
              </div>

              <el-input v-model="inputvisible" ref="gain" :disabled="diste" autofocus="autofocus" clearable @keyup.enter.native="searchs(inputVal)"
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
    import HistoricalLi from '@/components/HistoricalLi'
    import {debounce} from '@/utils/debounce';
    import {
        detailns
    } from '@/api/home'
    import {
        orderEnterL
    } from '@/api/library'
    import {
        openL, closeL
    } from '@/api/systemsL'

    export default {
        name: "HistoricalDetails",
        components: {
            Details,
            HistoricalLi,
            LibraryDisplay
        },
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
                loctData: [],
                dialogVisible: false,
                dialogTableVisible: false,
                fullscreen: false,// 弹窗是否全屏
                values: '',
                num1:'',
                inputvisible: '',
                dataStas: [],
                locth: '',
                isCha:true,
                rootindex:'',
                items:[],
                smalls,
                munS:'',
                diste:false,
                tetede:false,
                ind:'',
                // valuenu:'',
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
                    this.$refs.car.prev()
                if (event.which == 39)
                    this.$refs.car.next()
            })
        },
        methods: {
            //  列表头部
            getList() {
                let mv = this;
                mv.listLoading = false;
                detailns(this.orderNumber).then(response => {
                    if(response.code !=='1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }
                    mv.listLoading = false;
                    mv.orderVoData = response.data.orderVo;
                    // mv.materials = response.data.materials;

                    const lists = response.data.materials; // 后端返回数组                 
                    const listsx  = lists.map(i => {
                        this.$set(i, 'buttons', false);
                        return i;
                    });
                    mv.materials = listsx.map(x => {
                        if(x.supplyQuantity<=x.awayQuantity){
                            x.buttons=true;
                        }else {
                            x.buttons=false;
                        }
                        return x;
                    });
                    if (mv.materials.length == 0) {
                        mv.isFinsh = true
                    } else {
                        mv.isFinsh = false
                    }
                });
            },
            leftClick(){
                // console.log("zuo")
            },
            rightClick(){
                // console.log("you")
            },
            changeCarousel(value,index){
                // console.log(value,index)
                let mv=this;
                mv.munS=value;
                mv.inputvisible='';
                if(mv.materialslun[value].supplyQuantity-mv.materialslun[value].awayQuantity==0){
                    mv.materialslun[value].num1=0;
                    mv.diste=true;
                    mv.tetede=true;
                }else {
                    mv.diste=false;
                    mv.tetede=false;
                    this.openTray(this.dataStas);
                }
                // mv.$nextTick( () =>{
                //     mv.$refs.child[mv.munS].parentMsg(mv.materialslun[value].location);
                // })
                mv.items=mv.materialslun[value];
                if(value>index){
                    this.rightClick()
                }else if(value<index) {
                    this.leftClick()
                }
            },
            BClickLie(data,index,item) {
                let mv=this;
                mv.carouselIndex = item.showIndex;
                let newdata = data.filter((value)=>{
                    return value.supplyQuantity-value.awayQuantity!==0
                })
                for(let i=0;i<newdata.length;i++){
                    if(item.id==newdata[i].id){
                        mv.ind=i;
                    }
                }
                mv.materialslun = newdata;
                item.munMax=item.supplyQuantity-item.awayQuantity;
                mv.rootindex=mv.ind;
                mv.loctDataId = item.id;
                mv.items = item;
                // mv.num1=item.supplyQuantity-item.awayQuantity;
                // this.$refs.carousel.setActiveItem(index);
                if(this.$store.state.whetherTest == true){
                    this.dialogTableVisible = true;
                    mv.$nextTick( () =>{
                        mv.$refs.gain[mv.rootindex].focus();
                        // mv.$refs.child[index].parentMsg(item.location);
                    })
                    // this.num1='1';


                }
                this.dataStas = item;
                this.openTray(item);
                this.start();
            },
            //扫码
            // searchs(){
            //   this.dataStas.hisCode === this.inputvisible;
            //
            //     this.inquiry();
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
                let mv=this;
                mv.locth=data.location;
                mv.openFullScreen2();
                mv.$store.state.LibraryLo=this.locth;
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
                    // mv.$nextTick( () =>{
                    //     mv.$refs.child.parentMsg(this.locth);
                    // })
                    // this.$store.state.LibraryLo=mv.locth;

                    // this.$message({
                    //     message: response.msg,
                    //     type: 'success',
                    //     duration: 1000,
                    //     customClass: 'zZindex'
                    // });
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

                if (mv.items.supplyQuantity <= mv.items.awayQuantity) {
                    this.$message('数量不能大于应配数量');
                    mv.inputvisible = '';
                    speechSU.text = '数量不能大于应配数量';
                    window.speechSynthesis.speak(speechSU);
                    return
                }
                orderEnterL({
                    barCode:  mv.inputvisible,
                    orderNumber: mv.items.orderNumber,
                    id: mv.items.id,
                    trayLocation:mv.items.location,
                    number:mv.items.num1,
                    codeType:mv.items.codeType,
                    barcodeSize:mv.items.barcodeSize,
                    bcode:mv.items.barcode,
                }).then(res => {
                    if(res.code !=='1'){
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }
                    mv.items.awayQuantity += mv.items.num1;

                    if(mv.items.codeType==2||mv.items.codeType==3){
                        localStorage.setItem("Timename", this.str);
                    }
                    if (mv.items.supplyQuantity == mv.items.awayQuantity||mv.items.supplyQuantity<mv.items.awayQuantity) {
                        mv.items.buttons=true;
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
                    speechSU.text = '已扫'+mv.items.materialName+mv.items.num1+mv.items.smallUnitDesc;
                    window.speechSynthesis.speak(speechSU);
                    mv.inputvisible = '';
                    // mv.num1='1';
                    // if(res.code==-1){
                    //   vm.$message({
                    //     type: 'error',
                    //     message: '条码错误',
                    //     duration:1000
                    //   });
                    //   return
                    // }
                    // for(let i=0;i<res.data.result.length;i++){
                    //   if(this.dataStas.hisCode==res.data.result[i].hisCode){
                    //     this.id=res.data.result[0].id;
                    //
                    //   }
                    // }


                }).catch(err => {

                });

            },
            closde() {
                let vm = this;
                vm.dialogTableVisible = false;
            },
            returnData(){
                this.isCha=false;
                this.$router.push({path: '/home',query:{orderNumber:this.$route.query.orderNumber}});
            },
            Determine(){
                this.$router.push({path: '/home',query:{orderNumber:this.$route.query.orderNumber}});
            },
            closeTray() {
                let mv=this;
                mv.locth=mv.$store.state.LibraryLo;
                if (this.locth == '') {
                    this.$message({
                        type: 'error',
                        message: '请选择物资',
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
                        customClass: 'zZindex',
                        duration: 1000,
                    });
                    return false;
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '关闭失败',
                        customClass: 'zZindex',
                        duration: 1000,
                    });
                    return false;
                })
            },
            showH(data) {

            },

        },
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
  .menuMainRightB {

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
