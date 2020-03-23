<template>
  <div>
    <el-row style="display: flex;">
      <el-col :span="8"></el-col>
      <el-col :span="8" v-if="showPrise">
        <el-card :span="8" class="login-form-layout">
          <el-form autoComplete="on"
                   :model="loginForm"
                   :rules="loginRules"
                   ref="loginForm"
                   label-position="left">
            <div style="text-align: center" class="logoImg">
              <img :src="logos"/>
            </div>
            <!--        <h2 class="login-title color-main">mall-admin-web</h2>-->
            <el-form-item prop="username" class="usenameTop">
              <el-input name="username"
                        type="text"
                        v-model="loginForm.username"
                        autoComplete="on"
                        placeholder="请输入用户名" @keyup.enter.native="showIpunt()">
            <span slot="prefix">
              <svg-icon icon-class="47" class="color-main"></svg-icon>
            </span>
              </el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input name="password"
                        :type="pwdType"
                        @keyup.enter.native="handleLogin"
                        v-model="loginForm.pwd"
                        ref="ps"
                        autoComplete="on"
                        placeholder="请输入密码">
            <span slot="prefix">
              <svg-icon icon-class="48" class="color-main"></svg-icon>
            </span>
                <span slot="suffix" @click="showPwd">
<!--              <svg-icon class="color-main">show</svg-icon>-->
                  <!--                <p v-text="busText"></p>-->
                <svg-icon icon-class="yanjing" v-if="busIco" style="height: 100%;cursor: pointer;"
                          class="color-main"></svg-icon>
                <svg-icon icon-class="biyan" v-if="busIco1" style="height: 100%;cursor: pointer;"
                          class="color-main"></svg-icon>
                  <!--                 <i class="iconfont icon-yanjing"  style="font-size: 30px;color:#409EFF "></i>-->
                  <!--                 <i class="iconfont icon-biyan"  style="font-size: 30px;color:#409EFF"></i>-->
            </span>
              </el-input>
            </el-form-item>

            <el-form-item class="loginClause">
