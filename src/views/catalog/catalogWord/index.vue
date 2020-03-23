<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <!--        <el-button type="primary" class="trayClose" @click="closeTray">关闭托盘</el-button>-->
        <!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->

        <div class="itemNew"  v-if="operation==1">
          <el-button type="primary" title="添加到二级库" id="hamburger-itemNew" @click="addNewButton" class="trayClose"><i
            class="iconfont icon-add" style="padding-right: 5px;"></i>新添加到二级库
          </el-button>
        </div>
        <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
      </div>

    </div>
    <el-row class="detailsScroll">
      <div class="templateSubject">

        <el-col :span="8" class="templateLeft" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10" v-loading="listLoading">
          <div class="autoSeach2">
            <el-input v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)"
                      class="inputs1" placeholder="请输入关键字" clearable>
              <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
            </el-input>
          </div>
          <ul class="clearfix" id="leftBox" ref="uldom">
            <li v-for="(data,index) in houseList" :data1="data.id" :key="index" :class="index==cur?'hit':''"
                @click="infoViews(data.id,index)" :id="data.id">
              <el-main style="padding: 0">
                <div class="templateLeftImg">
                  <el-image :src="data.imgUrl">
                    <div slot="error" class="image-slot">
                      <img alt="" :src="smalls" >
                    </div>
                    <div slot="placeholder" class="image-slot">
                      <img alt="" :src="smalls" >
                    </div>
                  </el-image>
