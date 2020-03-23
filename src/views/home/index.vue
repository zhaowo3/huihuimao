<template>

  <div style="display: inline;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <!--        <el-button type="primary" class="trayClose">关闭托盘</el-button>-->
        <div class="warningIcon">
          <span class="warningEarly" id="hamburger-warningEarly">
            <router-link to="/warningEarly">
              <i class="iconfont icon-icon-test38"></i>
              <!--            <svg-icon icon-class="38" class="color-main"></svg-icon>-->
              <span>补货</span>
              <b>{{remind.quantityWarn}}</b>
            </router-link>
          </span>
          <span class="periodEffective"  id="hamburger-periodEffective">
            <router-link to="/management">
              <i class="iconfont icon-icon-test39"></i>
              <!--          <svg-icon icon-class="39" class="color-main"></svg-icon>-->
              <span>过期</span>
              <b>{{remind.expirationWarn}}</b>
            </router-link>
          </span>
        </div>
        <div class="trayTime"  id="hamburger-History">
          <router-link to="/HistoricalOrder"><i class="iconfont icon-icon-test30"></i></router-link>
        </div>
        <div class="trayTime" id="hamburger-search">
          <i class="iconfont icon-icon-test35" slot="suffix" @click="querySearchZ()"></i>
        </div>
        <div  class="trayTime">
          <i class="el-icon-refresh" slot="suffix" @click="Refresh()"></i>
        </div>
        <el-upload
          class="upload-demo uploadImport"
          ref="upload"
          :multiple="false"
          :http-request="customUpload"
          action="http://dist:8081/api/file/import"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :show-file-list="false"
          :file-list="fileList"
          :auto-upload="true"
          accept=".csv,application/vnd.ms-excel,pplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :limit="1" v-if="introductionOperation==1"
        >
          <el-button type="primary" class="trayClose" id="hamburger-tmpImport">手术配台导入</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
        <el-button v-if="introductionOperation==1" type="primary" class="trayClose" style="margin-right: 0;" @click="tmpDownload"  id="hamburger-tmpDownload">手术排期模板下载</el-button>
      </div>


    </div>
    <el-main class="matchAdaptive" v-loading="listLoading">
      <el-col class="matchingsubject" :span="8" v-for="(desks,index) in desk" :key="desks.index">
        <div class="matchingType">
          <div class="matchHeight">
            <div class="matchingName">
              <svg-icon :icon-class='desks.icon' class="color-main"></svg-icon>
              <h3>{{desks.deskName}}</h3>

<!--              <el-button round @click="roomSort(index)" >手术室<i class="el-icon-caret-bottom"-->
<!--                                                              v-if="desks.iconBottom"></i><i class="el-icon-caret-top"-->
<!--                                                                                             v-if="desks.iconTop"></i>-->
<!--              </el-button>-->
<!--              房间号-->
              <div class="desksName">
                <el-select v-model="value23"  @change="handleCommand(value23)"  clearable placeholder="选择房间">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    class="withs1"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>

              <div class="desksName">
                <el-date-picker
                  v-model="value2"
                  align="right"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="withs"
                  @change="valueOpetion"
                  :picker-options="pickerOptions" v-if="desks.iconBottom1">
                </el-date-picker>
              </div>

<!--              <el-button round @click="roomTime(index)" >手术时间<i class="el-icon-caret-bottom"-->
<!--                                                               ></i><i class="el-icon-caret-top"-->
<!--                                                                                               v-if="desks.iconTop1"></i>-->
<!--              </el-button>-->
              <i class="el-icon-refresh seachClicks" style="" @click="fixedPointHide()"></i>
              <i class="iconfont icon-icon-test35 seachClick" @click="seachClick(index)" ></i>
              <a @click="telescopic(index)" style="display: inherit" >
                <i class="iconfont icon-suofang1 sekk" v-if="telesIf" style="margin-right: 10px;color: #00b2ed;"></i>
                <i class="iconfont icon-suofang sekk" v-if="telesIf1" style="margin-right: 10px;color: #00b2ed;"></i>
              </a>

            </div>
<!--            <div class="seachT" v-if="desks.seachB">-->
<!--              &lt;!&ndash;              v-focus="desks.focus"&ndash;&gt;-->


<!--            </div>-->
          </div>

          <div class="detailsMain">
            <el-row class="leftBox" id="leftBox1" v-if="index==0" v-infinite-scroll="loadMore1" infinite-scroll-disabled="busy1"
                    infinite-scroll-distance="10">
