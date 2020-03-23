<template>
  <div class="globalCase">
    <div class="pagaHead">
      <el-input v-model="searchtxt" class="QSearch" placeholder="请输入关键字">
        <i class="iconfont icon-icon-test35 SearchI" slot="suffix" @click="htmlClick(searchtxt)"></i>
      </el-input>
      <p @click="pagaClick"><a>高级选项</a></p>
    </div>

    <el-card class="filter-container" v-if="pagaShow" shadow="never">
      <div>
        <!--      <i class="el-icon-search"></i>-->
        <!--      <span>筛选搜索</span>-->
        <el-button
          style="float:right"
          type="primary"
          @click="htmlClick(searchtxt)"
          size="small">
          查询搜索
        </el-button>
<!--        <el-button-->
<!--          style="float:right;margin-right: 15px"-->
<!--          @click="handleResetSearch()"-->
<!--          size="small">-->
<!--          重置-->
<!--        </el-button>-->
        <el-form :inline="true" :model="listQuery" label-width="">
          <el-form-item label="手术名称：">
            <el-input v-model="listQuery.operation" class="input-width" placeholder="医生"></el-input>
          </el-form-item>
          <el-form-item label="病人：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="医生"></el-input>
          </el-form-item>
          <el-form-item label="医生：">
            <el-input v-model="listQuery.doctor" class="input-width" placeholder="病人"></el-input>
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.scheduledTime"
              value-format="yyyy-MM-dd"
              type="date"
              popper-class="picker-no-text"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div>
      <el-checkbox-group v-model="checkList" class="GRepairChecklist">
        <el-checkbox @change="handleCheckedCitiesChange(indexs)" v-for="(city,indexs) in cities" :label="city"
                     :key="indexs" :checked=alerys  border>{{city.title}}
        </el-checkbox>

      </el-checkbox-group>
    </div>
    <div :class="{ 'OverallRolling': isA, 'OverallRollOne': isB}">
      <ul>
        <!--      订单-->
        <li v-if="cities[0].bool">
          <div class="OverallLabel" v-if="cities[0].nameO"><p>订单</p></div>
          <a @click="moreShow(searchtxt,cities[0].id)" v-if="cities[0].info" class="moreClass"><p>查看更多</p></a>
          <el-row :gutter="12">
            <el-col :span="8" v-for="(item,index) in lise" :key="index" class="columnSearch templateLis">
              <el-card>

                <router-link :to="{path:'/detailsOrder/',query: {orderNumber:item.orderNumber }}">
                  <div class="allocationList">
                    <div class="allocationListHead"><h3>{{item.name}}</h3><i v-if="item.urgency==='1'">急</i>
                    </div>
                    <div class="bottom clearfix allocationListBody">
                      <p style="width: 100%;text-align: left" class="allPs">{{item.operation}}</p>
                      <p>{{item.operatiingRoom}}</p>
                      <p>{{item.scheduledTime}}</p>
                      <p>{{item.sequence}}台次</p>
                      <p>{{item.wardCode}}</p>
                      <p>{{item.betno}}床位</p>
                      <p>住院号：<span>{{item.patientId}}</span></p>
                      <p>医生：<span>{{item.doctorIncharge}}</span></p>
                      <!--                    <div class="allocationListBoot">-->
                      <!--                      <div class="allocationListBootLi">-->
                      <!--                        <el-tag >应</el-tag>-->
                      <!--                        <span>{{item.supposeQuantity}}</span></div>-->
                      <!--                      <div class="allocationListBootLi">-->
                      <!--                        <el-tag >已</el-tag>-->
                      <!--                        &lt;!&ndash;                    :style="{'color':desks.color,'border':desks.border}"&ndash;&gt;-->
                      <!--                        <span>{{item.realQuantity}}</span></div>-->
                      <!--                    </div>-->
                    </div>
                  </div>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
        </li>
        <!--      历史订单-->
        <li v-if="cities[1].bool">
          <div class="OverallLabel" v-if="cities[1].nameO"><p>历史订单</p></div>
          <a @click="moreShow(searchtxt,cities[1].id)" v-if="cities[1].info" class="moreClass"><p>查看更多</p></a>
          <el-row :gutter="12">
            <el-col :span="8" v-for="(item,index) in lise1" :key="index" class="columnSearch templateLis">
              <el-card>

                <router-link :to="{path:'/HistoricalHistory/',query: {orderNumber:item.orderNumber }}">
                  <div class="allocationList">
                    <div class="allocationListHead"><h3>{{item.name}}</h3><i v-if="item.urgency==='1'">急</i>
                    </div>
                    <div class="bottom clearfix allocationListBody">
                      <p style="width: 100%;text-align: left" class="allPs">{{item.operation}}</p>
                      <p>{{item.operatiingRoom}}号</p>
                      <p>{{item.scheduledTime}}</p>
                      <p>{{item.sequence}}台次</p>
                      <p>{{item.wardCode}}</p>
                      <p>{{item.betno}}床位</p>
                      <p>住院号：<span>{{item.patientId}}</span></p>
                      <p>医生：<span>{{item.doctorIncharge}}</span></p>

                      <!--                    <div class="allocationListBoot">-->
                      <!--                      <div class="allocationListBootLi">-->
                      <!--                        <el-tag >应</el-tag>-->
                      <!--                        <span>{{item.supposeQuantity}}</span></div>-->
                      <!--                      <div class="allocationListBootLi">-->
                      <!--                        <el-tag >已</el-tag>-->
                      <!--                        &lt;!&ndash;                    :style="{'color':desks.color,'border':desks.border}"&ndash;&gt;-->
                      <!--                        <span>{{item.realQuantity}}</span></div>-->
                      <!--                    </div>-->
                    </div>
                  </div>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
        </li>
        <!--      效期-->
        <li v-if="cities[2].bool">
          <div class="OverallLabel" v-if="cities[2].nameO"><p>效期</p></div>
          <a @click="moreShow(searchtxt,cities[2].id)" v-if="cities[2].info" class="moreClass"><p>查看更多</p></a>
          <el-row :gutter="12">
            <el-col :span="12" v-for="(item,index) in lise2" :key="index" class="columnSearch">
              <el-row class="templateLis">
                <div class="templateHover">
                  <div class="templateImg">
                    <el-image :src="item.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt="" :src="smalls" >
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt="" :src="smalls" >
                      </div>

                    </el-image>
                    <i class="iconfont icon-mianma-" v-if="item.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                    <i class="iconfont icon-yiwuyima" v-if="item.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                  </div>
                  <el-card class="templateR templateHeight">
                    <div style="position: relative; height: 100%;width: 100%;display: flex;" class="templateWith">
                      <el-col :span="18" style='position: relative;height: 100%;'>
                        <h4 :title="item.name">{{item.name}}</h4>
                        <h4 :title="item.alias">{{item.alias}}</h4>
                        <span class="templateTitle">{{item.size}}</span>
                        <h3>{{item.hisCode}}</h3>
                        <div class="leftHightS">
                          <span class="templateSpan"><b>库位:</b><p>{{item.location}}</p></span>
                          <!--                        <el-button class="templateOK" v-if="" @click="munOK(item)">打开</el-button>-->
                        </div>

                      </el-col>
                      <el-col :span="6" style='position: relative;height: 100%;'>
                        <div class="templateTime"><b>{{item.dif}}天</b>
                          <p>剩余：</p><span>{{item.time}}</span></div>
                        <p class="templateP">{{item.supplyQuantity}}{{item.bigUnitDesc}}</p>
                        <el-button class="templateButton" v-if="item.type==1">包</el-button>
                      </el-col>
                    </div>
                  </el-card>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </li>
        <!--     预警 -->
        <li v-if="cities[3].bool">
          <div class="OverallLabel" v-if="cities[3].nameO"><p>预警</p></div>
          <a @click="moreShow(searchtxt,cities[3].id)" v-if="cities[3].info" class="moreClass"><p>查看更多</p></a>
          <el-row :gutter="12">
            <el-col :span="12" v-for="(item,index) in lise3" :key="index" class="columnSearch">
              <el-row class="templateLis">
                <div class="templateHover">
                  <div class="templateImg">
                    <el-image :src="item.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt="" :src="smalls" >
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt="" :src="smalls" >
                      </div>

                    </el-image>
                    <i class="iconfont icon-mianma-" v-if="item.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="item.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i></div>
                  <el-card class="templateR templateHeight">
                    <div style="position: relative; height: 100%;width: 100%;display: flex;" class="templateWith">
                      <el-col :span="18" style='position: relative;height: 100%;'>
                        <h4 :title="item.name">{{item.name}}</h4>
                        <h4 :title="item.alias">{{item.alias}}</h4>
                        <span class="templateTitle">{{item.size}}</span>
                        <h3>{{item.hisCode}}</h3>
                        <div class="leftHightS">
                          <span class="templateSpan"><b>库位:</b><p>{{item.location}}</p></span>
                          <!--                        <el-button class="templateOK" v-if="" @click="munOK(item)">打开</el-button>-->
                        </div>

                      </el-col>
                      <el-col :span="6" style='position: relative;height: 100%;'>
                        <div class="templateTime"><b>{{item.warnQuantity}}</b>
                          <p>预警:</p></div>
                        <p class="templateP">{{item.supplyQuantity}}{{item.bigUnitDesc}}</p>
                        <el-button class="templateButton" v-if="item.type==1">包</el-button>
                      </el-col>
                    </div>


                  </el-card>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </li>
        <!--      物资目录-->
        <li v-if="cities[4].bool">
          <div class="OverallLabel" v-if="cities[4].nameO"><p>一级库</p></div>
          <a @click="moreShow(searchtxt,cities[4].id)" v-if="cities[4].info" class="moreClass"><p>查看更多</p></a>
          <el-row :gutter="12">
            <el-col :span="12" v-for="(item,index) in lise4" :key="index" class="columnSearch">
              <el-row class="templateLis">
                <div class="templateHover">
                  <div class="templateImg">
                    <el-image :src="item.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt="" :src="smalls" >
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt="" :src="smalls" >
                      </div>

                    </el-image>
                    <i class="iconfont icon-mianma-" v-if="item.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="item.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i></div>
                  <el-card class="templateR templateHeight">
                    <div style="position: relative; height: 100%;display: flex;width: 100%;" class="templateWith">
                      <el-col :span="18" style='position: relative;height: 100%;'>
                        <h4 :title="item.name">{{item.name}}</h4>
                        <h4 :title="item.alias">{{item.alias}}</h4>
                        <span class="templateTitle">{{item.size}}</span>
                        <h3>{{item.hisCode}}</h3>
                        <div class="leftHightS">
                          <span class="templateSpan"><b>库位:</b><p>{{item.location}}</p></span>
                          <!--                        <el-button class="templateOK" v-if="" @click="munOK(item)">打开</el-button>-->
                        </div>

                      </el-col>
                      <el-col :span="6" style='position: relative;height: 100%;'>

                        <p class="templateP">{{item.supplyQuantity}}{{item.bigUnitDesc}}</p>
                        <el-button class="templateButton" v-if="item.type==1">包</el-button>
                      </el-col>
                    </div>


                  </el-card>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </li>
        <!--   盘库   -->
        <li v-if="cities[5].bool">
          <div class="OverallLabel" v-if="cities[5].nameO"><p>盘库</p></div>
          <a @click="moreShow(searchtxt,cities[5].id)" v-if="cities[5].info" class="moreClass"><p>查看更多</p></a>
          <el-row :gutter="12">
            <el-col :span="12" v-for="(item,index) in lise5" :key="index" class="columnSearch">
              <el-row class="templateLis">
                <div class="templateHover">
                  <div class="templateImg">
                    <el-image :src="item.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt=""  :src="smalls">
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt=""  :src="smalls">

                      </div>
                    </el-image>
                    <i class="iconfont icon-mianma-" v-if="item.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="item.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i></div>
                  <el-card class="templateR templateHeight">
                    <div style="position: relative; height: 100%;display: flex;width: 100%;" class="templateWith">
                      <el-col :span="18" style='position: relative;height: 100%;'>
                        <h4 :title="item.name">{{item.name}}</h4>
                        <h4 :title="item.alias">{{item.alias}}</h4>
                        <span class="templateTitle">{{item.size}}</span>
                        <h3>{{item.hisCode}}</h3>
                        <div class="leftHightS">
                          <span class="templateSpan"><b>库位:</b><p>{{item.location}}</p></span>
                          <!--                        <el-button class="templateOK" v-if="" @click="munOK(item)">打开</el-button>-->
                        </div>

                      </el-col>
                      <el-col :span="6" style='position: relative;height: 100%;'>

                        <p class="templateP">{{item.supplyQuantity}}{{item.bigUnitDesc}}</p>
                        <el-button class="templateButton" v-if="item.type==1">包</el-button>
                      </el-col>
                    </div>


                  </el-card>
                </div>
              </el-row>
            </el-col>
          </el-row>

        </li>
      </ul>
    </div>
    <el-dialog
      width="80%"
      custom-class="moreInner"
      :title="cities[index].title"
      :visible.sync="innerVisible"
      append-to-body>

      <morelists v-if="index===0" :searchtxt="searchtxt" ref="Refreshs"></morelists>
      <!--      订单-->
      <morelists1 v-if="index===1" :searchtxt="searchtxt" ref="Refreshs"></morelists1>
      <!--      历史订单-->
      <morelists2 v-if="index===2" :searchtxt="searchtxt" ref="Refreshs"></morelists2>
      <!--      效期-->
      <morelists3 v-if="index===3" :searchtxt="searchtxt" ref="Refreshs"></morelists3>
      <!--      预警-->
      <morelists4 v-if="index===4" :searchtxt="searchtxt" ref="Refreshs"></morelists4>
      <!--      一级库-->
      <morelists5 v-if="index===5" :searchtxt="searchtxt" ref="Refreshs"></morelists5>
      <!--      盘库-->
    </el-dialog>
  </div>
