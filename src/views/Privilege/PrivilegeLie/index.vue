<template>
  <el-row :gutter="20" style="height: 100%;">
    <el-col :span="6" style="height: 100%;">
      <div class="addPlus" id="hamburger-AddPersonnel" @click="AdditionPops" v-model="userEdit" v-if="userEdit==1"><i class="iconfont icon-add"></i>添加人员</div>
      <div class="privilegeLeft" id="privilegeLeft" :class="userEdit !==1?'privilegeHit':''">

        <ul>
          <li v-for="(data,index) in serverData['users']" :key="index"
              :class='{"active":data.classShow,hit: cur ==index}' id="hamburger-HeadPersonnel" @click="handleCheckNav(data,serverData,index)">
            <div class="privilegeLeftImg"><img :src="portrait" alt=""></div>
            <div class="privilegeLeftName" v-model="data.id">
              <div class="privilegeLFiex">
                <p>{{data.name}}</p><span>{{data.typeName}}</span>
              </div>
              <div class="privilegeFiex" v-if="userEdit==1">
                <el-button type="primary" @click="dialogVisibleModifys" id="hamburger-Modifys">编辑</el-button>
                <el-button type="danger" @click="strikeDelete" id="hamburger-strikeDelete">删除</el-button>
              </div>

            </div>
          </li>
        </ul>

      </div>
    </el-col>

    <Pright :roles="roles" :devices="devices" :isActive="isActive" :userEdits.sync="userEdit" :curSub="curSub" :submenu="submenu" :permissions="permissions" :users="users"
            @updatePermissionslie="updatePermissions" @submenuMenuId="submenuMenuId"  @SubChanage="handleCheckSub" @menuChanage="handleCheckSubmenu" @userChanage="handleCheck" @radioChange="radioChange"></Pright>
