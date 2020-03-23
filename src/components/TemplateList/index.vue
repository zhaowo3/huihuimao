<template>
  <div style="height: 100%;">
    <el-row class="detailsScroll">
      <div class="templateSubject">
        <el-col :span="8" class="templateLeft">
          <div class="templateHE">
              <div class="addPlus" @click="AdditionPops" id="hamburger-AdditionPops"><i class="iconfont icon-add"></i>导入历史手术订单</div>
            <div class="showSearch"><el-input v-model="searchtxt" class="inputs3" @keyup.enter.native="queryClick(searchtxt)"
                                              placeholder="请输入关键字" clearable>
              <i class="iconfont icon-icon-test35 SearchI" slot="suffix" @click="queryClick(searchtxt)"></i>
            </el-input></div>
            <!--            <li @click="MaterialM" style="border: 1px solid #66b1ff" :class="{hit: curg ==0}" id="hamburger-MaterialM">自选物资</li>-->
            <div class="templateLeftUL"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                 infinite-scroll-distance="10" v-loading="listLoading">
              <ul class="clearfix" id="leftBox" ref="uldom">
                <li v-for="(data,index) in houseList" :key="index" :class="index==cur?'hit':''"
                    @click="infoViews(data.operationCode,index,data)" :id="data.operationCode">
                  <el-main >
                    <div class="templateLeftSpan temNumbers"><p :title="data.operationName">{{data.operationName}}</p>
                      <!--                  {{data.operationCode}}-->
                      <!--                <el-button class="templateButton" v-if="data.type==1">包</el-button>-->
                    </div>
                  </el-main>
                </li>
                <li class=""
                    style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;text-align: center;justify-content:center;"
                    v-show="droping">加载中
                </li>
                <li class=""
                    style="text-align: center; width:100%;color: #ddd;border: none; margin-bottom: 5px;font-size: 16px;float: left;text-align: center;justify-content:center;"
                    v-show="noMore">没有更多的数据
                </li>
                <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
              </ul>
            </div>