<!--                          <p style="float: left;">登录既代表阅读及同意<a>服务条款</a></p>-->
<!--              <p style="float: right;"><a @click="showregisters">注册账号</a></p>-->
            </el-form-item>
            <el-form-item style="margin-bottom: 30px">
              <el-button style="width: 100%;background: #06b3ee;" :loading="loading"
                         @click.native.prevent="handleLogin">
                <svg-icon icon-class="77" class="color-main"></svg-icon>
              </el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px">
              <el-button style="width: 100%;background: #fff;" @click="showCLikc"
                         class="loginsOther">
                选择其他登录方式
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="showPriseS">
        <el-card :span="8" class="login-form-layout">
          <div class="login-container">
            <h3>选择其他登录方式</h3>
            <ul>
              <li>
                <el-button class="loginButton" plain><i class="iconfont">&#xe610;</i>
                  <div class="loginBright"><span>指纹</span>
                    <p>在指纹读取器上扫描已注册的指纹</p></div>
                </el-button>
              </li>
              <li>
                <el-button class="loginButton" plain style="margin-bottom: .35rem"><i class="iconfont">&#xe655;</i>
                  <div class="loginBright" style="margin-top: .08rem;"><span>人脸识别</span></div>
                </el-button>
              </li>
            </ul>
            <div class="loginFooter">
              <el-button class="loginBFoot" type="primary" @click="showCLikS" >
                <i class="iconfont" >返回登录</i>
              </el-button>
            </div>

          </div>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="showregister">
        <el-card :span="8" class="login-form-layout">
          <div class="login-container">
            <h3>注册账号</h3>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width=".5rem" class="demo-ruleForm">
              <el-form-item label="账号" prop="age">
                <el-input v-model.number="ruleForm2.age"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
            <div class="loginFooter">
              <el-button class="loginBFoot" type="primary" @click="showCLikG" >
                <i class="iconfont" >返回登录</i>
              </el-button>
            </div>

          </div>
        </el-card>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <!--    <img :src="login_center_bg" class="login-center-layout">-->
    <!--    <el-dialog-->
    <!--      title="特别赞助"-->
    <!--      :visible.sync="dialogVisible"-->
    <!--      width="30%">-->
    <!--      <span>mall项目已由CODING特别赞助，点击去支持，页面加载完后点击<span class="color-main font-medium">免费体验</span>按钮即可完成支持，谢谢！</span>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="dialogCancel">残忍拒绝</el-button>-->
    <!--    <el-button type="primary" @click="dialogConfirm">去支持</el-button>-->
    <!--  </span>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  // import {setSupport,getSupport} from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import logos from '@/assets/images/logo.png';

  export default {
    name: 'login',

    data() {
      const validateUsername = (rule, value, callback) => {
        if (value=='') {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };

      const checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      const validatePassG = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        busText: 'Show',
        loginForm: {
          username: '',
          pwd: '',
          //  111111 tiny
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          pwd: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        showPrise: true,
        showPriseS:false,
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible: false,
        logos,
        busIco: false,
        busIco1: true,

        showregister:false,
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePassG, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      }
    },
    created() {

    },
    methods: {
        showIpunt(){
            this.$nextTick((x)=>{   //正确写法
                this.$refs.ps.focus();
            })
        },
      showregisters(){
        let mv=this;
        mv.showregister=true;
        mv.showPrise=false;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      showCLikc(){
        let mv=this;
        mv.showPriseS=true;
        mv.showPrise=false;
      },
      showCLikS(){
        let mv=this;
        mv.showPriseS=false;
        mv.showPrise=true;
      },
      showCLikG(){
        let mv=this;
        mv.showPriseS=false;
        mv.showPrise=true;
        mv.showregister=false;
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
          this.busIco = true;
          this.busIco1 = false;
        } else {
          this.pwdType = 'password'
          this.busIco = false;
          this.busIco1 = true;
        }
      },

      handleLogin() {
            let mv=this;
          mv.$refs.loginForm.validate(valid => {
          if (valid) {
              mv.loading = true;
              mv.$store.dispatch('Login', mv.loginForm).then(() => {
                  console.log("请求登录成功");
                  mv.loading = false;
                  mv.$router.push({path: '/'})    //侦查守卫
              // console.log( this.assembles)
            }).catch((err) => {
                  mv.loading = false;
              console.log(err);
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },

    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>


  .login-form-layout {

    width: 100%;
    margin: 207px auto 0;

    .logoImg {
      width: 202.5px;
      height: 131.4px;
      margin: 0 auto;
      display: flex;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .usenameTop {
      margin-top: 56px;
    }

    .loginClause {
      text-align: center;

      .el-form-item__content {
        height: 20px;
      }
    }
  }

  .loginsOther {
    background: #fff;
    color: #06b3ee;
    border-width: 2px;
    border-color: #06b3ee;
    line-height: 36px;
    font-size: 18px;
  }

  .login-title {
    text-align: center;
  }
  .login-container {
    .el-form-item{
      margin-bottom:10px;
    }
    h3{
      margin-top:10px;
      margin-bottom: 30px;
      text-align: center;
    }
    .loginButton{
      width:100%;
      height: .6rem;
      display: flex;
      margin-bottom: .2rem;
      .iconfont{
        font-size:.3rem;
        float: left;
      }
      .loginBright{
        padding-left: .5rem;
        text-align: left;
        font-size: .12rem;
      }
      p{
        font-size: .08rem;
        padding-top: .05rem;
      }
    }
    .loginButton:hover{
      color: #01b3ee;
      border-color:#01b3ee;
    }
    .loginFooter{
      width: 100%;
      text-align: center;
      .loginBFoot{
        width:100%;
        height:60px;
        line-height: 60px;
        text-align: center;
        color: #00b2ed;
        border: 1px solid #00b2ed;
        background: #fff;
        padding: 0;
        display: -webkit-box;
        font-size:20px;
      }
    }
  }
  /*.login-center-layout {*/
  /*  background: #409EFF;*/
  /*  width: auto;*/
  /*  height: auto;*/
  /*  max-width: 100%;*/
  /*  max-height: 100%;*/
  /*  margin-top: 200px;*/
  /*}*/
</style>
