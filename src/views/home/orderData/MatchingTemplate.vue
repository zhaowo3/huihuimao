<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="routerHome()">返回</el-button>
      </div>
      <div class="trayTime">
        <router-link to="/HistoricalOrder"><i class="iconfont icon-icon-test30"></i></router-link>
      </div>
    </div>
    <div class="menuMainRightB">
      <el-button type="primary" class="trayOK" @click="determination" id="hamburger-determination">确定</el-button>
    </div>
    <!--    头部病人信息-->
    <Details :orderVoData="orderVoData"></Details>
    <!--    下面物资-->
    <TemplateList :templates="templates" @AdditionH="AdditionH" @materialDelete="materialDelete" @ToDepositAdd="ToDepositAdd"
                  @showCityName="updateCity" @MaterialS="MaterialH" @showChange="showChange" :curg="curg"
                  :cur="cur" :materials="materials"  :orderMaterials="orderMaterials" @maVal="maVal"></TemplateList>
    <!--    弹框选物资-->
    <el-dialog :modal="true" :fullscreen="fullscreen" custom-class="el-dialog__header-custom dialogsh1"
               :visible.sync="dialogVisible" title="添加物资" width="80%" style="padding-top: 0;" >
      <GroupMaterial @MaterialH="groupsM" :dialogVisible="dialogVisible"></GroupMaterial>
      <!--      @userIdsName="materialNames"-->
    </el-dialog>


    <el-dialog
      title="导入历史手术订单"
      :visible.sync="centerDialogVisible"
      width="30%"
      center custom-class="additionHistory">
      <el-table :data="gridData" @row-click="openDetails" max-height="300">
        <el-table-column property="scheduledTime" label="日期"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
      </el-table>

    </el-dialog>
    <el-dialog title="请扫描或输入物资编码" :visible.sync="dialogTableVisible" :modal="true" :before-close="handleClose"
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

              <p class="textes">{{dataStas.materialName}},{{dataStas.aliasName}}</p>
              <p class="textesH">{{dataStas.size}}</p>
              <p class="textes">库位：{{dataStas.location}}<span>应：{{dataStas.supplyQuantity}}已：{{dataStas.awayQuantity}}</span></p>
              <el-date-picker v-model="selectVal" ref='gainVal' class="selValImg" align="right" type="date"
                              placeholder="选择效期日期"
                              popper-class="picker-no-text"
                              value-format="yyyy-MM-dd"
                              :picker-options="pickerOptions">
              </el-date-picker>
              <div class="crumbHight" v-if="dataStas.codeType==2||dataStas.codeType==3">
                <el-input-number v-model="num1" :min="1"  :max="dataStas.quantity-dataStas.supplyQuantity"   label="输入数字"></el-input-number>
              </div>

              <el-input v-model="inputSweep" ref='gain' :disabled="disabled" clearable autofocus="autofocus" @keyup.enter="enterL"
                        placeholder="物资编码" class="cumens">
                <i slot="suffix" class="iconfont icon-icon-test46" ></i>
              </el-input>
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
  </div>
</template>