<!--            <ul>-->
<!--              <li v-for="(data,index) in templates" :key="index" :class="{hit: cur ==index}" :data-id="data.id"-->
<!--                  @click="clickLists(data,index)">{{data.operationName}}-->
<!--              </li>-->
<!--            </ul>-->
          </div>

        </el-col>
        <el-col :span="16" class="templateRight">
          <el-main>
            <!--          v-for="data,index in datas" :style="{display: index==cur?'block':'none'}"-->
            <ul v-if="getW">
              <div class="templateAdd" v-if="$route.query.materialAdd==1">
                <el-button class="addHy" @click="$emit('showChange')" id="hamburger-templateAdd">
                  <svg-icon icon-class="add" class="color-main"></svg-icon>
                </el-button>
              </div>
              <li v-for="newData in orderMaterials">
                <el-row class="templateLis">
                  <div class="templateHover">
                    <div class="templateImg">
                      <el-image :src="newData.imgUrl">
                        <div slot="error" class="image-slot">
                          <img alt="" :src="smalls" >
                        </div>
                        <div slot="placeholder" class="image-slot">
                          <img alt="" :src="smalls" >
                        </div>

                      </el-image>
                      <i class="iconfont icon-mianma-" v-if="newData.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                      <i class="iconfont icon-yiwuyima" v-if="newData.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                    </div>
                    <div class="templateR" style="height: 100%;position: relative">
                      <div class="templateS">
                        <div class="nextLeft">
                          <h4 :title="newData.materialName">{{newData.materialName}}</h4>
                          <h4 :title="newData.aliasName">{{newData.aliasName}}</h4>
                          <!--                  <span class="templateSpan">库位:<p>{{data.storehouse}}</p></span>-->
                          <span class="templateTitle">{{newData.size}}</span>
                          <div class="inText">
                            <i><b>应：</b>{{newData.quantity}}</i>
                            <i><b>已：</b>{{newData.supplyQuantity}}</i>
                            <i><b>库存：</b>{{newData.stockQuantity}}</i>
                            <i><b>库位：</b>{{newData.location}}</i>
                            <el-button class="templateButton" v-if="newData.type==1">包</el-button>
                          </div>
                        </div>
                        <div class="nextRight">
                          <p>{{newData.quantity}}{{newData.bigUnitDesc}}</p>
                          <div class="nextI">
                            <el-button type="primary" @click="ToDeposit(newData)" id="hamburger-ToDeposit"
                                         v-if="newData.status!==0&&$route.query.materialIn==1" class="colorsGreen"><i
                              class="iconfont icon-shanchu-1"></i>入单
                            </el-button>
                            <el-button type="primary" @click="clickDeletes(newData.id)" id="hamburger-clickDeletes" v-if="$route.query.materialDel==1"><i
                              class="iconfont icon-shanchu-" ></i>删除
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-row>
              </li>

            </ul>
            <ul v-if="getE">
              <li v-for="news in materials">
                <el-row class="templateLis">
                  <div class="templateHover">
                    <div class="templateImg">
                      <el-image :src="news.imgUrl">
                        <div slot="error" class="image-slot">
                          <img alt="" :src="smalls" >
                        </div>
                        <div slot="placeholder" class="image-slot">
                          <img alt="" :src="smalls" >
                        </div>

                      </el-image>
                      <i class="iconfont icon-mianma-" v-if="news.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                      <i class="iconfont icon-yiwuyima" v-if="news.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                    </div>
                    <div class="templateR">
                      <div class="templateS">
                        <div class="nextLeft">
                          <h4 :title="news.materialName">{{news.materialName}}</h4>
                          <h4 :title="news.aliasName">{{news.aliasName}}</h4>
                          <!--                  <span class="templateSpan">库位:<p>{{data.storehouse}}</p></span>-->
                          <span class="templateTitle">{{news.size}}</span>
                          <div class="inText">
                            <i><b>应：</b>{{news.quantity}}</i>
                            <i><b>已：</b>{{news.supplyQuantity}}</i>
                            <i><b>库存：</b>{{news.stockQuantity}}</i>
                            <i><b>库位：</b>{{news.location}}</i>
                            <el-button class="templateButton" v-if="news.type==1">包</el-button>
                          </div>
                        </div>
                        <div class="nextRight">
                          <p>{{news.quantity}}{{news.bigUnitDesc}}</p>
                          <div class="nextI">
                            <el-button type="primary" @click="ToDeposit(news)"
                                       v-if="news.status!==0&&news.awayQuantity-news.supplyQuantity>0" class="colorsGreen"><i
                              class="iconfont icon-shanchu-1"></i>入单
                            </el-button>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </el-row>

              </li>
            </ul>
            <!--            <div class="templateAdd">-->
            <!--              <el-button  style="margin:0 auto 50px;padding: 0.104167rem 0.104167rem" @click="$emit('showChange')"><svg-icon icon-class="add" class="color-main"></svg-icon></el-button>-->
            <!--            </div>-->


          </el-main>

        </el-col>
      </div>
    </el-row>

        <el-dialog :modal="true" :fullscreen="fullscreen" custom-class="el-dialog__header-custom dialogshMB"
                   :visible.sync="shuttDialogVisible" title="添加手术模板" width="30%" style="padding-top: 0;" >
          <shutteringMS @MaterialH="groupsM" :houseList="danViews" :shuttDialogVisible="shuttDialogVisible" ></shutteringMS>
          <!--      @userIdsName="materialNames"-->
        </el-dialog>
  </div>
</template>

