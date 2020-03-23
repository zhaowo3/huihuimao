<template>
  <div style="height: 100%; width: 60%;margin: 0 auto;">
    <div name="homeHeaders" class="menuMainContent">
        <div style="float: right;">
          <el-button type="primary" class="trayClose" @click="$router.go(-1)">返回</el-button>
        </div>
    </div>

    <div class="allocationD">
      <el-col :span="24" class="templateRight" style="display: block;overflow: hidden;">
        <!--        <div v-if="danViewsLoadding" class="danViewsLoadding">正在加载</div>-->
        <div style="height: 100%;">
          <el-main style="height: 100%;">
            <el-container style="height: 100%;">
              <div class="listHeader listInputs"  style="height: 100%;">
                <div class="listHeightList">

                  <div class="listHeaderOne">
                    <el-col :span="20"><h3>{{childseller.name}}</h3></el-col>
                    <el-col :span="4"><h4 >{{childseller.location}}</h4>

                      <p style="float: right;">库位:</p></el-col>
                  </div>

                  <div class="listHeaderTwo">
                    <span>{{childseller.size}}</span>
                    <!--                <el-button >{{btnText}}</el-button>-->
                  </div>
                  <el-row class="nameAlis">
                    <el-col :span="24">
                      <div class="grid-content bg-purple"><p>物资别名</p>
                        <el-input v-show="finds" v-model="childseller.alias" placeholder="请输入物资别名"></el-input>
                        <span v-show="hides">{{childseller.alias}}</span></div>
                    </el-col>
                  </el-row>
                  <div style="float: right;display: flex;">
                    <el-button type="primary" title="删除" @click="deletLibrary(childseller.id)" class="trayClose" v-if="htsn=='tiny'"><i class="iconfont icon-_huaban" style="padding-right: 5px;"></i>删除</el-button>
                    <el-button type="primary" title="编辑" id="hamburger-EditDe" @click="editLibrary" class="trayClose" v-if="mait&&$route.query.materialUpdate==1"><i class="iconfont icon-_huaban" style="padding-right: 5px;"></i>编辑</el-button>
                    <el-button type="primary" title="保存"  @click="editLibraryS" class="trayClose" v-if="maitS&&$route.query.materialUpdate==1"><i class="iconfont icon--2" style="padding-right: 5px;"></i>保存</el-button>
                    <el-button type="primary" title="修改库位" id="hamburger-revision" class="trayClose" @click="ban" v-if="$route.query.materialUpdate==1"><i class="iconfont icon--2" style="padding-right: 5px;"></i>修改库位</el-button>
                    <el-button type="primary" title="添加库位" id="hamburger-EditAdd" class="trayClose" @click="banOK" v-if="$route.query.materialUpdate==1"><i class="iconfont icon--3" style="padding-right: 5px;"></i>添加库位</el-button>

                  </div>
                </div>

                <div class="picturesList">
                  <div class="picturesListImg">
                    <el-image :src="childseller.imgUrl">
                    <div slot="error" class="image-slot">
                      <img alt=""  :src="big">
                    </div>
                    <div slot="placeholder" class="image-slot">
                      <img alt=""  :src="big">

                    </div>
                  </el-image>
                  </div>
                  <div class="picturesListCenter">
                    <el-row class="">

                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>库存数量</p><span>{{childseller.supplyQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>预警数量</p>
                          <el-input v-show="finds" v-model="childseller.warnQuantity" placeholder="请输入预警数量"></el-input>
                          <span v-show="hides">{{childseller.warnQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>包装单位</p>
                          <el-input v-show="finds" v-model="childseller.bigUnitDesc" placeholder="请输入包装单位"></el-input>
                          <span v-show="hides">{{childseller.bigUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>最小单位</p>
                          <el-input v-show="finds" v-model="childseller.smallUnitDesc" placeholder="请输入包装单位"></el-input>
                          <span v-show="hides">{{childseller.smallUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p class="pxs">是否启用</p>
                          <el-switch class="privilegeCentreLiSwitch" :class="{ classObject: isActive }" style="height: 100%; float: left;"
                                     v-model="childseller.isDel"  :active-value=0
                                     :inactive-value=1 active-text="是"
                                     inactive-text="否" active-color="#13bbf4" inactive-color="#e5e5e5" ></el-switch>
<!--                          <span v-show="hides">{{childseller.isDel}}</span>-->
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p class="pxs">计费</p>
                          <el-switch class="privilegeCentreLiSwitch" :class="{ classObject: isActive }" style="height: 100%; float: left;"
                                     v-model="childseller.isFee"  :active-value=1
                                     :inactive-value=0 active-text="是"
                                     inactive-text="否" active-color="#13bbf4" inactive-color="#e5e5e5"  ></el-switch>
<!--                          <span v-show="hides">{{childseller.isFee}}</span>-->
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>关联HIS</p><span>{{childseller.hisCode}}</span></div>
                      </el-col>
                      <el-col :span="12">

                        <div class="grid-content bg-purple-light"> <p>物资条码</p>
<!--                          <el-input v-show="finds" v-model="childseller.manyBarcode" placeholder="请输入条行编码"></el-input>-->
                         <span v-if="childseller.barcode==null">{{childseller.manyBarcode}}</span>
                          <span v-else-if="childseller.manyBarcode==null">{{childseller.barcode}}</span>
                          <span v-else="childseller.manyBarcode!==null&&childseller.barcode!==null">{{childseller.manyBarcode}}</span>

                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>拼音</p>
                          <el-input v-show="finds" v-model="childseller.pinyin" placeholder="请输入拼音"></el-input>
                          <span v-show="hides">{{childseller.pinyin}}</span>
<!--                          <div v-show="finds" style="-->
<!--    display: flex;-->
<!--    text-align: center;float:right;-->
<!--">-->
<!--                            <el-button @click="DIFDialogVisibleClick"><i class="iconfont  icon-xiangji-1"></i></el-button>-->
<!--                          </div>-->
                        </div>

                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple" style="width: 100%;"><p>封面图片</p>
                          <el-upload
                            class="upload-demo uploaddemo"
                            ref="upload"
                            :multiple="false"
                            :http-request="customUpload"
                            action="http://192.168.1.43:8081/api/file/upload/"
                            :on-remove="handleRemove"
                            :on-change="handleChange"
                            :file-list="fileList"
                            :auto-upload="true"
                            accept="image/jpeg,image/png"
                            :limit="1"
                          >
                            <el-button v-show="finds" class="iconfont icon-g2 hoverH"></el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                          </el-upload>
                        </div>

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
    <!--   修改库位 -->
    <el-dialog title="修改库位" :visible.sync="dialogTableVisible" :modal="true"
               custom-class="el-dialog__header-custom dialoVisibleDown">
      <el-form ref="childseller"  class="demo-ruleForm">
        <el-form-item  prop="location" class="ruleF">
<!--          :filter-method="userFilter"-->
          <el-select v-model="inputSweep2"  filterable placeholder="请选择物资库位">
            <el-option
              v-for="item in cities"
              :key="item.name"
              :label="item.name"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
<!--      <el-input-->
<!--        v-model="inputSweep2" ref='gain' autofocus="autofocus" @keyup.enter.native="enterL2(inputSweep2)"  placeholder="修改库位[库位规则1-2-3(1为设备,2为货架,3为层)]" ></el-input>-->
<!--        <i slot="suffix" class="iconfont icon-icon-test46" ></i>-->
<!--      </el-input>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterL2(inputSweep2)" >确 定</el-button>
      </span>
    </el-dialog>

<!--   增加库位 -->
    <el-dialog title="增加库位" :visible.sync="dialogTableVisibleOK" :modal="true"
               custom-class="el-dialog__header-custom dialoVisibleDown">
      <el-form ref="childseller"  class="demo-ruleForm">
        <el-form-item  prop="location" class="ruleF">
          <el-select v-model="inputSweepOK" filterable placeholder="请选择物资库位">
            <el-option
              v-for="item in cities"
              :key="item.name"
              :label="item.name"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
<!--      <el-input-->
<!--        v-model="inputSweepOK" ref='gain1' autofocus="autofocus"  @keyup.enter.native="enterL3(inputSweepOK)"  placeholder="增加库位[库位规则1-2-3(1为设备,2为货架,3为层)]" ></el-input>-->
<!--      <i slot="suffix" class="iconfont icon-icon-test46" ></i>-->
<!--      </el-input>-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisibleOK = false">取 消</el-button>
    <el-button type="primary" @click="enterL3(inputSweepOK)" >确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="拍照"
      :visible.sync="DIFDialogVisible"
      width="450px" custom-class="DIFitionHistory" :before-close="handleClose">
      <div class="camera_outer">
        <el-row>
          <el-col :span="17">
            <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
            <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>

            <!--            <div v-if="preImg" class="img_bg_camera">-->
            <!--              <img :src="preImg" alt="" class="tx_img">-->
            <!--            </div>-->
          </el-col>
          <el-col :span="7" style="text-align: right;" class="img_sunme">
            <el-button @click="getCompetence()">打开摄像头</el-button>
            <el-button @click="stopNavigator()">关闭摄像头</el-button>
            <el-button @click="setImage()">拍照</el-button>
          </el-col>
        </el-row>


      </div>
    </el-dialog>
<!--    <AllocationS :childseller="this.personID" @parens2="parens2" @parens23="parens23" :finds="isFlee" :hides="hidesl"-->
<!--                 :warn="warn" :isF="isF" :tion="tion" :isD="isD" :yin="yin" :findIS="isFleeS" :datas="datas"-->
<!--                 :editLibrary="editLibrary"></AllocationS>-->
  </div>
</template>

<script>
  import AllocationS from '@/components/AllocationS'
  import big from '@/assets/images/big.jpg';
  import {
    catalget, updateMaterial,newLocation,updateLocation,deleteMaterial,useLocation
  } from '@/api/material'
  import {
    fileUpload,fileUploadH
  } from '@/api/oss'

  export default {
    name: "allocationDetails",
    components: {
      AllocationS
    },
    data() {
      return {
        typeId: '',
        childseller: [],
        finds: false,
        // isFleeS: true,
        mait: true,
        maitS: false,
        hides: true,
        datas: '',
          cities:[],
        inputSweep2:'',
        inputSweepOK:'',
        big,
        dialogVisible: false,
        innerVisible: false,
        fileList: [],
        value1: true,
        value2: true,
        opener: false,
          //拍照
          DIFDialogVisible:false,
          videoWidth: 300,
          videoHeight: 300,
          imgSrc: '',
          thisCancas: null,
          thisContext: null,
          thisVideo: null,
          fileNS:'',
          preImg:'', //存放预览的图片
        FileImg: '',
        loading: {
          cameraLoading: false
        },
        modal: {
          visibleCamera: false
        },
        memberInit: {},
        member: {
          photo: ''
        },
        isActive:true,
        memberRule: {},
        canvas: null,
        video: null,
        MediaStreamTrack: null,
        isF: '',
        yin: '',
        tion: '',
        warn: '',
        isD: '',
        dialogTableVisible: false,
        dialogTableVisibleOK:false,
          isChange:true,
          htsn:'',
          options:{},
      }
    },

    watch:{
      isF: function (newValue, oldValue) {

        newValue=this.childseller.isFee;
      },
      isD: function (newValue, oldValue) {

        newValue=this.childseller.isDel;
      }


    },
    created() {
        let jsonStr = localStorage.getItem('tokeng');

        if (jsonStr == "[object Object]") {

            this.htsn = this.$store.state.user.token.name;
            // }
            // catch(err){
            //   return JSON.parse(this.$store.state.user.token).name;
            // }
        } else {
            let jso = JSON.parse(jsonStr);
            this.htsn = jso.name;
        }
      this.typeButton()
    },
      // beforeRouteLeave(to, from, next) {
      //     from.meta.keepAlive = true;
      //     next();
      // },
      beforeRouteLeave (to, from, next) {
          if (to.name === 'allocationMaterialLie') {
              to.meta.keepAlive = true
          }
          if (this.isChange) {
              let changeData = {
                  id: this.childseller.id,
                  warnQuantity: this.childseller.warnQuantity,
                  bigUnitDesc: this.childseller.bigUnitDesc,
                  smallUnitDesc: this.childseller.smallUnitDesc,
                  isDel: this.childseller.isDel,
                  isFee: this.childseller.isFee,
                  pinyin: this.childseller.pinyin,
                  imgUrl:this.childseller.imgUrl,
                  alias:this.childseller.alias,
                  location:this.childseller.location,
                  warnQuantity:this.childseller.warnQuantity,
              }
              window.sessionStorage.setItem('changeData', JSON.stringify(changeData))
          }
          to.meta.isChange = this.isChange;
          next()
      },
      // beforeDestroy () {
      //     this.stopNavigator()
      // },
    methods: {
        //该方法传入推送范围值，根据判断，决定是否展示其下面的推送人ID文本框
        // parens2(value){
        //   let mv = this ;
        //   if(value == false){
        //     //el-switch控件为 个人推送时，value为false
        //
        //     mv.childseller.isFee = false;
        //   }else if(value == true){
        //     //el-switch控件为 true 全站推送，value为true
        //     mv.childseller.isFee = true;
        //   }
        // },

        useLocation(val){
            let mv = this;
            let sendData = '';
            sendData += `search=${val}`;
            useLocation(sendData).then(response => {

                    if (response.code !== '1') {
                        this.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000
                        });

                        return
                    }
                    mv.cities=response.data;
                // mv.userFilter();
                }
            )
        },
        ban(){
            let mv=this;

            mv.inputSweep2= mv.childseller.location;
            mv.dialogTableVisible = true;
            mv.useLocation(mv.inputSweep2);
            // this.$nextTick( () =>{
            //   this.$refs.gain.focus()
            // })

        },
      banOK(){
        let mv=this;
        mv.dialogTableVisibleOK = true;
        // this.$nextTick( () =>{
        //   this.$refs.gain1.focus()
        // })
          mv.useLocation(mv.inputSweep2);
      },
      //修改库位
      enterL2(inputSweep2){
        let mv=this;
        const maup = {
          id: mv.typeId,
          location:  inputSweep2,
        }
        updateLocation(maup).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 500,
            });
            return
          }

          mv.dialogTableVisible=false;
          // this.$router.go(-1);
          mv.childseller.location= inputSweep2;
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 500,
          });

        }).catch(err => {
          this.$message({
            message: err.msg,
            type: 'error',
            duration: 500,
          });
        })
      },

      enterL3(inputSweepOK){
        let mv=this;
        const maup = {
          id: mv.typeId,
          location:  inputSweepOK,
        }
        newLocation(maup).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 500,
            });
            return
          }
          mv.dialogTableVisibleOK=false;
            this.isChange=false;
            this.$router.push({path: '/allocationMaterial/allocationMaterialLie'});
            // this.isChange=false;
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 500,
          });
        }).catch(err => {
          this.$message({
            message: err.msg,
            type: 'error',
            duration: 500,
          });
        })
      },
        fileUploadH(file){
            let mv=this;
            // this.generatorFileMd5(file.file)
            // 自定义上传row.id,{status:row.status}
            fileUploadH(mv.childseller.id, file).then(response => {
                mv.FileImg = response.data;
                mv.childseller.imgUrl = response.data;
                mv.fileList = [];
                mv.dialogVisible = false;
            })
        },
      //上传图片
      customUpload(file) {
        let mv=this;
        // this.generatorFileMd5(file.file)
        // 自定义上传row.id,{status:row.status}
        fileUpload(mv.childseller.id, file).then(response => {
          mv.FileImg = response.data;
          mv.childseller.imgUrl = response.data;
          mv.fileList = [];
          mv.dialogVisible = false;
        })
      },
      isFeek(val) {
        // this.$emit('ems', val);
        if (val = 1) {
          this.childseller.isFee = 1
        } else {
          this.childseller.isFee = 0
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleChange(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      typeButton() {
        this.listLoading = true;
        this.typeId = this.$route.query.id;
        catalget(this.typeId).then(response => {
          this.listLoading = false;
          this.childseller = response.data
        });
      },
      //  删除
        deletLibrary(ids){
            let mv=this;
            this.$confirm('是否要进行删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            let params=new URLSearchParams();
            params.append("id",ids);
            deleteMaterial(params).then(response => {
                if(response.code !=='1') {
                    this.$message({
                        message: response.msg,
                        type: 'error',
                        duration: 1000
                    });
                    return
                }
                this.$message({
                    message: response.msg,
                    type: 'success',
                    duration: 1000
                });
                this.$router.go(-1);
            }).catch(err => {
                this.$message({
                    message: err.msg,
                    type: 'error',
                    duration: 1000,
                });

            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消',
                    duration: 1000,
                });
            });
        },

        // userFilter(query = '') {
        //     let arr = this.cities.filter((item) => {
        //         return item.username.includes(query) || item.userId.includes(query)
        //     })
        //     if (arr.length > 50) {
        //         this.userList = arr.slice(0, 50)
        //     } else {
        //         this.userList = arr
        //     }
        // },
            editLibrary() {
        let mv=this;
        mv.finds = true;
        mv.hides = false;
        mv.mait = false;
        // this.isFleeS = false;
        mv.maitS = true;
        mv.isActive= false;
      },
      // isFeek(datas){
      //   this.personID.isFee=datas;
      // },
      //  拍照
        onPickFile2() {
            this.$refs.fileInput.click();
        },
        getFile2: function(e) {
            let mv=this;
            // console.log("e是什么",e)

                let files = mv.preImg; // 把整个base64给file
                let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
                let time=(new Date()).valueOf();//生成时间戳
                let name = time + ".jpg"; // 定义文件名字（例如：abc.png ， cover.png）
                let conversions = this.dataURLtoFile(files, name); // 调用base64转图片方法
                let file=new FormData();
                file.append('files',conversions);
                mv.fileNS= conversions;
                mv.fileUploadH(conversions);

            // if()


            // 上传的图片
            // mv.preImg=this.imgSrc;


            // this.postData.img = mv.fileNS;   //存放提交图片
            // let reader = new FileReader();
            // reader.readAsDataURL(mv.fileNS);
            // reader.onload = data => {
            //     let res = data.target || data.srcElement;
            //     //   预览的图片
            //     this.preImg = res.result;
            // };
            // document.getElementById("upimg").value = "";  //这是能否上传同一张图片的关键
            // console.log("gaidongchenggong");
        },
        // DIFDialogVisibleClick(){
        //     let mv=this;
        //     mv.DIFDialogVisible=true;
        // },
        // 调用权限（打开摄像头功能）

        // getCompetence () {
        //     let mv=this;
        //     let _this = this;
        //     mv.thisCancas = document.getElementById('canvasCamera');
        //     mv.thisContext = this.thisCancas.getContext('2d');
        //     mv.thisVideo = document.getElementById('videoCamera');
        //     // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        //     if (navigator.mediaDevices === undefined) {
        //         navigator.mediaDevices = {}
        //     }
        //     // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        //     // 使用getUserMedia，因为它会覆盖现有的属性。
        //     // 这里，如果缺少getUserMedia属性，就添加它。
        //     if (navigator.mediaDevices.getUserMedia === undefined) {
        //         navigator.mediaDevices.getUserMedia = function (constraints) {
        //             // 首先获取现存的getUserMedia(如果存在)
        //             let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
        //             // 有些浏览器不支持，会返回错误信息
        //             // 保持接口一致
        //             if (!getUserMedia) {
        //                 return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
        //             }
        //             // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
        //             return new Promise(function (resolve, reject) {
        //                 getUserMedia.call(navigator, constraints, resolve, reject)
        //             })
        //         }
        //     }
        //     let constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
        //     navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        //         // 旧的浏览器可能没有srcObject
        //         if ('srcObject' in _this.thisVideo) {
        //             _this.thisVideo.srcObject = stream
        //         } else {
        //             // 避免在新的浏览器中使用它，因为它正在被弃用。
        //             _this.thisVideo.src = window.URL.createObjectURL(stream)
        //         }
        //         _this.thisVideo.onloadedmetadata = function (e) {
        //             _this.thisVideo.play()
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // },
        handleClose(){
            this.DIFDialogVisible=false;
            // this.stopNavigator();
        },
        // // 绘制图片（拍照功能）
        // setImage () {
        //     let _this = this;
        //     // 点击，canvas画图
        //     _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
        //     // 获取图片base64链接
        //     let image = this.thisCancas.toDataURL('image/png');
        //     _this.imgSrc = image;
        //     this.DIFDialogVisible=false;
        //     _this.preImg=_this.imgSrc;
        //     _this.getFile2()
        //     // this.$emit('refreshDataList', this.imgSrc)
        //     // this.dataURLtoFile(this.imgSrc)
        // },
        // // base64转文件
        // dataURLtoFile (dataurl, filename) {
        //     let arr = dataurl.split(',');
        //     let mime = arr[0].match(/:(.*?);/)[1];
        //     let bstr = atob(arr[1]);
        //     let n = bstr.length;
        //     let u8arr = new Uint8Array(n);
        //     while (n--) {
        //         u8arr[n] = bstr.charCodeAt(n)
        //     }
        //     return new File([u8arr], filename, { type: mime })
        // },
        // // 关闭摄像头
        // stopNavigator () {
        //     this.thisVideo.srcObject.getTracks()[0].stop()
        // },
      editLibraryS() {
        let mv=this;
         mv.finds = false;
        mv.hides = true;
        // mv.isFleeS = true;
        mv.maitS = false;
        mv.mait = true;
        mv.isActive= true;
        mv.isF=mv.childseller.isFee;
        const maup = {
          id: mv.typeId,
          barcode:mv.childseller.barcode,
          location: mv.childseller.location,
          bigUnitDesc: mv.childseller.bigUnitDesc,
          smallUnitDesc: mv.childseller.smallUnitDesc,
          supplyQuantity: mv.childseller.supplyQuantity,
          warnQuantity: mv.childseller.warnQuantity,
          isFee: parseInt(mv.childseller.isFee),
          isDel: parseInt(mv.childseller.isDel),
          pinyin: mv.childseller.pinyin,
            alias:mv.childseller.alias,
        }
        updateMaterial(maup).then(response => {
            if(response.code !=='1') {
                this.$message({
                    message: response.msg,
                    type: 'error',
                    duration: 1000
                });
            }
          this.$message({
            message: response.msg,
            type: 'success',
              duration: 1000
          });
        }).catch(err => {
          this.$message({
            message: err.msg,
            type: 'error',
              duration: 1000
          });

        })
      }
    }

  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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
  .templateRight {
    margin: 0;
    height: 100%;
    overflow-y: auto;
    position: relative;
    background: #fff;

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
      height: calc(100% - 150px);
      overflow-y: auto;
      .picturesListImg {
        width: 80%;
        display: block;
        margin:0 auto 30px;
        height: calc(100% - 300px);

        img {
          max-width: 100%;
          /*width: 100%;*/
          height: 100%;
          display: block;
          margin: 0 auto;
        }
      }

      .picturesListCenter {
        max-height: 400px;
        .grid-content {
          line-height: 40px;
          /*height: 40px;*/
          float: left;
          margin-top: 10px;
          width: 100%;
        }

        span {
          font-size: 16px;
          float: left;
        }

        p {
          font-size: 16px;
          float: left;
          padding-right: 28px;
          width: 100px;
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
      height: calc(100% - 100px);
      .listHeightList{
        float: left;
        width: 100%;
      }
      input {
        width: 50%;
        float: right;
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
        .templateTitle::before{
          content:"\007C ";
          opacity:0;
        }
      }


    }
  }


  .allocationD {
    height: 100%;
    overflow-y: auto;

    .allocationU {
      .grid-content {
        font-size: 30px !important;
        height: 80px;
        line-height: 80px;
        display: flex;
        position: relative;
        overflow: hidden;
        border-bottom-color: #e1e6e7;
        border-bottom-width: 1px;
        border-bottom-style: solid;

        span {
          font-size: 16px;
          width: 100px;
          text-align: left;
          padding-left: 20px;
          display: block;
        }

        p {
          font-size: 16px;
          padding-left: 20px;
          line-height: normal;
          align-self: center;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 90px;
        }
      }
    }

    .uploadImg {
      width: calc(100% - 100px);
      padding-right: 0;
      float: left;

      button {
        display: block;
        background: none;
        border: none;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .allocationImg {
      width: 100%;

      .allocationW {
        width: 40%;
        display: block;
        margin: 50px auto 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

    }
  }

  #cameraUpload {
    background: #fff;
    padding: 30px 40px;
  }

  .uploadPhoto {
    width: 150px;
    height: 110px;
    border: 1px solid #f2f2f2;
    margin-bottom: 5px;
  }

  .uploadPhoto img {
    width: 100%;
    height: 100%;
  }

  .cameraBox {
    width: 300px;
    background: #F2F2F2;
    margin: 0 auto;
  }
  .pxs{
    width: 70px !important;
    padding: 0 !important;
  }
  .classObject{
    pointer-events:none;
    opacity: 0.5;
    cursor: not-allowed;
  }
  .privilegeCentreLiSwitch{
    margin-top: 10px;
  }
  .hoverH{
    color: #00b2ed;
  }
  .hoverH:hover{
    color: #fff;
  }
  .img_sunme{
    button{
      margin-bottom: 30px;
    }
  }
  .camera_outer{
    position: relative;
    overflow: hidden;
    /*background: url("../../assets/img/user_0608_04.png") no-repeat center;*/
    background-size: 100%;
    video,canvas,.tx_img{
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .btn_camera{
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 50px;
      background-color: rgba(0,0,0,0.3);
      line-height: 50px;
      text-align: center;
      color: #ffffff;
    }
    .bg_r_img{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .img_bg_camera{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: calc(100% - 40px);
      img{
        width: 100%;
        height: 100%;
      }
      .img_btn_camera{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,0.3);
        color: #ffffff;
        .loding_img{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
  .nameAlis{

    float: left;
    display: flex;
    width: 50%;

    .grid-content {
      line-height: 40px;
      /*height: 40px;*/
      float: left;
      width: 100%;
    }
    span {
      font-size: 16px;
      float: left;
    }

    p {
      font-size: 16px;
      float: left;
      padding-right: 28px;
      width: 100px;
    }
  }
  .ruleF{
    width: 100%;
    margin-bottom: 10px;
    display: block;
    .el-select{
      width: 50%;
    }
  }
</style>
