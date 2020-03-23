<template>
  <el-row class="detailsScroll">
    <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
    <div class="templateSubject">

      <el-col :span="8" class="templateLeft" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
              infinite-scroll-distance="10" v-loading="listLoading">
        <ul class="clearfix" id="leftBox" ref="uldom">
          <li v-for="(data,index) in houseList" :key="index" :class="index==cur?'hit':''"
              @click="infoViews(data.id,index)" :id="data.id">
            <el-main>
              <div class="templateLeftImg">
                <el-image :src="data.imgUrl">
                  <div slot="error" class="image-slot">
                    <img alt="" :src="smalls" >
                  </div>
                  <div slot="placeholder" class="image-slot">
                    <img alt="" :src="smalls" >
                  </div>

                </el-image>

                <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                <i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
              </div>
              <div class="templateLeftSpan"><p>{{data.name}}</p><p>{{data.alias}}</p><span>{{data.size}}</span><span>库位:{{data.location}}</span>
                <el-button class="templateButton" v-if="data.type==1">包</el-button>
                <p style="right: 0;position: absolute;" :class="data.supplyQuantity==0?classA:classB">{{data.supplyQuantity==0?'无库存':data.supplyQuantity}}</p>
              </div>
            </el-main>
          </li>
          <li
            style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;"
            v-show="droping">加载中
          </li>
          <li
            style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
            v-show="noMore">没有更多的数据
          </li>
          <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
        </ul>

      </el-col>


      <el-col :span="16" class="templateRight" style="display: block">
        <!--        <div v-if="danViewsLoadding" class="danViewsLoadding">正在加载</div>-->
        <div style="height: 100%;">
          <el-main style="height: 100%;">
            <el-container style="height: 100%;">
              <div class="listHeader" v-if="Object.keys(danViews).length>0">
                <div class="listHeightList">
                  <div class="listHeaderOne">
                    <el-col :span="12"><h3>{{danViews.name}}</h3></el-col>
                    <el-col :span="12"><h4>{{danViews.location}}</h4>
                      <p>库位:</p></el-col>
                    <el-col :span="24" class="aliasS"><h4>{{danViews.alias}}</h4>
                    </el-col>
                  </div>
                  <div class="listHeaderTwo">
                    <span>{{danViews.size}}</span>
                    <el-button @click="showH(danViews)" v-if="operation==1&&danViews.supplyQuantity!==0">打开</el-button>
                    <!--                  <el-button v-else="required1">{{btnTextT}}</el-button>-->
                  </div>
                </div>
                <div class="picturesList">

                  <div class="picturesListImg">
                    <el-image :src="danViews.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt="" :src="big" >
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt="" :src="big" >
                      </div>

                    </el-image>
                  </div>
                  <div class="picturesListCenter">
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>包装单位</p><span>{{danViews.bigUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>最小单位</p><span>{{danViews.smallUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>数量</p><span>{{danViews.supplyQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>预警数量</p><span>{{danViews.warnQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>是否启用</p><span>{{danViews.isDel===null?'是':'否'}}</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>计费</p>
                          <span>{{danViews.isFee===null?'是':'否'}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>关联HIS</p><span>{{danViews.hisCode}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>拼音</p><span>{{danViews.pinyin}}</span></div>
                      </el-col>
                    </el-row>

                  </div>
                </div>

                <!--                <el-row class="picturesBun"><el-button>查看更多</el-button></el-row>-->
                <!--                <div style="display: none">-->
                <!--                  <el-date-picker-->
                <!--                    v-model="value2"-->
                <!--                    align="right"-->
                <!--                    type="date"-->
                <!--                    placeholder="选择日期"-->
                <!--                    :picker-options="pickerOptions">-->
                <!--                  </el-date-picker>-->
                <!--                </div>-->
                <!--                <ul>-->
                <!--                  <li  v-for="(news,index) in da.temp" :key="index">-->
                <!--                    <el-row class="templateLis">-->
                <!--                      <div class="templateHover">-->
                <!--                        <div class="templateImg">-->
                <!--                          <img :src="smalls">-->
                <!--                        </div>-->
                <!--                        <el-card class="templateR">-->
                <!--                          <h4>{{news.title}}</h4>-->
                <!--                          &lt;!&ndash;                  <span class="templateSpan">库位:<p>{{news.storehouse}}</p></span>&ndash;&gt;-->
                <!--                          <span class="templateTitle">{{news.remarks}}</span>-->
                <!--                          <h3>{{news.amount}}</h3>-->
                <!--                          <p>8</p>-->
                <!--                          <el-button class="templateButton">包</el-button>-->
                <!--                        </el-card>-->
                <!--                      </div>-->
                <!--                    </el-row>-->
                <!--                  </li>-->
                <!--                </ul>-->
                <!--                <div class="templateAdd">-->
                <!--                  <el-button style="margin:0 auto;padding: 0.104167rem 0.104167rem"><svg-icon icon-class="add" class="color-main"></svg-icon></el-button>-->
                <!--                </div>-->
              </div>

            </el-container>
          </el-main>
        </div>
      </el-col>
    </div>
    <el-dialog title="无码出库" :visible.sync="dialogTableNoCode"  :before-close="NoHandleClose"
               custom-class="el-dialog__header-custom dialoVisible dialogTableNoCode" center width="70%">
      <div style="display: flex;">
        <div style="flex: 3">
          <div class="carouselLS">
            <div class="carouselLeft">
              <el-image :src="dataStas.imgUrl">
                <div slot="error" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
                <div slot="placeholder" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
              </el-image>
            </div>
            <div class="carouselRight">
              <p class="textes">{{dataStas.name}},{{dataStas.alias}}</p>
              <p class="textesH">{{dataStas.size}}</p>
              <p class="textes">库位：{{dataStas.location}}</p>
              <div class="crumbHight" v-if="danViews.codeType==2||danViews.codeType==3">
                <el-input-number v-model="num1" :min="1" :max="danViews.supplyQuantity"   label="输入数字"></el-input-number>
              </div>
            </div>
          </div>
        </div>
        <div style="flex: 2">
          <LibraryDisplay :lots="dataStas.location" ref="child"></LibraryDisplay>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="dialogTableNoCode = false">取 消</el-button>
        <el-button type="primary" @click="NoCodeOk(dataStas)">确 定</el-button>
  </span>

    </el-dialog>
    <el-dialog title="请扫码" :visible.sync="dialogTableVisible" :before-close="handleClose"
               custom-class="el-dialog__header-custom dialoVisible" width="70%">
      <div style="display: flex;">
        <div style="flex: 3">
          <div class="carouselLS">
            <div class="carouselLeft">
              <el-image :src="dataStas.imgUrl">
                <div slot="error" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
                <div slot="placeholder" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
              </el-image>
            </div>
            <div class="carouselRight">
              <p class="textes">{{dataStas.name}},{{dataStas.alias}}</p>
              <p class="textesH">{{dataStas.size}}</p>
              <p class="textes">库位：{{dataStas.location}}</p>
              <div class="crumbHight" v-if="danViews.codeType==2||danViews.codeType==3">
                <el-input-number v-model="num1" :min="1" :disabled="false" :max="danViews.supplyQuantity"   label="输入数字" style="width: 60%;height: auto;margin-bottom: 10px"></el-input-number>
              </div>
              <el-input v-model="inputSweep" ref='gain' autofocus="autofocus" clearable @keyup.enter="enterL(inputSweep)" class="cumens"
                        placeholder="物资编码">
                <i slot="suffix" class="iconfont icon-icon-test46" @click="enterL(inputSweep)"></i>
              </el-input>
              <div class="libraryGrade">
                <el-checkbox v-model="dataStas.isHerp" v-if="$route.query.oneStorehouse==1" true-label="1" false-label="0">退至一级库</el-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div style="flex: 2">
          <LibraryDisplay :lots="dataStas.location" ref="child"></LibraryDisplay>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  let speechSU = new window.SpeechSynthesisUtterance();
  import smalls from '@/assets/images/small.jpg';
  import big from '@/assets/images/big.jpg';
  import {debounce} from '@/utils/debounce';
  import LibraryDisplay from '@/components/LibraryDisplay'
  // import PullTo from 'vue-pull-to'
  import {
    catalogs, catalget,noCodeOutIn
  } from '@/api/material';
  import {
    openL, closeL,submenuMenuId
  } from '@/api/systemsL'
  import {
    enterLout
  } from '@/api/library';
  export default {
    name: "GroupH",
    components: {
        LibraryDisplay
    },
    data() {
      return {
          h:0,//定义时，分，秒，毫秒并初始化为0；
          m:0,
          ms:0,
          s:0,
          time:0,
          str:'',
          mytime:'',
          sumTimes:0,
          classA:'classA',
          classB:'classB',
          // leftInfo:{
        //   loading:false,
        //   isFinsh:false,  //是否完成加载
        //   allSize:'',
        //   pageSize:0,
        //   pageNumber:1,
        //   dataList:[],
        // },
        houseList: [],
        searchHouse: {
          pageSize: 10,
          pageNumber: 1,
          columnName: 'supply_quantity',
          orderType: 'desc'
        },
        busy: false,
          current:'',
          houseNum:'',
        listLoading: false,
        droping: false,
        noMore: false,
        loading: false,
        cur: 0,
        danViews: {},
        danViewsLoadding: false,
        dialogTableVisible: false,
          dialogTableNoCode:false,
        checkedIdStr:[],
        inputSweep:'',
          lansen:'',
        dataStas:'',
          num1: 1,
        smalls,
        big,
        operation:'',
        required1: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
        orderVoData: [],
        filesList: [],
        deviceIdc: this.deviceId,
        number1c: this.number1,
        numberc: this.number,
      }

    },
    props: {
      btnText: String,
      btnTextT: String,
      required: true,
      carrierId: [],
      deviceId: '',
      number1: '',
      number: '',
    },
    watch: {
      houseList:function () {
        this.$nextTick(function () {
          let uld=this.$refs.uldom.children[0].id;
          this.infoViews(uld,0)
        });
      }
    },
    created() {
      // this.getMoreList();
      this.$watch('inputSweep', debounce((newQuery) => {

        this.enterL(newQuery);
      }, 2000));
      this.submenuMenuId();
    },
    mounted() {
      // this.infoViews(11,0);
      // this.eventsBand( document.querySelectorAll('.templateLeft')[1]).then(res=>{
      //   let item=this.leftInfo.dataList;
      //   if(item.length>0) {
      //     this.infoViews(item[0].id,0)
      //   }
      // })
    },
    methods: {
      // btnText(){
      //   this.$emit('btnText')
      // },
      //首页加载权限
      submenuMenuId() {
        let mv=this;
        submenuMenuId(mv.$store.state.user.Submenu.stockOut.id).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          // mv.jurisdiction = response.data;
          if(response.data[0].children=='operation'){
            mv.operation=response.data[0].ststus;
            this.$emit('childByValue', mv.operation)
          }

        });
      },
        showH(data) {
            let mv=this;
            if(this.$store.state.whetherTest == true){
                if(data.codeType==3){
                    mv.dialogTableNoCode = true;
                }else {
                    mv.dialogTableVisible = true;
                    mv.$nextTick( () =>{
                        mv.$refs.gain.focus()
                    })
                }
                mv.num1=1;
            }
            mv.dataStas = data;
            mv.openTray(data);
            mv.start();

            this.$emit('childdatase', data.location)
        },
        //检查是否重复
        openTray(data) {
            let mv=this;
            let lan=data.location;
            let result=lan.split("-");
            mv.$nextTick( () =>{
                mv.$refs.child.parentMsg(lan);
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
            let mv = this;
            mv.$store.state.LibraryLo=data.location;
            mv.lansen=mv.$store.state.LibraryLo;
            mv.openFullScreen2();
        openL(data.location).then(response => {
            mv.$store.state.recordPrevious=1;
          if(response.code !=='1'){
              mv.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
            if(mv.$store.state.whetherTest == false){
                if(data.codeType==3){
                    mv.dialogTableNoCode = true;
                }else {
                    mv.dialogTableVisible = true;
                }

                // vm.dialogTableVisible = true;
            }
            // vm.$nextTick( () =>{
            //     vm.$refs.child.parentMsg(data.location);
            //     // vm.dialogTableVisible = true;
            // })
          // this.locth=data.location;

            mv.$message({
            message: response.msg,
            type: 'success',
            duration: 1000,
            customClass: 'zZindex'
          });
        }).catch(err => {
            mv.$message({
            type: 'err',
            message: err.msg
          });
        })
      },
        //  无码出库
        NoCodeOk(data){
            let mv = this;
            noCodeOutIn({
                id: data.id,
                actionType:2,
                number:mv.num1,
                codeType:mv.dataStas.codeType,
                barcodeSize:mv.dataStas.barcodeSize,
                bcode:mv.dataStas.barcode,

            }).then(res => {
                if (res.code !== '1') {
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000,
                    });
                    speechSU.text = res.msg;
                    window.speechSynthesis.speak(speechSU);
                    return
                }
                if (res.code == 1) {
                    this.$message({
                        message: '出库成功',
                        type: 'success',
                        duration: 1000
                    });

                    mv.danViews.supplyQuantity=mv.danViews.supplyQuantity-mv.num1;
                    // if( mv.danViews.warnQuantity<=mv.danViews.supplyQuantity){
                    //
                    // }
                    mv.houseList[mv.cur].supplyQuantity=mv.houseList[mv.cur].supplyQuantity-mv.num1;
                    if(mv.danViews.codeType==2||mv.danViews.codeType==3){
                        mv.dialogTableNoCode = false;
                        localStorage.setItem("Timename", this.str);
                    }
                    // if(mv.danViews.supplyQuantity==0){
                    //     mv.houseList[mv.cur].supplyQuantity=0;
                    //
                    // }
                    speechSU.text = '已出库'+res.data.name+'数量'+mv.num1;
                    //+res.data.smallUnitDesc
                    window.speechSynthesis.speak(speechSU);
                    mv.num1='1';
                    // this.$router.push({name: 'warehouseLie',params:{data:res}})
                }
            }).catch((err) => {
                console.log(err);
            })
        },
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
            // clearInterval(this.time);
            // this.h=0;
            // this.m=0;
            // this.ms=0;
            // this.s=0;
            // this.str="00:00:00";
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
        //关闭窗口
        NoHandleClose(done){
            let mv=this;
            mv.stop();
            localStorage.setItem("Timename", this.str);
            mv.reset();
            done();
        },
        handleClose(done){
            let vm = this;
            vm.stop();
            localStorage.setItem("Timename", this.str);
            vm.reset();
            done();
        },
      enterL(newQuery) {
        let mv = this;
        if (newQuery == '') {
          return;
        }
        // if(this.dataStas.barcode ==newQuery.toString().toUpperCase().substring(0,4)||this.dataStas.hisCode ==newQuery) {
          // this.$confirm('是否进行出库操作?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
            enterLout({
              barCode: newQuery,
                location:mv.dataStas.location,
                number:mv.num1,
                codeType:mv.dataStas.codeType,
                barcodeSize:mv.dataStas.barcodeSize,
                isHerp:mv.dataStas.isHerp,
                bcode:mv.dataStas.barcode,
            }).then(res => {
              if (res.code !== '1') {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1000
                });
                speechSU.text = res.msg;
                window.speechSynthesis.speak(speechSU);
                return
              }
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1000
                });
                // speechSU.text = '已出库'+mv.dataStas.name+'1'+mv.dataStas.smallUnitDesc;
                // window.speechSynthesis.speak(speechSU);
                // mv.danViews.supplyQuantity=mv.danViews.supplyQuantity-1;
                // let L=sessionStorage.getItem('dataQ');
                // let L2 = [].concat(res.data);
                // if(!!L){
                //   L2 = [].concat(L2).concat(JSON.parse(L));
                // }
                // let fdata = this.F(L2);
                // // // 分别将 未分组数据 和 分组数据 存入 sessionStorage
                // //  分组
                // sessionStorage.setItem('dataL',JSON. stringify(fdata));
                // //未分组
                // sessionStorage.setItem('dataQ',JSON. stringify(L2));

                // this.dialogTableVisible=false;
                this.inputSweep = '';
                mv.danViews.supplyQuantity=mv.danViews.supplyQuantity-mv.num1;
                // if( mv.danViews.warnQuantity<=mv.danViews.supplyQuantity){
                //
                // }
                mv.houseList[mv.cur].supplyQuantity=mv.houseList[mv.cur].supplyQuantity-mv.num1;
                if(mv.danViews.codeType==2||mv.danViews.codeType==3){
                    mv.dialogTableVisible = false;
                    localStorage.setItem("Timename", this.str);
                }
                // if(mv.danViews.supplyQuantity==0){
                //     mv.houseList[mv.cur].supplyQuantity=0;
                //
                // }
                speechSU.text = '已出库'+res.data.name+'数量'+mv.num1;
                //+res.data.smallUnitDesc
                window.speechSynthesis.speak(speechSU);
                mv.num1='1';
                // this.$router.push({name: 'stockOuter',params:{data:res.data}})
            }).catch((err) => {
              console.log(err);
            })
          // }).catch(() => {
          //   // this.$message({
          //   //   type: 'info',
          //   //   message: '已取消发货'
          //   // });
          // });
        // }else {
        //   this.$message({
        //     message: '物资编码与实际物资编码不相同',
        //     type: 'error',
        //     duration: 1000
        //   });
        //   speechSU.text = '物资编码与实际物资编码不相同';
        //   window.speechSynthesis.speak(speechSU);
        //   return;
        // }
      },
      loadMore() {
        setTimeout(() => {

          if (!this.busy) {
            this.busy = true;// 将无限滚动给禁用
            this.searchHouse.pageNumber++ // 增加页数
            this.searchSource() // 请求数据

          }
        }, 500);
      },
      searchSource() {
        let mv = this;
        let zong;
        if (mv.number1 == undefined) {
          zong = parseInt(mv.deviceId) + '-' + parseInt(mv.number)+'-';
        } else {
          zong = parseInt(mv.deviceId) + '-' + parseInt(mv.number)+ '-' + parseInt(mv.number1)+'-' ;
        }

        catalogs({
          pageSize: this.searchHouse.pageSize,
          pageNumber: this.searchHouse.pageNumber,
          keyWords: zong,
        }).then(response => {
          let listTotal = response.data.total;
          if (listTotal > 0) {
            this.busy = true
          } else {
            this.busy = false
          }
          this.loading = false;
            if(listTotal<=mv.searchHouse.pageSize){
                mv.houseList=response.data.result;
                mv.houseNum = response.data.total;
                this.busy = true;
                mv.noMore = true; // 切换底部提示信息
                mv.droping = false;
                mv.current= mv.houseList.length;
            }else {
                mv.houseList = mv.houseList.concat(response.data.result)
                // console.log(response.data.result);
                let DownloadTotal =
                    (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize;
                let total = response.data.total;
                mv.houseNum = response.data.total;
                let totalPage = (mv.houseNum + mv.searchHouse.pageSize - 1) / mv.searchHouse.pageSize;
                // mv.searchHouse.pageNumber++; //增加页数
                if (mv.searchHouse.pageNumber + 1 >= totalPage) {
                    this.busy = true;// 将无限滚动关闭
                    this.searchHouse.pageNumber = 0 // 页数变为0
                    this.noMore = true; // 切换底部提示信息
                    this.droping = false
                } else {
                    this.busy = false;// 将无限滚动给打开
                    this.droping = true;
                    this.noMore = false; // 切换底部提示信息
                }
                mv.current= mv.houseList.length;
            }
        }).catch(function (error) {
          this.$message.error(error);
          this.droping = false
        });


      },

      F(list){
        //分
        let arr1=[];
        let arr2=[];
        //取出来后和原来的排序
        // das.concat(list);
        list.some((so)=>{
          let idx=arr1.indexOf(so.barcode);
          if(idx>-1){
            arr2[idx].monomersN++
          }else {
            arr1.push(so.barcode);
            so.monomersN=1;
            arr2.push(so)
          }
        });
        return arr2;
      },
      //     eventsBand(e){
      //       return new Promise(resolve => {
      //         let ev=e.target||e;
      //         let el=document.querySelector('#leftBox');
      //         if(ev.offsetHeight>el.offsetHeight) {
      //           resolve(this.getMoreList());
      //         }else if(ev.scrollHeight==el.offsetHeight){   //到底了 我们需要加载
      //           resolve(this.getMoreList());
      //         }
      //       })
      // },
      //       //  列表头部
      //       getMoreList() {
      //       return  new Promise((resolve, reject)=>{
      //         if(this.leftInfo.isFinsh){
      //           return  false
      //         }
      //         if(this.leftInfo.loading){
      //           return false;
      //         }
      //         this.leftInfo.loading=true;
      //         this.leftInfo.pageSize+=10;
      //         catalogs({
      //           location:this.carrierId,
      //           pageSize:this.leftInfo.pageSize,
      //           pageNumber:this.leftInfo.pageNumber
      //         }).then(res=>{
      //           console.log(res);
      //             this.leftInfo.allSize=res.data.total;
      //             this.leftInfo.dataList=res.data.result;
      //             this.leftInfo.loading=false;
      //             if(this.leftInfo.allSize<=this.leftInfo.pageSize){
      //               this.leftInfo.isFinsh=true;
      //             }else{
      //               this.leftInfo.isFinsh=false;
      //               this.eventsBand( document.querySelectorAll('.templateLeft')[1]);
      //             }
      //             resolve(res);
      //         })
      //       })
      //       },
      infoViews(id, index) {
        let mv=this;
        if(mv.cur==0) {
          this.cur = index;
          this.danViewsLoadding = true;
          catalget(id).then(res => {
            if (res.code !== '1') {
              this.$message({
                message: res.msg,
                type: 'error',
              });
              return
            }
            this.danViews = res.data;
            this.danViewsLoadding = false;
          })
        }else if(mv.cur!==index){
          this.cur = index;
          this.danViewsLoadding = true;
          catalget(id).then(res => {
            if (res.code !== '1') {
              this.$message({
                message: res.msg,
                type: 'error',
              });
              return
            }
            this.danViews = res.data;
            this.danViewsLoadding = false;
          })
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .textes{
    text-align: left;
    height: 30px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  .detailsScroll {
    height: 100%;
    position: relative;
  }

  .templateSubject {
    overflow: auto;
    height: 100%;

    .templateLeft {
      background: #fff;
      height: calc(100% - 15px);
      overflow-y: auto;

      li {
        float: left;
        font-size: 20px;
        width: 100%;
        /*line-height: 84px;*/
        /*height: 84px;*/
        border-bottom-color: #dde8ec;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        position: relative;
        .templateLeftImg {
          width: 178px;
          height: 100%;
          float: left;
          position: absolute;
          left: 0;
          top: 0;
          padding: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .templateLeftSpan {
          padding-left: 160px;
          float: left;
          width: 100%;
          position: relative;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*height: 45px;*/
          }
          p::after,span::after {
            content:"\007C ";
            opacity:0;
          }
          span {
            float: left;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          button {
            float: right;
            color: #0eb2ea;
            border: 2px dashed #0eb2ea;
          }
        }
      }

      .hit {
        background: #e7f9fe;
      }

      li:hover {
        background: #e7f9fe;
        cursor: pointer;
      }

    }

    .templateRight {
      margin: 0;
      height: calc(100% - 55px);
      overflow-y: auto;
      position: relative;

      .danViewsLoadding {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        font-size: .3rem;
        color: #fff;
        z-index: 19970806114;
      }

      .picturesList {
        float: left;
        width: 100%;
        margin-top: 20px;
        height: calc(100% - 120px);
        .picturesListImg {
          width: 80%;
          display: block;
          margin:0 auto 30px;
          height: calc(100% - 160px);

          img {
            max-width: 100%;
            /*width: 100%;*/
            height: 100%;
            display: block;
            margin: 0 auto;
          }
        }

        .picturesListCenter {
          .grid-content {
            /*line-height: 40px;*/
            /*height: 40px;*/
            margin-bottom: 20px;
            float: left;
            display: flex;
            width: 100%;
          }

          span {
            font-size: 16px;
            float: left;

            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
            flex: 1;

          }

          p {
            font-size: 16px;
            float: left;
            padding-right: 28px;
          }

        }
      }

      .picturesBun {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        float: left;
        width: 100%;

        button {
          background: #1fd7d8;
          color: #fff;
          display: block;
          margin: 0 auto;
          padding: 15px 30px;
        }
      }

      .listHeader {
        justify-content: space-between;
        float: left;
        width: 100%;
        margin-top: 20px;
        height: calc(100% - 0px);
        .listHeightList{
          height: 90px;
        }
        .listHeaderOne {
          width: 100%;
          font-weight: normal;
          float: left;

          h3 {
            font-size: 26px;
            float: left;
            font-weight: normal;
          }

          p {
            font-size: 24px;
            float: right;
            font-weight: normal;
          }

          h4 {
            font-size: 24px;
            float: right;
            font-weight: normal;
          }
        }

        .listHeaderTwo {
          width: 100%;
          float: left;
          margin-top: 10px;
          display: flex;
          span {
            font-size: 16px;
            float: left;
            flex: 1;
          }
          span::after {
            content:"\007C ";
            opacity:0;
          }
          button {
            /*font-size: 24px;*/
            float: right;
            background: #1fd7d8;
            color: #fff;
          }
        }


      }

      .templateAdd {
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        display: flex;
      }

      .templateHover {
        display: initial;
        float: left;
        width: 100%;
        height: 170px;
        position: relative;
      }

      .templateHover:hover {
        border-width: 2px;
        border-color: #13bdf6;
        border-style: solid;
      }

      .el-card__body {
        height: 100%;
        position: relative;
      }

      li {
        float: left;
        width: 100%;

        .templateLis {
          padding-bottom: 20px;
        }

        .templateImg {
          width: 246px;
          height: 166px;
          float: left;

          img {
            width: 100%;
            height: 100%;
            float: left;
          }
        }

        .templateR {
          height: 100%;

          h4 {
            font-size: 24px;
            font-weight: normal;
          }

          h3 {
            font-size: 16px;
            color: #00adf8;
            margin-top: 10px;
          }

          p {
            float: right;
            font-size: 36px;
            position: relative;
            bottom: 50px;
            right: 10px;
          }

          .templateNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .templateButton {
            position: absolute;
            right: 20px;
            background: #0eb2ea;
            color: #fff;
            bottom: 25px;
            font-size: 16px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .templateSpan {
            float: right;
            font-size: 18px;

            p {
              float: right;
            }
          }

          .templateTitle {
            display: block;
            font-size: 16px;
            padding-top: 8px;
            color: #8e8e8e;
          }
          .templateTitle::before{
            content:"\007C ";
            opacity:0;
          }
        }


      }
    }
  }
  .aliasS{
    h4{
      float: left !important;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分省略号显示*/
    }
    h4::after{
      content:"\007C ";
      opacity:0;
    }
  }
  .classA{
    color: red;
    font-size: 12px;
  }
  .classB{
    color: #333;
    font-size: 18px;
  }
  .infoNum{
   position: absolute;
    top: -35px;
    right: 20px;
    font-size: 18px;
    color: #97a8be;
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
  .textesH{
    text-align: left;
    height: 20px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .selValImg{
    margin-top: 5px;
    margin-bottom: 10px;
    width: 80% !important;
    float: left;
  }
  .crumbHight{
    width:80% !important;
    height: auto;
    margin-bottom: 10px;
    float: left;
    .el-input-number{
      width: 100% !important;
    }
  }
  .cumens{
    margin-top: 10px;
    width: 80% !important;
    height: auto;
    margin-bottom: 10px;
    float: left;
  }
</style>