<script>

  import smalls from '@/assets/images/small.jpg';
  import eventBus from '../../utils/eventBus'
  import {debounce} from '@/utils/debounce';
  import shutteringMS from '@/components/shutteringMS'

  import {
      operationPage,infoinfo,addMaterial,prepareOrder
  } from '@/api/home'
  export default {
      inject: ['reload'],  // 注入重载的功能（注入依赖）
    name: "TemplateList",
      components: {
          shutteringMS
      },
    data() {
      return {
        smalls,
        getW: true,
        getE: false,
          search3:'',
          listLoading: false,
          searchtxt:'',
          houseList:[],
          searchHouse: {
              pageSize: 10,
              pageNumber: 0,
              search: '',
          },
          busy: false,
          listLoading: false,
          droping: false,
          noMore: false,
          loading: false,
          cur: 0,
          danViews: [],
          danViewsLoadding: false,
          operationName:'',
          operationCode:'',
          shuttDialogVisible:false,
          fullscreen: false,   // 弹窗是否全屏
          orderNumber:this.$route.query.orderNumber,
      }

    },
    props: {
      templates: {
        type: Array,
      },
      materials: {
        type: Array,
      },
      orderMaterials: {
        type: Array,
      },
      materialAdd:Number,
      materialDel:Number,
      // cur: 0,
      curg: 0,
        orderNu: '',


    },
      created() {
          this.$watch('searchtxt', debounce((newQuery) => {
              this.queryClick(newQuery);
          }, 1000))
      },
    watch: {
        // houseList:function (data) {
        //     this.$nextTick(function () {
        //         if(data.length==0){
        //             return
        //         }else {
        //             let uld=data[this.cur].operationCode;
        //             if(uld!==''){
        //                 this.infoViews(uld,this.cur,data[this.cur])
        //             }
        //         }
        //
        //     });
        // }
    },

    methods: {
        loadMore() {
            setTimeout(() => {
                let mv = this;
                if (!mv.busy) {
                    mv.busy = true;// 将无限滚动给禁用
                    if (mv.searchHouse.search == '') {
                        mv.searchHouse.pageNumber++ // 增加页数
                        mv.searchSource();// 请求数据
                    } else {
                        mv.searchHouse.pageNumber++ // 增加页数
                        mv.querySearch(mv.searchtxt);
                    }
                }
            }, 500);
        },
        infoViews(id, index,data) {
            let mv=this;
            if(mv.cur==0){
                mv.cur = index;
                mv.danViewsLoadding = true;
                mv.operationCode=id;
                mv.operatdata=data;
                mv.operationName=data.operationName;
                infoinfo({
                    operationCode: id,
                }).then(res => {
                    this.$nextTick( () =>{
                    mv.danViews = res.data;
                    mv.shuttDialogVisible = true;
                    })
                })
            }else{
                mv.cur = index;
                mv.danViewsLoadding = true;
                mv.operationCode=id;
                mv.operatdata=data;
                mv.operationName=data.operationName;
                infoinfo({
                    operationCode: id,
                }).then(res => {
                    this.$nextTick( () =>{
                    mv.danViews = res.data;
                    mv.shuttDialogVisible = true;
                    })
                })
            }

        },

        searchSource() {
            let mv = this;
            operationPage({
                pageSize: this.searchHouse.pageSize,
                pageNumber: this.searchHouse.pageNumber
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
                    mv.droping = false
                }else {
                    mv.houseList = mv.houseList.concat(response.data.result)
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

        //点击确定添加物资
        groupsM(list) {
            let mv=this;
            //console.log(filesList)
            mv.listd=list;
            if(Object.keys(mv.listd).length==0){
                return
            }
            // this.dialogVisible = false;
            for (let key in mv.listd) {
                if (!mv.listd[key]) {
                    delete mv.listd[key];
                }
            }

            let sendData = `materialId=${Object.keys(mv.listd).join(',')}&`
            sendData += `materialCount=${Object.values(mv.listd).join(',')}&`
            sendData += `orderNumber=${mv.orderNumber}`;
            addMaterial(sendData).then(res => {
                if(res.code !=='1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                    });
                    return
                }
                this.$nextTick( () =>{
                    this.MaterialH1();
                    this.dialogVisible = false;
                    this.shuttDialogVisible = false;
                })

            });


        },
        //添加材料物资选择刷新页面
        MaterialH1() {
            let mv=this;
            mv.listLoading = false;
            prepareOrder(mv.orderNumber).then(response => {
                if(response.code !=='1'){
                    this.$message({
                        message: response.msg,
                        type: 'error',
                    });
                    return
                }
                mv.listd='';
                mv.listLoading = false;
                // this.$emit()
                // mv.orderMaterials = response.data.orderMaterials;
                mv.$emit('maVal',response.data.orderMaterials)
                // mv.orderMaterials = response.data.orderMaterials;
                // this.$router.go(0);
            });
        },
        queryClick(val) {
            let mv = this;
            mv.searchHouse.pageNumber = 1;
            mv.houseList = [];
            mv.cur=0;
            mv.querySearch(val);
        },
        //搜索
        querySearch(val) {
            let mv = this;
            let hou = this.searchHouse;
            hou.search = val;
            operationPage(hou).then(res => {
                if(res.code=='-1'){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                    });
                    return
                }
                let listTotal = res.data.total;
                if (listTotal > 0) {
                    this.busy = true
                } else {
                    this.busy = false
                }
                this.loading = false;
                if(listTotal<=mv.searchHouse.pageSize){
                    mv.houseList=res.data.result;
                    mv.houseNum = res.data.total;
                    this.busy = true;
                    mv.noMore = true; // 切换底部提示信息
                    mv.droping = false;
                    mv.current= mv.houseList.length;
                }else {
                    mv.houseList = mv.houseList.concat(res.data.result);
                    let DownloadTotal =
                        (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize;
                    let total = res.data.total;
                    mv.houseNum = total;
                    let totalPage = (mv.houseNum + mv.searchHouse.pageSize) / mv.searchHouse.pageSize;
                    // mv.searchHouse.pageNumber++; //增加页数
                    if (mv.searchHouse.pageNumber + 1 >= totalPage) {
                        this.busy = true // 将无限滚动关闭
                        this.searchHouse.pageNumber = 0 // 页数变为0
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
                this.$message({
                    message: error.msg,
                    type: 'error'
                });
                this.droping = false
            });
        },
      AdditionPops() {
        this.$emit('AdditionH');//select事件触发后，自动触发showCityName事件
      },
        AdditionShuttering(){
            this.$emit('AddiShutt');//添加模板
        },
      //  删除物资
      clickDeletes(data) {
        // this.getW=false;
        // this.getE=true;
        this.$emit('materialDelete', data);//select事件触发后，自动触发showCityName事件
      },
      ToDeposit(data) {
        this.$emit('ToDepositAdd', data);//select事件触发后，自动触发ToDepositAdd事件
      },
      //  列表左侧列表点击
      clickLists(data, index) {
        this.getW = false;
        this.getE = true;
        this.$emit('showCityName', data, index);//select事件触发后，自动触发showCityName事件
      },
      MaterialM() {
        this.getW = true;
        this.getE = false;
        this.$emit('MaterialS');//追加额外材料
      }

      // addOrUpdatehandle(ture){
      //   eventBus.$emit('ddOrUpdate',this.addOrUpdatehandle)
      // }
      // materialNames(data){
      //   this.materials.push(data);
      //   // for(let v= 0,lens=data.length; v<lens; v++){
      //   //   let resultData = data[v];
      //   //   this.materials.push(data);
      //   // }
      // }
      // rouste(){
      //   this.$router.push({path: '/catalog/catalogWord'})
      // },

    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .addPlus {
    text-align: center !important;
    line-height: 80px;
    display: inline-block !important;
    width: 100%;
    font-size: 18px;
    float: left;
    i {
      padding-right: 20px;
    }
  }
  .addHy{
    margin:0 auto 20px;padding: 0.104167rem 0.104167rem
  }
  .detailsScroll {
    height: calc(100% - 187px);
    position: relative;
  }

  .templateSubject {
    overflow: auto;
    height: 100%;

    .templateLeft {
      background: #fff;
      height: calc(100% - 38px);
      /*overflow-y: auto;*/

      li {
        float: left;
        font-size: 20px;
        width: 100%;
        height: 84px;
        border-bottom-color: #dde8ec;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        padding: 0 20px;
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        b {
          vertical-align: middle;
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
      height: calc(100% - 40px);
      overflow-y: auto;

      .templateAdd {
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        display: flex;
      }

      .templateHover {
        display: flex;
        float: left;
        width: 100%;
        height: 100%;
        position: relative;
        background: #fff;

      }

      .templateHover:hover {
        outline: 2px #13bdf6 solid;
        outline-offset: -2px;
      }

      .el-card__body {

        position: relative;
      }

      li {
        float: left;
        width: 100%;

        .templateLis {
          padding-bottom: 20px;
          position: relative;
        }

        .templateImg {
          width: 246px;
          height: 100%;
          float: left;
          position: absolute;
          left: 0;
          top: 0;
          padding: 10px;
          img {
            width: 100%;
            height: 100%;
            float: left;

          }
        }

        .nextLeft {
          width: 70%;
          float: left;
        }

        .nextRight {
          width: 30%;
          float: right;
          position: relative;
          height: 100%;
          .nextI {

            display: flex;
          float: right;
            position: absolute;
            right: 0;
            bottom: 0;
            button {
              margin-left: 20px;
              line-height: 20px;

              span {

              }
            }

            i {
              font-size: 20px;
              color: #fff;
              float: left;
              margin-right: 20px;
            }
          }

        }

        .inText {
          position: relative;
          float: left;

          b {
            padding-right: 10px;
            font-weight: normal;
          }

          i {
            font-size: 20px;
            float: left;
            font-style: normal;
            margin-right: 30px;
          }

        }

        .templateR {
          height: 100%;
          position: relative;
          width: 100%;
          display: flex;
          padding: 20px;
         .templateS{
           padding-left: 246px;
           width: 100%;
         }
          h4 {
            font-size: 24px;
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*height: 55px;*/
          }
          h4::after,h3::after,span::after {
            content:"\007C ";
            opacity:0;
          }
          h3 {
            font-size: 16px;
            color: #00adf8;
            margin-top: 10px;
          }

          p {
            float: right;
            font-size: 36px;
            width: 100%;
            text-align: right;
          }

          .templateNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .templateButton {
            float: left;
            border: 0.010417rem dashed #0eb2ea;
            color: #0eb2ea;
            padding: 10px;
            font-size: 16px;

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
            padding-top: 5px;
            padding-bottom: 5px;
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
  .showSearch{
    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
    float: left;
    width: 100%;
  }
  .templateHE{
    height: 100%;
    ul{
      height: 100%;
      width: 100%;
      float: left;
    }
  }
  .templateLeftUL {
    background: #fff;
    height: calc(100% - 80px);
    /*height: 100%;*/
    overflow-y: auto;
    width: 100%;
    float: left;
    position: relative;
  }
</style>