<!--    编辑密码-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleModify"
      width="30%"
      class="dialogVode"
    >
      <div class="passWitch">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="修改密码" prop="pass">
            <el-input type="text" v-model="ruleForm2.pass" auto-complete="off" autocomplete="off" placeholder="密码需要6位数以上"></el-input>
          </el-form-item>
          <div class="footPassT">
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>

          </div>
        </el-form>
      </div>

    </el-dialog>
    <!--    添加人员-->
    <el-dialog
      title="添加人员"
      :visible.sync="dialogVisiblePops"
      width="30%"
      class="dialogVode"
    >
      <div class="passWitch">
        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px"
                 class="demo-ruleForm">

          <el-form-item label="选择人员" v-if="hiddens==true" prop="pass" class="ruleF">
            <el-select v-model="ruleForm1.value6" filterable placeholder="请选择">
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.emplName+'-'+item.deptName"
                :value="item.emplName">
                <span style="float: left">{{ item.emplName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输入人名" prop="pass" v-if="hiddens==false">
          <el-input type="text" style="margin-bottom: 20px"  v-model="ruleForm1.value6"></el-input>
          </el-form-item>
          <el-form-item label="输入工号" prop="pass" v-if="hiddens==false">
            <el-input type="text" style="margin-bottom: 20px"  v-model="ruleForm1.value7"></el-input>
          </el-form-item>
          <el-form-item label="修改密码" prop="pass">
            <el-input type="text" v-model="ruleForm1.pass" auto-complete="off" autocomplete="off" placeholder="密码需要6位数以上"></el-input>
          </el-form-item>
          <div class="footPassT">
            <el-button type="primary" @click="submitAdding('ruleForm1')">提交</el-button>

          </div>
        </el-form>
      </div>

    </el-dialog>
  </el-row>
</template>

<script>
  import portrait from '@/assets/images/portrait.jpg';
  import Pright from './component/Pright';
  import md5 from "js-md5";
  import {
    installLs, updatePermissions,submenuMenuId,delUser,changePassword,employeeList
  } from '@/api/systemsL'
  export default {
    name: "PrivilegeLie",
    components: {Pright},
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '' || value.length < 6) {
          callback(new Error('请输入密码或密码需要6位数以上'));
        } else {
          callback();
        }
      };
      return {
        userId: '',
        serverData: {},
        userNameID:'',
        users: {},
        datas: [],
        permissions: [],
        userEdit:'',
        submenu:[],
        submenuT:[],
        devices: [],
        checked1: [],
        usersIds: [],
        roles: [],
        portrait,
        menusIds: [], //已选的菜单id数组
        deviceObjs: [],
        cities:[],
        SelectNavTemporary:[],
        cur: 0,
        curSub:0,
        dd:'',
        ss:'',
        ll:[],
        isActive:'',
        userlds:'',
        ruleForm1: {
          pass: '',
          value6:'',
            value7:'',
        },
        ruleForm2: {
          pass: '',
        },
        dialogVisibleModify: false,
        dialogVisiblePops:false,
          hiddens:false,
        rules1: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        // // 表单
        // navForm: {},
        // // 左侧
        // navList: navList,
        // 右侧
        navContentList: [],

      }
    },
    // inject: ['reload'],
    // 初始化记载
    created() {
      let vue = this;
      // 读取初始值
      this.getList();
      // this.userEdits();
    },
    watch: {
      userEdit: function(newValue, oldValue) {
        //每当str的值改变则发送事件update:word , 并且把值传过去
        // this.$emit('update:userEdits', newValue)
        this.userEdit=newValue;
      },
    },
    methods: {
      // userEdits(pops){
      //   this.userEdit=pops;
      // },
      saveData() {
        let deviceIds = [];
        let permissionIds = [];
        let type = '';
        for (let i = 0; i < this.devices.length; i++) {
          let item = this.devices[i]
          if (item.selected == 1) {
            deviceIds.push(item.id)
          }
        }

        for (let i = 0; i < this.roles.length; i++) {
          let item = this.roles[i]
          if (!isNaN(item.radio)) {
            type = item.type;
            break;
          }
        }

        for (let i = 0; i < this.permissions.length; i++) {
          let item = this.permissions[i]
          if (item.selected == 1) {
            permissionIds.push(item.id)
          }
        }
        for (let i = 0; i < this.submenu.length; i++) {
          let item = this.submenu[i]
          if (item.selected == 1) {
            permissionIds.push(item.id)
          }
        }

        let sendData = ''
        sendData += `userId=${this.userId}&`;
        sendData += `type=${type}&`
        sendData += `deviceIds=${deviceIds.join(',')}&`
        sendData += `permissionIds=${permissionIds.join(',')}&`
        this.updatePermissions(sendData);

      },
      //弹出添加人员
      AdditionPops(){
        let mv = this;

        employeeList().then(response => {
            mv.dialogVisiblePops = true;
          if (response.code !== '1') {
            this.$message({
              message: response.msg,
              type: 'error',
                duration: 1000
            });

            return
          }
                mv.cities=response.data
          if(response.data==null){
              mv.hiddens=false;
          }else {
              mv.hiddens=true;

          }

        }
        )
      },

      submenuMenuId() {
        let mv=this;
        submenuMenuId(mv.$store.state.user.Secondm.Privilege.id).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
                duration: 1000
            });
            return
          }
          // mv.jurisdiction = response.data;
          for(let i=0;i<response.data.length;i++) {
            if (response.data[i].children == 'userEdit') {
              mv.userEdit = response.data[i].ststus;
              // this.$emit('update:userEdits', mv.userEdit);
            }
          }
        });
      },
      //添加新人员
      submitAdding(){
        let mv = this;
        let sendData = '';
        sendData += `userId=${''}&`;
        sendData += `username=${mv.ruleForm1.value6}&`;
          sendData += `jobNumber=${mv.ruleForm1.value7}&`;
        sendData += `pwd=${md5(mv.ruleForm1.pass)}&`;
        changePassword(sendData).then(response => {
            if (response.code !== '1') {
              this.$message({
                message: response.msg,
                type: 'error',
                  duration: 1000
              });
              return
            } else {
              this.$message({
                type: 'success',
                message: response.msg,
                  duration: 1000
              });
              mv.ruleForm1.pass='';
              mv.ruleForm1.value6='';
                mv.ruleForm1.value7='';
              mv.dialogVisiblePops = false;
              mv.getList();
            }

          }
        )
      },
      //弹出编辑密码
      dialogVisibleModifys() {
        let mv = this;
        mv.dialogVisibleModify = true;
        mv.ruleForm2.pass='';
      },
      //编辑密码
      submitForm(){
        let mv = this;
        let sendData = '';
        let usdeID=this.userId;
        let usdeNames=this.userNameID;
        sendData += `userId=${usdeID}&`;
        sendData += `username=${usdeNames}&`;
        sendData += `pwd=${md5(mv.ruleForm2.pass)}&`;
        changePassword(sendData).then(response => {
            if (response.code !== '1') {
              this.$message({
                message: response.msg,
                type: 'error',
                  duration: 1000
              });
              return
            } else {
              this.$message({
                type: 'success',
                message: response.msg,
                  duration: 1000
              });
              mv.ruleForm2.pass='';
              mv.dialogVisibleModify = false;
            }

          }
        )
      },
      radioChange(params) {

        for (let i = 0; i < params[0].length; i++) {
          let type = params[0][i].type;
          if (i == params[1]) {
            params[0][i].radio = type + '' + i;
            params[0][i].selected = type;
          this.serverData['users'][this.cur].typeName = params[0][i].name ;
          this.serverData['users'][this.cur].type=params[0][i].type
          } else {
            params[0][i].radio = type + 'hh'
            params[0][i].selected = type;
            // this.serverData['users'][i].typeName = params[0][i].name ;
          }
        }
        this.saveData();

      },
      selectedFun(persId, res, roles = 'id', selected = 'selected', type) {
        let mv=this;
        for (let j = 0; j < res.length; j++) {
          if (!res[j][selected]) {
            res[j]['selected'] = type ? type[0] : res[j].type;
            if (selected !== 'selected') {
              res[j]['radio'] = res[j].type + 'hh';
            }
            if (res[j].permissionId==1) {
              res[j]['selected'] = type ? type[0] : res[j].type;
              res[j].couNum=true;
              for (let i=0;i<mv.permissions.length;i++){
                if(mv.curSub==undefined){
                  return
                }
                if(mv.permissions[mv.curSub].selected==2){
                  mv.isActive=true;
                }else {
                  mv.isActive=false;
                }
              }
            }
          }
          for (let i = 0; i < persId.length; i++) {
            if (res[j][roles] == persId[i]) {
                res[j]['selected'] = type ? type[1] : res[j].type;
              if (selected !== 'selected') {
                res[j]['radio'] = res[j].type + '' + j;
              }
              if (res[j].id == persId[i]&&res[j].permissionId==1) {
                res[j]['selected'] = type ? type[1] : res[j].type;
                res[j].couNum=true;
              }
              for (let i=0;i<mv.permissions.length;i++){
                if(mv.curSub==undefined){
                  return
                }
                if(mv.permissions[mv.curSub].selected==2){
                  mv.isActive=true;
                }else {
                  mv.isActive=false;
                }
              }
              break
            }
          }
          // for (let i=0;i<mv.permissions.length;i++){
          //   if(mv.permissions[mv.curSub].selected==2){
          //     mv.isActive=true;
          //   }else {
          //     mv.isActive=false;
          //   }
          // }
        }
        return res;
      },
      //添加人员下拉搜索

      //  列表头部
      getList() {
        let mv=this;
        this.listLoading = false;
        mv.curSub=0;
        installLs().then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1000
            });
            return
          }
          mv.serverData = response.data;
          mv.submenu=mv.serverData.submenu;
          let users = response.data.users;
          if (users.length > 0) {
            this.handleCheckNav(users[0]);
            this.handleCheckSub(mv.curSub,mv.serverData.submenu)
          }
        });
      },
      //删除用户
      strikeDelete(){
        // if(this.$store.state.choices==true){
          this.$confirm('是否进行删除操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let sendData = '';
            sendData += `userId=${this.userId}&`;
            delUser(sendData).then(response=>{
              if (response.code !== '1') {
                this.$message({
                  type: 'error',
                  message: response.msg,
                    duration: 1000
                });
                return
              }else {
                this.$message({
                  type: 'success',
                  message: response.msg,
                    duration: 1000
                });
                this.getList();
              }
            });
          }
        ).catch(() => {

          });
        // }
      },
      //  添加人员搜索

      //  列表头部
      getClick() {
        installLs().then(response => {
          let mv=this;
          mv.serverData = response.data;
          let users = response.data.users;
          mv.handleCheckNav(users[mv.cur]);
          mv.handleCheckSub(mv.curSub,mv.submenu)
        });
      },
      //列表左侧列表点击
      handleCheckNav(users, res = this.serverData, index = this.cur) {
        let mv=this;
        this.cur = index;
        this.userId = users.id;
        this.userNameID = users.name;
        // this.curSub =0;
        this.roles = this.selectedFun(users.type + ''.split(','), JSON.parse(JSON.stringify(res.roles)), 'type', 'radio');
        this.devices = this.selectedFun(users.deviceIds.split(','), JSON.parse(JSON.stringify(res.devices)), 'id', 'selected', [0, 1]);
        this.permissions = this.selectedFun(users.permissionIds.split(','), JSON.parse(JSON.stringify(res.permissions)), 'id', 'selected', [2, 1]);
        this.submenu = this.selectedFun(users.permissionIds.split(','), JSON.parse(JSON.stringify(res.submenu)), 'id', 'selected', [3, 1]);
        mv.handleCheckSub(mv.curSub,mv.submenu)
        },
      //列表中间列表点击
      handleCheckSub(index, res) {
        let mv=this;
        res=this.submenu;
        let msuT=[];
        if(typeof index=='object'){
          mv.curSub = index[0];
          for(let j=0; j < res.length; j++){

            if(res[j].permissionId==index[0]+1){
              msuT.push(res[j]);
              res[j].couNum=true;
            }else {
              res[j].couNum=false;
            }
            if(mv.permissions[mv.curSub].selected==2){
              mv.isActive=true;
            }else {
              mv.isActive=false;
            }
          }
        }else {
          mv.curSub = index;
          for(let j=0; j < res.length; j++){

            if(res[j].permissionId==index+1){
              msuT.push(res[j]);
              res[j].couNum=true;
            }else {
              res[j].couNum=false;

            }
            if(mv.permissions[mv.curSub].selected==2){
              mv.isActive=true;
            }else {
              mv.isActive=false;
            }
          }
        }


        // this.submenu=msuT;
        // for (let i=0;i<mv.permissions.length;i++){
        //   if(mv.curSub==undefined){
        //     return
        //   }
        //
        // }

       // mv.submenuT=mv.submenu;
        // mv.submenuT = this.selectedSum(users.permissionIds.split(','), JSON.parse(JSON.stringify(res)), 'id', 'selected', [3, 1]);
        // for (let j = 0; j < res.length; j++) {
        //   if(res[j].permissionId==mv.curSub[0]+1){
        //     res[j].couNum=true;
        //     mv.submenuT.push(res[j]);
        //   }
        // }
      },
      handleCheck(info) {
        let switchObj = {
          'permissions': [2, 1],
          'devices': [0, 1],
        }
        let nomalVal = info[1].selected;
        let checked = switchObj[info[0]];
        let currVal = checked.splice(checked.indexOf(nomalVal), 1)
        this[info[0]][info[2]].selected = currVal[0];
        this.dd=this[info[0]][info[2]].url;
        this.ss=this[info[0]][info[2]].selected;
        this.ll=this[info[0]];
        this.saveData();

      },
      handleCheckSubmenu(info){
        let switchObj = {
          'permissions': [2, 1],
          'devices': [0, 1],
          'submenu':[3, 1],
        }
        let nomalVal = info[1].selected;
        let checked = switchObj[info[0]];
        let currVal = checked.splice(checked.indexOf(nomalVal), 1)
        this[info[0]][info[2]].selected = currVal[0];
        this.dd=this[info[0]][info[2]].url;
        this.ss=this[info[0]][info[2]].selected;
        this.ll=this[info[0]];
        this.saveData();
      },
      //控制开关
      updatePermissions(sendData) {
        let mv=this;
        this.$confirm('确定要进行操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          updatePermissions(sendData).then(res => {
            if(res.code!=='1'){
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000
              });
              mv.getClick();
              return
            }

            this.$message({
              type: 'success',
              message: res.msg,
                duration: 1000
            });

            let naiD;
            if(typeof(mv.$store.state.user.token)==typeof([])){
              naiD=mv.$store.state.user.token;
            }else {
              naiD=JSON.parse(mv.$store.state.user.token);

            }

            let ho=mv.$store.state.user.roles;
            let hu=mv.$store.state.user.leftBotomRols;

            if(mv.dd==''){
              mv.handleCheckSub(mv.curSub,mv.submenu);
              mv.getClick();
              mv.submenuMenuId();
            }else {
              mv.getClick();
              mv.submenuMenuId();
            }
            // if(naiD.id==mv.userId){
            //   for(let i=0;i<ho.length;i++){
            //     if(mv.ll[i].url==mv.dd){
            //       if(mv.ss==2){
            //           ho.splice(i, 1);
            //
            //       }
            //       // this.$router.go(0);
            //     }
            //   }
            // }
            // 手动重定向页面到 '/redirect' 页面
            // const { fullPath } = this.$route;
            // this.$router.replace({
            //   path: '/redirect' + fullPath
            // })

            // this.$root.eventHub.$emit('updatePermissions')
          });
        }).catch(() => {
          if(mv.dd==''){
            mv.getClick();
            // mv.userEdits();
          }else {
            mv.getClick();
            // mv.userEdits();
          }
        })
      }


    }
  }

