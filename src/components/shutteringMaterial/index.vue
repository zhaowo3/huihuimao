<template>
  <el-row class="detailsScroll">

    <div class="templateSubject">

      <el-col :span="8" class="templateLeft">
<!--        <div class="autoSeach2">-->
<!--          <el-input v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)"-->
<!--                    class="inputs1" placeholder="请输入关键字" clearable>-->
<!--            <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>-->
<!--          </el-input>-->
<!--&lt;!&ndash;          <el-button @click="matinButton()" type="primary" class="inputs2">确定</el-button>&ndash;&gt;-->
<!--        </div>-->
        <ul class="clearfix" id="leftBox" ref="uldom">

          <li v-for="(data,index) in houseList" :key="index" :class="index==cur?'hit':''"
            :id="data.materialId" v-if="data.codeType==3?'':'p_show'" @click="infoViews(data.materialId,index)">
<!--            -->
            <el-main>
              <div class="templateLeftImg"><img alt="" :src="smalls" v-real-img="data.imgUrl"><i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                <div class="templateCheck">
                  <input type="checkbox" @click="CheckItem(data)" :checked="data.select" name="userId"
                         :key="index+newDate">
                </div>
              </div>

              <div class="templateLeftSpan temNumbers"><p :title="data.materialName">{{data.materialName}}</p><p :title="data.aliasName">{{data.aliasName}}</p><span :title="data.size">{{data.size}}</span><span>库位：{{data.location}}</span>
                <p style="right: 0;position: absolute;" :class="data.supplyQuantity==0?classA:classB">{{data.supplyQuantity==0?'无库存':data.supplyQuantity}}</p>
                <el-input-number v-model="data.quantity" style="margin-top: 10px" @change="handleChange1(data)" :min="0"
                                 :max="999" label="描述文字" class="detailsNum"></el-input-number>
                <el-button class="templateButton" v-if="data.type==1">包</el-button>
              </div>
            </el-main>
          </li>


<!--          <li-->
<!--            style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;"-->
<!--            v-show="droping">加载中-->
<!--          </li>-->
<!--          <li-->
<!--            style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"-->
<!--            v-show="noMore">没有更多的数据-->
<!--          </li>-->
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
                    <el-col :span="16"><h3>{{danViews.name}}</h3></el-col>
                    <el-col :span="8"><h4>{{danViews.location}}</h4>
                      <p>库位：</p></el-col>
                    <el-col :span="24" class="aliasS"><h4>{{danViews.alias}}</h4>
                    </el-col>
                  </div>
                  <div class="listHeaderTwo">
                    <span>{{danViews.size}}</span>
                    <el-button @click="matinButton(danViews.id)" type="primary">确定</el-button>
                  </div>
                </div>
                <div class="picturesList">
                  <div class="picturesListImg">
                    <el-image :src="danViews.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt=""  :src="big">
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt=""  :src="big">

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
    <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
  </el-row>
</template>

