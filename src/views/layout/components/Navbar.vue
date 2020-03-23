<template>
  <el-menu class="navbar" mode="horizontal" :default-active="$route.path">
    <!--    点击左侧菜单按钮已注释-->
    <hamburger class="hamburger-container" id="hamburger-container" :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>

    <el-dropdown class="avatar-container" id="hamburger-avatar" trigger="click">
      <div class="avatar-wrapper">
        <svg-icon icon-class="logo-20" class="color-main"></svg-icon>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown" style="margin: 0;">
        <div class="userImg">
          <div class="userImgT"><img class="user-avatar" alt="" :src="portrait"></div>
          <p>{{htsn}}</p></div>

        <!--        <router-link class="inlineBlock" style="float: left;width: 100%;" to="" >-->
        <el-dropdown-item style="float: left;width: 100%;margin-top: 0;border-top:0 ;">
            <span @click="dialogVisibleModifys" style="display:block;">
               修改密码
            </span>

        </el-dropdown-item>
        <!--        </router-link>-->
        <el-dropdown-item style="float: left;width: 100%;margin-top: 0;border-top:0 ;">
            <span @click="dialogVisibleSetups" style="display:block;">
               系统设置
            </span>

        </el-dropdown-item>
        <el-dropdown-item style="float: left;width: 100%;margin-top: 0;border-top:0 ;" divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <HeaderHmoeRight>
    </HeaderHmoeRight>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisibleModify"
      width="30%"
    >
      <div class="passWitch">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="text" v-model="ruleForm2.pass"  auto-complete="off" autocomplete="off" placeholder="密码需要6位数以上"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="text" v-model="ruleForm2.checkPass" auto-complete="off" autocomplete="off"
                      placeholder="密码需要6位数以上"></el-input>
          </el-form-item>
          <!--          <el-form-item label="年龄" prop="age">-->
          <!--            <el-input v-model.number="ruleForm2.age"></el-input>-->
          <!--          </el-form-item>-->
          <div class="footPassT">
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </div>
        </el-form>
        <!--         <span >-->
        <!--    <el-button @click="dialogVisibleModify = false">取 消</el-button>-->
        <!--    <el-button type="primary" @click="dialogVisibleModify = false">确 定</el-button>-->
        <!--  </span>-->
      </div>

    </el-dialog>
    <el-dialog
      title="系统设置"
      :visible.sync="dialogVisibleSetup"
      width="30%"
    >
<!--      <div class="passWitch">-->
<!--&lt;!&ndash;        <el-checkbox v-model="Setupvalue">是否2次确认</el-checkbox>&ndash;&gt;-->
<!--      </div>-->
      <div class="passWitch">
        <el-button @click.prevent.stop="SetupGuide">进行引导</el-button>
      </div>

    </el-dialog>
  </el-menu>

</template>