</template>

<script>
  import {
    searchS
  } from '@/api/systemsL'

  import smalls from '@/assets/images/small.jpg';
  import morelists from '@/views/home/components/morelists';
  import morelists1 from '@/views/home/components/morelists1';
  // import morelists2 from '@/views/home/components/morelists2';
  // import morelists3 from '@/views/home/components/morelists3';
  import morelists2 from '@/views/home/components/morelists4';
  import morelists3 from '@/views/home/components/morelists5';
  import morelists4 from '@/views/home/components/morelists6';
  import morelists5 from '@/views/home/components/morelists7';

  // ['订单', '历史订单', '医生','病人','效期','预警','一级库','盘库']
  const cityOptions = [{id: 0, title: "订单", bool: true, Interface: 'order',info:false,nameO:false},
    {id: 1, title: "历史订单", bool: true, Interface: 'hisorder',info:false,nameO:false},
    {id: 2, title: "效期", bool: true, Interface: 'expiration',info:false,nameO:false},
    {id: 3, title: "预警", bool: true, Interface: 'warn',info:false,nameO:false},
    {id: 4, title: "一级库", bool: true, Interface: 'materials',info:false,nameO:false},
    {id: 5, title: "盘库", bool: true, Interface: 'materials',info:false,nameO:false}];
  //, '选配模板','报表'v-if="cities[0].nameO"
  export default {
    name: "QuickSearchBox",
    components: {
      morelists, morelists1, morelists2, morelists3, morelists4, morelists5
    },
    data() {
      return {
        isA: true,
        isB: false,
        pagaShow: false,
        listQuery: {},
        smalls,
        searchtxt: '',
        cities: cityOptions,
        innerVisible: false,
        RightInfo: {
          houseList: [],
          searchHouse: {
            pageSize: 6,
            pageNumber: 1,
          },
          houseNum: '',
        },
        showLi: true,
        lise: [],
        lise1: [],
        lise2: [],
        lise3: [],
        lise4: [],
        lise5: [],
        liseSD: [],
        liseSD1: [],
        liseSD2: [],
        liseSD3: [],
        liseSD4: [],
        liseSD5: [],
        listLoading: false,
        droping: false,
        checkList: [],
        index: 0,
        total: '',
        total1: '',
        total2: '',
        total3: '',
        total4: '',
        total5: '',
        alerys:this.alery,


      }

    },
    props: ['alery'],
    watch: {
      searchtxt: function (val) {
        // let timer = 0;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
          this.htmlClick(val);
        // }, 2000);
      },
      // total(newName, oldName) {
      //   let mv = this;
      //   mv.cities[0].nameO = true;
      //   if (this.total > 6) {
      //     mv.cities[0].info = true;
      //   } else {
      //     mv.cities[0].info = false;
      //   }
      // },
      // total1(newName, oldName) {
      //   let mv = this;
      //   mv.cities[1].nameO = true;
      //   if (this.total1 > 6) {
      //     mv.cities[1].info = true;
      //   } else {
      //     mv.cities[1].info= false;
      //   }
      // },
      // total2(newName, oldName) {
      //   let mv = this;
      //   mv.cities[2].nameO = true;
      //   if (this.total2 > 6) {
      //     mv.cities[2].info = true;
      //   } else {
      //     mv.cities[2].info = false;
      //   }
      // },
      // total3(newName, oldName) {
      //   let mv = this;
      //   mv.cities[3].nameO = true;
      //   if (this.total3 > 6) {
      //     mv.cities[3].info = true;
      //   } else {
      //     mv.cities[3].info = false;
      //   }
      // },
      // total4(newName, oldName) {
      //   let mv = this;
      //   mv.cities[4].nameO = true;
      //   if (this.total4 > 6) {
      //     mv.cities[4].info = true;
      //   } else {
      //     mv.cities[4].info = false;
      //   }
      // },
      // total5(newName, oldName) {
      //   let mv = this;
      //   mv.cities[5].nameO = true;
      //   if (this.total5 > 6) {
      //     mv.cities[5].info = true;
      //   } else {
      //     mv.cities[5].info = false;
      //   }
      // },

    },
    mounted() {

    },
    created(){
      this.alerys;
      this.handleCheckAllChange();
      // this.handleCheckAllChange();
    },
    // computed:{
    //   currentView(){
    //     return this.cities[this.index];
    //   }
    // },
    methods: {
      moreShow(searchtxt, cix) {
        let mv = this;
        mv.innerVisible = true;
        this.searchtxt = searchtxt;
        let len = Object.keys(this.$options.components).length;
        this.index = cix;
        cix = (this.index) % len;
        setTimeout(() => {
          this.$refs.Refreshs.parentHandleclick(searchtxt);
        }, 10)
        // setTimeout(()=>{
        //   // if(index=='materials'){
        //   //     mv.$refs.myMorelists.moreShow11(val,index);
        //   // }else if(index=='hisorder'){
        //   //     mv.$refs.myMorelists1.moreShow22(val,index);
        //   // }else if(index=='patient'){
        //   //   mv.$refs.myMorelists2.moreShow33(val,index);
        //   // }else if(index=='doctor'){
        //   //   mv.$refs.myMorelists3.moreShow44(val,index);
        //   // }
        //
        // },10)

        // this.morescall(val);
      },
      handleCheckAllChange(){

        for(let i=0;i<this.cities.length;i++){
          this.cities[i].bool=true;
          this.cities[i].nameO=false;
          this.cities[i].info=false;
        }

      },
      //多选
      handleCheckedCitiesChange(idx) {
        this.cities[idx].bool ? this.cities[idx].bool = false : this.cities[idx].bool = true;
        // this.$emit('upup',this.cities[idx].bool);
      },
      //搜索
      htmlClick(val) {
        let mv = this;
        mv.RightInfo.searchHouse.pageNumber = 1;
        mv.RightInfo.houseList = [];
        mv.htmlSearch(val);
      },
      //搜索
      htmlSearch(val) {
        let mv = this;
        let hou = this.RightInfo.searchHouse;
        hou.keyWords = val;
        hou.operation=mv.listQuery.operation;
        hou.name=mv.listQuery.name;
        hou.doctor=mv.listQuery.doctor;
        hou.scheduledTime=mv.listQuery.scheduledTime;
        if(val==''&&mv.listQuery.operation==''&&mv.listQuery.name==""&&mv.listQuery.doctor==""&&mv.listQuery.scheduledTime==""){
          return
        }
        searchS(this.Qs.stringify(hou)).then(res => {
          if(res.code!=='1'){
            this.$message({
              message: res.msg,
              type: 'error',
            });
            return
          }
          // let listTotal = res.data.materials.total;
          mv.total = res.data.order.total;
          mv.total1 = res.data.hisorder.total;
          mv.lise = res.data.order.result;
          mv.lise1 = res.data.hisorder.result;
          if(mv.total==0){
            mv.cities[0].info=false;
            mv.cities[0].nameO=false;
          }else {
            if (mv.total > 6) {
              mv.cities[0].info = true;
            }else {
              mv.cities[0].info=false;
            }
            mv.cities[0].nameO=true;
          }



          if(mv.total1==0){
            mv.cities[1].info=false;
            mv.cities[1].nameO=false;
          }else {
            if (mv.total1 > 6) {
              mv.cities[1].info = true;
            } else {
              mv.cities[1].info= false;
            }
            mv.cities[1].nameO=true;
          }



          if(res.data.expiration==null){
            mv.cities[2].info=false;
            mv.cities[2].nameO=false;
            mv.lise2=[]
          }else {
            mv.lise2 = res.data.expiration.result;
            mv.total2 = res.data.expiration.total;
            if(mv.total2==0){
              mv.cities[2].info=false;
              mv.cities[2].nameO=false;
            }else {
              if (mv.total2 > 6) {
                mv.cities[2].info = true;
              } else {
                mv.cities[2].info= false;
              }
              mv.cities[2].nameO=true;
            }

          }
          if(res.data.materials==null){
            mv.cities[5].info=false;
            mv.cities[5].nameO=false;
            mv.cities[4].info=false;
            mv.cities[4].nameO=false;
            mv.lise4=[];
            mv.lise5=[];
          }else {
            mv.total4 = res.data.materials.total;
            mv.lise4 = res.data.materials.result;
            mv.total5 = res.data.materials.total;
            mv.lise5 = res.data.materials.result;
            if(mv.total4==0){
              mv.cities[4].info=false;
              mv.cities[4].nameO=false;
            }else {
              if (mv.total4 > 6) {
                mv.cities[4].info = true;
              } else {
                mv.cities[4].info= false;
              }
              mv.cities[4].nameO=true;
            }

            if(mv.total5==0){
              mv.cities[5].info=false;
              mv.cities[5].nameO=false;
            }else {
              if (mv.total5 > 6) {
                mv.cities[5].info = true;
              } else {
                mv.cities[5].info= false;
              }
              mv.cities[5].nameO=true;
            }

          }
          if(res.data.warn==null){
            mv.cities[3].info=false;
            mv.cities[3].nameO=false;
            mv.lise3=[];
          }else {
            mv.total3 = res.data.warn.total;
            mv.lise3 = res.data.warn.result;
            if(mv.total3==0){
              mv.cities[3].info=false;
              mv.cities[3].nameO=false;
            }else {
              if (mv.total3 > 6) {
                mv.cities[3].info = true;
              } else {
                mv.cities[3].info= false;
              }
              mv.cities[3].nameO=true;
            }

          }
        }).catch(function (error) {
          // mv.$message({
          //   message: error.msg,
          //   type: 'error'
          // });
        });
      },
      //点击显示消失
      pagaClick() {
        let mv = this;
        mv.pagaShow = !mv.pagaShow;
        if (mv.pagaShow == true) {
          mv.isB = true;
          mv.isA = false;
        } else {
          mv.isB = false;
          mv.isA = true;
        }
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .pagaHead {
    display: flex;

    p {
      width: 100px;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
  }

  .moreClass {
position: absolute;
    top: 10px;
    text-align: right;

    font-size: 20px;
    right: 10px;
    color: #00b2ed;
  }

  /*列表 */
  .columnSearch {

  }

  .globalCase {
    float: left;
    width: 100%;
    height: calc(100% - 0px);;

    .OverallRolling {
      overflow: hidden;
      overflow-y: auto;
      height: calc(100% - 100px);
      li{
        position: relative;
      }
      .OverallLabel {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px solid #ddd;
        margin-bottom: 10px;
        p {
          font-size: 20px;
          float: left;
        }
      }
    }

    .OverallRollOne {
      overflow: hidden;
      overflow-y: auto;
      height: calc(100% - 200px);
      li{
        position: relative;
      }
      .OverallLabel {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px solid #ddd;
        margin-bottom: 10px;
        p {
          font-size: 20px;
          float: left;
        }
      }
    }
  }

  .pageSearch {
    float: left;
    width: 100%;
  }

  .allocationList {
    width: 100%;
    border-bottom-width: 1px;
    border-bottom-color: #f0f0f0;

    .allocationListHead {
      display: flex;
      justify-content: space-between;

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
      .allPs{
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        line-height: 1.8;
      }
      p {
        width: 50%;
        font-size: 16px;
        float: left;
        line-height: 30px;
        height: 30px;
      }

      p:nth-child(odd) {
        text-align: right;
      }

      p:nth-child(even) {
        text-align: left;
      }

      .allocationListBoot {
        width: 100%;
        float: left;
        height: 45px;
        line-height: 45px;
        display: flex;
        justify-content: space-between;
        margin-top: 25.2px;

        .allocationListBootLi {

          span:nth-child(1) {
            font-size: 16px;
            width: 45px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            float: left;

          }

          span:nth-child(2) {
            font-size: 16px;
            width: 45px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            float: left;

          }
        }

      }
    }
  }

  .templateLis {
    padding-bottom: 20px;
  }

  .templateImg {
    width: 246px;
    height: 166px;
    float: left;
    padding: 10px;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    h3 {
      font-size: 16px;
      color: #00adf8;
      margin-top: 10px;
    }

    .templateP {
      float: right;
      font-size: 36px;
      padding-top: 10px;
      padding-right: 8px;
      color: #02b2e9;
    }

    .templateTime {
      float: right;
      font-size: 16px;
      width: 100%;

      span {
        float: right;
        font-size: 16px;
      }

      p {
        float: right;
        font-size: 16px;
        padding-left: 10px;
      }

      b {
        float: right;
        font-size: 16px;
        font-weight: normal;
        color: #ef0000;
      }
    }

    .templateNum {
      position: absolute;
      right: 80px;
      bottom: 25px;
    }

    .templateButton {
      position: absolute;
      right: 20px;
      border: 2px dashed #0eb2ea;
      color: #0eb2ea;
      bottom: 25px;
      font-size: 16px;
      padding-left: 15px;
      padding-right: 15px;
    }

    .leftHightS {
      position: absolute;
      bottom: 0;
      width: 100%;

    }

    .templateSpan {
      float: left;
      font-size: 16px;
      margin-top: 10px;

      b {
        float: left;
        font-weight: normal;
      }

      p {
        float: left;

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

  .templateHover {
    display: initial;
    float: left;
    width: 100%;
    height: 170px;
    position: relative;
  }
  .templateWith{
    width: 100%;
  }
</style>
