<template>
  <div class="allocationD">
    <el-col :span="24" class="templateRight" style="display: block">
      <!--        <div v-if="danViewsLoadding" class="danViewsLoadding">正在加载</div>-->
      <div>
        <el-main>
          <el-container>
            <div class="listHeader listInputs">
              <div class="listHeaderOne">
                <el-col :span="20"><h3>{{childseller.name}}</h3></el-col>
                <el-col :span="4"><h4 v-show="hides">{{childseller.location}}</h4>
                  <el-input v-show="finds" style="margin-top:-3px;margin-left: 5px;float: right"
                            v-model="tionc=childseller.location" placeholder="请输入库位"></el-input>
                  <p style="float: right;">库位:</p></el-col>
              </div>
              <div class="listHeaderTwo">
                <span>{{childseller.size}}</span>
                <!--                <el-button >{{btnText}}</el-button>-->

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
                      <div class="grid-content bg-purple"><p>包装单位</p><span>{{childseller.bigUnit}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><p>最小单位</p><span>{{childseller.smallUnitDesc}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple"><p>是否启用</p>
                        <el-switch v-show="finds" class="privilegeCentreLiSwitch" style="height: 100%; float: left;"
                                   v-model="childseller.isDel" @change="parens22(childseller.isDel)" active-value="0"
                                   inactive-value="1" active-color="#13bbf4" inactive-color="#e5e5e5"></el-switch>
                        <span v-show="hides">{{childseller.isDel===0?'是':'否'}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple-light"><p>计费</p>
                        <el-switch v-show="finds" class="privilegeCentreLiSwitch" style="height: 100%; float: left;"
                                   v-model="childseller.isFee" @change="parens21(childseller.isFee)" active-value="1"
                                   inactive-value="0" active-color="#13bbf4" inactive-color="#e5e5e5"></el-switch>
                        <span v-show="hides">{{childseller.isFee===0?'否':'是'}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple-light"><p>关联HIS</p><span>{{childseller.hisCode}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple-light"><p>拼音</p>
                        <el-input v-show="finds" v-model="childseller.pinyin" placeholder="请输入拼音"></el-input>
                        <span v-show="hides">{{childseller.pinyin}}</span></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple" style="width: 100%;"><p>封面图片</p>
                        <el-upload
                          class="upload-demo  uploaddemo"
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
                          <el-button v-show="finds" class="iconfont icon-g2" style="color: #00b2ed"></el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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


    <!--    <el-row class="allocationU">-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>物资名称：</span>-->
    <!--          <el-tooltip class="item" effect="dark" placement="top">-->
    <!--            <div slot="content">{{childseller.name}}</div>-->
    <!--            <p>{{childseller.name}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple-light"><span>补充数量：</span>-->
    <!--          <el-tooltip class="item" effect="dark" placement="top">-->
    <!--            <div slot="content">{{childseller.supplyQuantity}}</div>-->
    <!--            <p>{{childseller.supplyQuantity}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>预警数量：</span>-->
    <!--          <el-input v-show="finds" v-model="childseller.warnQuantity" placeholder="请输入预警数量"></el-input>-->
    <!--          <el-tooltip class="item" v-show="findIS" effect="dark" content="childseller.warnQuantity" placement="top">-->
    <!--            <div slot="content">{{childseller.warnQuantity}}</div>-->
    <!--            <p>{{childseller.warnQuantity}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>物资规格：</span>-->
    <!--          <el-tooltip class="item" effect="dark" content="childseller.size" placement="top">-->
    <!--            <div slot="content">{{childseller.size}}</div>-->
    <!--            <p>{{childseller.size}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>包装单位：</span>-->
    <!--          <el-tooltip class="item" effect="dark" content="childseller.bigUnit" placement="top">-->
    <!--            <div slot="content">{{childseller.bigUnit}}</div>-->
    <!--            <p>{{childseller.bigUnit}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>最小单位：</span>-->
    <!--          <el-tooltip class="item" effect="dark" content="childseller.smallUnitDesc" placement="top">-->
    <!--            <div slot="content">{{childseller.smallUnitDesc}}</div>-->
    <!--            <p>{{childseller.smallUnitDesc}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>是否启用：</span>-->
    <!--          <el-switch  v-show="finds" class="privilegeCentreLiSwitch" style="height: 100%; padding-left: 20px"-->
    <!--                     v-model="isDc=childseller.isDel" active-value="1" inactive-value="0" active-color="#13bbf4" inactive-color="#e5e5e5"></el-switch>-->
    <!--          <el-tooltip class="item" v-show="findIS" effect="dark" content="childseller.isDel" placement="top">-->
    <!--            <div slot="content">{{isDc=childseller.isDel===1?'是':'否'}}</div>-->
    <!--            <p>{{isDc=childseller.isDel===1?'是':'否'}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>计费：</span>-->
    <!--          <el-switch  class="privilegeCentreLiSwitch" style="height: 100%; padding-left: 20px"-->
    <!--                     v-model="isFc=childseller.isFee"  @change="parens2($event)"  active-value="1" inactive-value="0" active-color="#13bbf4" inactive-color="#e5e5e5"></el-switch>-->
    <!--          <el-tooltip class="item"   effect="dark" content="childseller.isFee" placement="top">-->
    <!--            <div slot="content">{{isFc=childseller.isFee===1?'是':'否'}}</div>-->
    <!--            <p>{{isFc=childseller.isFee===1?'是':'否'}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>关联HIS：</span>-->
    <!--          <el-tooltip class="item" effect="dark" content="childseller.hisCode" placement="top">-->
    <!--            <div slot="content">{{childseller.hisCode}}</div>-->
    <!--            <p>{{childseller.hisCode}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>库位：</span>-->
    <!--          <el-input v-show="finds" v-model="tionc=childseller.location" placeholder="请输入库位"></el-input>-->
    <!--          <el-tooltip class="item" v-show="findIS" effect="dark" content="childseller.location" placement="top">-->
    <!--            <div slot="content">{{childseller.location}}</div>-->
    <!--            <p>{{childseller.location}}</p></el-tooltip>-->
    <!--&lt;!&ndash;          <el-button v-show="finds" style="right:0;top: 50%; background: #1fd7d8;color: #fff; position: absolute;  transform: translateY(-50%);">选择</el-button>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>拼音：</span>-->
    <!--          <el-input v-show="finds" v-model="yinc=childseller.pinyin" placeholder="请输入拼音"></el-input>-->
    <!--          <el-tooltip v-show="findIS"  class="item" effect="dark" content="childseller.pinyin" placement="top">-->
    <!--            <div slot="content">{{childseller.pinyin}}</div>-->
    <!--            <p>{{childseller.pinyin}}</p></el-tooltip>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="grid-content bg-purple"><span>封面图片：</span>-->
    <!--&lt;!&ndash;          <p></p>&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-button type="text" v-show="finds" @click="dialogVisible = true">选择模式</el-button>&ndash;&gt;-->

    <!--&lt;!&ndash;          <el-dialog&ndash;&gt;-->
    <!--&lt;!&ndash;            title="选择模式"&ndash;&gt;-->
    <!--&lt;!&ndash;            :visible.sync="dialogVisible"&ndash;&gt;-->
    <!--&lt;!&ndash;            width="30%"&ndash;&gt;-->
    <!--&lt;!&ndash;            >&ndash;&gt;-->
    <!--&lt;!&ndash;            <el-dialog&ndash;&gt;-->
    <!--&lt;!&ndash;              width="30%"&ndash;&gt;-->
    <!--&lt;!&ndash;              title="拍照"&ndash;&gt;-->
    <!--&lt;!&ndash;              :visible.sync="innerVisible"&ndash;&gt;-->

    <!--&lt;!&ndash;              append-to-body>&ndash;&gt;-->

    <!--&lt;!&ndash;                <div class="cameraBox" :mask-closable='false' >&ndash;&gt;-->
    <!--&lt;!&ndash;                  <video id="video" width="300" height="220"></video>&ndash;&gt;-->
    <!--&lt;!&ndash;                  <canvas id='canvas' width='300' height='220' style="display: none"></canvas>&ndash;&gt;-->
    <!--&lt;!&ndash;                </div>&ndash;&gt;-->
    <!--&lt;!&ndash;                <div class="iCenter" style="margin-top: 20px">&ndash;&gt;-->
    <!--&lt;!&ndash;                  <Button type='primary' long size='large' @click="takePhone" style='width: 200px;' :loading="loading.cameraLoading">拍照</Button>&ndash;&gt;-->
    <!--&lt;!&ndash;                </div>&ndash;&gt;-->
    <!--&lt;!&ndash;            </el-dialog>&ndash;&gt;-->
    <!--&lt;!&ndash;         &ndash;&gt;-->
    <!--&lt;!&ndash;            <el-button style="display:block; margin:0 auto;width: 100%;" @click="handleCamera"">拍照上传</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;            <span slot="footer" class="dialog-footer" style="width: 100%;text-align: center">&ndash;&gt;-->
    <!--&lt;!&ndash;    <el-button @click="dialogVisible = false">取 消</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;  </span>&ndash;&gt;-->
    <!--&lt;!&ndash;          </el-dialog>&ndash;&gt;-->
    <!--          <el-upload-->
    <!--            class="upload-demo uploadImg"-->
    <!--            ref="upload"-->
    <!--            :multiple="false"-->
    <!--            :http-request = "customUpload"-->
    <!--            action="http://101.132.253.140:8081/api/file/upload/"-->
    <!--            :on-remove="handleRemove"-->
    <!--            :on-change="handleChange"-->
    <!--            :file-list="fileList"-->
    <!--            :auto-upload="true"-->
    <!--            accept="image/jpeg,image/png"-->
    <!--            :limit="1"-->
    <!--          >-->
    <!--            <el-button v-show="finds" class="iconfont icon-g2" style="color: #00b2ed"></el-button>-->
    <!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    <!--          </el-upload>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <!--    <div class="allocationImg">-->
    <!--      <div class="allocationW">-->
    <!--        <img :src="childseller.imgUrl" @error="imgError(childseller)">-->
    <!--      </div>-->
    <!--    </div>-->
  </div>

</template>
<!--action: 图片上传的地址-->
<!--show-file-list: 是否显示文件上传列表-->
<!--accept: 可接受的上传类型，image/*为图片-->
<!--headers: 头部信息-->
<!--on-success: 上传成功事件-->
<!--on-error: 上传失败事件-->
<!--before-upload: 上传前处理事件，返回一个值，值为false将阻止上传-->
<!--on-progress: 上传中事件-->
<script>
  import big from '@/assets/images/big.jpg';

  import {
    fileUpload
  } from '@/api/oss'

  export default {
    name: "AllocationS",
    components: {},
    data() {
      return {
        // item: [
        //   {
        //     name: '结扎夹',
        //     muns: 1,
        //     mun: 18,
        //     specs: '施爱得NPM-100-2-B',
        //     bao: '包',
        //     min: '包',
        //     open: '是',
        //     rmb: '是',
        //     his: '114742',
        //     pos: '1-1-12',
        //     ping: 'ZJJ'
        //   },
        // ],
        big,
        dialogVisible: false,
        innerVisible: false,
        fileList: [],
        value1: true,
        value2: true,
        opener: false,
        FileImg: '',
        // isDc:this.childseller.isDel,
        // yinc:this.childseller.pinyin,
        // tionc:this.childseller.location,
        // warnc:this.childseller.warnQuantity,
        // isFc:this.childseller.isFee,
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
        memberRule: {},
        canvas: null,
        video: null,
        MediaStreamTrack: null,

      }
    },
    props: {
      childseller: {},
      editLibrary: {},
      finds: false,
      findIS: true,
      hides: true,
      datas: '',
    },
    watch: {
      editLibrary() {
        this.$emit.isFlee = true
      },

    },
    // mounted() {
    //   // 摄像头
    //   this.canvas = document.getElementById('canvas')
    //   this.video = document.getElementById('video')
    // },
    methods: {
      parens21(isFee) {
        this.$emit('parens2', isFee);
      },
      parens22() {
        this.$emit('parens23', isFee);
      },
      //输入后模糊查询现在不用
      // handleCamera() {
      //   this.innerVisible = true;
      //   this.modal.visibleCamera = true // 打开摄像头弹层
      //   let that = this
      //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      //     navigator.mediaDevices.getUserMedia({
      //       video: true,
      //       audio: true
      //     }).then(function (stream) {
      //       that.MediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1]
      //       that.MediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1]
      //       that.video.src = (window.URL).createObjectURL(stream)
      //       that.video.play()
      //     }).catch(function (err) {
      //       console.log(err)
      //     })
      //   } else if (navigator.getMedia) {
      //     navigator.getMedia({
      //       video: true
      //     }).then(function (stream) {
      //       that.MediaStreamTrack = stream.getTracks()[1]
      //       that.video.src = (window.webkitURL).createObjectURL(stream)
      //       that.video.play()
      //     }).catch(function (err) {
      //       console.log(err)
      //     })
      //   }
      // },
      // takePhone() {
      //   let that = this
      //   that.canvas.getContext('2d').drawImage(this.video, 0, 0, 300, 220)
      //
      //   let dataurl = that.canvas.toDataURL('image/jpeg')
      //   let blob = that.dataURLtoFile(dataurl, 'camera.jpg') // base64 转图片file
      //   let formData = new FormData()
      //   formData.append('file', blob)
      //   that.xhrPost(formData) // formdata方式上传图片
      // },
      // xhrPost(formData) {
      //   console.log('开始上传')
      //   let that = this
      //   that.loading.cameraLoading = true
      //   let xhr = null
      //   if (window.XMLHttpRequest) {
      //     xhr = new XMLHttpRequest()
      //   } else if (window.ActiveXObject) {
      //     xhr = new ActiveXObject('Microsoft.XMLHTTP')
      //   }
      //   if (xhr != null) {
      //     xhr.onreadystatechange = function () {
      //       if (xhr.readyState === 4) {
      //         if (xhr.status === 200) {
      //           let resData = JSON.parse(xhr.responseText)
      //           console.log(resData)
      //           if (resData.code === 200) {
      //             that.MediaStreamTrack && that.MediaStreamTrack.stop() // 关闭摄像头
      //             that.member.photo = resData.data.absolutePath
      //             that.loading.cameraLoading = false
      //             that.modal.visibleCamera = false
      //           } else {
      //             that.loading.cameraLoading = false
      //             that.$Notice.warning({title: '提示', desc: resData.msg})
      //           }
      //         }
      //       }
      //     }
      //     const user = JSON.parse(localStorage.getItem('userM'))
      //     xhr.open('post', 'http://192.168.8.45:8201/sys/uploadFile')
      //     // 请求头不需要可以删除
      //     xhr.setRequestHeader('Authorization', user.token)
      //     xhr.setRequestHeader('platform', '1')
      //     xhr.setRequestHeader('apiVersion', '1')
      //
      //     xhr.send(formData)
      //   } else {
      //     that.$Notice.warning({title: '提示', desc: '您的浏览器不支持XMLHTTP'})
      //   }
      // },
      // dataURLtoFile(dataurl, filename) {
      //   let arr = dataurl.split(',')
      //   let mime = arr[0].match(/:(.*?);/)[1]
      //   let bstr = atob(arr[1])
      //   let n = bstr.length
      //   let u8arr = new Uint8Array(n)
      //   while (n--) {
      //     u8arr[n] = bstr.charCodeAt(n)
      //   }
      //   return new File([u8arr], filename, {type: mime})
      // },

      customUpload(file) {
        // this.generatorFileMd5(file.file)
        // 自定义上传row.id,{status:row.status}
        fileUpload(this.childseller.id, file).then(response => {
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
                duration: 1000
            });
            return
          }
          console.log(response);
          this.FileImg = response.data;
          this.childseller.imgUrl = response.data;
          this.fileList = [];
          this.dialogVisible = false;
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

    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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

      .picturesListImg {
        width: 80%;
        display: block;
        margin: 0 auto;
        height: auto;

        img {
          width: 100%;
          height: 100%;
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

</style>