<script>
    import smalls from '@/assets/images/small.jpg';
    import big from '@/assets/images/big.jpg';
    import {debounce} from '@/utils/debounce';
    // import PullTo from 'vue-pull-to'
    import {
        catalogs, catalget
    } from '@/api/material';
    import {
        searchPage
    } from '@/api/systemsL'

    let valList = {};
    export default {
        name: "shutteringMaterial",
        // components: {
        //   PullTo
        // },
        data() {
            return {
                checkedEquipments: [], //随意修改后的checked项（即要传到后台的变更数据）
                // leftInfo:{
                //   loading:false,
                //   isFinsh:false,  //是否完成加载
                //   allSize:'',
                //   pageSize:0,
                //   pageNumber:1,
                //   dataList:[],
                // },
                classA:'classA',
                classB:'classB',
                // houseList1: this.houseList,
                searchHouse: {
                    pageSize: 10,
                    pageNumber: 0,
                    columnName: 'supply_quantity',
                    orderType: 'desc',
                    keyWords: '',
                },
                busy: false,
                listLoading: false,
                droping: false,
                noMore: false,
                loading: false,
                houseNum:'',
                cur: 0,
                newDate: +new Date(),
                id: '',
                checked: 0,
                checkedMore: [],
                danViews: [],
                // danViewsLoadding: false,
                current:'',
                p_show:false,
                smalls,
                big,
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
                checkedValue: [],
                arr: [],
                userIds: [],
                surE: 0,
                total: 0,
                uld:'',
                searchtxt: '',

            }

        },
        props: {
            btnText: String,
            btnTextT: String,
            required: true,
            houseList: {
                type: Array,
            },
            shuttDialogVisible: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.selected();
            // this.getMore();
            this.$watch('searchtxt', debounce((newQuery) => {
                this.queryClick(newQuery);
            }, 1000))
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
        watch: {
            shuttDialogVisible(val) {
                if (val) {
                    valList = {};
                    this.selected();
                    this.newDate = +new Date();
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
            },

        },

        methods: {
            // btnText(){
            //   this.$emit('btnText')
            // },
            // getMore(e,i){
            //   if(this.checkedValue[i]=true){
            //     this.checkedMore.push(e)
            //   }
            //
            // },
            // getMore(){
            //     let mv = this;
            //     if (mv.searchHouse.keyWords == '') {
            //         mv.searchSource();// 请求数据
            //     } else {
            //         mv.querySearch(mv.searchtxt);
            //     }
            // },

            queryClick(val) {
                let mv = this;
                mv.houseList = [];
                mv.cur=0;
                mv.querySearch(val);
            },

            //搜索
            querySearch(val) {
                let mv = this;
                let hou = this.searchHouse;
                hou.keyWords = val;
                searchPage(this.Qs.stringify(hou)).then(res => {
                    if(res.code=='-1'){
                        this.$message({
                            message: res.msg,
                            type: 'error',
                        });
                        return
                    }
                    // let listTotal = res.data.total;
                    // if (listTotal > 0) {
                    //     this.busy = true
                    // } else {
                    //     this.busy = false
                    // }
                    // this.loading = false;

                    mv.houseList=res.data.result;
                }).catch(function (error) {
                    this.$message({
                        message: error.msg,
                        type: 'error'
                    });
                    // this.droping = false
                });
            },
            selected(res = this.houseList) {
                for (let i = 0; i < res.length; i++) {
                    const item = res[i];
                    item.select = true;
                    // if(item.quantity==0){
                    //     item.select = false;
                    // }
                    // if (item.select = null) {
                    //     item.quantity = 0;
                    // }
                }


            },
            handleChange1(item) {
                let mv =this;
                let val = valList[item.materialId];
                let valeng = item.quantity;
                if(valeng>0){
                    valList[item.materialId] = item.quantity;
                    item.select = true;
                }else {
                    item.select = false;
                }

                if (val != null) {

                    valList[item.materialId] = item.quantity;
                    // if(mv.danViews.supplyQuantity>0){
                    //   mv.danViews.supplyQuantity=mv.danViews.supplyQuantity-item.surecode;
                    // }
                    // item.supplyQuantity = item.supplyQuantity-item.surecode;
                }
            },
            CheckItem: function (data) {
                if (valList[data.materialId]) {
                    delete valList[data.materialId];
                    data.select = true;
                } else {
                    valList[data.materialId] = data.quantity;
                    data.select = false;
                }
                // let boxs = document.getElementsByName("userId");
                // let userIds=[];
                // for (let x in boxs) {
                //   if (boxs[x].checked) userIds.push(boxs[x].value);
                // // ,data
                // }
                // this.userIds=userIds;
            },
            async pushDataList() {
                for (let v = 0, lens = this.userIds.length; v < lens; v++) {
                    let resultData = this.userIds[v];
                    await catalget(resultData).then(res => {
                        this.filesList.push(res.data);
                    })
                }
            },
            async matinButton() {
                // await this.pushDataList()
                for (let i = 0; i < this.houseList.length; i++) {
                    const item = this.houseList[i];
                    if(item.select==false){
                        delete valList[item.materialId]
                    }else {
                        valList[this.houseList[i].materialId] = this.houseList[i].quantity;
                    }

                }

                this.$emit('MaterialH', valList);
                valList={};
            },
            // eventsBand(e){
            //   return new Promise(resolve => {
            //     let ev=e.target||e;
            //     let el=document.querySelector('#leftBox');
            //     if(ev.offsetHeight>el.offsetHeight) {
            //       resolve(this.getMoreList());
            //     }else if(ev.scrollHeight==el.offsetHeight){   //到底了 我们需要加载
            //       resolve(this.getMoreList());
            //     }
            //   })
            // },
                  //  列表头部
              //     getMoreList() {
              //       return  new Promise((resolve, reject)=>{
              //           if(this.leftInfo.isFinsh){
              //               return  false
              //           }
              //           if(this.leftInfo.loading){
              //               return false;
              //           }
              //           this.leftInfo.loading=true;
              //           this.leftInfo.pageSize+=10;
              //           catalogs({
              //               pageSize:this.leftInfo.pageSize,
              //               pageNumber:this.leftInfo.pageNumber
              //           }).then(res=>{
              //               this.selected(res.data.result);
              //               this.leftInfo.allSize=res.data.total;
              //               this.leftInfo.dataList=res.data.result;
              //               this.leftInfo.loading=false;
              //               if(this.leftInfo.allSize<=this.leftInfo.pageSize){
              //                   this.leftInfo.isFinsh=true;
              //               }else{
              //                   this.leftInfo.isFinsh=false;
              //                   this.eventsBand( document.querySelectorAll('.templateLeft')[1]);
              //               }
              //               resolve(res);
              //           })
              //       })
              // },

            // searchSource() {
            //     let mv = this;
            //     catalogs({
            //         pageSize: this.searchHouse.pageSize,
            //         pageNumber: this.searchHouse.pageNumber
            //     }).then(response => {
            //         let listTotal = response.data.total;
            //         if (listTotal > 0) {
            //             this.busy = true
            //         } else {
            //             this.busy = false
            //         }
            //         this.loading = false;
            //         if(listTotal<=mv.searchHouse.pageSize){
            //             mv.houseList1=response.data.result;
            //             mv.houseNum = response.data.total;
            //             this.busy = true;
            //             mv.noMore = true // 切换底部提示信息
            //             mv.droping = false
            //         }else {
            //             mv.houseList1 = mv.houseList1.concat(response.data.result);
            //             let DownloadTotal =
            //                 (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize;
            //             let total = response.data.total;
            //             mv.houseNum = response.data.total;
            //             let totalPage = (mv.houseNum + mv.searchHouse.pageSize - 1) / mv.searchHouse.pageSize;
            //             // mv.searchHouse.pageNumber++; //增加页数
            //             if (mv.searchHouse.pageNumber + 1 >= totalPage) {
            //                 this.busy = true;// 将无限滚动关闭
            //                 this.searchHouse.pageNumber = 0 // 页数变为0
            //                 this.noMore = true; // 切换底部提示信息
            //                 this.droping = false
            //             } else {
            //                 this.busy = false;// 将无限滚动给打开
            //                 this.droping = true;
            //                 this.noMore = false; // 切换底部提示信息
            //             }
            //             mv.current= mv.houseList1.length;
            //         }
            //     }).catch(function (error) {
            //         this.$message.error(error);
            //         this.droping = false
            //     });
            //
            //
            // },
            infoViews(id, index) {
                let mv=this;
                if(mv.cur==0){
                    mv.cur = index;
                    // mv.danViewsLoadding = true;
                    catalget(id).then(res => {
                        mv.danViews = res.data;
                        // mv.danViewsLoadding = false;
                        for(let i=0;i<res.data.length;i++){
                            if(res.data[i].imgUrl==''||res.data[i].imgUrl==null){
                                res.data[i].imgUrl=big
                            }
                        }
                    })
                }else if(mv.cur!==index){
                    mv.cur = index;
                    // mv.danViewsLoadding = true;
                    catalget(id).then(res => {
                        mv.danViews = res.data;
                        // mv.danViewsLoadding = false;
                        for(let i=0;i<res.data.length;i++){
                            if(res.data[i].imgUrl==''||res.data[i].imgUrl==null){
                                res.data[i].imgUrl=big
                            }
                        }

                    })
                }

            },
            handleChange(id) {
                this.checkEquipArr = [];
                let arr = this.checkedEquipments;
                if (this.checkedEquipments == 0) {
                    return
                } else {
                    this.checkEquipArr.push(this.checkedEquipments)
                    // for (let i = 0; i < arr.length; i ++) {
                    //
                    //     let obj = {
                    //       id: this.leftInfo.dataList[i].id,
                    //       // equips: []
                    //     }
                    //     // for (let j = 0; j < this.leftInfo.dataList.length; j++) {
                    //     //   obj.equips.push(this.leftInfo.dataList[j])
                    //     // }
                    //
                    // }
                }


            },
        }
    }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .detailsScroll {
    height: 100%;
    position: relative;
  }
  .autoSeach2 {
    position: sticky;
    z-index: 999;
    top: 0;
    margin-bottom: 10px;
    .inputs1 {
      float: left;
/*width: calc(100% - 100px);;*/
    }
.inputs2{
  width: 90px;
  margin-left: 10px;
}
    i {
      font-size: 30px;
      margin: 4px 0;
      display: block;
      cursor: pointer;
    }
  }
  .templateSubject {
    overflow: auto;
    height: 100%;
    width: 100%;

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
          width: 188px;
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

          .templateCheck {
            position: absolute;
            left: 0;
            top: 0;

            input[type="checkbox"] {
              position: relative;
              outline: none;
            }

            input[type="checkbox"]::before {
              content: "";
              display: block;
              position: absolute;
              width: 0.12rem;
              height: 0.12rem;
              line-height: 0.11rem;
              text-align: center;
              border: 1px solid #1273c4;
              background-color: #fff;
              border-radius: 0.02rem;
              -webkit-border-radius: 0.02rem;
              -moz-border-radius: 0.02rem;
            }

            input[type="checkbox"]:checked::before {
              content: "\2714";
              color: #1273c4;
              font-size: 0.11rem;
            }
          }
        }

        .templateLeftSpan {
          padding-left: 178px;
          float: left;
          width:100%;
          position: relative;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*height: 45px;*/
          }
          p::after,span::before{
            content:"\007C ";
            opacity:0;
          }
          span {
            float: left;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
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
      height: 100%;
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
        height: calc(100% - 100px);
        .picturesListImg {
          width: 80%;
          height: auto;
          text-align: center;
          margin: 0 auto 30px;
          height: calc(100% - 140px);
          img {
            max-width: 100%;
            /*width: 60%;*/
            height: 100%;
            display: block;
            margin: 0 auto;
          }
        }

        .picturesListCenter {
          .grid-content {
            margin-top: 10px;
            /*height: 40px;*/
            float: left;
          }

          span {
            font-size: 16px;
            float: left;
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

          span {
            font-size: 16px;
            float: left;
          }

          button {
            /*font-size: 24px;*/
            float: right;
            /*background: #1fd7d8;*/
            /*color: #fff;*/
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
    float: left;
    margin-top: 5px;
    font-size: 18px;
    color: #97a8be;
  }
</style>