<script>
  import {mapGetters,} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import HeaderHmoeRight from '@/components/HeaderHmoeRight'
  import portrait from '@/assets/images/portrait.jpg';
  import Driver from 'driver.js' // import driver.js
  import 'driver.js/dist/driver.min.css' // import driver.js css
  import steps from './steps';
  import md5 from "js-md5";
  import {
    changePassword
  } from '@/api/systemsL'

  export default {
    data() {
      // let checkAge = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('年龄不能为空'));
      //   }
      //   setTimeout(() => {
      //     if (!Number.isInteger(value)) {
      //       callback(new Error('请输入数字值'));
      //     } else {
      //       if (value < 18) {
      //         callback(new Error('必须年满18岁'));
      //       } else {
      //         callback();
      //       }
      //     }
      //   }, 1000);
      // };
      let validatePass = (rule, value, callback) => {
        if (value === '' || value.length < 6) {
          callback(new Error('请输入密码或密码需要6位数以上'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '' || value.length < 6) {
          callback(new Error('请再次输入密码或密码需要6位数以上'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        restaurants: [],
        state: '',
        portrait,
        htsn: '',
        tokeo: this.$store.state.userHeader,
        dialogVisibleModify: false,
        dialogVisibleSetup: false,
        // Setupvalue: this.$store.state.choices,
        ruleForm2: {
          pass: '',
          checkPass: '',

          // age: ''
        },
        userNames:'',
        userlds:'',
        driver: null,
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          // age: [
          //   { validator: checkAge, trigger: 'blur' }
          // ]
        }
        // warning:true,
      }

    },
    // props:['warning'],
    // props: {
    //
    // },
    components: {
      Breadcrumb,
      Hamburger,
      HeaderHmoeRight
    },
    mounted() {
      this.driver = new Driver({
        doneBtnText: "完成", // Text on the final button
        closeBtnText: "关闭", // Text on the close button for this step
        nextBtnText: "下一步", // Next button text for this step
        prevBtnText: "上一步" // Previous button text for this step
      });
        this.getUserIP((ip) => {
            sessionStorage.setItem('IpPositonhome',ip);
            // this.$store.state.adminIp = ip;
        });
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
      ]),
      userHeader: function () {

        let jsonStr = localStorage.getItem('tokeng');
        let jso = JSON.parse(jsonStr);
        return jso.name;
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


    },

    methods: {
      SetupGuide() {
        let mv = this;
        mv.dialogVisibleSetup = false;
        this.driver.defineSteps(steps)
        this.driver.start()
      },
      dialogVisibleModifys() {
        let mv = this;
        mv.dialogVisibleModify = true;
        // let jsonStr = localStorage.getItem('tokeng');

      },
        //  获取本地IP
        getUserIP(onNewIP) {
            let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            let pc = new MyPeerConnection({
                iceServers: []
            });
            let noop = () => {
            };
            let localIPs = {};
            let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
            let iterateIP = (ip) => {
                if (!localIPs[ip]) onNewIP(ip);
                localIPs[ip] = true;
            };
            pc.createDataChannel('');
            pc.createOffer().then((sdp) => {
                sdp.sdp.split('\n').forEach(function (line) {
                    if (line.indexOf('candidate') < 0) return;
                    line.match(ipRegex).forEach(iterateIP);
                });
                pc.setLocalDescription(sdp, noop, noop);
            }).catch((reason) => {
            });
            pc.onicecandidate = (ice) => {
                if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
                ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
            };
        },
      dialogVisibleSetups() {
        let mv = this;
        mv.dialogVisibleSetup = true;

      },
      submitForm(formName) {
        let mv = this;
        let jsonStr = localStorage.getItem('tokeng');


        if (jsonStr == "[object Object]") {

          this.userNames= this.$store.state.user.token.name;
          this.userlds=this.$store.state.user.token.id;
        } else {
          let jso = JSON.parse(jsonStr);
          this.userNames = jso.name;
          this.userlds=jso.id;
        }
        let sendData = '';
        sendData += `userId=${this.userlds}&`;
        sendData += `username=${this.userNames}&`;
        sendData += `pwd=${md5(mv.ruleForm2.pass)}&`;
        changePassword(sendData).then(response => {
            if (response.code !== '1') {
              this.$message({
                message: response.msg,
                type: 'error',
              });
              return
            } else {
              this.$message({
                type: 'success',
                message: response.msg
              });
              mv.dialogVisibleModify = false;
            }

          }
        )
      },
      resetForm(formName) {
        let mv = this;
        this.$refs[formName].resetFields();
      },
      // handleClose(done) {
      //
      // },
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
          this.$router.push({path: '/login'});

        })
      },

    },

  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .navbar {
    height: 72px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
      line-height: 58px;
      height: 100%;
      float: left;
      padding: 0 10px;
    }

    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }

    .avatar-container {
      height: 72px;
      display: inline-block;
      /*position: absolute;*/
      float: right;
      margin-right: 16px;
      margin-left: 16px;

      .avatar-wrapper {
        cursor: pointer;
        padding-top: 14px;
        position: relative;

        .svg-icon {
          width: 24px;
          height: 24px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .userImg {
    float: left;
    height: 75.4px;
    line-height: 75.4px;
    width: 100%;

    .userImgT {
      width: 45px;
      height: 45px;
      margin: 14px 0 14px 18px;
      float: left;

      .user-avatar {
        border-radius: 10px;
        float: left;
        width: 100%;
        height: 100%;
        display: flex;
      }
    }

    p {
      float: left;
      font-size: 16px;
      padding-left: 10px;

    }
  }

  .passWitch {
    display: inline-block;
    width: 100%;
  }

  .demo-ruleForm {
    .el-form-item {
      margin-bottom: 25px;
    }

    .footPassT {
      display: inline-block;
      width: 100%;
      text-align: center;

      .el-form-item__content {
        margin-left: 0 !important;
      }
    }

  }
</style>

