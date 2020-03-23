<template>
  <div class="liBody">
    <div class="liSY">设备{{lint}}<i v-if="hinds">-货架</i><i v-else="hinds">-托盘号</i><i>{{lint3}}</i></div>
    <ul>

      <li>
        <p>层级</p>
        <b>位置</b>
      </li>
      <li v-for="(item,index) in lont" :key="index" >
        <p class="index==lint2?'classObject':''">{{index}}</p>
        <b v-if="stys.length==4">
          <span v-for="(item1,index1) in item" :key="index1" :class="index==lint2&&item1==lint1?'classObject':''">
          <span>{{item1}}</span>
        </span>
        </b>
        <b v-else>
          <span v-for="(item1,index1) in item" :key="index1" :class="parseInt(lint1)==parseInt(item1)?'classObject':''">
            <span>{{item1}}</span>
          </span>
        </b>
      </li>

    </ul>
  </div>
</template>

<script>
    import {
        LibraryDisplay
    } from '@/api/systemsL'
    export default {
        name: "LibraryDisplay",
        data() {
            return {
                lont:[],
                lint1:'',
                lint2:'',
                item:[],
                isActive:false,
                lint:'',
                lint3:'',
                lint4:'',
                stys:'',
                childrenMessage:'',
                hinds:true,
            }
        },
        props: {
            lots: String,

        },

        filters:{

        },
        created() {

            // this.childrenMessage=this.lots;
            this.parentMsg(this.lots);
        },
        watch:{

            lots:function (newValue,oldVal) {
                this.lint1 = parseInt(newValue.split("-").slice(-1)[0]);
                this.lint3 = parseInt(newValue.split("-").slice(1)[0]);
                // if(this.item==newValue){
                //     newValue.style.backgroundColor='red';
                // }
            }
            // lots(val){    //message即为父组件的值，val参数为值
            //     this.childrenMessage = val    //将父组件的值赋给childrenMessage 子组件的值
            // }
        },
        methods: {
            parentMsg(msg) {
                let mv = this;
                let sendData = '';
                sendData += `location=${msg}`;
                LibraryDisplay(sendData).then(response => {
                    let sens=response.data;
                    if(response.code !=='1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                        });
                        return
                    }
                    // mv.lont=response.data;
                    // mv.stys=msg.split("-");
                    // mv.lint1= parseInt(msg.split("-").slice(-1)[0]);
                    // mv.lint2= parseInt(msg.split("-").slice(-2)[0]);
                    // if(mv.stys.length==4){
                    //     mv.lint= parseInt(msg.split("-").slice(0)[0]);
                    //     mv.lint3= parseInt(msg.split("-").slice(1)[0]);
                    // }else {
                    //     mv.lint= parseInt(msg.split("-").slice(0)[0]);
                    // }
                    mv.$nextTick( () => {
                        mv.lint='';
                        mv.lont = response.data;
                        mv.stys = msg.split("-");
                        mv.lint = parseInt(msg.split("-").slice(0)[0]);
                        mv.lint1 = parseInt(msg.split("-").slice(-1)[0]);
                        mv.lint3 = parseInt(msg.split("-").slice(1)[0]);
                        if (mv.stys.length == 4) {

                            mv.lint2 = parseInt(msg.split("-").slice(-2)[0]);
                            mv.hinds=true;
                        } else {
                            mv.hinds=false;
                        }
                    });




                    // let styL=Object.values(mv.lont);
                    // for(let i=0;i<stys.length;i++){
                    //     if(mv.lint2==stys[i]){
                    //         let lsy=parseInt(stys[i]);
                    //         this.ksyst= lsy;
                    //     }
                    //     for(let j=0;j<styL[i].length;i++){
                    //         if(mv.lint1==styL[i]){
                    //
                    //         }
                    //     }
                    // }

                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .liBody{
    ul{
      width: 100%;
      float: left;
      li:first-child p,li:first-child b{
        border-top: 1px solid #999;
        justify-content: center;
        align-items: center;
        display: flex;
      }
      li{
        float: left;
        width: 100%;
        display: flex;
        p{
          /*float: left;*/
          min-height: 34px;
          /*line-height: 34px;*/
          font-size: 18px;
          /*padding-right: 10px;*/
          /*margin-bottom: 10px;*/
          /*margin-top: 2px;*/
          border-bottom: 1px solid #999;
          border-left: 1px solid #999;
          width: 80px;
          border-right: 1px solid #999;
          display: flex;
          justify-content: center;
          align-items: center;

          padding: 10px 0;
        }
        b{
          font-size: 18px;
          font-weight: normal;
          min-height: 34px;
          /*line-height: 34px;*/
          border-bottom: 1px solid #999;
          /*border-right: 1px solid #ddd;*/
          border-right: 1px solid #999;
          display: inline-block;
          padding: 5px 5px;
          width: 100%;
          text-align: center;
          /*flex-direction:column;*/
        }
        i{
          font-style: normal;
        }
        span{
          display: block;
          color: #FFFFFF;
          height: 30px;
          line-height: 30px;
          text-align: center;
          float: left;
          margin-bottom: 2px;
          margin-top: 2px;
          margin-right: 2px;
          span{
            border-radius: 5px;
            height: 30px;
            width: 30px;
            display: inline-block;
            background: #fff;
            color: #333;
            box-sizing: border-box;
            border:1px solid  #ddd;
            vertical-align: top;
          }
        }
      }
    }
  }
  .classH3{
    display: inline-block;
    text-align: center;
    h3{
      float: left;
    }
  }
  .classObject{
    display: block;
    color: #FFFFFF;
    height: 30px;
    line-height: 30px;
    text-align: center;
    float: left;
    span{
      border-radius: 50%;
      height: 30px;
      width: 30px;
      display: inline-block;
      background: #238ff9 !important;
      color: #fff !important;
      vertical-align: top;
    }
  }
  .liSY{
    width: 100%;
    text-align: center;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    i{
      font-style: normal;
    }
  }
</style>
