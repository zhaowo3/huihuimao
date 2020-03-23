<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;" v-if="permissionOperation==1">
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
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :limit="1"
        >
          <el-button type="primary" class="trayClose" id="hamburger-tmpImport">手术字典导入</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
        <el-button type="primary" class="trayClose" style="margin-right: 0;" @click="tmpDownload"  id="hamburger-tmpDownload">手术字典模板下载</el-button>
      </div>
      <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
    </div>

    <el-row class="detailsScroll">

    <div class="templateSubject">

      <el-col :span="8" class="templateLeft">
        <div class="addPlus" @click="AdditionPops" id="hamburger-AdditionPops"><i class="iconfont icon-add"></i>添加手术名称</div>
        <div class="templateLeftUL"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
             infinite-scroll-distance="10" v-loading="listLoading">
          <div class="autoSeach2">
            <el-input v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)"
                      class="inputs1" placeholder="请输入关键字" clearable>
              <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
            </el-input>
          </div>
          <ul class="clearfix" id="leftBox" ref="uldom">
            <li v-for="(data,index) in houseList" :key="index" :class="index==cur?'hit':''"
                @click="infoViews(data.operationCode,index,data)" :id="data.operationCode">
              <el-main >
                <div class="templateLeftSpan temNumbers"><p :title="data.operationName">{{data.operationName}}</p>
                  <el-button type="danger" @click="shutterDeletes(data.id)" ><i
                    class="iconfont icon-shanchu-" ></i>删除
                  </el-button>
<!--                  {{data.operationCode}}-->
                  <!--                <el-button class="templateButton" v-if="data.type==1">包</el-button>-->
                </div>
              </el-main>
            </li>
            <li class=""
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;"
                v-show="droping">加载中
            </li>
            <li class=""
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
                v-show="noMore">没有更多的数据
            </li>
            <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
          </ul>
        </div>



      </el-col>

      <el-col :span="16" class="templateRight">
        <el-main style="height: 100%;">
          <div style="height: 100%;overflow-y: auto;">
            <ul >
              <div class="templateAdd" >
                <el-button class="addHy" @click="showChange()" id="hamburger-templateAdd">
                  <svg-icon icon-class="add" class="color-main"></svg-icon>
                </el-button>
              </div>
              <li v-for="newData in danViews">
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
<!--                      <img alt="" :src="smalls" v-real-img="newData.imgUrl"/>-->
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
                          <!--                        <span class="templateTitle">{{newData.size}}</span>-->
                          <div class="inText">
                            <!--                          <i><b>应：</b>{{newData.quantity}}</i>-->
                            <!--                          <i><b>已：</b>{{newData.supplyQuantity}}</i>-->
                            <!--                          <i><b>库存：</b>{{newData.stockQuantity}}</i>-->
                            <!--                          <i><b>库位：</b>{{newData.location}}</i>-->
                            <el-button class="templateButton" v-if="newData.type==1">包</el-button>
                          </div>
                        </div>
                        <div class="nextRight">

                          <el-input-number v-model="newData.quantity" style="float: right;" @change="" :min="1" :max="999"
                                           label="描述文字" class="detailsNum" @blur="munOb(newData)"></el-input-number>

                          <p>{{newData.bigUnitDesc}}</p>
                          <div class="nextI">
                            <!--                          <el-button type="primary" @click="ToDeposit(newData)" id="hamburger-ToDeposit"-->
                            <!--                                     v-if="newData.status!==0&&$route.query.materialIn==1"><i-->
                            <!--                            class="iconfont icon-shanchu-1"></i>入单-->
                            <!--                          </el-button>-->

                            <el-button type="danger" @click="clickDeletes(newData.id)" id="hamburger-clickDeletes" ><i
                              class="iconfont icon-shanchu-" ></i>删除
                            </el-button>
                            <el-button type="primary"  @click="munOb(newData)" style="float: right;margin-left: 20px">
                              确定
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-row>
              </li>

            </ul>
          </div>
          <!--          v-for="data,index in datas" :style="{display: index==cur?'block':'none'}"-->


          <!--            <div class="templateAdd">-->
          <!--              <el-button  style="margin:0 auto 50px;padding: 0.104167rem 0.104167rem" @click="$emit('showChange')"><svg-icon icon-class="add" class="color-main"></svg-icon></el-button>-->
          <!--            </div>-->


        </el-main>

      </el-col>
    </div>
    <!--    弹框选物资-->
    <el-dialog :modal="true" :fullscreen="fullscreen" :close-on-click-modal="false" custom-class="el-dialog__header-custom dialogsh1"
               :visible.sync="dialogVisible" title="添加物资" width="80%" style="padding-top: 0;" >
      <GroupMaterial @MaterialH="groupsM" :dialogVisible="dialogVisible"></GroupMaterial>
      <!--      @userIdsName="materialNames"-->
    </el-dialog>
      <el-dialog title="添加手术名称" :visible.sync="dialogTableVisible" center :modal="true"
                 custom-class="el-dialog__header-custom dialoVisible">


        <el-input v-model="inputSweep" ref='gain' clearable autofocus="autofocus" @keyup.enter="enterL"
                  placeholder="手术名称">
        </el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
      </el-dialog>
  </el-row>
  </div>