<!--              搜索1-->
              <div class="showSearch" v-if="desks.seachB">
              <el-input v-model="search1" class="inputs1" @keyup.enter.native="queryClick1(search1)"
                        placeholder="请输入关键字" clearable>
                <i class="iconfont icon-icon-test35 SearchI" slot="suffix" @click="queryClick1(search1)"></i>
              </el-input>
              </div>
              <div class="fonsLeftN" :class="{ fonsLeftNban: isActive }" v-for="(item,index1) in serverList1"
                   :key="index1">

                <el-card :class="{'allsgray':item.status==2}">
                  <router-link :to="{path:'/MatchingTemplate/',query: {orderNumber:item.orderNumber,materialAdd,materialDel,materialIn }}">
                    <div class="allocationList" :id="'anchor-'+item.orderNumber">
                      <div class="allocationListHead"><h3>{{item.name}}</h3><i v-if="item.urgency==1">急</i>
                        <i class="el-icon-place" style="background: #ddd;color: #fff;"  @click.stop.prevent="fixedPoint(item.orderNumber)"></i>
                      </div>
                      <div class="bottom clearfix allocationListBody">

                        <!--            <time class="time">{{ currentDate }}</time>-->
                        <p style="width: 100%;text-align: left" class="allocationNamesr" :class="{'telescopic':hasError}">{{item.operation}}</p>
                        <p class="allsP">住院号：{{item.patientId}}</p>
                        <p class="allsP">手术房间：<span>{{item.operatiingRoom}}</span></p>
                        <p class="allsP">病床号:{{item.betno}}</p>
                        <p class="allsP">病区:{{item.wardCode}}</p>
                        <p class="allsP">手术序号：{{item.sequence}}</p>
                        <p class="allsP">手术时间：{{item.scheduledTime}}</p>
                        <p class="allsP">医师：<span>{{item.doctorIncharge}}</span></p>
                        <div class="tagSeal" v-if="item.status==2">
                          <i type="info">已下单</i>
                        </div>
                        <div class="allocationListBoot">
                          <div class="allocationListBootLi">
                            <el-tag :style="{'color':desks.color,'border':desks.border}">应 配</el-tag>
                            <span>{{item.supposeQuantity}}</span></div>
                          <div class="allocationListBootLi">
                            <el-tag :style="{'color':desks.color,'border':desks.border}">已 配</el-tag>
                            <span>{{item.realQuantity}}</span></div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </el-card>
              </div>
              <div
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 12px; float: left;"
                v-show="droping1">加载中
              </div>
              <div
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 12px;float: left;"
                v-show="noMore1">没有更多的数据
              </div>
              <!--              <div v-for="item in data" :key="item.index">{{item.name}}</div>-->
            </el-row>
            <el-row class="leftBox" id="leftBox2" v-if="index==1" v-infinite-scroll="loadMore2" infinite-scroll-disabled="busy2"
                    infinite-scroll-distance="10">
              <!--              搜索2-->
              <div class="showSearch" v-if="desks.seachB">
                <el-input v-model="search2" class="inputs2"  @keyup.enter.native="queryClick2(search2)"
                          placeholder="请输入关键字" clearable>
                  <i class="iconfont icon-icon-test35 SearchI" slot="suffix" @click="queryClick2(search2)"></i>
                </el-input>
              </div>

              <div class="fonsLeftN" :class="{ fonsLeftNban1: isActive1 }" v-for="(item,index1) in serverList2"
                   :key="index1">
                <el-card :class="{'allsgray':item.status==3}">
                  <router-link :to="{path:'/HistoricalDetails/',query: {orderNumber:item.orderNumber,materialOut }}">
                    <div class="allocationList" :id="'anchor1-'+item.orderNumber">
                      <div class="allocationListHead"><h3>{{item.name}}</h3><i v-if="item.urgency==1">急</i>
                        <i class="el-icon-place" style="background: #ddd;color: #fff;"  @click.stop.prevent="fixedPoint(item.orderNumber)"></i>
                      </div>
                      <div class="bottom clearfix allocationListBody">
                        <!--            <time class="time">{{ currentDate }}</time>-->
                        <p style="width: 100%;text-align: left" class="allocationNamesr" :class="{'telescopic':hasError}">{{item.operation}}</p>
                        <p class="allsP">住院号：{{item.patientId}}</p>
                        <p class="allsP">手术房间：<span>{{item.operatiingRoom}}</span></p>
                        <p class="allsP">病床号:{{item.betno}}</p>
                        <p class="allsP">病区:{{item.wardCode}}</p>
                        <p class="allsP">手术序号：{{item.sequence}}</p>
                        <p class="allsP">手术时间：{{item.scheduledTime}}</p>
                        <p class="allsP">医师：<span>{{item.doctorIncharge}}</span></p>
                        <div class="tagSeal" v-if="item.status==3">
                          <i type="info">已提取</i>
                        </div>
                        <div class="allocationListBoot">
                          <div class="allocationListBootLi">
                            <el-tag :style="{'color':desks.color,'border':desks.border}">应 取</el-tag>
                            <span>{{item.realQuantity}}</span></div>
                          <div class="allocationListBootLi">
                            <el-tag :style="{'color':desks.color,'border':desks.border}">已 取</el-tag>
                            <span>{{item.awayQuantity}}</span></div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </el-card>
              </div>
              <div
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 12px; float: left;"
                v-show="droping2">加载中
              </div>
              <div
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 12px;float: left;"
                v-show="noMore2">没有更多的数据
              </div>
              <!--              <div v-for="item in data" :key="item.index">{{item.name}}</div>-->
            </el-row>
            <el-row class="leftBox " id="leftBox3" v-if="index==2" v-infinite-scroll="loadMore3" infinite-scroll-disabled="busy3"
                    infinite-scroll-distance="10">
              <!--              搜索3-->
              <div class="showSearch" v-if="desks.seachB">
              <el-input v-model="search3" class="inputs3" @keyup.enter.native="queryClick3(search3)"
                        placeholder="请输入关键字" clearable>
                <i class="iconfont icon-icon-test35 SearchI" slot="suffix" @click="queryClick3(search3)"></i>
              </el-input>
              </div>
              <div class="fonsLeftN" :class="{ fonsLeftNban2: isActive2 }" v-for="(item,index1) in serverList3"
                   :key="index1">

                <el-card>

                  <router-link :to="{path:'/detailsOrder/',query: {orderNumber:item.orderNumber,materialReturn,settlement,oneStorehouse }}">
                    <div class="allocationList" :id="'anchor2-'+item.orderNumber">
                      <div class="allocationListHead"><h3>{{item.name}}</h3><i v-if="item.urgency==1">急</i>
                          <i class="el-icon-place" style="background: #ddd;color: #fff;"  @click.stop.prevent="fixedPoint(item.orderNumber)"></i>

                      </div>
                      <div class="bottom clearfix allocationListBody">
                        <p style="width: 100%;text-align: left" class="allocationNamesr" :class="{'telescopic':hasError}">{{item.operation}}</p>
                        <p class="allsP">住院号：{{item.patientId}}</p>
                        <p class="allsP">手术房间：<span>{{item.operatiingRoom}}</span></p>
                        <p class="allsP">病床号:{{item.betno}}</p>
                        <p class="allsP">病区:{{item.wardCode}}</p>
                        <p class="allsP">手术序号：{{item.sequence}}</p>
                        <p class="allsP">手术时间：{{item.scheduledTime}}</p>
                        <p class="allsP">医师：<span>{{item.doctorIncharge}}</span></p>
                        <div class="allocationListBoot">
                          <div class="allocationListBootLi">
                            <el-tag :style="{'color':desks.color,'border':desks.border}">已 用</el-tag>
                            <span>{{item.useQuantity}}</span></div>
                          <div class="allocationListBootLi">
                            <el-tag :style="{'color':desks.color,'border':desks.border}">已 退</el-tag>
                            <span>{{item.returnQuantity}}</span></div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </el-card>
              </div>
              <div
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 12px; float: left;"
                v-show="droping3">加载中
              </div>
              <div
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 12px;float: left;"
                v-show="noMore3">没有更多的数据
              </div>
              <!--              <div v-for="item in data" :key="item.index">{{item.name}}</div>-->
            </el-row>
          </div>
          <div class="mainCover" v-if="desks.cover">
            <div class="mainHeightR"><p style="height: auto;font-size: 20px;">{{desks.deskName}}</p></div>
          </div>
        </div>

      </el-col>

    </el-main>
    <!--    <el-dialog title="全局搜索" custom-class="Quick" :visible.sync="dialogTableVisible" width="80%" top="0" :center="false">-->
    <!--      <QuickSearchBox :alery="alery" :checkList="checkList" :cities="cities"></QuickSearchBox>-->
    <!--    </el-dialog>-->

  </div>