</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>

  .privilegeLeft {
    display: flex;
    box-sizing: border-box;
    height: calc(100% - 40px);
    background: #fff;
    float: left;
    overflow-y: auto;
    li {
      float: left;
      width: 100%;
      position: relative;

      .privilegeLeftImg {
        width: 94px;
        height: 100%;
        float: left;
        margin: 16px;
        display: flex;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .privilegeLeftName {
        float: left;
        height: 100%;
        padding-top: 40px;
        padding-bottom: 40px;
        width: calc(100% - 134px);
display: flex;
        p {
          float: left;
          font-size: 16px;
          width: 100%;
          padding-right: 50px;
        }

        span {
          float: left;
          font-size: 16px;
          width: 100%;
          margin-top: 10px;
          padding-right: 50px;
        }

        .privilegeLeftChecked {
          float: right;
          position: absolute;
          right: 20px;
        }
      }
    }

    li:hover {
      background: #e7f9fe;
      cursor: pointer;
    }
  }
  .footPassT {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .active {
    color: red;
  }
  .privilegeLFiex{
    flex: 1;
  }
  .privilegeFiex{
    display: flex;
    flex: 1;
  }
  .addPlus {
    text-align: center !important;
    line-height: 40px;
    display: inline-block !important;
    height: 40px;
    float: left;
    width: 100%;
    font-size: 16px;
    color: #666;
    cursor: pointer;
    border: 1px solid #00b2ed;
    i {
      padding-right: 20px;
    }
  }
  .hit {
    background: #e7f9fe;
  }
  .privilegeHit{
    height: 100% !important;
  }
  .ruleF{
    width: 100%;
    margin-bottom: 10px;
    .el-select{
      width: 100%;
    }
  }
</style>