<script>
  let speechSU = new window.SpeechSynthesisUtterance();
  import Details from '@/components/Details'
  import TemplateList from '@/components/TemplateList'
  import GroupMaterial from '@/components/GroupMaterial'
  import LibraryDisplay from '@/components/LibraryDisplay'
  import smalls from '@/assets/images/small.jpg';

  import {debounce} from '@/utils/debounce';
  import {
    openL, closeL
  } from '@/api/systemsL'
  import {
    prepareOrder, template, orderBrand, addMaterial, orderDelete, importHistory
  } from '@/api/home'
  import {
    orderRu
  } from '@/api/library'

  export default {
    name: "MatchingTemplate",
    components: {
      Details,
      TemplateList,
      GroupMaterial,
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
        orderNumber: this.$route.query.orderNumber,
        orderVoData: [],
        templates: [],
        materials: [],
        orderMaterials: [],
          disabled:true,
        nList: [],
        orderNu: '',
          num1:1,
        cur: -1,
        curg: 0,
        listData: [],
        // addVisible:false,
        dialogVisible: false,
        fullscreen: false,   // 弹窗是否全屏
        centerDialogVisible: false,
          shuttDialogVisible: false,
        gridData: [],
          gridDataShutt:[],
        hisOrderNumber: '',
        dialogTableVisible: false,
        inputSweep:'',
        dataStas:{},
          mvMaten:[],
        materialAdd:this.$route.query.materialAdd,
        materialDel:this.$route.query.materialDel,
          // listsh:{},
          listd:'',
          smalls,
          isCha:true,
          selectVal:'',
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
      }
    },
      beforeRouteLeave (to, from, next) {
          if (to.name === 'home') {
              to.meta.keepAlive = true
          }

          to.meta.isCha = this.isCha;
          next()
      },
      watch: {

      },
    created() {
      this.getList();
      this.$watch('inputSweep', debounce((newQuery) => {
        if (newQuery == "") {
          // this.houseList1 = [];
          // this.mainShow1 = true;
          return
        }else {
          this.enterL(newQuery);
        }
      }, 2000));
        this.$watch('selectVal', debounce((val) => {
            if (val == ""||val == null) {
                // this.houseList1 = [];
                // this.mainShow1 = true;
                this.disabled=true;
            }else {
                this.disabled=false;
            }
        }, 0));
    },
    mounted(){
        let mv=this;
        // eventBus.$on('maVal',function (data) {
        //     console.log(data);
        //     mv.orderMaterials=data;
        // })
    },
    methods: {
      //  列表头部
      getList() {
        this.listLoading = false;
        prepareOrder(this.orderNumber).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          this.listLoading = false;
          this.orderVoData = response.data.orderVo;

          this.materials = response.data.materials;
          this.orderMaterials = response.data.orderMaterials;
          this.orderNu = response.data.orderVo.orderNumber;
        });
      },
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
        pushDataList(data) {
          let mv=this;
            mv.locth=data.location;
            mv.openFullScreen2();
          this.$store.state.LibraryLo=data.location;
        openL(data.location).then(response => {
            mv.$store.state.recordPrevious=1;
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
            if(this.$store.state.whetherTest == false){
                this.dialogTableVisible = true;
            }

            mv.locth = data.location;
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000,
            customClass: 'zZindex'
          });
            this.$store.state.recordPrevious=this.locth;
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.msg,
            customClass: 'zZindex'
          });
          return false;
        })
      },
        maVal(val){
            this.mvMaten=val;
          this.orderMaterials=this.mvMaten;
        },
      ToDepositAdd(id){
        let mv = this;
          if(this.$store.state.whetherTest == true){
              this.dialogTableVisible = true;
              this.$nextTick( () =>{
                  if(mv.selectVal==''||mv.selectVal==null){
                      this.$refs.gainVal.focus();
                  }else {
                      mv.$nextTick( () =>{
                          mv.$refs.gain.focus();
                      })
                  }

              })
              mv.num1=1;
          }

        mv.inputSweep='';
        this.openTray(id);
        mv.start();
        mv.dataStas=id;
      },

      //入库
      enterL() {
        let mv = this;
        if (mv.inputSweep == '') {
          return;
        }
        // if (this.dataStas.barcode == mv.inputSweep.toString().toUpperCase().substring(0, 4)||this.dataStas.hisCode == mv.inputSweep) {

          // this.$confirm('是否进行入单操作?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
            orderRu({
              barCode: mv.inputSweep,
              trayLocation: mv.dataStas.location,
              id: mv.dataStas.id,
              orderNumber: mv.orderNumber,
                valid:mv.selectVal,
                number:mv.num1,
                codeType:mv.dataStas.codeType,
                barcodeSize:mv.dataStas.barcodeSize,
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
                mv.inputSweep = '';
                mv.dataStas.supplyQuantity = mv.dataStas.supplyQuantity + mv.num1;

                if(mv.dataStas.codeType==2||mv.dataStas.codeType==3){
                    mv.dialogTableVisible = false;
                }
                if (mv.dataStas.supplyQuantity == mv.dataStas.quantity||mv.dataStas.supplyQuantity>mv.dataStas.quantity) {
                  mv.dialogTableVisible = false;
                  mv.MaterialH();
                }
                // if(mv.dataStas.quantity>mv.dataStas.supplyQuantity){
                //
                // }else {
                //
                // }


                speechSU.text = '已入单' + res.data.name+' ' + mv.num1 + res.data.smallUnitDesc;
                window.speechSynthesis.speak(speechSU);
                mv.num1='1';
                // this.leftInfo.dataList.push(res.data);
            }).catch((err) => {
              console.log(err);
            })
          // }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消发货'
            // });
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
      showChange(){
        this.dialogVisible = true;

      },

      //  列表左侧列表点击
      updateCity(data, index) {
        this.listLoading = true;
        this.cur = index;
        this.curg = -1;

        this.dataID = data.id;
        this.materials = [];
        template(this.Qs.stringify({
          orderNumber:this.orderNumber,
          tempId: data.id
        })).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          this.listLoading = false;
          for (let i = 0, len = response.data.length; i < len; i++) {
            let resultData = response.data[i];
            this.materials.push(resultData);
            //console.log(resultData)

          }
        });
      },
      //  弹出历史模板列表
      AdditionH() {
        let mv = this;
          mv.centerDialogVisible = true;
          prepareOrder(this.orderNumber).then(response => {
              if(response.code !=='1'){
                  this.$message({
                      message: response.msg,
                      type: 'error',
                  });
                  return
              }
              this.gridData = response.data.historyOrder;

          });
      },
        // AddiShutt() {
        //     let mv = this;
        //     mv.shuttDialogVisible = true;
        //     prepareOrder(this.orderNumber).then(response => {
        //         if(response.code !=='1'){
        //             this.$message({
        //                 message: response.msg,
        //                 type: 'error',
        //             });
        //             return
        //         }
        //         this.gridDataShutt = response.data.historyOrder;
        //
        //     });
        // },
      //点击添加模板
      openDetails(row) {
        // let
        let mv = this;
        this.$confirm('确定添加模板?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          importHistory(this.Qs.stringify({
            orderNumber: this.orderNumber,
            histroyOrderNumber: row.orderNumber
          })).then(response => {
            if(response.code !=='1'){
              this.$message({
                message: response.msg,
                type: 'error',
              });
              return
            }
            this.$message({
              type: 'success',
              message: response.msg
            });
            mv.centerDialogVisible = false;
            this.getList();
          });
        }).catch(() => {

        });
      },
      //添加材料物资选择刷新页面
      MaterialH() {
          let mv=this;
          mv.cur = -1;
          mv.curg = 0;
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
            mv.orderMaterials = response.data.orderMaterials;

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
        sendData += `orderNumber=${this.orderNu}`;
        addMaterial(sendData).then(res => {
          if(res.code !=='1'){
            this.$message({
              message: res.msg,
              type: 'error',
            });
            return
          }
          this.$nextTick( () =>{
            this.MaterialH();
            this.dialogVisible = false;
          })

        });


      },
        routerHome(){
            this.$router.push({path: '/home',query:{
                    orderNumber:this.$route.query.orderNumber}})
        },
      //删除额外物资
      materialDelete(id) {
        this.$confirm('是否要删除物资?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          orderDelete(this.Qs.stringify({
            orderMaterialId: id
          })).then(response => {
            if(response.code !=='1'){
              this.$message({
                type: 'error',
                message: response.msg
              });
              return;
            }
            this.$message({
              type: 'success',
              message: response.msg
            });
            let mv = this;
            for (let i = 0; i < mv.orderMaterials.length; i++) {
              let obj = mv.orderMaterials[i];
              if (obj.id == id) {
                this.orderMaterials.splice(i, 1);
                i--
              }
            }
          })
            .catch(() => {

            });
        }).catch(() => {

        });
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
        handleClose(done){
            let vm = this;
            vm.stop();
            localStorage.setItem("Timename", this.str);
            vm.reset();
            done();
        },
      // updateList (list) {
      //   let newList = [];
      //   let newLists = [];
      //   let materialId=[];
      //   let materialCount=[];
      //   for(let j=0;j<list.length;j++){
      //     materialId=list[j].id;
      //     materialCount=list[j].surecode;
      //     newList.unshift(materialId);
      //     newLists.unshift(materialCount);
      //   }
      //   console.log(newList);
      //   console.log(newLists);
      //   let NList = {
      //     materialId:newList,
      //     materialCount:newLists,
      //     orderNumber:this.orderNu,
      //   };
      //   // let arr = new Array()
      //   addMaterial(NList).then(response => {
      //     // this.listLoading = false;
      //     // this.orderMaterials = response.data.orderMaterials;
      //     //console.log(response)
      //   });
      //
      //   this.nList = newList
      //   //console.log(this.nList)
      // },
      //  下单配物资
      determination() {
          let mv=this;
        let getId = document.querySelector('.hit');
        this.dataID = getId.getAttribute("data-id");
        // let mates=this.materials.id
        // this.materials.splice(index,);
        let orderN = this.orderNumber;
       let dataID = this.dataID;
        // const users = this.materials;
        // const m = [];
        // // users.filter(it=>m.set(it.id,it));
        // for (let i = 0; i < users.length; i++) {
        //   m.push({
        //     // id:users[i].materialId,
        //     // number:users[i].quantity,
        //     // name:users[i].materialName,
        //   })
        // }
        this.$confirm('是否要进行确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // this.Qs.stringify({orderNumber:orderN, templateId:dataID,appendInfo:JSON.stringify(m)
        orderBrand(this.Qs.stringify({orderNumber: mv.orderNu})).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
            this.isCha=false;
          this.$message({
            message: response.msg,
            type: 'success'
          });
            this.$router.push({path: '/home'});
        }).catch(err => {
          this.$message({
            message: err.msg,
            type: 'error'
          });
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下单',
            duration: 1000,
          });
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .dialogsh1 {
    overflow: hidden;
    height: 100%;
  }
  .textes{
    text-align: left;
    height: 30px;
    margin-bottom: 10px;
    font-size: 18px;
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
    width: 80% !important;
    height: auto;
    margin-bottom: 10px;
    float: left;
  }

</style>