<!--                  <img alt="" :src="smalls" v-real-img="data.imgUrl">-->
                  <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                </div>
                <div class="templateSF">
                  <div class="templateLeftSpan"><p :title="data.name">{{data.name}}</p><p :title="data.alias">{{data.alias}}</p><span>{{data.size}}</span>
                    <el-button type="primary" class="templateButtonBlur" @click="addOldButton(data)"  v-if="operation==1">添加到二级库</el-button>
                    <!--                  <span>库位:{{data.location}}</span>-->
                    <!--                  <el-button class="templateButton" v-if="data.type==1">包</el-button>-->
                    <!--                  <p style="color: red;font-size: 12px;right: 0;position: absolute;" v-if="data.supplyQuantity==0">无库存</p>-->
                  </div>
                </div>

              </el-main>
            </li>
            <!--            <li v-if="leftInfo.loading" style="text-align: center;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;">正在加载，请稍后</li>-->
            <!--            <li v-if="leftInfo.isFinsh" style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;">没有更多数据了</li>-->
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
                      <el-col :span="24"><h3>{{danViews.name}}</h3></el-col>
                      <el-col :span="24"><h3>{{danViews.alias}}</h3></el-col>
                      <!--                      <el-col :span="12"><h4>{{danViews.location}}</h4>-->
                      <!--                        <p>库位:</p></el-col>-->
                    </div>
                    <div class="listHeaderTwo">
                      <span>{{danViews.size}}</span>
                      <span style="height: 30px; float: right;"></span>
                      <!--                    <el-button  type="primary" @click="munOK(danViews.location)">待定</el-button>-->

                    </div>
                  </div>

                  <div class="picturesList">
                    <div class="picturesListCenter">
                      <el-row>
                        <el-col :span="12">
                          <div class="grid-content bg-purple"><p>包装单位</p><span>{{danViews.bigUnitDesc}}</span></div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple"><p>最小单位</p><span>{{danViews.smallUnitDesc}}</span></div>
                        </el-col>
                        <!--                        <el-col :span="12">-->
                        <!--                          <div class="grid-content bg-purple"><p>数量</p><span>{{danViews.supplyQuantity}}</span></div>-->
                        <!--                        </el-col>-->
                        <!--                        <el-col :span="12">-->
                        <!--                          <div class="grid-content bg-purple"><p>预警数量</p><span>{{danViews.warnQuantity}}</span></div>-->
                        <!--                        </el-col>-->
                        <el-col :span="12">
                          <div class="grid-content bg-purple"><p>是否启用</p><span>{{danViews.isDel===null?'是':'否'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple-light"><p>是否计费</p>
                            <span>{{danViews.isFee===null?'是':'否'}}</span></div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple-light"><p>HIS编码</p><span>{{danViews.hisCode}}</span></div>
                        </el-col>
                        <!--                        <el-col :span="12">-->
                        <!--                          <div class="grid-content bg-purple-light"><p>拼音</p><span>{{danViews.pinyin}}</span></div>-->
                        <!--                        </el-col>-->
                      </el-row>

                    </div>
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
<!--                    <viewer ><img alt="" :src="big" v-real-img="danViews.imgUrl">-->
<!--                    </viewer>-->
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
    </el-row>
    <el-dialog
      title="添加新物资"
      :visible.sync="addNewDialogVisible"
      width="60%"
      center custom-class="additionHistory" :close-on-click-modal="false" :before-close="addhandleClose">
      <el-form :model="childseller" :rules="rules" ref="childseller" label-width="105px" class="demo-ruleForm">
        <div class="picturesListEject">
          <!--        <el-upload-->
          <!--          class="avatar-uploader"-->
          <!--          ref="upload"-->
          <!--          action="uploadUrl"-->
          <!--          :show-file-list="false"-->
          <!--          :auto-upload="false"-->
          <!--          :on-change="handleChange"-->
          <!--          :on-success="handleAvatarSuccess"-->
          <!--          accept="image/jpeg,image/jpg,image/png">-->
          <!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          <!--        </el-upload>-->
          <!--      选取完后 上传成功/失败后触发-->
          <!--        <el-upload-->
          <!--          class="avatar-uploader"-->
          <!--          ref="upload"-->
          <!--          :auto-upload="false"-->
          <!--          :multiple="false"-->
          <!--          action="uploadUrl"-->
          <!--          :show-file-list="false"-->
          <!--          :on-change="imgSaveToUrl"-->
          <!--        :on-success="handleAvatarSuccess"-->
          <!--        :before-upload="beforeAvatarUpload">-->
          <!--        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          <!--        </el-upload>-->

<!--          <div style="margin-top:30px;display:flex;flex-direction:column;justify-content:center;align-items:center;">-->

<!--            <el-button style="width:140px">保存</el-button>-->

<!--          </div>-->
          <!--        <viewer class="picturesListImg"><img alt="" :src="big" v-real-img="childseller.imgUrl"></viewer>-->
          <el-row v-if="seachHide">
            <el-col :span="24" class="picturesAdd" style="color: #ddd;border-bottom: 1px solid #ddd;padding-bottom: 10px">
              <el-form-item label="快速选择物资">
                <el-autocomplete
                  v-model="state"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect" style="width: 100%;">
                  <template slot-scope="{ item }">
                    <template v-if="item.type === 'more'">
                      <div class="text-center pad-allm bord-top">
                        <a class="text-normal">只显示前20条结果，请完善搜索关键字</a>
                      </div>
                    </template>
                    <template v-else>
                      <div class="name">{{ item.value }}</div>
                      <!--                <span class="addr">{{ item.address }}</span>-->
                      <!--                <goods-item-->
                      <!--                  size="small"-->
                      <!--                  :is-router="false"-->
                      <!--                  :data="item "-->
                      <!--                >-->
                      <!--                </goods-item>-->
                    </template>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="picturesListCenter">
            <el-row class="picturesTom">
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="物资名称" prop="name">
                  <!--              <div  ><p>物资名称</p>-->
                  <el-input v-model="childseller.name" :disabled="disabled" placeholder="请输入物资名称"></el-input>
                  <!--              </div>-->
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="物资规格" prop="size">
                  <el-input v-model="childseller.size" :disabled="disabled1" placeholder="请输入物资规格"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="物资别名" prop="alias">
                  <!--              <div  ><p>物资名称</p>-->
                  <el-input v-model="childseller.alias"  placeholder="请输入物资别名"></el-input>
                  <!--              </div>-->
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="物资库位" prop="location" class="ruleF">
                  <el-select v-model="childseller.location" filterable placeholder="请选择物资库位">
                    <el-option
                      v-for="item in cities"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                      <span style="float: left">{{ item.name }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd number-numks">
                <el-form-item label="预警数量" prop="warnQuantity">
                  <el-input-number v-model="childseller.warnQuantity" controls-position="right" placeholder="请输入预警数量"
                                   @change="handleWarn" :min="1" :max="99999"></el-input-number>

                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="包装单位" prop="bigUnitDesc">
                  <el-input v-model="childseller.bigUnitDesc" :disabled="disabled2" placeholder="请输入包装单位"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="最小单位" prop="smallUnitDesc">
                  <el-input v-model="childseller.smallUnitDesc" :disabled="disabled3" placeholder="请输入最小单位"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="是否启用" prop="isDel">
                  <el-switch class="privilegeCentreLiSwitch" style="height: 100%; float: left;"
                             v-model="childseller.isDel" :active-value=0
                             :inactive-value=1 active-text="是"
                             inactive-text="否" active-color="#13bbf4" inactive-color="#e5e5e5"></el-switch>
                  <!--                          <span v-show="hides">{{childseller.isDel}}</span>-->
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <div class="onpickConent">
                  <el-form-item label="图片">
                    <div v-if="preImg!=''" class="onpickOld">
                      <img class="onpickImg" :src="preImg">
                      <div @click="preImg=''" class="onpickDIV" style="">×
                      </div>
                    </div>

                    <div v-if="preImg==''" style="display:inline-block;">
                      <i class="el-icon-plus avatar-uploader-icon onpickFile"  @click="onPickFile2()"></i>
                      <input id="upimg" type="file" ref="fileInput" accept="image/*" @change="getFile2" style="display: none;">
                    </div>
                  </el-form-item>
                  <!--            <div style="-->
                  <!--    width: 100%;-->
                  <!--    display: inline-block;-->
                  <!--    text-align: center;margin-top: 10px;-->
                  <!--">-->
                  <!--              <el-button @click="DIFDialogVisibleClick"><i class="iconfont  icon-xiangji-1"></i></el-button>-->
                  <!--            </div>-->
                </div>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="是否计费" prop="isFee">
                  <el-switch class="privilegeCentreLiSwitch" style="height: 100%; float: left;"
                             v-model="childseller.isFee" :active-value=1
                             :inactive-value=0 active-text="是"
                             inactive-text="否" active-color="#13bbf4" inactive-color="#e5e5e5"></el-switch>
                  <!--                          <span v-show="hides">{{childseller.isFee}}</span>-->
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd picturesAM">
                <el-form-item label="物资条码" prop="barcode">
                  <el-input v-model="childseller.barcode" :disabled="disabled4" placeholder="物资条码">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd">
                <el-form-item label="HIS编码" prop="hisCode">
                  <el-input v-model="childseller.hisCode" :disabled="disabled5" placeholder="物资条码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="picturesAdd picturesAM" v-if="addOldHide">
                <el-form-item label="一物一码" prop="barcode">
                  <el-checkbox v-model="childseller.isOnly" @change="handleCheckedCitiesChange" true-label="1" false-label="0">是否勾选</el-checkbox>
                  <el-input-number v-model="childseller.barcodeSize" v-if="checkedHide" :min="0" :max="childseller.barcode.length" label="条码位数" style="width: 30%"></el-input-number>
                </el-form-item>
              </el-col>

            </el-row>

          </div>

        </div>

        <div class="hButton">
          <el-button type="primary" @click="HistoryAddNewButton('childseller')">提交</el-button>
        </div>
      </el-form>
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
  </div>
</template>

<script>
    import GroupTabulation from '@/components/GroupTabulation'
    import {debounce} from '@/utils/debounce';
    import {
        catalogs, getHerp, materialAdds,useLocation
    } from '@/api/material';
    import {
        openL, closeL, herpPage,submenuMenuId,searchPage
    } from '@/api/systemsL'
    import {
        fileUploadH
    } from '@/api/oss'
    import smalls from '@/assets/images/small.jpg';
    import big from '@/assets/images/big.jpg';

    export default {
        name: "catalogWord",
        components: {
            GroupTabulation,
        },
        data() {
            return {
                // leftInfo:{
                //   loading:false,
                //   isFinsh:false,  //是否完成加载
                //   allSize:'',
                //   pageSize:0,
                //   pageNumber:1,
                //   dataList:[],
                // },
                //物资搜索
                dataList:[],
                restaurants: [],
                state: '',
                timeout:  null,
                seachHide:false,
                //物资搜索
                btnText: '确定',
                houseList: [],
                searchHouse: {
                    pageSize: 10,
                    pageNumber: 0,
                    columnName: 'supply_quantity',
                    orderType: 'desc',
                    keyWords: '',
                },
                cities:[],
                busy: false,
                listLoading: false,
                droping: false,
                noMore: false,
                loading: false,
                cur: 0,
                danViews: {},
                danViewsLoadding: false,
                smalls,
                imageUrl: '',
                uploadUrl: 'http://192.168.1.43:8081/api/file/upload/',
                localFile: {},
                locaImgs: {},
                localFileE: {},
                //拍照
                DIFDialogVisible:false,
                videoWidth: 300,
                videoHeight: 300,
               imgSrc: '',
                thisCancas: null,
                thisContext: null,
                thisVideo: null,
                checkedHide:false,
                preImg:'', //存放预览的图片
                postData:{
                    img:'',
                },
                addOldHide:true,
                // file: this.image ? this.image : '',
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
                datas: '',
                lansen: '',
                searchtxt: '',
                houseNum:'',
                disabled: false,
                disabled1: false,
                disabled2: false,
                disabled3: false,
                disabled4: false,
                disabled5: false,
                addNewDialogVisible: false,
                fileNS:'',
                searchHouse2: {
                    pageSize: 20,
                    pageNumber: 1,
                    // keyWords:'',
                },
                childseller: {
                    id: '',
                    name: '',
                    size: '',
                    location: '',
                    isDel: 0,
                    isFee: 0,
                    warnQuantity: 1,
                    bigUnitDesc: '',
                    smallUnitDesc: '',
                    barcode: '',
                    hisCode: '',
                    isOnly:'',
                    barcodeSize:'',
                    alias:'',
                },
                current:'',
                operation:'',
                rules: {
                    name: [
                        {required: true, message: '请输入物质名称', trigger: 'blur'},
                    ],
                    // size:[
                    //     { required: true, message: '请输入物资规格', trigger: 'blur' },
                    // ],
                    location: [
                        {required: true, message: '请输入物资库位', trigger: 'blur'},
                    ],
                    warnQuantity: [
                        {required: true, message: '请输入预警数量', trigger: 'change'},
                    ],
                    // bigUnitDesc:[
                    //     { required: true, message: '请输入包装单位', trigger: 'blur'},
                    // ],
                    // smallUnitDesc:[
                    //     { required: true, message: '请输入最小单位', trigger: 'blur'},
                    // ],
                    // barcode:[
                    //     { required: true, message: '请输入物资条码', trigger: 'blur'},
                    // ],
                }
            }

        },
        watch: {
            houseList: function () {
                this.$nextTick(function () {
                    if(this.$refs.uldom.children[this.cur]==undefined){
                        return
                    }
                    let uld = this.$refs.uldom.children[this.cur].id;
                    if (uld !== '') {
                        this.infoViews(uld, this.cur)
                    }
                });
            }
        },
        // beforeDestroy () {
        //     this.stopNavigator()
        // },
        created() {
            this.submenuMenuId();
            if (this.$route.params.inputNO !== '') {
                this.searchtxt = this.$route.params.inputNO;
                this.queryClick(this.$route.params.inputNO);
            }
            this.$watch('searchtxt', debounce((newQuery) => {
                this.queryClick(newQuery);
            }, 1000))

        },
        methods: {
            queryClick(val) {
                let mv = this;
                mv.searchHouse.pageNumber = 1;
                mv.houseList = [];
                mv.current='';
                mv.cur = 0;
                mv.querySearch(val);
            },
            number(){
                let mv = this;
                mv.childseller.barcodeSize=mv.childseller.barcode.length>parseInt(mv.childseller.barcodeSize);
            },
            //首页加载权限
            submenuMenuId() {
                let mv=this;
                submenuMenuId(this.$store.state.user.Secondm.catalog.id).then(response => {
                    if(response.code=='-1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                        });
                        return
                    }
                    // mv.jurisdiction = response.data;
                    if(response.data[0].children=='operation'){
                        mv.operation=response.data[0].ststus
                    }


                    // mv.materialAdd=response.data[0].children.;
                    // mv.materialDel=response.data.children.materialDel;

                });
            },
            //是否勾选
            handleCheckedCitiesChange(value){
                let mv = this;
               if(mv.childseller.isOnly==1){
                   mv.checkedHide=true;
               }else {
                   mv.checkedHide=false;
                   mv.childseller.barcodeSize=0;
               }
            },

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

                    }
                )
            },
            //搜索
            querySearch(val) {
                let mv = this;
                let hou = this.searchHouse;
                hou.keyWords = val;
                herpPage(this.Qs.stringify(hou)).then(res => {
                    if (res.code !== '1') {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                        });
                        return
                    }
                    if(res.data==null){
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
                        mv.noMore = true // 切换底部提示信息
                        mv.droping = false
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
                })
            },
            //添加到二级库
            addOldButton(childseller) {
                let mv = this;
                mv.preImg='';
                mv.seachHide=false;
                mv.useLocation(mv.childseller.location);
                if(childseller.codeType==1){
                    childseller.isOnly=1
                }
                // mv.postData.img='';
                this.addNewDialogVisible = true;
                mv.childseller.id = childseller.id;
                mv.childseller.name = childseller.name;
                mv.childseller.size = childseller.size;
                mv.childseller.location = childseller.location;
                mv.childseller.isDel = childseller.isDel === null ? 0 : 1;
                mv.childseller.isFee = childseller.isFee === null ? 0 : 1;
                mv.childseller.warnQuantity = childseller.warnQuantity;
                mv.childseller.bigUnitDesc = childseller.bigUnitDesc;
                mv.childseller.smallUnitDesc = childseller.smallUnitDesc;
                mv.childseller.barcode = childseller.barcode;
                mv.childseller.hisCode = childseller.hisCode;
                mv.childseller.alias = childseller.alias;
                mv.childseller.isOnly = childseller.isOnly;
                if(childseller.codeType!==null){
                    mv.childseller.codeType = childseller.codeType;
                    mv.addOldHide=false;
                }else {
                    mv.childseller.codeType = childseller.codeType;
                    mv.addOldHide=true;
                }
                if (mv.childseller.name !== '') {
                    mv.disabled = true;
                }
                if (mv.childseller.size !== '') {
                    mv.disabled1 = true;
                }
                if (mv.childseller.bigUnitDesc !== '') {
                    mv.disabled2 = true;
                }
                if (mv.childseller.smallUnitDesc !== '') {
                    mv.disabled3 = true;
                }
                if (mv.childseller.barcode !== '') {
                    mv.disabled4 = true;
                }
                if (mv.childseller.hisCode !== '') {
                    mv.disabled5 = true;
                }

            },
            //添加新到二级库
            addNewButton() {
                let mv = this;
                mv.seachHide=true;
                mv.useLocation(mv.childseller.location);
                mv.addOldHide=true;
                mv.childseller.id = '';
                mv.childseller.name = '';
                mv.childseller.size = '';
                mv.childseller.location = '';
                mv.childseller.isDel = null ? 1 : 0;
                mv.childseller.isFee = null ? 1 : 0;
                mv.childseller.warnQuantity = 1;
                mv.childseller.bigUnitDesc = '';
                mv.childseller.smallUnitDesc = '';
                mv.childseller.barcode = '';
                mv.childseller.hisCode = '';
                mv.childseller.alias = '';
                mv.childseller.isOnly =null ? 1 : 0;
                mv.disabled = false;
                mv.disabled1 = false;
                mv.disabled2 = false;
                mv.disabled3 = false;
                mv.disabled4 = false;
                mv.disabled5 = false;
                mv.preImg='';
                // mv.postData.img='';
                this.addNewDialogVisible = true;
            },
            //提交新物资
            HistoryAddNewButton(childseller) {
                let mv = this;
                this.$refs[childseller].validate((valid) => {
                    if (valid) {
                        materialAdds(this.childseller).then(response => {
                            if (response.code == '-1') {
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
                                duration: 1000,
                            });
                            if (response.code == 1) {
                                // this.generatorFileMd5(file.file)
                                // 自定义上传row.id,{status:row.status}
                                if(mv.preImg !==''){
                                    setTimeout(() => {
                                        mv.timeT(response.data);
                                        mv.preImg='';
                                        // mv.postData.img='';
                                    }, 1000);
                                }


                            }
                            this.checkedHide=false;
                            this.childseller.barcodeSize=0;
                            this.addNewDialogVisible = false;
                            // this.$refs.upload.submit();
                            // this.$refs[childseller].resetFields();


                        });
                    } else {
                        this.$message({
                            message: '请填写必填值',
                            type: 'error',
                            duration: 1000,
                        });
                        return false;
                    }
                });
                // mv.hiddenMain=false;
                // mv.showMain=true;

            },
            // DIFDialogVisibleClick(){
            //     let mv=this;
            //     mv.DIFDialogVisible=true;
            // },
            // 调用权限（打开摄像头功能）

            getCompetence () {
                let mv=this;
                let _this = this;
                mv.thisCancas = document.getElementById('canvasCamera');
                mv.thisContext = this.thisCancas.getContext('2d');
                mv.thisVideo = document.getElementById('videoCamera');
                // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {}
                }
                // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
                // 使用getUserMedia，因为它会覆盖现有的属性。
                // 这里，如果缺少getUserMedia属性，就添加它。
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = function (constraints) {
                        // 首先获取现存的getUserMedia(如果存在)
                        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
                        // 有些浏览器不支持，会返回错误信息
                        // 保持接口一致
                        if (!getUserMedia) {
                            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
                        }
                        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
                        return new Promise(function (resolve, reject) {
                            getUserMedia.call(navigator, constraints, resolve, reject)
                        })
                    }
                }
                let constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                    // 旧的浏览器可能没有srcObject
                    if ('srcObject' in _this.thisVideo) {
                        _this.thisVideo.srcObject = stream
                    } else {
                        // 避免在新的浏览器中使用它，因为它正在被弃用。
                        _this.thisVideo.src = window.URL.createObjectURL(stream)
                    }
                    _this.thisVideo.onloadedmetadata = function (e) {
                        _this.thisVideo.play()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            addhandleClose(){
                let mv = this;
                mv.checkedHide=false;
                mv.addNewDialogVisible=false;
                mv.childseller.barcodeSize=0;
            },
            handleClose(){
                this.DIFDialogVisible=false;
                // this.stopNavigator();
            },
            // 绘制图片（拍照功能）
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
            // base64转文件
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
            // 关闭摄像头
            // stopNavigator () {
            //     this.thisVideo.srcObject.getTracks()[0].stop()
            // },
            // 预警数量
            handleWarn() {

            },
            handleRemove() {
                this.file = '';
            },
            // 选取图片后自动回调，里面可以获取到文件
            // imgSaveToUrl(event) {  // 也可以用file
            //     this.localFile = event.raw; // 或者 this.localFile=file.raw
            //     this.localFileE = event;
            //
            //     // 转换操作可以不放到这个函数里面，
            //     // 因为这个函数会被多次触发，上传时触发，上传成功也触发
            //     let reader = new FileReader();
            //     reader.readAsDataURL(event.raw);// 这里也可以直接写参数
            //
            //     // 转换成功后的操作，reader.result即为转换后的DataURL ，
            //     // 它不需要自己定义，你可以console.log(reader.result)看一下
            //     reader.onload = () => {
            //         this.locaImgs = reader.result;
            //     }
            //
            //     /* 另外一种本地预览方法 */
            //     let URL = window.URL || window.webkitURL;
            //     this.imageUrl = URL.createObjectURL(event.raw);
            //     // 转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
            // },
            onPickFile2() {
                this.$refs.fileInput.click();
            },
            getFile2: function(e) {
                let mv=this;
                // console.log("e是什么",e)
                if(mv.preImg==''){
                    let $target = e.target || e.srcElement;
                    mv.fileNS = $target.files[0];
                }else {
                    let files = mv.preImg; // 把整个base64给file
                    let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
                    let time=(new Date()).valueOf();//生成时间戳
                    let name = time + ".jpg"; // 定义文件名字（例如：abc.png ， cover.png）
                    let conversions = this.dataURLtoFile(files, name); // 调用base64转图片方法
                    let file=new FormData();
                    file.append('files',conversions);
                    mv.fileNS= conversions;
                }

                // if()


                // 上传的图片
                // mv.preImg=this.imgSrc;


                this.postData.img = mv.fileNS;   //存放提交图片
                let reader = new FileReader();
                reader.readAsDataURL(mv.fileNS);
                reader.onload = data => {
                    let res = data.target || data.srcElement;
                    //   预览的图片
                    this.preImg = res.result;
                };
                // document.getElementById("upimg").value = "";  //这是能否上传同一张图片的关键
                // console.log("gaidongchenggong");
            },
            //  上传图片
            // handleAvatarSuccess(response) {
            //     this.file = url;
            // },
            beforeAvatarUpload() {

            },
            // handleChange() {
            //     this.$refs.upload.submit();
            // },
            //延误上传图片
            timeT(timessd){
                let mv = this;
                fileUploadH(timessd, mv.postData.img).then(response => {
                    if (response.code == '-1') {
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
                        duration: 1000,
                    });

                });
            },
            //关闭
            closeTray() {
                if (this.lansen == '') {
                    this.$message({
                        type: 'error',
                        message: '请输入库位',
                        duration: 1000,
                    });
                    return false;
                }
                this.lansen=this.$store.state.LibraryLo;
                closeL(this.lansen).then(response => {
                    this.$store.state.recordPrevious=0;
                    this.openFullScreen2();
                    if (response.code !== '1') {
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
            munOK(data) {
                let vm = this;

                vm.lansen = data.location;
                this.$store.state.LibraryLo=vm.lansen;
                openL(data.location).then(res => {
                    if (res.code !== '1') {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }
                    // data.supplyQuantity =data.realQuantity;
                    // data.checkStatus=1;
                    // this.valueEquals=true;
                    vm.$message({
                        type: 'success',
                        message: res.msg,
                        duration: 1000,
                    });
                    return false;
                }).catch(err => {
                    vm.$message({
                        type: 'error',
                        message: err.msg,
                        duration: 1000,
                    });
                    return false;
                });
            },

            loadMore() {
                setTimeout(() => {
                    let mv = this;
                    if (!mv.busy) {
                        mv.busy = true;// 将无限滚动给禁用
                        if (mv.searchHouse.keyWords == '') {
                            mv.searchHouse.pageNumber++ // 增加页数
                            mv.searchSource();// 请求数据
                        } else {
                            mv.searchHouse.pageNumber++ // 增加页数
                            mv.querySearch(mv.searchtxt);
                        }
                    }
                }, 500);
            },
            searchSource() {
                let mv = this;
                catalogs({
                    pageSize: this.searchHouse.pageSize,
                    pageNumber: this.searchHouse.pageNumber
                }).then(response => {
                    if (response.code !== '1') {
                        this.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }
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
                        mv.noMore = true // 切换底部提示信息
                        mv.droping = false;
                        mv.current= mv.houseList.length;
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
            infoViews(id, index) {
                let mv = this;
                mv.cur = index;
                mv.danViewsLoadding = true;
                getHerp(id).then(res => {
                    if (res.code !== '1') {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration: 1000,
                        });
                        return
                    }
                    mv.danViews = res.data;
                    mv.danViewsLoadding = false;
                    if (mv.danViews.imgUrl == '') {
                        mv.danViews.imgUrl = big
                    }

                })
            },

            //物资搜索
            querySearchAsync(queryString, cb) {
                if(queryString!==''){
                    let mv = this;
                    let list = [{}];
                    let hou = this.searchHouse2;
                    hou.keyWords = queryString;

                        this.timeout = setTimeout(() => {
                            searchPage(this.Qs.stringify(hou)).then(response => {

                                let allCity=response.data.result;
                                // this.restaurants
                                // let restaurants = this.restaurants;
                                // let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                                for (let i = 0; i < allCity.length; i += 1) {
                                    allCity[i].value = allCity[i].name;
                                    // delete allCity[i].name;
                                }
                                list=allCity;
                                clearTimeout(this.timeout);
                            cb(list);
                                // this.$refs.elautocomplete.handleSelect();
                                if(allCity.length<response.data.total){
                                    list.push({type: 'more'});
                                }
                            });
                        }, 1000 * Math.random());

                }


            },
            // createStateFilter(queryString) {
            //     return (state) => {
            //         return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },
            handleSelect(item) {
                let mv = this;
                mv.childseller=item;
                mv.childseller.location='';
                // console.log(item);
            }
        },
        mounted() {
            // this.restaurants = this.loadAll();
            // this.infoViews(11,0);
        },
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
      margin: 14px 10px 14px 0;
    }
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
        position: relative;
        /*line-height: 84px;*/
        /*height: 84px;*/
        border-bottom-color: #dde8ec;
        border-bottom-width: 1px;
        border-bottom-style: solid;

        .templateLeftImg {
          width: 138px;
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
  .templateSF{
      height: 100%;
      position: relative;
      width: 100%;
      display: flex;
      padding-left: 125px;
  }
        .templateLeftSpan {
          padding: 20px;
          float: left;
          width: 100% ;
          position: relative;

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p::before,span::before {
            content:"\007C ";
            opacity:0;
          }
          span {
            float: left;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
          }

          button {
            float: right;
            /*color: #0eb2ea;*/
            /*border: 2px dashed #0eb2ea;*/
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
        height: calc(100% - 120px);

        .picturesListImg {
          width: 80%;
          display: block;
          margin: 0 auto 30px;
          height: calc(100% - 180px);

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
            line-height: 40px;
            height: 40px;
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

        .listHeightList {
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
          h3::before,p::before {
            content:"\007C ";
            opacity:0;
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

  .itemNew {
    margin-left: 10px;
    float: right;
  }

  .picturesListEject {
    float: left;
    width: 100%;
    margin-top: 20px;
    height: calc(100% - 150px);
    overflow-y: auto;
    .picturesListImg {
      width: 100px;
      display: block;
      margin: 0 auto 30px;
      /*height: calc(100% - 300px);*/
      height: 100px;

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
        height: 40px;
        float: left;
        margin-top: 10px;
        width: 100%;
        display: flex;
      }

      span {
        font-size: 16px;
        float: left;
      }

      p {
        font-size: 16px;
        float: left;
        width: 100px;
        padding-left: 10px;
      }

    }
  }

  .hButton {
    width: 100%;
    text-align: center;
    display: inline-block;
    /*margin-top: 24px;*/
    padding-top: 24px;
    border-top: 1px solid #ddd;
  }

  .privilegeCentreLiSwitch {
    width: 100%;
    padding-top: 10px;

  }

  .picturesTom {
    .picturesAdd {
      margin-bottom: 20px;
    }
  }

  .templateButtonBlur {
    color: #fff;
  }
  .onpickConent{
    /*display:flex;*/
    /*flex-direction: column;*/
    /*flex-wrap: wrap;*/
    /*justify-content:Center;*/
    float: left;
    margin-bottom: 20px;

    .onpickOld{
      position:relative;
      display:inline-block;

    }
    .onpickFile{
      width: 200px;
      height: 200px;

      text-align: center;
      border: 1px dashed #ddd;
      line-height: 200px;
      cursor:pointer;
      font-size: 30px;
    }
    .onpickImg{
      width:200px;
      height:200px;

    }
    .onpickDIV{
      cursor: pointer;
      position:absolute;
      top:0px;
      left:92%;
      background:red;
      color:white;
      border-radius:50%;
      height:18px;
      width:18px;
      font-weight:bold;
      text-align:center;
      line-height:18px
    }
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
  .ruleF{
    width: 100%;
    margin-bottom: 10px;
    .el-select{
      width: 100%;
    }
  }
  .infoNum{
    float: right;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #97a8be;
  }
</style>