</template>

<script>
    import smalls from '@/assets/images/small.jpg';
    import big from '@/assets/images/big.jpg';
    import {debounce} from '@/utils/debounce';
    import GroupMaterial from '@/components/GroupMaterial'
    // import PullTo from 'vue-pull-to'
    import {
        catalogs, catalget
    } from '@/api/material';
    import {
        submenuMenuId
    } from '@/api/systemsL'
    import {
        operationPage,infoinfo,addTemplateMaterial,prepareOrder,deleteTemplateMaterial,addOperation,deleteOperation,updateTemplateMaterial
    } from '@/api/home'
    import {
        importOperation
    } from '@/api/oss'
    let valList = {};
    export default {
        name: "oTemplate",
        components: {
            GroupMaterial
        },
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
                houseList: [],
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
                newDate: +new Date(),
                id: '',
                checked: 0,
                checkedMore: [],
                danViews: {},
                danViewsLoadding: false,
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
                fullscreen: false,   // 弹窗是否全屏
                dialogVisible: false,
                listd:'',
                orderNu: '',
                operationCode:'',
                fileList: [],
                dialogTableVisible: false,
                inputSweep:'',
                operationName:'',
                operatdata:[],
                permissionOperation:'',
                current:'',
                houseNum:'',
            }

        },
        props: {
            btnText: String,
            btnTextT: String,
            required: true,
            // dialogVisible: {
            //     type: Boolean,
            //     default: false
            // }
        },
        created() {
            this.$watch('searchtxt', debounce((newQuery) => {
                this.queryClick(newQuery);
            }, 1000))
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
        watch: {
            // dialogVisible(val) {
            //     if (val) {
            //         valList = {};
            //         this.selected();
            //         this.newDate = +new Date();
            //     }
            // },
            houseList:function (data) {
                this.$nextTick(function () {
                    if(data.length==0){
                        return
                    }else {
                        let uld=data[this.cur].operationCode;
                        if(uld!==''){
                            this.infoViews(uld,this.cur,data[this.cur])
                        }
                    }

                });
            }
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
            //首页加载权限
            submenuMenuId() {
                let mv=this;
                submenuMenuId(mv.$store.state.user.Secondm.operative.id).then(response => {
                    if(response.code !=='1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                        });
                        return
                    }
                    // mv.jurisdiction = response.data;
                    if(response.data[0].children=='permissionOperation'){
                        mv.permissionOperation=response.data[0].ststus;
                    }

                });
            },
            AdditionPops(){
                let mv = this;
                mv.dialogTableVisible = true;
            },
            queryClick(val) {
                let mv = this;
                mv.searchHouse.pageNumber = 1;
                mv.houseList = [];
                mv.cur=0;
                mv.querySearch(val);
            },
            showChange(){
                this.dialogVisible = true;

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
            selected(res = this.houseList) {
                for (let i = 0; i < res.length; i++) {
                    const item = res[i];
                    item.select = false;
                    if (item.select != null) {
                        item.surecode = 0;
                    }
                }

            },
            //修改数量
            munOb(data) {
                let vm = this;
                // this.$nextTick(function () {
                    updateTemplateMaterial(this.Qs.stringify({
                        id: data.id,
                        quantity: data.quantity,
                    })).then(res => {
                        if(res.code !=='1'){
                            this.$message({
                                message: res.msg,
                                type: 'error',
                                duration: 1000,
                            });
                            return
                        }
                        vm.$message({
                            type: 'success',
                            message: res.msg,
                            duration: 500,
                        });
                        return false;
                    }).catch(err => {
                        vm.$message({
                            type: 'error',
                            message: err.msg,
                            duration: 500,
                        });
                        return false;
                    });
                // },1000)

            },
            //手术名称导入
            customUpload(file) {
                let mv = this;
                // this.generatorFileMd5(file.file)
                // 自定义上传row.id,{status:row.status}
                importOperation(file).then(response => {
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
                    this.searchSource();
                    mv.searchHouse.pageNumber = 1;
                    mv.houseList = [];
                    mv.cur=0;
                })
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleChange(file) {
                console.log(file);
            },
            //结束
            handleCloseOrderConfirm() {
                let mv=this;
                if (mv.inputSweep == null || mv.inputSweep === '') {
                    this.$message({
                        message: '手术名称不能为空',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                // let params = new URLSearchParams();
                // params.append('ids', this.closeOrder.orderIds);
                // params.append('note', this.closeOrder.content);
                addOperation(this.Qs.stringify({
                    operationName: mv.inputSweep
                })).then(response=>{
                    mv.inputSweep='';
                    mv.dialogTableVisible=false;
                    this.searchSource();
                    mv.searchHouse.pageNumber = 1;
                    mv.houseList = [];
                    mv.cur=0;
                    this.$message({
                        message: response.msg,
                        type: 'success',
                        duration: 1000
                    });
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

                let sendData = `materialId=${Object.keys(mv.listd).join(',')}&`;
                sendData += `materialCount=${Object.values(mv.listd).join(',')}&`;
                sendData += `operationCode=${mv.operationCode}&`;
                sendData += `operationName=${mv.operationName}`;
                addTemplateMaterial(sendData).then(res => {
                    if(res.code !=='1'){
                        this.$message({
                            message: res.msg,
                            type: 'error',
                        });
                        return
                    }
                    this.$nextTick( () =>{
                        // this.MaterialH();
                        this.infoViews(mv.operationCode,mv.cur,mv.operatdata);
                        this.dialogVisible = false;
                    })

                });


            },
            //删除额外物资
            clickDeletes(id) {
                this.$confirm('是否要删除物资?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteTemplateMaterial({
                        temlateId: id
                    }).then(response => {
                        if(response.code !=='1'){
                            this.$message({
                                message: response.msg,
                                type: 'error',
                                duration: 1000
                            });
                            return;
                        }
                        this.$message({
                            type: 'success',
                            message: response.msg
                        });
                        let mv = this;
                        this.infoViews(mv.operationCode,mv.cur,mv.operatdata);
                    })
                        .catch(() => {

                        });
                }).catch(() => {

                });
            },
            //删除模板
            shutterDeletes(id) {
                this.$confirm('是否要删除模板?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteOperation(id).then(response => {
                        if(response.code !=='1'){
                            this.$message({
                                message: response.msg,
                                type: 'error',
                                duration: 1000
                            });
                            return;
                        }
                        this.$message({
                            type: 'success',
                            message: response.msg
                        });
                        let mv = this;
                        mv.queryClick();
                        mv.infoViews(mv.operationCode,mv.cur,mv.operatdata);
                    })
                        .catch(() => {

                        });
                }).catch(() => {

                });
            },
            //添加材料物资选择刷新页面
            // MaterialH() {
            //     let mv=this;
            //     mv.cur = -1;
            //     mv.curg = 0;
            //     mv.listLoading = false;
            //     prepareOrder(mv.orderNumber).then(response => {
            //         if(response.code !=='1'){
            //             this.$message({
            //                 message: response.msg,
            //                 type: 'error',
            //             });
            //             return
            //         }
            //         mv.listd='';
            //         mv.listLoading = false;
            //         mv.orderMaterials = response.data.orderMaterials;
            //
            //     });
            // },
            // handleChange1(item) {
            //     let mv =this;
            //     let val = valList[item.id];
            //     let valeng = item.surecode;
            //     if(valeng>0){
            //         valList[item.id] = item.surecode;
            //         item.select = true;
            //     }else {
            //         item.select = false;
            //     }
            //
            //     if (val != null) {
            //
            //         valList[item.id] = item.surecode;
            //         if(mv.danViews.supplyQuantity>0){
            //             mv.danViews.supplyQuantity=item.supplyQuantity-item.surecode;
            //         }
            //         // item.supplyQuantity = item.supplyQuantity-item.surecode;
            //     }
            // },
            // CheckItem: function (data) {
            //     if (valList[data.id]) {
            //         delete valList[data.id]
            //     } else {
            //         valList[data.id] = data.surecode;
            //     }
            //     // let boxs = document.getElementsByName("userId");
            //     // let userIds=[];
            //     // for (let x in boxs) {
            //     //   if (boxs[x].checked) userIds.push(boxs[x].value);
            //     // // ,data
            //     // }
            //     // this.userIds=userIds;
            // },
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
                this.$emit('MaterialH', valList);
                valList={};
                // this.filesList = [];
                // let data =this.leftInfo.dataList
                // for(let item in data){
                //   // console.log(item)
                // }
                // console.log(this.leftInfo.dataList)
                // this.$emit('matinButton',this.userIds);//点击传值给父元素
            },
            //       eventsBand(e){
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
            //           pageSize:this.leftInfo.pageSize,
            //           pageNumber:this.leftInfo.pageNumber
            //         }).then(res=>{
            //             this.selected(res.data.result);
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
            tmpDownload() {
                location.href = 'http://192.168.1.43:82/file/手术字典模板.xlsx'
            },
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
                });
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
                        mv.danViews = res.data;
                        mv.danViewsLoadding = false;
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
                        mv.danViews = res.data;
                        mv.danViewsLoadding = false;
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
  .addPlus {
    text-align: center !important;
    line-height: 80px;
    display: inline-block !important;
    font-size: 16px;
    width: 100%;
    float: left;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    i {
      padding-right: 20px;
    }
  }
  .detailsScroll {
    height: 100%;
    position: relative;
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
    .uploadImport {
      float: right;
      display: flex;
    }
  }
  .autoSeach2 {
    margin-bottom: 10px;
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
  .templateSubject {
    overflow: hidden;
    height: 100%;
    width: 100%;

    .templateLeft {
      background: #fff;
      height:100%;
      /*overflow-y: auto;*/
      position: relative;
      .templateLeftUL {
        background: #fff;
        height: calc(100% - 80px);
        /*height: 100%;*/
        overflow-y: auto;
        width: 100%;
        float: left;
        position: relative;
      }
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
          float: left;
          width:100%;
          position: relative;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 45px;
          }
          p::after,span::before{
            content:"\007C ";
            opacity:0;
          }
          span {
            float: right;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
            text-align: right;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
          }

          button {
            float: right;
            color: #fff;
            border: 2px solid #F56C6C;
          }
          button:hover{
            background: #F56C6C;
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
      ul{
        /*height: 100%;*/
        width: 100%;
        float: left;
        /*overflow: hidden;*/
        /*overflow-y: auto;*/
        position: relative;
      }

      .templateAdd {
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        display: flex;
        position: sticky;
        top: 0;
        background: #ebf3f8;
        z-index: 999;
        .el-button{
          margin: 0 auto 10px;
        }
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
          padding-left: 246px;

          .templateS{
            padding: 20px;
            width: 100%;
          }
          h4 {
            font-size: 24px;
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
            height: 50px;
            margin-bottom: 20px;
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
  .infoNum{
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #97a8be;
    float: right;
  }
</style>
