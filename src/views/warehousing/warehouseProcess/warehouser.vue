<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="closeTray" v-if="$route.query.operation==1">关闭托盘</el-button>
                <el-button type="primary" class="trayClose" @click="returnEntry">返回</el-button>
        <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
<!--        <h1 id='mytime' style="float: right;">{{str}}</h1>-->
        <!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->
      </div>
    </div>
    <el-row class="detailsScroll">
      <div class="templateSubject">

        <el-col :span="8" class="templateLeft" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10" v-loading="listLoading">
          <div class="autoSeach2" v-if="autoHide">
            <el-input v-model="searchtxt" @keyup.enter.native="queryClick2(searchtxt)"
                      class="inputs1" placeholder="请输入关键字" clearable>
              <i class="iconfont icon-icon-test35" @click="queryClick2(searchtxt)" slot="suffix"></i>
            </el-input>
          </div>
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
                <div class="templateLeftSpan"><p>{{data.name}}</p><span>{{data.size}}</span><span>库位:{{data.location}}</span>
                  <el-button class="templateButton" v-if="data.type==1">包</el-button>
<!--                  <p style="color: red;font-size: 12px;right: 0;position: absolute;" v-if="data.supplyQuantity==0">无库存</p>-->
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
                      <el-col :span="18"><h3>{{danViews.name}}</h3></el-col>
                      <el-col :span="6"><h4>{{danViews.location}}</h4>
                        <p>库位:</p></el-col>
                      <el-col :span="24" class="aliasS"><h4>{{danViews.alias}}</h4>
                      </el-col>
                    </div>
                    <div class="listHeaderTwo">
                      <span>{{danViews.size}}</span>
                      <el-button @click="showH(danViews)" v-if="$route.query.operation==1">打开</el-button>
                      <!--                  <el-button v-else="required1">{{btnTextT}}</el-button>-->
                    </div>
                  </div>
                  <div class="picturesList">
                    <viewer class="picturesListImg">
                      <el-image :src="danViews.imgUrl">

                          <div slot="error" class="image-slot">
                            <img alt="" :src="big" >
                          </div>
                          <div slot="placeholder" class="image-slot">
                            <img alt="" :src="big" >
                          </div>


                      </el-image>
                    </viewer>
<!--                    <viewer class="picturesListImg">-->
<!--                      <img alt="" :src="big" v-real-img="danViews.imgUrl">-->
<!--                    </viewer>-->
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
                          <div class="grid-content bg-purple-light"><p>关联HIS</p><span :title="danViews.hisCode">{{danViews.hisCode}}</span></div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple-light"><p>拼音</p><span :title="danViews.pinyin">{{danViews.pinyin}}</span></div>
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
      <el-dialog title="无码入库" :visible.sync="dialogTableNoCode" :before-close="NoHandleClose"
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
                <el-date-picker v-model="selectVal" ref="gainVal" class="selValImg" align="right" style="margin-top: 5px;margin-bottom: 10px;" type="date"
                                placeholder="选择效期日期"
                                popper-class="picker-no-text"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions">
                </el-date-picker>
                <div class="crumbHight" v-if="danViews.codeType==2||danViews.codeType==3">
                  <el-input-number v-model="num1" :min="1" :max="9999"   label="输入数字"></el-input-number>
                </div>
              </div>
            </div>

          </div>
          <div style="flex: 2">
            <LibraryDisplay :lots="danViews.location" ref="child"></LibraryDisplay>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogTableNoCode = false">取 消</el-button>
        <el-button type="primary" @click="NoCodeOk(dataStas)">确 定</el-button>
  </span>

      </el-dialog>
      <el-dialog title="请扫码" :visible.sync="dialogTableVisible"
                 custom-class="el-dialog__header-custom dialoVisible" :before-close="handleClose" width="70%">
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
                <el-date-picker v-model="selectVal" ref="gainVal" class="selValImg" align="right" type="date"
                                placeholder="选择效期日期"
                                popper-class="picker-no-text"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions">
                </el-date-picker>
                <div class="crumbHight" v-if="danViews.codeType==2||danViews.codeType==3">
                  <el-input-number v-model="num1" :min="1" :disabled="disabled" :max="9999"   label="输入数字"></el-input-number>
                </div>
                <el-input v-model="inputSweep" ref='gain' :disabled="disabled" autofocus="autofocus" clearable class="cumens"
                          placeholder="物资编码" @click="enterL(inputSweep)" @keyup.enter="enterL(inputSweep)">
                  <i slot="suffix" class="iconfont icon-icon-test46" @click="enterL(inputSweep)"></i>
                </el-input>
              </div>
            </div>
          </div>
          <div style="flex: 2">
            <LibraryDisplay :lots="danViews.location" ref="child"></LibraryDisplay>
          </div>
  </div>