</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';
  // import {str2Date} from '@/utils/date';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  import detailsOrder from './orderData/detailsOrder'
  import HistoricalOrder from './orderData/HistoricalOrder'
  import MatchingTemplate from './orderData/MatchingTemplate'
  import HistoricalDetails from './orderData/HistoricalDetails'
  import QuickSearchBox from './orderData/QuickSearchBox'
  import {debounce} from '@/utils/debounce';
  // import eventBus from '../../utils/eventBus'
  import {
    pageList,queryOperationRoom
      // ,synchOrder,orderLists
  } from '@/api/home'
  import {
    submenuMenuId
  } from '@/api/systemsL'
  import {
    getInfo
  } from '@/api/login'
  import {
      importOrder
  } from '@/api/oss'
  let isBack = true;
  export default {
    name: 'home',
    components: {detailsOrder, HistoricalOrder, HistoricalDetails, MatchingTemplate, QuickSearchBox},
    columns: ['date', 'orderCount', 'orderAmount'],
    inject: ['reload'],
    data() {
      return {
        desk: [
          {
            deskName: '下单', icon: '01', color: '#00b1ec', iconBottom: true,

              iconBottom1: true,
            iconTop: false,
            seachB: false,
            search: '',
            focus: false,
            cover: false,
            iconTop1: false, border: '1px dashed #00b1ec', key: 'assembles', path: '/MatchingTemplate/'
          },
          {
            deskName: '提取', icon: 'load03', color: '#1eda74', iconBottom: true,
            iconBottom1: true,
            iconTop: false,
            seachB: false,
            search: '',
            focus: false,
            cover: false,
            iconTop1: false, border: '1px dashed #1eda74', key: 'extracts', path: '/HistoricalDetails/'
          },
          {
            deskName: '结算', icon: '06', color: '#1ed6db', iconBottom: true,

              iconBottom1: true,
            iconTop: false,
            seachB: false,
            focus: false,
            search: '',
            cover: false,
            iconTop1: false, border: '1px dashed #1ed6db', key: 'settles', path: '/detailsOrder/'
          }
        ],
        state: '',
        serverdhd:'',
        serverdesk: {},

        materialAdd:'',
        materialDel:'',
        materialOut:'',
        materialIn:'',
        materialReturn:'',
          oneStorehouse:'',
          introductionOperation:'',
        settlement:'',
          operation:"",
        jurisdiction:{},
        // scroll
        count: 0,
        data: [],
        busy1: true,
        busy2: true,
        busy3: true,
        pageSize: 0,
        listLoading: false,
        status: 1,
        isFinsh: false,
        loading: false,
        serverList1: [],
        serverList2: [],
        serverList3: [],
        remind: {},
        serverList10: '',
        serverList20: '',
        serverList30: '',
        serverg1: '',
        serverg2: '',
        serverg3: '',
        isActive: false,
        isActive1: false,
        isActive2: false,
        scheduled_time: 'scheduled_time',
        orderType: 'desc',
        fonsLeftNban: 'fonsLeftNban',
        fonsLeftNban1: 'fonsLeftNban1',
        fonsLeftNban2: 'fonsLeftNban2',
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount,
        telesIf: true,
        telesIf1: false,
        quickShow: false,
        hasError: false,
        dialogTableVisible: false,
        synchsh:'',
          fileList: [],
          papesd:'',
          formdata1:{
              pageSize: 20,
              pageNumber: 1,
          },
          search1:'',
          houseNum1: '',
          droping1: false,
          noMore1: false,
          getTotal1:'',
          NunListS1:'',
          formdata2:{
              pageSize: 20,
              pageNumber: 1,
          },
          search2:'',
          houseNum2: '',
          droping2: false,
          noMore2: false,
          getTotal2:'',
          NunListS2:'',
          formdata3:{
              pageSize: 20,
              pageNumber: 1,
          },
          search3:'',
          houseNum3: '',
          droping3: false,
          noMore3: false,
          getTotal3:'',
          NunListS3:'',
          options:{},
          value23:'',
          value2:'',
          pickerOptions: {
              // disabledDate(time) {
              //     return time.getTime() > Date.now();
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
      }


    },
    watch: {
        '$route.path': function(newVal,oldVal){
            if(oldVal === '/MatchingTemplate/'){
                this.NunList1();
            }else if(oldVal === '/HistoricalDetails/'){
                this.NunList2();
            }else if(oldVal === '/detailsOrder/'){
                this.NunList3();
            }
        },

      // synchsh: function (val) {
      //
      // },
        // pagenumber1:function (val) {
        //     let ReversePage= sessionStorage.getItem('ReversePage');
        //
        //     val=ReversePage;
        // }
        // '$route' (to, from) {
        //     if(this.$route.params.orderMaterials){// 判断条件1  判断传递值的变化
        //         //获取文章数据
        //         this.serverList1=[];
        //         this.serverList2=[];
        //         this.serverList3=[];
        //         this.getList(1, this.pagenumber1);
        //         this.getList(2, this.pagenumber2);
        //         this.getList(3, this.pagenumber3);
        //     }
        //     if(this.$route.params.orderHistorical){// 判断条件1  判断传递值的变化
        //         //获取文章数据
        //         this.serverList2=[];
        //         this.serverList3=[];
        //         this.getList(3, this.pagenumber3);
        //         this.getList(2, this.pagenumber2);
        //     }
        //     if(this.$route.params.orderOrder){// 判断条件1  判断传递值的变化
        //         //获取文章数据
        //         this.serverList3=[];
        //         this.serverList2=[];
        //         this.getList(3, this.pagenumber3);
        //         this.getList(2, this.pagenumber2);
        //     }
        //
        // },

    },
    created() {
      this.$store.state.showBottomNav = true;
      this.dishFirst();
      this.queryOperationRoom();
        // this.busy1 = false; // keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。
        // this.busy2 = false; // keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。
        // this.busy3 = false; // keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。
        // this.serverList1=[];
        this.getList1();
        // // this.serverList2=[];
        this.getList2();
        // // this.serverList3=[];
        this.getList3();
        // this.$watch('search1', debounce((newQuery) => {
        //     this.queryClick1(newQuery);
        // }, 1000));
        // this.$watch('search2', debounce((newQuery) => {
        //     this.queryClick2(newQuery);
        // }, 1000));
        // this.$watch('search3', debounce((newQuery) => {
        //     this.queryClick3(newQuery);
        // }, 1000));
        // this.reload();
        // this.$forceUpdate();


    },

    beforeRouteLeave(to,from,next){
        from.meta.keepAlive = false;
        sessionStorage.setItem('AOSPositonhome',document.getElementById('leftBox1').scrollTop);
        sessionStorage.setItem('AOSPositonhome1',document.getElementById('leftBox2').scrollTop);
        sessionStorage.setItem('AOSPositonhome2',document.getElementById('leftBox3').scrollTop);

            next();
    },
      activated() {
          if (this.$route.meta.isCha) {
                      let AOSPositon= sessionStorage.getItem('AOSPositonhome');
                      let AOSPositon1= sessionStorage.getItem('AOSPositonhome1');
                      let AOSPositon2= sessionStorage.getItem('AOSPositonhome2');

                      document.getElementById('leftBox1').scrollTop = AOSPositon;
                      document.getElementById('leftBox2').scrollTop = AOSPositon1;
                      document.getElementById('leftBox3').scrollTop = AOSPositon2;
          }else if(this.$route.meta.isCha==false){
              this.formdata1.pageNumber = 1;
              this.serverList1=[];
              this.busy1 = false; // 将无限滚动给打开
              this.getList1();
              this.formdata2.pageNumber = 1;
              this.serverList2=[];
              this.busy2 = false; // 将无限滚动给打开
              this.getList2();
              this.formdata3.pageNumber = 1;
              this.serverList3=[];
              this.busy3 = false; // 将无限滚动给打开
              this.getList3();
          }
      },

      // beforeRouteEnter(to, from, next) {
      //     if (to.path == "/home/MatchingTemplate/" ||to.path == "/home/HistoricalDetails/"||to.path == "/home/detailsOrder/") {
      //         to.meta.keepAlive = true;
      //
      //     } else {
      //         to.meta.keepAlive = false;
      //     }
      //     next(vm => {
      //
      //         let AOSPositon= sessionStorage.getItem('AOSPositonhome');
      //         let AOSPositon1= sessionStorage.getItem('AOSPositonhome1');
      //         let AOSPositon2= sessionStorage.getItem('AOSPositonhome2');
      //
      //         document.getElementById('leftBox1').scrollTop = AOSPositon;
      //         document.getElementById('leftBox2').scrollTop = AOSPositon1;
      //         document.getElementById('leftBox3').scrollTop = AOSPositon2;
      //
      //     })
      // },
    methods: {
        Refresh(){
            let mv=this;
            mv.value2='';
            mv.value23='';
            mv.formdata1.scheduledTime=mv.value2;
            mv.formdata2.scheduledTime=mv.value2;
            mv.formdata3.scheduledTime=mv.value2;
            mv.formdata1.pageNumber = 1;
            mv.serverList1=[];
            mv.busy1 = false; // 将无限滚动给打开
            mv.search1='';

            mv.formdata2.pageNumber = 1;
            mv.serverList2=[];
            mv.busy2 = false; // 将无限滚动给打开
            mv.search2='';

            mv.formdata3.pageNumber = 1;
            mv.serverList3=[];
            mv.search3='';
            mv.busy3 = false; // 将无限滚动给打开
            // mv.getList1();
            // mv.getList2();
            // mv.getList3();
            // this.reload();  // 点击侧边栏重新载入页面
        },
        dishFirst() {
            //首页加载
            let mv=this;
            getInfo().then(response => {
                mv.serverdhd=response.data.main.home.id;
                mv.serverdesk = response.data;
                mv.remind = response.data.warnNumberVo;
                mv.submenuMenuId();
            });
        },
        queryOperationRoom(){
            let mv=this;
            queryOperationRoom().then(res => {
                let rooms=res.data;
                // let content='';
                for(let i=0;i<rooms.length;i++) {
                    // content=
                    this.$set(mv.options,i,{ value: rooms[i]});
                    // mv.options.push({value : res.data[i]})
                   // mv.options=mv.options.concat(res.data[i]);
                }

                })

        },

        //首页加载权限
        submenuMenuId() {
            let mv=this;
            submenuMenuId(mv.serverdhd).then(response => {
                if(response.code !=='1'){
                    this.$message({
                        message: response.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                mv.jurisdiction = response.data;
                for(let i=0;i<mv.jurisdiction.length;i++) {
                    if (mv.jurisdiction[i].children == 'materialAdd') {
                        mv.materialAdd = mv.jurisdiction[i].ststus
                    }
                    if (mv.jurisdiction[i].children == 'materialDel') {
                        mv.materialDel = mv.jurisdiction[i].ststus
                    }
                    if (mv.jurisdiction[i].children == 'materialOut') {
                        mv.materialOut = mv.jurisdiction[i].ststus
                    }
                    if (mv.jurisdiction[i].children == 'materialIn') {
                        mv.materialIn = mv.jurisdiction[i].ststus
                    }
                    if (mv.jurisdiction[i].children == 'materialReturn') {
                        mv.materialReturn = mv.jurisdiction[i].ststus
                    }
                    if (mv.jurisdiction[i].children == 'settlement') {
                        mv.settlement = mv.jurisdiction[i].ststus;
                    }
                    if (mv.jurisdiction[i].children == 'oneStorehouse') {
                        mv.oneStorehouse = mv.jurisdiction[i].ststus;
                    }
                    if (mv.jurisdiction[i].children == 'introductionOperation') {
                        mv.introductionOperation = mv.jurisdiction[i].ststus;
                    }

                }
                // mv.materialAdd=response.data[0].children.;
                // mv.materialDel=response.data.children.materialDel;

            });
        },
        //点击显示搜索
        seachClick(x) {
            if (x == x) {
                if (this.desk[x].seachB == false) {
                    this.desk[x].seachB = true;
                } else {
                    this.desk[x].seachB = false;
                }
            }
        },
        //配台搜索
        queryClick1(val) {
            let mv = this;
            mv.formdata1.pageNumber = 1;
            mv.serverList1 = [];
            this.busy1 = false; // 将无限滚动给打开
            mv.search1=val;
            mv.getList1();// 请求数据
        },
        queryClick2(val) {
            let mv = this;
            mv.formdata2.pageNumber = 1;
            mv.serverList2 = [];
            mv.busy2 = false; // 将无限滚动给打开
            mv.search2=val;
            mv.getList2();// 请求数据
        },
        queryClick3(val) {
            let mv = this;
            mv.formdata3.pageNumber = 0;
            mv.serverList3 = [];
            mv.busy3 = false; //
            mv.search3=val;
            mv.getList3();// 请求数据
        },
        //筛选房间号
        handleCommand(val){
            let mv=this;
            mv.serverList1 = [];
            mv.serverList2 = [];
            mv.serverList3 = [];

            mv.search1=val;
            mv.search2=val;
            mv.search3=val;
            mv.value23=val;
            mv.getList1();// 请求数据
            mv.getList2();
            mv.getList3();// 请求数据
            // mv.busy1 = false;
            // mv.busy2 = false;
            // mv.busy3 = false;

        },
        fixedPoint(id){
            let mv = this;
            mv.serverList1 = [];
            mv.serverList2 = [];
            mv.serverList3 = [];
            mv.search1=id;
            mv.search2=id;
            mv.search3=id;
            mv.formdata1.pageNumber = 1;
            mv.formdata2.pageNumber = 1;
            mv.formdata3.pageNumber = 1;
            mv.formdata1.scheduledTime=mv.value2;
            mv.formdata2.scheduledTime=mv.value2;
            mv.formdata3.scheduledTime=mv.value2;
            // mv.busy1 = false;
            // mv.busy2 = false;
            // mv.busy3 = false;
            mv.getList1();// 请求数据
            mv.getList2();
            mv.getList3();// 请求数据
        },
        fixedPointHide(){
            let mv = this;
            mv.serverList1 = [];
            mv.serverList2 = [];
            mv.serverList3 = [];
            mv.search1=mv.value23;
            mv.search2=mv.value23;
            mv.search3=mv.value23;
            mv.formdata1.pageNumber = 1;
            mv.formdata2.pageNumber = 1;
            mv.formdata3.pageNumber = 1;
            mv.formdata1.scheduledTime=mv.value2;
            mv.formdata2.scheduledTime=mv.value2;
            mv.formdata3.scheduledTime=mv.value2;
            // mv.busy1 = false;
            // mv.busy2 = false;
            // mv.busy3 = false;
            mv.getList1();// 请求数据
            mv.getList2();
            mv.getList3();// 请求数据
        },
        valueOpetion(){
            let mv=this;
            mv.serverList1 = [];
            mv.serverList2 = [];
            mv.serverList3 = [];
            mv.formdata1.pageNumber = 1;
            mv.formdata2.pageNumber = 1;
            mv.formdata3.pageNumber = 1;
            mv.formdata1.scheduledTime=mv.value2;
            mv.formdata2.scheduledTime=mv.value2;
            mv.formdata3.scheduledTime=mv.value2;
            // mv.busy1 = false;
            // mv.busy2 = false;
            // mv.busy3 = false;
            mv.getList1();// 请求数据
            mv.getList2();
            mv.getList3();// 请求数据

        },
        //排序手术室
        roomSort(index) {
            let mv = this;
            mv.scheduled_time = 'betno';
            if (mv.orderType == 'desc') {
                mv.orderType = 'asc';
                mv.desk[index].iconBottom = false;
                mv.desk[index].iconTop = true;
            } else {
                mv.orderType = 'desc';
                mv.desk[index].iconBottom = true;
                mv.desk[index].iconTop = false;
            }
            switch (index) {
                case 0:
                    mv.serverList1 = [];
                    mv.formdata1.pageNumber = 0;
                    mv.getList1();// 请求数据
                    break;
                case 1:
                    mv.serverList2 = [];
                    mv.formdata2.pageNumber = 0;
                    mv.getList2();// 请求数据
                    break;
                case 2:
                    mv.serverList3 = [];
                    mv.formdata3.pageNumber = 0;
                    mv.getList3();// 请求数据
                    break;
            }

        },
        //排序时间
        roomTime(index) {
            let mv = this;
            mv.scheduled_time = 'scheduled_time';
            if (this.orderType == 'desc') {
                mv.orderType = 'asc';
                mv.desk[index].iconBottom1 = false;
                mv.desk[index].iconTop1 = true;
            } else {
                mv.orderType = 'desc';
                mv.desk[index].iconBottom1 = true;
                mv.desk[index].iconTop1 = false;
            }
            switch (index) {
                case 0:
                    mv.serverList1 = [];
                    mv.formdata1.pageNumber = 0;
                    mv.getList1();// 请求数据
                    mv.busy1 = false;
                    break;
                case 1:
                    mv.serverList2 = [];
                    mv.formdata2.pageNumber = 0;
                    mv.getList2();// 请求数据
                    mv.busy2 = false;
                    break;
                case 2:
                    mv.serverList3 = [];
                    mv.formdata3.pageNumber = 0;
                    mv.getList3();// 请求数据
                    mv.busy3 = false;
                    break;
            }
        },
      //第一列初始化刷新
        loadMore1: function () {
            let mv = this;
            setTimeout(() => {
                if (!mv.busy1) {
                    mv.busy1 = true;
                    mv.formdata1.pageNumber++; // 增加页数
                    mv.getList1();// 请求数据

                }

                // this.busy1 = false
            }, 500)
        },
        //第二列初始化刷新
      loadMore2: function () {
          let mv = this;
          setTimeout(() => {
          if (!mv.busy2) {
              mv.busy2 = true;
              mv.formdata2.pageNumber++; // 增加页数
              mv.getList2();// 请求数据
          }

        // this.busy1 = false
        }, 500)
      },
        //第三列初始化刷新
      loadMore3: function () {
          let mv = this;
          setTimeout(() => {
          if (!mv.busy3) {
              mv.busy3 = true;
              mv.formdata3.pageNumber++; // 增加页数
              mv.getList3();// 请求数据

          }
        }, 500)
      },
        //获取新总数1
        NunList1() {
            let mv=this;
            let hou = mv.formdata1;
            hou.status=1;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.search1;
            pageList(hou).then(res => {
                mv.NunListS1 = res.data.total;
                if(mv.getTotal1!==mv.NunListS1){
                    mv.serverList1 = [];
                    mv.formdata1.pageNumber = 1;
                    mv.getList1();// 请求数据
                    mv.busy1 = false;

                }else{
                    mv.individualBack1();
                }
            })
            },
        //获取新总数2
        NunList2() {
                        let mv=this;
                        let hou = mv.formdata2;
                        hou.status=2;
                        hou.columnName=mv.scheduled_time;
                        hou.orderType=mv.orderType;
                        hou.search=mv.search2;
                        pageList(hou).then(res => {
                            mv.NunListS2 = res.data.total;
                            if(mv.getTotal2!==mv.NunListS2){
                                mv.serverList2 = [];
                                mv.formdata2.pageNumber = 1;
                                mv.getList2();// 请求数据
                                mv.busy2 = false;

                            }else {
                                mv.individualBack2();
                            }
            })
        },
        //获取新总数3
        NunList3() {
            let mv=this;
            let hou = mv.formdata3;
            hou.status=3;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.search3;
            pageList(hou).then(res => {
                mv.NunListS3 = res.data.total;
                if(mv.getTotal3!==mv.NunListS3){
                    mv.serverList3 = [];
                    mv.formdata3.pageNumber = 1;
                    mv.getList3();// 请求数据
                    mv.busy3 = false;

                }else {
                    mv.individualBack3();
                }
            })
        },
        //返回请求1
        individualBack1(){
            let mv=this;
            let hou = mv.formdata1;
            hou.status=1;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.$route.query.orderNumber;
            pageList(hou).then(res => {
                if(res.code !=='1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                let listTotal = res.data.total;
                let listList1 =res.data.result;
                for(let i=0;i<mv.serverList1.length;i++){
                    if(mv.serverList1[i].orderNumber==mv.$route.query.orderNumber){
                        mv.serverList1[i]=listList1[0];
                        this.$forceUpdate();
                    }

                }

            })
        },
        //返回请求2
        individualBack2(){
            let mv=this;
            let hou = mv.formdata2;
            hou.status=2;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.$route.query.orderNumber;
            pageList(hou).then(res => {
                if(res.code !=='1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                let listTotal = res.data.total;
                let listList2 =res.data.result;
                for(let i=0;i<mv.serverList2.length;i++){
                    if(mv.serverList2[i].orderNumber==mv.$route.query.orderNumber){
                        mv.serverList2[i]=listList2[0];
                        this.$forceUpdate();
                    }

                }

            })
        },
        //返回请求3
        individualBack3(){
            let mv=this;
            let hou = mv.formdata3;
            hou.status=3;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.$route.query.orderNumber;
            pageList(hou).then(res => {
                if(res.code !=='1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                let listTotal = res.data.total;
                let listList3 =res.data.result;
                for(let i=0;i<mv.serverList3.length;i++){
                    if(mv.serverList3[i].orderNumber==mv.$route.query.orderNumber){
                        mv.serverList3[i]=listList3[0];
                        this.$forceUpdate();
                    }

                }

            })
        },
        //列表请求1
        getList1() {
            let mv=this;
            let hou = mv.formdata1;
            hou.status=1;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.search1;
            pageList(hou).then(res => {
                if(res.code !=='1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                mv.getTotal1=res.data.total;
                let listTotal = res.data.total;
                let listList1 =res.data.result;
                if (listTotal > 0) {
                    this.busy1 = true
                } else {
                    this.busy1 = false;
                }
                this.listLoading = false;
                if(mv.getTotal1<=mv.formdata1.pageSize){
                    mv.serverList1=listList1;
                    mv.houseNum1 = listTotal;
                    this.busy1 = true;
                    mv.noMore1 = true // 切换底部提示信息
                    mv.droping1 = false
                }else {
                    mv.serverList1 = mv.serverList1.concat(res.data.result);
                    let DownloadTotal =
                        (mv.formdata1.pageNumber + 1) * mv.formdata1.pageSize;
                    mv.getTotal1=listTotal;
                    mv.houseNum1 = listTotal;
                    let totalPage = (mv.houseNum1 + mv.formdata1.pageSize) / mv.formdata1.pageSize;
                    // mv.searchHouse2.pageNumber++; //增加页数
                    if (mv.formdata1.pageNumber + 1 >= totalPage) {
                        mv.busy1 = true // 将无限滚动关闭
                        mv.formdata1.pageNumber = 0 // 页数变为0
                        mv.noMore1 = true // 切换底部提示信息
                        mv.droping1 = false
                    } else {
                        mv.busy1 = false; // 将无限滚动给打开
                        mv.droping1 = true;
                        mv.noMore1 = false; // 切换底部提示信息
                    }
                }


            });


        },
        //第二
        getList2() {
            //3列表请求
            let mv=this;
            let hou = mv.formdata2;
            hou.status=2;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.search2;
            pageList(hou).then(res => {
                if(res.code !=='1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                mv.getTotal2=res.data.total;
                let listTotal = res.data.total;
                let listList2 =res.data.result;
                if (listTotal > 0) {
                    mv.busy2 = true
                } else {
                    mv.busy2 = false;
                }
                this.listLoading = false;
                if(mv.getTotal2<=mv.formdata2.pageSize){
                    mv.serverList2=listList2;
                    mv.houseNum2 = listTotal;
                    this.busy2 = true;
                    mv.noMore2 = true // 切换底部提示信息
                    mv.droping2 = false
                }else {
                    mv.serverList2 = mv.serverList2.concat(listList2);
                    let DownloadTotal =
                        (mv.formdata2.pageNumber + 1) * mv.formdata2.pageSize;
                    mv.houseNum2 = listTotal;
                    let totalPage = (mv.houseNum2 + mv.formdata2.pageSize) / mv.formdata2.pageSize;
                    // mv.searchHouse2.pageNumber++; //增加页数
                    if (mv.formdata2.pageNumber + 1 >= totalPage) {
                        mv.busy2 = true // 将无限滚动关闭
                        mv.formdata2.pageNumber = 0; // 页数变为0
                        mv.noMore2 = true; // 切换底部提示信息
                        mv.droping2 = false;
                    } else {
                        mv.busy2 = false;// 将无限滚动给打开
                        mv.droping2 = true;
                        mv.noMore2 = false; // 切换底部提示信息
                    }
                }
            });


        },
        //第三
        getList3() {
            //3列表请求
            let mv=this;
            let hou = mv.formdata3;
            hou.status=3;
            hou.columnName=mv.scheduled_time;
            hou.orderType=mv.orderType;
            hou.search=mv.search3;
            pageList(hou).then(res => {
                if(res.code !=='1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                mv.getTotal3=res.data.total;
                let listTotal = res.data.total;
                let listList3 =res.data.result;
                if (listTotal > 0) {
                    mv.busy3 = true
                } else {
                    mv.busy3 = false;
                }
                this.listLoading = false;
                if(mv.getTotal3<=mv.formdata3.pageSize){
                    mv.serverList3=listList3;
                    mv.houseNum3 = listTotal;
                    this.busy3 = true;
                    mv.noMore3 = true // 切换底部提示信息
                    mv.droping3 = false
                }else {
                    mv.serverList3 = mv.serverList3.concat(listList3);
                    let DownloadTotal =
                        (mv.formdata3.pageNumber + 1) * mv.formdata3.pageSize;
                    mv.houseNum3 = listTotal;
                    let totalPage = (mv.houseNum3 + mv.formdata3.pageSize) / mv.formdata3.pageSize;
                    // mv.searchHouse2.pageNumber++; //增加页数
                    if (mv.formdata3.pageNumber + 1 >= totalPage) {
                        mv.busy3 = true // 将无限滚动关闭
                        mv.formdata3.pageNumber = 0; // 页数变为0
                        mv.noMore3 = true; // 切换底部提示信息
                        mv.droping3 = false;
                    } else {
                        mv.busy3 = false;// 将无限滚动给打开
                        mv.droping3 = true;
                        mv.noMore3 = false; // 切换底部提示信息
                    }
                }
            });


        },
        //滚动位置定位
        heigths(){
            this.$nextTick(function () {
                let AOSPositon= sessionStorage.getItem('AOSPositonhome');
                let AOSPositon1= sessionStorage.getItem('AOSPositonhome1');
                let AOSPositon2= sessionStorage.getItem('AOSPositonhome2');

                document.getElementById('leftBox1').scrollTop = AOSPositon;
                document.getElementById('leftBox2').scrollTop = AOSPositon1;
                document.getElementById('leftBox3').scrollTop = AOSPositon2;
            },1000);
        },

      //   //排序和搜索切页
      // loadOS(index) {
      //     let mv = this;
      //   switch (index) {
      //     case 0:
      //         if (mv.serverList1.length < mv.serverg1) {
      //             mv.pagenumber1++;
      //             mv.busy = true;
      //             mv.getListOS(1, this.pagenumber1);
      //         }else {
      //             mv.busy = false;
      //             return
      //         }
      //       break;
      //     case 1:
      //         if (mv.serverList2.length < mv.serverg2) {
      //             mv.pagenumber2++;
      //             mv.busy = true;
      //             mv.getListOS(2, this.pagenumber2);
      //         }else {
      //             mv.busy = false;
      //             return
      //         }
      //       break;
      //     case 2:
      //         if (mv.serverList3.length < mv.serverg3) {
      //             mv.pagenumber3++;
      //             mv.busy = true;
      //             mv.getListOS(3, this.pagenumber3);
      //         }else {
      //             mv.busy = false;
      //             return
      //         }
      //       break;
      //   }
      // },
      //   //排序和搜索请求
      //   getListOS(statusServlet, pagenumber) {
      //       let mv = this;
      //       //3列表请求
      //       let formdata = {
      //           status: statusServlet,
      //           columnName: mv.scheduled_time,
      //           orderType: mv.orderType,
      //           pageSize: 20,
      //           pageNumber: pagenumber,
      //           search: mv.desk[statusServlet - 1].search,
      //       };
      //       pageList(formdata).then(response => {
      //           if(response.code !=='1'){
      //               this.$message({
      //                   message: response.msg,
      //                   type: 'error',
      //                   duration: 1000
      //               });
      //               return
      //           }
      //           this.listLoading = false;
      //           switch (formdata.status) {
      //               case 1:
      //                   let serverList11 = response.data.result;
      //                   let serverList10 = response.data.total;
      //                   mv.serverg1 = response.data.total;
      //
      //                   if (serverList11 == null || serverList11.length == 0) {
      //                       this.busy = true;
      //                       return;
      //                   }
      //                   for (let i= 0; i < serverList11.length; i++) {
      //                       mv.serverList1.push(serverList11[i]);
      //                   }
      //                   break;
      //               case 2:
      //                   let serverList22 = response.data.result;
      //                   mv.serverList20 = response.data.total;
      //                   mv.serverg2 = response.data.total;
      //                   if (serverList22 == null || serverList22.length == 0) {
      //                       mv.busy1 = true;
      //                       return;
      //                   }
      //                   for (let i= 0; i < serverList22.length; i++) {
      //                       mv.serverList2=mv.serverList2.concat(serverList22[i]);
      //                   }
      //                   break;
      //               case 3:
      //                   let serverList33 = response.data.result;
      //                   mv.serverList30 = response.data.total;
      //                   mv.serverg3 = response.data.total;
      //                   if (serverList33 == null || serverList33.length == 0) {
      //                       mv.busy2 = true;
      //                       return;
      //                   }
      //                   for (let i= 0; i < serverList33.length; i++) {
      //
      //                       mv.serverList3.push(serverList33[i]);
      //                   }
      //                   break;
      //           }
      //           mv.loading = false;
      //
      //       });
      //
      //
      //   },



      // getServerList(index) {
      //     let mv = this;
      //     mv.serverList1=[];
      //     mv.serverList2=[];
      //     mv.serverList3=[];
      //   switch (index) {
      //     case 0:
      //       return mv.serverList1;
      //       break;
      //     case 1:
      //       return mv.serverList2;
      //       break;
      //     case 2:
      //       return mv.serverList3;
      //       break;
      //   }
      // },

        //手术名称导入
        customUpload(file) {
            let mv = this;
            // this.generatorFileMd5(file.file)
            // 自定义上传row.id,{status:row.status}
             importOrder(file).then(response => {
                this.fileList = [];
                // this.dialogVisible = false;
                //弹出错误
                if(response.code !=='1'){
                    this.$message({
                        message: response.msg,
                        type: 'error',
                        duration: 1000
                    });

                    return;
                }
                this.$message({
                    message: response.msg,
                    type: 'success',
                    duration: 1000
                });
                this.serverList1=[];
                this.loadMore1();
            })
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleChange(file) {
            console.log(file);
        },
        //手术名称导入结束

        tmpDownload() {
            location.href = 'http://192.168.1.43:82/file/手术排期模板.xlsx'
        },
      //伸缩
      telescopic(i) {
        let scopic = document.getElementsByClassName('matchingsubject');
        switch (i) {
          case 0:
            if (scopic[i].className.indexOf("el-col-8") > -1) {
              scopic[i].classList.replace("el-col-8", "el-col-22");
              scopic[i + 1].classList.replace("el-col-8", "el-col-1");
              scopic[i + 2].classList.replace("el-col-8", "el-col-1");
              this.isActive = true;
              this.telesIf = false;
              this.telesIf1 = true;
              this.hasError = true;
              this.desk[i + 1].cover = true;
              this.desk[i + 2].cover = true;
            } else {
              scopic[i].classList.replace("el-col-22", "el-col-8");
              scopic[i + 1].classList.replace("el-col-1", "el-col-8");
              scopic[i + 2].classList.replace("el-col-1", "el-col-8");
              this.isActive = false;
              this.telesIf1 = false;
              this.telesIf = true;
              this.hasError = false;
              this.desk[i + 1].cover = false;
              this.desk[i + 2].cover = false;
            }
            break;
          case 1:
            if (scopic[i].className.indexOf("el-col-8") > -1) {
              scopic[i].classList.replace("el-col-8", "el-col-22");
              scopic[i - 1].classList.replace("el-col-8", "el-col-1");
              scopic[i + 1].classList.replace("el-col-8", "el-col-1");
              this.isActive1 = true;
              this.telesIf = false;
              this.telesIf1 = true;
              this.hasError = true;
              this.desk[i - 1].cover = true;
              this.desk[i + 1].cover = true;
            } else {
              scopic[i].classList.replace("el-col-22", "el-col-8");
              scopic[i - 1].classList.replace("el-col-1", "el-col-8");
              scopic[i + 1].classList.replace("el-col-1", "el-col-8");
              this.isActive1 = false;
              this.telesIf1 = false;
              this.telesIf = true;
              this.hasError = false;
              this.desk[i - 1].cover = false;
              this.desk[i + 1].cover = false;
            }
            break;
          case 2:
            if (scopic[i].className.indexOf("el-col-8") > -1) {
              scopic[i].classList.replace("el-col-8", "el-col-22");
              scopic[i - 2].classList.replace("el-col-8", "el-col-1");
              scopic[i - 1].classList.replace("el-col-8", "el-col-1");
              this.isActive2 = true;
              this.telesIf = false;
              this.telesIf1 = true;
              this.hasError = true;
              this.desk[i - 2].cover = true;
              this.desk[i - 1].cover = true;
            } else {
              scopic[i].classList.replace("el-col-22", "el-col-8");
              scopic[i - 1].classList.replace("el-col-1", "el-col-8");
              scopic[i - 2].classList.replace("el-col-1", "el-col-8");
              this.isActive2 = false;
              this.telesIf1 = false;
              this.telesIf = true;
              this.hasError = false;
              this.desk[i - 1].cover = false;
              this.desk[i - 2].cover = false;
            }
            break;
        }
      },

      //全局搜索
      querySearchZ() {
        // this.dialogTableVisible = true;
        this.$router.push({path: '/QuickSearchBox'})
      },
    },


    mounted() {
        // this.getList1();
        // // // this.serverList2=[];
        // this.getList2();
        // // // this.serverList3=[];
        // this.getList3();
//         this.$nextTick(function(){
//
// // /////方法
// //             this.heigths();
//         },3000)
        // window.addEventListener("scroll", this.heigths);
      // const timer = setInterval(() =>{
      //   // 某些定时器操作
      //   synchOrder().then(response => {
      //     if(response.code !=='1'){
      //       this.$message({
      //         message: response.msg,
      //         type: 'error',
      //       });
      //       return
      //     }
      //     // if(response.code=='1'){
      //     //   this.getList(1, this.pagenumber1);
      //     //   this.getList(2, this.pagenumber2);
      //     //   this.getList(3, this.pagenumber3);
      //     this.reload();
      //     // }else {
      //     //   return
      //     //
      //     // }
      //   });
      //   }, 300000);
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
//       this.$once('hook:beforeDestroy', () => {
//         clearInterval(timer);
//       })
//       this.restaurants = this.loadAll();
    },

  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .allsgray {
    background: #F5F5F5;
  }
  .withs1{
    width: 150px;
  }
  .withs{
    width: 150px;
  }
  .telescopic {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .SearchI {
    font-size: 30px;
    cursor: pointer;
  }

  .tagSeal {
    position: absolute;
    right: 120px;
    bottom: 50px;
    transform: rotate(-15deg);
    -ms-transform: rotate(-15deg); /* IE 9 */
    -moz-transform: rotate(-15deg); /* Firefox */
    -webkit-transform: rotate(-15deg); /* Safari 和 Chrome */
    -o-transform: rotate(-15deg); /* Opera */
    border: 1px solid #0dde71;
    font-size: 40px;
    padding: 20px;
    display: flex;
    height: 70px;
    line-height: 30px;

    i {
      font-style: normal;
      font-size: 40px;
      color: #0dde71;

    }
  }

  .seachClick {
    font-size: 20px;
    cursor: pointer;
    cursor: pointer;
  }
  .seachClicks {
    font-size: 20px;
    cursor: pointer;
    height: 85px;
    line-height: 85px;
    font-weight: bold;
  }

  .seachT {
    width: 100%;
    z-index: 99;
    display: flex;
    position: absolute;
    top: 62px;

  }

  .matchHeight {
    position: relative;
  }

  .fonsLeftN {
    float: left;
    width: 100%;
  }

  .fonsLeftNban {
    width: 100%;
    .allsP{
      width: 14% !important;
      text-align: left !important;
    }
  }

  .fonsLeftNban1 {
    width: 100%;
    .allsP{
      width: 14% !important;
      text-align: left !important;
    }
  }

  .fonsLeftNban2 {
    width: 100%;
    .allsP{
      width: 14% !important;
      text-align: left !important;
    }
  }

  .fonsLeftNQ {
    width: 100%;
  }

  /*头部*/
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

  /*身体*/
  .matchAdaptive {
    height: 100%;
    overflow: hidden;
  }

  .detailsMain {
    height: 100%;

  }

  .matchingsubject {
    height: 100%;

    .matchingType {
      /*margin:0 ;*/
      height: 100%;
      background: #fff;
      overflow: hidden;
      flex: 1;
      margin-right: 0.104167rem;
      position: relative;

      .el-row {
        overflow-y: auto;
        height: calc(100% - 86.4px);


      }

      .matchingName {
        height: 86.4px;
        line-height: 86.4px;
        display: flex;
        justify-content: space-between;
        background: #fff;
        position: relative;

        .svg-icon {
          margin: 20px 0 20px 20px;
        }

        .matchingFont {
          float: left;
          font-size: 50px;
          padding-left: 17px;
        }

        h3 {
          float: left;
          font-weight: normal;
        }

        button {
          float: right;
          margin: 20px 18px 20px 0;
          cursor: pointer;


          i {
            padding-left: 36px;

          }
        }
      }

      .allocationList {
        width: 100%;
        border-bottom-width: 1px;
        border-bottom-color: #f0f0f0;
        position: relative;

        .allocationListHead {
          display: flex;
          justify-content: space-between;
          height: 36px;

          h3 {
            font-size: 18px;
            text-align: left;
            padding-top: 4px;
          }

          i {
            font-size: 16px;
            border-radius: 50%;
            background: #ed0200;
            width: 36px;
            height: 36px;
            font-style: normal;
            line-height: 36px;
            color: #fff;
            text-align: center;
          }
        }

        .allocationListBody {
          p {
            width: 50%;
            font-size: 16px;
            float: left;
            line-height: initial;
            margin-top: 10px;
            /*height: 25px;*/
            box-sizing: border-box;
            display: flex;
            /*padding-top: 10px;*/
          }
          p::after {
            display:table;
            content: "\007C ";
           opacity: 0;
            /*visibility:hidden;*/
            /*font-size:0;*/
            /*height:0;*/
            /*clear:both;*/
          }

          p:nth-child(odd) {
            text-align: right;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
          }

          p:nth-child(even) {
            text-align: left;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
          }

          .allocationListBoot {
            width: 100%;
            float: left;
            height: 32px;
            line-height: 32px;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .allocationListBootLi {

              span:nth-child(1) {
                font-size: 16px;
                /*width: 45px;*/
                /*height: 45px;*/
                /*line-height: 45px;*/
                text-align: center;
                float: left;

              }

              span:nth-child(2) {
                font-size: 16px;
                /*width: 45px;*/
                /*height: 45px;*/
                /*line-height: 45px;*/
                text-align: center;
                padding-left: 10px;
                float: left;

              }
            }

          }
        }
      }
    }
  }

  .matchingsubject:last-child .matchingType {
    margin-right: 0;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    /*margin-top: 13px;*/
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .mainCover {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    position: absolute;

    .mainHeightR {
      height: 100%;
      width: 24px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;

    }
  }
.sekk{
  font-size: 30px;
}
  .allocationNamesr{
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分省略号显示*/
  }
  .uploadImport {
    float: right;
    display: flex;
  }
  #leftBox1{
    position: relative;
    .inputs1{
      position: sticky;
      top: 0;
      z-index: 999;
    }
  }
  #leftBox2{
    position: relative;
    .inputs2{
      position: sticky;
      top: 0;
      z-index: 999;
    }
  }
  #leftBox3{
    position: relative;
    .inputs3{

    }
  }
  .showSearch{
    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
  }
</style>
