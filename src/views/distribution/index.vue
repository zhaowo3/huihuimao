<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="closeTray" >关闭托盘</el-button>
        <!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->
      </div>
    </div>
    <el-header class="effectiveHead" style="height:auto;">

      <el-row class="effectiveLie">
        <el-button @click="handleClick(0)" :class="{handleClass: sortOrder == 0}">新订单
        </el-button>
        <el-button @click="handleClick(1)" :class="{handleClass: sortOrder == 1}" >已入订单
        </el-button>
        <el-button @click="handleClick(2)" :class="{handleClass: sortOrder == 2}" >已退订单
        </el-button>
      </el-row>

    </el-header>
    <el-row class="detailsScroll">
      <div class="templateSubject">
        <el-col :span="8"  class="templateLeft" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10" v-loading="listLoading">
          <ul ref="uldom">
            <li v-for="(data,index) in templates" :key="index" :class="{hit: cur ==index}" :data-id="data.recordNo"
                @click="clickLists(data.recordNo,index)">
              <div class="tempLeftName"><p :title="data.recordNo">{{data.recordNo}}</p><div class="tempLeftNameP"><span :title="data.typeName">{{data.typeName}}</span><b :title="data.dateTime">{{data.dateTime}}</b></div>
              </div>
            </li>
            <li
              style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 5px;margin-bottom: 5px;font-size: 12px;display: inline-block; float: left;"
              v-show="droping">加载中
            </li>
            <li
              style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 5px;margin-bottom: 5px;font-size: 12px;display: inline-block; float: left;"
              v-show="noMore">没有更多的数据
            </li>
          </ul>
        </el-col>
        <el-col :span="16" class="templateRight">
          <el-main>
            <!--          v-for="data,index in datas" :style="{display: index==cur?'block':'none'}"-->
            <ul>
              <li class="tempLIs">
                <el-row class="templateLis">
                  <div class="templateHover">
                    <div class="templateR" style="height: 100%;position: relative">
                      <div class="templateS">
                        <el-collapse v-model="activeNames" class="tampTop">
                          <el-collapse-item v-for="(data,index) in materials" :key="index" :name="data.id">
                            <template slot="title">

                              <div class="tampTitle"><p>耗材编码</p><p>耗材名称</p><p>耗材规格</p><p>耗材厂家</p><p>操作</p></div>
                              <div class="tampTable">
                                <p :title="data.consumableId">{{data.consumableId}}</p>
                                <p :title="data.consumableName">{{data.consumableName}}</p>
                                <p :title="data.specification">{{data.specification}}</p>
                                <p :title="data.mafcName">{{data.mafcName}}</p>
                                <p>
                                  <el-button  type="primary" @click.native.stop="queryBarcode(data)" v-if="sortOrder==0">入库</el-button>
                                  <el-button  type="primary" @click.native.stop="getRetreat(data)" v-if="sortOrder==0">退返</el-button>
                                </p>
                              </div>
                            </template>
                            <div class="tampUL">
                              <ul>
                                <li>追溯码</li>
                                <li>生产批号</li>
                                <li>生产日期</li>
                                <li>有效期</li>
                                <li>数量</li>
                                <li>是否入库</li>
                              </ul>
                              <ul v-for="(data1,index1) in materials[index].deliveryInfoVos" :key="index1">
                                <li :title="data1.barCode">{{data1.barCode}}</li>
                                <li :title="data1.recordNo">{{data1.recordNo}}</li>
                                <li :title="data1.createDate">{{data1.createDate}}</li>
                                <li :title="data1.validDate">{{data1.validDate}}</li>
                                <li :title="data1.quantity">{{data1.quantity}}</li>
                                <li :class="{'cheackNO':data1.Checklist=='未入库','cheackOK':data1.Checklist=='已入库','cheackRetreat':data1.Checklist=='已退单'}">{{data1.Checklist}}</li>
                              </ul>
                            </div>

                          </el-collapse-item>
                        </el-collapse>
                      </div>
                    </div>
                  </div>
                </el-row>
              </li>

            </ul>


          </el-main>

        </el-col>
      </div>
    </el-row>

    <el-dialog title="请选库位" :visible.sync="dialogXinVisible" width="250px"
               custom-class="el-dialog__header-custom dialoVisible DIFitionHistory">

      <el-table
        :data="librarySN"
        style="width: 100%" @row-click="handdle" height="250">
        <el-table-column
          prop="location"
          label="库位"
          width="200">
        </el-table-column>

      </el-table>
    </el-dialog>
    <el-dialog title="请扫码入库" :visible.sync="dialogTableVisible"
               custom-class="el-dialog__header-custom dialoVisible" :before-close="handleClose" width="70%">
      <div style="display: flex;">
        <div style="flex: 3">
          <div class="carouselLS">
            <div class="carouselLeft">
              <el-image :src="editable.imgUrl">
                <div slot="error" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
                <div slot="placeholder" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
              </el-image>
            </div>
            <div class="carouselRight">
              <p class="textes">{{editable.name}},{{editable.alias}}</p>
              <p class="textesH">{{editable.size}}</p>
              <p class="textes">库位：{{editable.location}}</p>
              <el-input v-model="inputSweep" ref='gain' :disabled="disabled" autofocus="autofocus" clearable class="cumens"
                        placeholder="物资编码" @click="enterL(inputSweep)" @keyup.enter="enterL(inputSweep)">
                <i slot="suffix" class="iconfont icon-icon-test46" @click="enterL(inputSweep)"></i>
              </el-input>
            </div>
          </div>



          <!--        <div class="crush">-->
          <!--          <el-button type="primary" class="trayOK" >确定</el-button>-->
          <!--        </div>-->
        </div>
        <div style="flex: 2">
          <LibraryDisplay :lots="editable.location" ref="child"></LibraryDisplay>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
    <el-dialog title="请扫码退单" :visible.sync="tuiTableVisible"
               custom-class="el-dialog__header-custom dialoVisible" :before-close="handleClose">
      <div class="carouselLS">
        <div class="carouselLeft">
          <el-image :src="editable.imgUrl">
            <div slot="error" class="image-slot">
              <img alt="" :src="smalls" >
            </div>
            <div slot="placeholder" class="image-slot">
              <img alt="" :src="smalls" >
            </div>
          </el-image>
        </div>
        <div class="carouselRight">
          <p class="textes">{{editable.consumableName}},{{editable.specification}}</p>
          <p class="textesH">{{editable.mafcName}}</p>
          <p class="textes">耗材编码：{{editable.consumableId}}</p>
          <el-input v-model="inputSweep1" ref='gainVal' :disabled="disabled" autofocus="autofocus" clearable class="cumens"
                    placeholder="物资编码" @click="materialReturnHerp(inputSweep1)" @keyup.enter="materialReturnHerp(inputSweep1)">
            <i slot="suffix" class="iconfont icon-icon-test46" @click="materialReturnHerp(inputSweep1)"></i>
          </el-input>
        </div>
      </div>


      <!--        <div class="crush">-->
      <!--          <el-button type="primary" class="trayOK" >确定</el-button>-->
      <!--        </div>-->

      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import smalls from '@/assets/images/small.jpg';
    import {
        distributions, getDelivery,queryBarcode,deliveryConfirm,materialReturnHerp
    } from '@/api/material';
    import {
        openL, closeL, searchPage
    } from '@/api/systemsL'
    import {
        enterL
    } from '@/api/library'
    import {debounce} from '@/utils/debounce';
    import LibraryDisplay from '@/components/LibraryDisplay'

    export default {
        name: "distributionl",
        components: {
            LibraryDisplay
        },
        data() {
            return {
                listQuery:{
                    // search:'',
                    pageNumber: 0,
                    pageSize: 20,
                    status:0,
                    // startDate:'',
                    // endDate:'',
                    // userName:'',
                },
                cur: 0,
                sortOrder:0,
                busy: false,
                ping: false,
                noMore: false,
                droping: false,
                dataID:'',
                houseNum:'',
                templates: [],
                materials:[
                ],
                smalls,
                resulyD:[],
                librarySN:[],
                dialogXinVisible:false,
                dialogTableVisible: false,
                tuiTableVisible: false,
                editable:{},
                querySh:[],
                querySS:[],
                londe:'',
                //  tab
                editableTabsValue: '2',
                sourceTypeOptions:[],
                options2: [],
                value3: '退返',
                list: null,
                total: null,
                listLoading: false,
                num1:1,
                value2: '',
                value4:'',
                input: '',
                options2s:'',
                dialogFormVisible:false,
                // selectVal:'',
                dataStas: '',
                danViews: {},
                disabled:false,
                inputSweep: '',
                inputSweep1: '',
                activeNames:[],
            };
        },
        created() {
            // this.operationIndex();
            // this.getList();
            this.$watch('inputSweep', debounce((newQuery) => {
                if(newQuery!==''){
                    this.enterL(newQuery);
                }
            }, 2000));
            this.$watch('inputSweep1', debounce((newQuery) => {
                if(newQuery!==''){
                    this.materialReturnHerp(newQuery);
                }
            }, 2000));
        },
        watch: {
            templates:function () {
                this.$nextTick(function () {
                    let uld=this.$refs.uldom.children[this.cur].dataset.id;
                    if(uld!==''&&uld!==undefined){
                        this.clickLists(uld,this.cur)
                    }else {
                        return
                    }
                });
            }
        },
        methods: {
            loadMore() {
                setTimeout(() => {
                    let mv = this;
                    if (!mv.busy) {
                        mv.busy = true;// 将无限滚动给禁用
                        mv.listQuery.pageNumber++ // 增加页数
                        mv.searchSource();// 请求数据
                    }
                });
            },
            handleChange(){
                this.activeName = [];
                for(let i = 0; i < this.materials.length; i++) {
                    this.activeNames.push(this.materials[i].id)
                }
            },
            searchSource() {
                let mv = this;
                distributions({
                    pageSize: this.listQuery.pageSize,
                    pageNumber: this.listQuery.pageNumber,
                    status:this.listQuery.status,
                }).then(response => {
                    if(response.code !=='1'){
                        mv.materials=[];
                        return
                    }
                    if(response.data==null){
                        return
                    }
                    let listTotal = response.data.total;
                    if (listTotal > 0) {
                        this.busy = true
                    } else {
                        this.busy = false
                    }
                    this.listLoading = false;
                    mv.templates = mv.templates.concat(response.data.result);
                    let DownloadTotal =
                        (mv.listQuery.pageNumber + 1) * mv.listQuery.pageSize;
                    let total = response.data.total;
                    mv.houseNum = response.data.total;
                    let totalPage = (mv.houseNum + mv.listQuery.pageSize - 1) / mv.listQuery.pageSize;
                    // mv.searchHouse.pageNumber++; //增加页数
                    if (mv.listQuery.pageNumber + 1 >= totalPage) {
                        this.busy = true;// 将无限滚动关闭
                        this.listQuery.pageNumber = 0 // 页数变为0
                        this.noMore = true; // 切换底部提示信息
                        this.droping = false
                    } else {
                        this.busy = false;// 将无限滚动给打开
                        this.droping = true;
                        this.noMore = false; // 切换底部提示信息
                    }
                }).catch(function (error) {
                    this.$message.error(error);
                    this.droping = false
                });


            },
            //  列表左侧列表点击
            clickLists(recordNo, index) {
                let mv=this;
                // this.listLoading = true;
                mv.cur = index;
                mv.dataID = recordNo;
                mv.materials = [];
                let dataIDs=  mv.dataID+'?status='+mv.sortOrder;
                getDelivery(dataIDs).then(response => {
                    if(response.code !=='1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }

                    this.listLoading = false;
                    if(response.data==null){
                        return false;
                    }

                    for (let i = 0, len = response.data.length; i < len; i++) {
                        let resultData = response.data[i];
                        mv.materials.push(resultData);
                        //console.log(resultData)
                        for(let j = 0, lens = resultData.deliveryInfoVos.length; j < lens; j++){
                            let resultJ = resultData.deliveryInfoVos[j];
                            if(mv.listQuery.status==1){
                                resultJ.Checklist='已入库';
                            }else if(mv.listQuery.status==0){
                                resultJ.Checklist='未入库';
                            }else if(mv.listQuery.status==2){
                                resultJ.Checklist='已退单';
                            }

                        }

                    }
                    this.handleChange();
                });
            },
            //  tab切换
            handleClick(tab){
                let mv=this;
                mv.cur=0;
                mv.templates=[];
                mv.listQuery.pageNumber=1;
                mv.listQuery.pageSize=20;
                mv.sortOrder=tab;
                mv.listQuery.status=tab;
                mv.searchSource();
            },
            //退单
            getRetreat(data){
                let mv = this;
                mv.querySh=data;
                mv.editable=data.deliveryInfoVos[0];
                mv.tuiTableVisible=true;
                mv.$nextTick(() => {
                    mv.$refs.gainVal.focus();
                })
            },
            //查找是否一样
            queryBarcode(data){
                let mv = this;
                mv.querySh=data;
                let sendData = '';
                sendData += `${data.consumableId}?`;
                sendData += `codeType=${data.codeType}`;
                queryBarcode(sendData).then(res => {
                    mv.librarySN=res.data;
                    if(res.data.length>1){
                        mv.dialogXinVisible=true;
                    }else if(res.data.length==0){
                        this.$message({
                            message: '没有数据',
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }else{
                        mv.editable=res.data[0];
                        mv.dialogTableVisible = true;
                        mv.munOK(mv.editable);
                    }
                })
            },
            handdle(row, index){
                let mv = this;
                mv.editable=row;
                // console.log(row, event, column);
                // mv.dialogTableVisible=true;
                mv.munOK(row);
            },
            handleClose(done){
                let vm = this;
                // vm.selectVal='';
                vm.inputSweep='';
                vm.inputSweep1='';

                done();
            },
            munOK(data) {
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
            //打开库位
            pushDataList(data) {
                let mv = this;
                mv.openFullScreen2();
                mv.$store.state.LibraryLo=data.location;
                openL(data.location).then(res => {
                    mv.$store.state.recordPrevious=1;
                    if(res.code !=='1'){
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }
                    if(mv.$store.state.whetherTest == false){
                        mv.dialogTableVisible = false;

                        // vm.dialogTableVisible = true;
                    }else {
                        mv.dialogTableVisible = true;
                    }
                    mv.$store.state.LibraryLo=data.location;
                    mv.londe = this.$store.state.LibraryLo;
                    mv.$nextTick( () =>{
                        mv.$refs.gain.focus();
                    })
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
                    return;
                }).catch(err => {
                    mv.$message({
                        type: 'error',
                        message: err.msg,
                        duration: 1000,
                    });
                    return;
                });
            },
            //关闭
            closeTray() {
                let vm = this;
                vm.londe=this.$store.state.LibraryLo;
                if (vm.londe == '') {
                    this.$message({
                        type: 'error',
                        message: '请输入库位',
                        duration: 1000,
                    });
                    return false;
                }
                closeL(this.londe).then(response => {
                    vm.$store.state.recordPrevious=0;
                    vm.openFullScreen2();
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
                    return;
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: err.msg,
                        duration: 1000,
                    });
                    return;
                })
            },
            //  入库
            enterL(newQuery) {
                let mv = this;
                if (newQuery == '') {
                    this.$message({
                        type: 'error',
                        message: '请扫码入库',
                        duration: 1000,
                    });
                    return;
                }

                if(this.$store.state.choices==true){
                    this.$confirm('是否进行入库操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //   mv.addValid(mv.idsh,mv.selectVal);
                        deliveryConfirm({
                            barCode: newQuery,
                            location:mv.editable.location,
                            // location:this.$store.state.LibraryLo,
                            // valid:mv.selectVal,
                            // number:mv.num1,
                            // codeType:mv.dataStas.codeType,
                            // barcodeSize:mv.dataStas.barcodeSize,
                        }).then(res => {
                            if (res.code !=='1') {
                                mv.$message({
                                    message: res.msg,
                                    type: 'error',
                                    duration: 1000,
                                });
                                speechSU.text = res.msg;
                                window.speechSynthesis.speak(speechSU);
                                return
                            }

                            // mv.danViews.supplyQuantity=mv.danViews.supplyQuantity+mv.num1;
                            mv.$message({
                                message: res.msg,
                                type: 'success',
                                duration: 1000
                            });
                            for (let i = 0, len = mv.querySh.deliveryInfoVos.length; i < len; i++) {
                                if(mv.querySh.deliveryInfoVos[i].barCode==newQuery){
                                    // mv.querySh.deliveryInfoVos.splice(mv.querySh.deliveryInfoVos[i], 1)
                                    v.querySh.deliveryInfoVos[i].Checklist='已入库'
                                }
                            }
                            // if(mv.querySh.length==0){
                            //     mv.clickLists(mv.dataID,mv.cur);
                            // }

                            if(mv.querySh.length==0){
                                mv.dialogXinVisible=false;
                                mv.dialogTableVisible=false;
                            }
                            mv.dialogXinVisible=false;
                            mv.dialogTableVisible=false;
                            speechSU.text = '已入库'+res.data.name+mv.num1+res.data.smallUnitDesc;
                            window.speechSynthesis.speak(speechSU);
                            mv.inputSweep = '';
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
                    deliveryConfirm({
                        barCode: newQuery,
                        location:mv.editable.location,
                        // location:this.$store.state.LibraryLo,
                        // valid:mv.selectVal,
                        // number:mv.num1,
                        // codeType:mv.dataStas.codeType,
                        // barcodeSize:mv.dataStas.barcodeSize,
                    }).then(res => {
                        if (res.code !=='1') {
                            mv.$message({
                                message: res.msg,
                                type: 'error',
                                duration: 1000,
                            });
                            speechSU.text = res.msg;
                            window.speechSynthesis.speak(speechSU);
                            return
                        }
                        mv.inputSweep = '';
                        // mv.danViews.supplyQuantity=mv.danViews.supplyQuantity+mv.num1;
                        // if( mv.danViews.warnQuantity<=mv.danViews.supplyQuantity){
                        //     mv.houseList[mv.cur].supplyQuantity=1;
                        // }
                        mv.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000
                        });
                        // if(mv.danViews.codeType==2||mv.danViews.codeType==3){
                        //     mv.dialogTableVisible = false;
                        //     mv.selectVal = '';
                        // }
                        for (let i = 0, len = mv.querySh.deliveryInfoVos.length; i < len; i++) {
                            if(mv.querySh.deliveryInfoVos[i].barCode==newQuery){
                                // mv.querySh.deliveryInfoVos.splice(mv.querySh.deliveryInfoVos[i], 1)
                                this.$set(mv.querySh.deliveryInfoVos[i], 'Checklist', '已入库');
                            }
                        }
                        // if(mv.querySh.deliveryInfoVos.length==0){
                        //     delete  mv.querySh;
                        // }
                        if(mv.querySh.length==0){
                            mv.dialogXinVisible=false;
                            mv.dialogTableVisible=false;
                        }
                        mv.dialogXinVisible=false;
                        mv.dialogTableVisible=false;
                        speechSU.text = '已入库'+res.data.name+mv.num1+res.data.smallUnitDesc;
                        window.speechSynthesis.speak(speechSU);
                        // mv.num1='1';
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

            //  退返
            materialReturnHerp(newQuery) {
                let mv = this;
                if (newQuery == '') {
                    this.$message({
                        type: 'error',
                        message: '请扫码退单',
                        duration: 1000,
                    });
                    return;
                }

                if(this.$store.state.choices==true){
                    this.$confirm('是否进行退单操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //   mv.addValid(mv.idsh,mv.selectVal);
                        materialReturnHerp({
                            barCode: newQuery,
                            // location:this.$store.state.LibraryLo,
                            // valid:mv.selectVal,
                            // number:mv.num1,
                            // codeType:mv.dataStas.codeType,
                            // barcodeSize:mv.dataStas.barcodeSize,
                        }).then(res => {
                            if (res.code !=='1') {
                                mv.$message({
                                    message: res.msg,
                                    type: 'error',
                                    duration: 1000,
                                });
                                speechSU.text = res.msg;
                                window.speechSynthesis.speak(speechSU);
                                return
                            }

                            // mv.danViews.supplyQuantity=mv.danViews.supplyQuantity+mv.num1;
                            mv.$message({
                                message: res.msg,
                                type: 'success',
                                duration: 1000
                            });
                            for (let i = 0, len = mv.querySh.deliveryInfoVos.length; i < len; i++) {
                                if(mv.querySh.deliveryInfoVos[i].barCode==newQuery){
                                    // mv.querySh.deliveryInfoVos.splice(mv.querySh.deliveryInfoVos[i], 1)
                                    v.querySh.deliveryInfoVos[i].Checklist='已退单'
                                }
                            }
                            // if(mv.querySh.length==0){
                            //     mv.clickLists(mv.dataID,mv.cur);
                            // }

                            if(mv.querySh.length==0){
                                mv.tuiTableVisible=false;
                            }
                            mv.tuiTableVisible=false;
                            speechSU.text = '已退单'+res.data.name+mv.num1+res.data.smallUnitDesc;
                            window.speechSynthesis.speak(speechSU);
                            mv.inputSweep1 = '';
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
                    materialReturnHerp({
                        barCode: newQuery,
                        // location:this.$store.state.LibraryLo,
                        // valid:mv.selectVal,
                        // number:mv.num1,
                        // codeType:mv.dataStas.codeType,
                        // barcodeSize:mv.dataStas.barcodeSize,
                    }).then(res => {
                        if (res.code !=='1') {
                            mv.$message({
                                message: res.msg,
                                type: 'error',
                                duration: 1000,
                            });
                            speechSU.text = res.msg;
                            window.speechSynthesis.speak(speechSU);
                            return
                        }
                        mv.inputSweep1 = '';
                        // mv.danViews.supplyQuantity=mv.danViews.supplyQuantity+mv.num1;
                        // if( mv.danViews.warnQuantity<=mv.danViews.supplyQuantity){
                        //     mv.houseList[mv.cur].supplyQuantity=1;
                        // }
                        mv.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000
                        });
                        // if(mv.danViews.codeType==2||mv.danViews.codeType==3){
                        //     mv.dialogTableVisible = false;
                        //     mv.selectVal = '';
                        // }
                        for (let i = 0, len = mv.querySh.deliveryInfoVos.length; i < len; i++) {
                            if(mv.querySh.deliveryInfoVos[i].barCode==newQuery){
                                // mv.querySh.deliveryInfoVos.splice(mv.querySh.deliveryInfoVos[i], 1)
                                this.$set(mv.querySh.deliveryInfoVos[i], 'Checklist', '已退单');
                            }
                        }
                        // if(mv.querySh.deliveryInfoVos.length==0){
                        //     delete  mv.querySh;
                        // }
                        if(mv.querySh.length==0){
                            mv.tuiTableVisible=false;
                        }
                        mv.tuiTableVisible=false;
                        speechSU.text = '已退单'+res.data.name+mv.num1+res.data.smallUnitDesc;
                        window.speechSynthesis.speak(speechSU);
                        // mv.num1='1';
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
        },
    }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .detailsScroll {
    height: calc(100% - 60px);
    position: relative;
  }
  .templateR{
    width: 100%;
  }
  .tampTitle{
    width: 100%;
    display: block;
    float: left;
    background: #00adf8;
    color: #fff;
    p{
      width: 20%;
      display: block;
      float: left;
      text-align: center;
      border-left-width: 1px;
      border-left-color: #ddd;
      border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #ddd;
      border-bottom-style: solid;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分省略号显示*/
    }

    p:last-child{
      border-right-width: 1px;
      border-right-color: #ddd;
      border-right-style: solid;
    }
  }
  .tampTable{
    width: 100%;
    display: block;
    float: left;
    p{
      width: 20%;
      display: block;
      float: left;
      text-align: center;
      border-left-width: 1px;
      border-left-color: #ddd;
      border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #ddd;
      border-bottom-style: solid;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分省略号显示*/
      /*!*弹性盒模型*!*/
      /*display:flex;*/
      /*!*主轴居中对齐*!*/
      /*justify-content: center;*/
      /*!*侧轴居中对齐*!*/
      /*align-items: center;*/
    }
    p:last-child{
      border-right-width: 1px;
      border-right-color: #ddd;
      border-right-style: solid;
    }
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
        /*height: 84px;*/

        border-bottom-color: #dde8ec;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        b {
          vertical-align: middle;
        }
        .tempLeftName{
          float: left;
          width: 100%;
          p{
            width: 100%;
            font-size: 28px;
            margin-bottom: 10px;
            overflow:hidden;
            text-overflow: ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
          }
          .tempLeftNameP{
            width: 100%;
            display: flex;
            b{
              flex: 2;
              text-align: right;
              font-weight: normal;
            }
          }
          span{
            flex: 1;
            font-size: 16px;
            display: block;
            margin-bottom: 10px;
          }
          span:after{
            content:"\007C ";
            opacity:0;
          }
          b{

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

      .tempLIs {
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
          img {
            width: 100%;
            height: 100%;
            float: left;
            padding: 2px;
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
      }
    }
  }
  .tampTop{
    .tampUL{
      border-color: #1FD873;
      border-width: 2px;
      border-style: solid;
      background: #f2efef;

      ul{
        /*display: flex;*/
        border-bottom-color: #ddd;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        /*弹性盒模型*/
        display:flex;
        /*主轴居中对齐*/
        justify-content: center;
        /*侧轴居中对齐*/
        align-items: center;
        li{
          flex: 1;
          text-align: center;
          border-left-width: 1px;
          border-left-color: #ddd;
          border-left-style: solid;
          padding: 10px 0;
          /*弹性盒模型*/
          display:flex;
          /*主轴居中对齐*/
          justify-content: center;
          /*侧轴居中对齐*/
          align-items: center;
        }
        li:last-child{
          border-right-width: 1px;
          border-right-color: #ddd;
          border-right-style: solid;
        }
      }
      /*ul:first-child{*/
      /*  border-top-color: #ddd;*/
      /*  border-top-width: 1px;*/
      /*  border-top-style: solid;*/
      /*}*/

    }
  }
  .effectiveLie {
    display: flex;
    margin: 10px 0;

    button {
      height: 40px;
      padding-bottom: 0;
      padding-top: 0;
      border-width: 0px;

      .svg-icon {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        float: right;
        margin-top: 2px;
      }
    }
  }
  .handleClass{
    background: #00adf8;
    color: #fff;
  }
  .textes{
    text-align: left;
    height: 30px;
    margin-bottom: 10px;
    font-size: 18px;
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
  .cheackOK{
    color: green;
  }
  .cheackNO{
    color: red;
  }
  .cheackRetreat{
    color: #b79c33;
  }
  .dialogXinHeight{
    height: 200px;
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