<!--        <div class="crush">-->
<!--          <el-button type="primary" class="trayOK" >确定</el-button>-->
<!--        </div>-->

        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
      <el-dialog title="库位" custom-class="gridK" :close-on-click-modal="false" :visible.sync="dialogTableV" width="200px">
        <el-table
          :data="dialogDatas"
          style="width: 100%" @row-click="gridClick">
          <el-table-column property="location" label="库位"></el-table-column>
          <!--        <el-table-column-->
          <!--          label="库位"-->
          <!--          width="180">-->
          <!--          <template slot-scope="scope">{{scope.row.location}}</template>-->
          <!--        </el-table-column>-->

        </el-table>

      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  let speechSU = new window.SpeechSynthesisUtterance();
  import smalls from '@/assets/images/small.jpg';
  import LibraryDisplay from '@/components/LibraryDisplay'
  import {
    enterL, inquiry, addDateS
  } from '@/api/library';
  import {debounce} from '@/utils/debounce';
  import {
    catalogs,catalget,noCodeOutIn
  } from '@/api/material'
  import {
    openL, closeL, searchPage
  } from '@/api/systemsL'

  import big from '@/assets/images/big.jpg';

  export default {
    name: "warehouser",
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
          autoHide:false,
        state: '',
        inputSweep: '',
        inputSweep1: '',
        inputSweep2: '',
        materialName: '',
        id: '',
        leftInfo: {
          loading: false,
          isFinsh: false,  //是否完成加载
          allSize: '',
          pageSize: 0,
          pageNumber: 1,
          dataList: [],
        },
        searchHouse: {
          pageSize: 10,
          pageNumber: 1,
          // keyWords:'',
        },
        big,
        smalls,
        disabled:false,
        selectVal:'',
        searchHouse2: {
          pageSize: 10,
          pageNumber: 1,
          // keyWords:'',
        },
        searchtxt: '',
          current:'',
        cur: 0,
          num1: 1,
        houseList: [],
        houseList2: [],
        busy: true,
        busy2: true,
        houseNum: '',
        houseNum2: '',
        droping: false,
        mainShow: true,
        noMore: false,
        droping2: false,
        mainShow2: true,
        mainShow1: true,
        noMore2: false,
        listLoading: false,
        value2: [],
        gridData: [],
        danViews: {},
        checkedIdStr: [],
        inputVal: '',
        dataStas: '',
        lansen: '',
        londe:'',
        hoVal:'',
        hoValick:'',
        monomersN: '',
        idsh:'',
        inputvisible: '',
          dialogTableV:false,
        dialogTableVisible: false,
          dialogTableNoCode:false,
        fullscreenLoading: false,
        chatlog: true,
        fullscreen: false,// 弹窗是否全屏
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
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
          dialogDatas:[],
          bose:'',
      }
    },
    created() {
      this.deviceList();
        if(this.hoValick==undefined){
            this.queryClick2(this.hoVal);
            this.autoHide=false;
        }else if(this.hoVal==undefined){
            this.queryClick2(this.hoValick);
            this.autoHide=true;
        }else {
            this.queryClick2();
        }
        // if (this.$route.params.inputNO !== '') {
        //     this.searchtxt = this.$route.params.inputNO;
        //     this.queryClick2(this.$route.params.inputNO);
        // }
        // this.$watch('searchtxt', debounce((newQuery) => {
        //     this.queryClick2(newQuery);
        // }, 1000))
      this.$watch('inputSweep', debounce((newQuery) => {
        if(newQuery!==''){
          this.enterL(newQuery);
        }
      }, 2000));
    },
    watch: {
      // houseList:function () {
      //   this.$nextTick(function () {
      //     let uld=this.$refs.uldom.children[0].id;
      //     this.infoViews(uld,0)
      //   });
      // }
      selectVal:function () {
        const vm=this;
        if(vm.selectVal!==null){
          vm.disabled=false;
        }else {
          vm.disabled=true;
        }
      },
      houseList:function () {
        this.$nextTick(function () {
            if(this.$refs.uldom.children[this.cur]==undefined){
                return
            }
          let uld=this.$refs.uldom.children[this.cur].id;
          if(uld!==''){
            this.infoViews(uld,this.cur)
          }
        });
      }
    },
    methods: {
        // queryClick(val) {
        //     let mv = this;
        //     mv.searchHouse.pageNumber = 1;
        //     mv.houseList = [];
        //     mv.current='';
        //     mv.cur = 0;
        //     mv.querySearch(val);
        // },
      back() {
        this.$router.go(-1);
      },
      handleClose(done){
        let vm = this;
          vm.stop();
          localStorage.setItem("Timename", this.str);
          vm.reset();
        vm.selectVal='';
        vm.inputSweep='';
        done();
      },
      //关闭
      closeTray() {
          let mv = this;
          mv.londe=this.$store.state.LibraryLo;
        if (mv.londe == '') {
          this.$message({
            type: 'error',
            message: '请输入库位',
            duration: 1000,
          });
          return false;
        }
        closeL(this.londe).then(response => {
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
            message: response.msg,
            duration: 1000,
          });
          return false;
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.msg,
            duration: 1000,
          });
          return false;
        })
      },
      loadMore() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy) {
            mv.busy = true;// 将无限滚动给禁用
            if(this.hoVal===undefined){
              mv.searchHouse2.pageNumber++ // 增加页数
              mv.querySearch2(this.hoValick);
            }else {
              mv.searchHouse2.pageNumber++ // 增加页数
              mv.querySearch2(this.hoVal);
            }

          }
        }, 500);
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
        //当有多个库位的时候
        gridClick(val) {
            let mv = this;
            mv.dialogDatas = val;
            mv.enterL(mv.bose);
        },
      //输入效期
      // addValid(id, selectVal) {
      //     addDateS({
      //       id: id,
      //       valid: selectVal
      //     }).then(res => {
      //       this.$message({
      //         message: res.msg,
      //         type: 'success',
      //         duration: 1000,
      //       })
      //         // customClass:'zZindex'
      //       }).catch(() => {
      //
      //     });
      //
      // },
      //物资搜索
      queryClick2(val) {
        let mv = this;

          mv.searchtxt=val;
        mv.searchHouse2.pageNumber = 1;
        mv.houseList = [];
        this.busy = false // 将无限滚动给打开
        if(this.hoVal===undefined){
            this.hoValick=mv.searchtxt;
          mv.querySearch2(this.hoValick);
        }else {
            this.hoVal=mv.searchtxt;
          mv.querySearch2(this.hoVal);
        }

      },
      //搜索
      querySearch2(val) {
        let mv = this;
        // if (val == "" || val.length < 4) {
        //   mv.houseList = [];
        //   mv.droping = false;
        //   mv.noMore = false;
        //   mv.mainShow = true;
        //   return
        // }
        let hou = this.searchHouse2;
        mv.mainShow = false;
        if(this.hoVal==undefined) {
          hou.keyWords = val;
          searchPage(this.Qs.stringify(hou)).then(res => {
            if(res.code !=='1'){
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
              });
              return
            }
            let listTotal = res.data.total;
            if (listTotal > 0) {
              this.busy = true
            } else {
              this.busy = false;
              this.$router.go(-1);
              mv.$message({
                message: '查不到资源',
                type: 'error',
                duration: 1000,
              });
            }
            this.loading = false;
              if(listTotal<=mv.searchHouse2.pageSize){
                  mv.houseList=res.data.result;
                  mv.houseNum = res.data.total;
                  this.busy = true;
                  mv.noMore = true // 切换底部提示信息
                  mv.droping = false;
                  mv.current= mv.houseList.length;
              }else {
                  mv.houseList = mv.houseList.concat(res.data.result);
                  let DownloadTotal =
                      (mv.searchHouse2.pageNumber + 1) * mv.searchHouse2.pageSize;
                  let total = res.data.total;
                  mv.houseNum = total;
                  let totalPage = (mv.houseNum + mv.searchHouse2.pageSize) / mv.searchHouse2.pageSize;
                  // mv.searchHouse2.pageNumber++; //增加页数
                  if (mv.searchHouse2.pageNumber + 1 >= totalPage) {
                      this.busy = true // 将无限滚动关闭
                      this.searchHouse2.pageNumber = 0 // 页数变为0
                      this.noMore = true // 切换底部提示信息
                      this.droping = false
                  } else {
                      this.busy = false // 将无限滚动给打开
                      this.droping = true
                      this.noMore = false // 切换底部提示信息
                  }
                  mv.current= mv.houseList.length;
              }
          }).catch(function (error) {
            mv.$message({
              message: error.msg,
              type: 'error',
              duration: 1000,
            });
            mv.droping = false
          });
        }else {
          hou.barCode = val;
          catalogs(hou).then(res => {
            if(res.code !=='1'){
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
              });
              return
            }
            let listTotal = res.data.total;
            if (listTotal > 0) {
              this.busy = true
            } else {
              this.busy = false;
              this.$router.go(-1);
              mv.$message({
                message: '查不到资源',
                type: 'error',
                duration: 1000,
              });
            }
            this.loading = false;
              if(listTotal<=mv.searchHouse2.pageSize){
                  mv.houseList=res.data.result;
                  mv.houseNum = res.data.total;
                  this.busy = true;
                  mv.noMore = true // 切换底部提示信息
                  mv.droping = false;
                  mv.current= mv.houseList.length;
              }else {
                  mv.houseList = mv.houseList.concat(res.data.result);
                  let DownloadTotal =
                      (mv.searchHouse2.pageNumber + 1) * mv.searchHouse2.pageSize;
                  let total = res.data.total;
                  mv.houseNum = total;
                  let totalPage = (mv.houseNum + mv.searchHouse2.pageSize) / mv.searchHouse2.pageSize;
                  // mv.searchHouse2.pageNumber++; //增加页数
                  if (mv.searchHouse2.pageNumber + 1 >= totalPage) {
                      this.busy = true // 将无限滚动关闭
                      this.searchHouse2.pageNumber = 0 // 页数变为0
                      this.noMore = true // 切换底部提示信息
                      this.droping = false
                  } else {
                      this.busy = false // 将无限滚动给打开
                      this.droping = true
                      this.noMore = false // 切换底部提示信息
                  }
                  mv.current= mv.houseList.length;
              }
          }).catch(function (error) {
            mv.$message({
              message: error.msg,
              type: 'error',
              duration: 1000,
            });
            mv.droping = false
          });
        }
      },

      //打开库位列表
      showH(data) {
        let vm = this;
          if(this.$store.state.whetherTest == true){
              if(data.codeType==3){
                  vm.dialogTableNoCode = true;
              }else {
                  vm.dialogTableVisible = true;

              }
              vm.num1=1;
              // vm.dialogTableVisible = true;
          }
        vm.dataStas = data;

        vm.openTray(data);
          vm.start();
          vm.selectVal=data.validDate;
        if(vm.selectVal==''||vm.selectVal==null){
          vm.disabled=true;
            vm.$nextTick(() => {
                vm.selectVal=data.validDate;
                vm.$refs.gainVal.focus();
            })
        }else {
          vm.disabled=false;
            if(data.codeType!==3) {
                vm.$nextTick(() => {
                    vm.$refs.gain.focus();
                })
            }
        }

      },
        //检查是否重复
        openTray(data) {
            let mv=this;
            let lan=data.location;
            let result=lan.split("-");
            mv.$nextTick( () =>{
                mv.$refs.child.parentMsg(data.location);
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
        //打开库位
        pushDataList(data) {
          let mv = this;
            mv.$store.state.LibraryLo=data.location;
            mv.openFullScreen2();
            mv.dataStas=data;
          openL(data.location).then(res => {
              this.$store.state.recordPrevious=1;
            if(res.code !=='1'){
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
              });
              return
            }
            if(this.$store.state.whetherTest == false){
                if(data.codeType==3){
                    mv.dialogTableNoCode = true;
                }else {
                    mv.dialogTableVisible = true;
                }
                // vm.dialogTableVisible = true;
            }
            // vm.$nextTick( () =>{
            //     // vm.dialogTableVisible = true;
            // })
            this.$store.state.LibraryLo=data.location;
            vm.londe = this.$store.state.LibraryLo;
          // data.supplyQuantity =data.realQuantity;
          // data.checkStatus=1;
          // this.valueEquals=true;

              mv.$message({
            type: 'success',
            message: res.msg,
            customClass:'zZindex',
            duration: 1000,
          });

              mv.inputSweep='';
          return false;
        }).catch(err => {
              mv.$message({
            type: 'error',
            message: err.msg,
            duration: 1000,
          });
          return false;
        });
      },
      //  无码入库
        NoCodeOk(data){
            let mv = this;
            noCodeOutIn({
                id: data.id,
                actionType:1,
                number:mv.num1,
                codeType:data.codeType,
                barcodeSize:data.barcodeSize,
                bcode:data.barcode,
                valid:mv.selectVal,
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
                        message: '入库成功',
                        type: 'success',
                        duration: 1000
                    });

                    mv.danViews.supplyQuantity=mv.danViews.supplyQuantity+mv.num1;
                   if( mv.danViews.warnQuantity<=mv.danViews.supplyQuantity){
                       mv.houseList[mv.cur].supplyQuantity=mv.houseList[mv.cur].supplyQuantity-mv.num1;
                   }
                    if(mv.danViews.codeType==2||mv.danViews.codeType==3){
                        mv.dialogTableNoCode = false;
                        localStorage.setItem("Timename", this.str);
                    }
                    // if(mv.danViews.supplyQuantity==0){
                    //     mv.houseList[mv.cur].supplyQuantity=0;
                    //
                    // }
                    speechSU.text = '已入库'+res.data.name+'数量'+mv.num1;
                    //+res.data.smallUnitDesc
                    window.speechSynthesis.speak(speechSU);
                    mv.num1='1';
                    // this.$router.push({name: 'warehouseLie',params:{data:res}})
                }
            }).catch((err) => {
                console.log(err);
            })
        },
      enterL(newQuery) {
        let mv = this;
        if(mv.selectVal==null){
          mv.$message({
            type: 'error',
            message: '请输入日期',
            duration: 1000,
          });
          return;
        }
        if (newQuery == '') {
          this.$message({
            type: 'error',
            message: '请扫码',
            duration: 1000,
          });
          return;
        }
          mv.bose=newQuery;
        if(this.$store.state.choices==true){
          this.$confirm('是否进行入库操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          //   mv.addValid(mv.idsh,mv.selectVal);
          enterL({
            barCode: newQuery,
            location:mv.dataStas.location,
            valid:mv.selectVal,
            number:mv.num1,
            codeType:mv.dataStas.codeType,
            barcodeSize:mv.dataStas.barcodeSize,
              bcode:mv.dataStas.barcode,
          }).then(res => {
            if (res.code !=='1') {
              mv.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
              });
                // mv.dialogTableV=true;
              speechSU.text = res.msg;
              window.speechSynthesis.speak(speechSU);
              return
            }
              mv.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1000
              });
            mv.inputSweep = '';
              mv.danViews.supplyQuantity=mv.danViews.supplyQuantity+mv.num1;
              // if( mv.danViews.warnQuantity<=mv.danViews.supplyQuantity){
              //
              // }
              mv.houseList[mv.cur].supplyQuantity=mv.houseList[mv.cur].supplyQuantity+mv.num1;
            speechSU.text = '已入库'+res.data.name+'数量'+mv.num1;
            //+res.data.smallUnitDesc
            window.speechSynthesis.speak(speechSU);
            // this.$router.push({name: 'warehouseLie',params:{data:res}})
          }).catch((err) => {
            console.log(err);
          })

          }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消发货'
            // });
          });
        }else {


        // this.$confirm('是否进行入库操作?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   mv.addValid(mv.idsh,mv.selectVal);

            enterL({
              barCode: newQuery,
              location:mv.dataStas.location,
              valid:mv.selectVal,
                number:mv.num1,
                barcode:mv.dataStas.barcode,
                codeType:mv.dataStas.codeType,
                barcodeSize:mv.dataStas.barcodeSize,
                bcode:mv.dataStas.barcode,
            }).then(res => {
                if (res.code !=='1') {
                mv.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1000,
                });
                // mv.dialogTableV=true;
                mv.dialogDatas=res.data;
                speechSU.text = res.msg;
                window.speechSynthesis.speak(speechSU);
                return
              }

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
                // this.leftInfo.dataList=fdata;
                // if (fdata.length > 0) {
                //   this.mainShow1 = false;
                // } else {
                //   this.mainShow1 = true;
                // }

                // this.leftInfo.dataList.push(res.data);
                // mv.dialogTableVisible = false;
                mv.inputSweep = '';
                // mv.houseList.supplyQuantity= mv.houseList.supplyQuantity+mv.num1;
                mv.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000
                });
                mv.danViews.supplyQuantity=mv.danViews.supplyQuantity+mv.num1;
                // if( mv.danViews.warnQuantity<=mv.danViews.supplyQuantity){
                //
                // }
                mv.houseList[mv.cur].supplyQuantity=mv.houseList[mv.cur].supplyQuantity+mv.num1;
                if(mv.danViews.codeType==2||mv.danViews.codeType==3){
                    mv.dialogTableVisible = false;
                    mv.selectVal = '';
                    localStorage.setItem("Timename", this.str);
                }
                speechSU.text = '已入库'+res.data.name+'数量'+mv.num1;
                //+res.data.smallUnitDesc
                window.speechSynthesis.speak(speechSU);
                mv.num1='1';
                // this.$router.push({name: 'warehouseLie',params:{data:res}})
            }).catch((err) => {
              console.log(err);
            })

        // }).catch(() => {
        //   // this.$message({
        //   //   type: 'info',
        //   //   message: '已取消发货'
        //   // });
        // });
        }
      },
      infoViews(id, index) {
        let mv=this;
        if(mv.cur==0) {
          mv.cur = index;
          mv.danViewsLoadding = true;
          catalget(id).then(res => {
            if (res.code !== '1') {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
              });
              return
            }
            this.danViews = res.data;
            this.idsh = id;
            this.danViewsLoadding = false;
          })
        }else if(mv.cur!==index){
          mv.cur = index;
          mv.danViewsLoadding = true;
          catalget(id).then(res => {
            if (res.code !== '1') {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
              });
              return
            }
            this.danViews = res.data;
            this.idsh = id;
            this.danViewsLoadding = false;
          })
        }
      },

      returnEntry(){
        this.$router.go(-1);
      },
      back1() {
        this.$router.go(-2);
      },
      deviceList() {
        // 取到路由带过来的参数
        this.hoVal = this.$route.query.hoVal;
        this.hoValick=this.$route.query.hoValick;
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .crumbsH {
    height: 50px;
    line-height: 50px;
    font-size: 16px;

    span {
      font-weight: normal;

      span {
        font-weight: normal;

        a {
          font-weight: normal;
          cursor: pointer;
        }
      }

    }

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
      height: 100%;
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
          padding: 10px;
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
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
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
      height:100%;
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
        height: 100%;
        float: left;
        width: 100%;
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
  .crush{
    width: 100%;
    display: block;
    margin-top: 20px;
    button{
      width: 100px;
      height: 50px;
      font-size: 20px;
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
    float: right;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #97a8be;
    margin-right: 10px;
  }
  .autoSeach2 {
    position: sticky;
    z-index: 999;
    top: 0;
    .inputs1 {
      float: right;

    }

    i {
      font-size: 30px;
      margin: 4px 0;
      display: block;
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
